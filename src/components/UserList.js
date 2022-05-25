import React, { useEffect, useState } from 'react';
import './UserList.css';
import { connect } from "react-redux";
import UserListHeader from "./UserListHeader";
import UserRow from "./UserRow";
import Questionmark from '../assets/Questionmark.svg';

const UserList = ({users, counter}) => {
    return (
        <div className="UserList">
            <div className="container">
                <span className="title">Users</span>
                <span className="counter">{counter} selected <img
                    src={Questionmark}
                    alt="questionmark"
                    height={20}/>
                </span>
            </div>
            <UserListHeader/>
            {users.map(user => <UserRow user={user.id} key={user.id}/>)}
        </div>
    );
};

function mapStateToProps(state) {
    const allUsers = state.users
    const counter = state.counter
    return { users: allUsers, counter: counter }
}

export default connect(mapStateToProps)(UserList)
