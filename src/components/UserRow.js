import React from 'react';
import {connect, useDispatch} from "react-redux";
import {API_USER_UPDATE_URL} from "../constants";

const colorize = (type) => {
    switch (type) {
        case 'Supervisor':
            return '#B9E5E5';
        case 'Stakeholder':
            return '#E17878';
        case 'Guest':
            return '#F2AC57'
        default:
            return;
    }
}

const short = (type) => {
    switch (type) {
        case 'Supervisor':
            return 'su';
        case 'Stakeholder':
            return 'co';
        case 'Guest':
            return 'em'
        default:
            return;
    }
}

const UserRow = ({user, updateUser, incrementCounter, decrementCounter}) => {
    return (
        <div className="UserRow" onClick={(e) => {
            if (e.target.firstChild !== null) {
                updateUser(user.id, user.name, user.email, user.phone, !user.active, user.type)
            }
        }}>
            <label className="cell checkbox-container">
                <input type="checkbox"
                       onChange={(e) => {
                           e.target.checked ? incrementCounter() : decrementCounter()
                       }}/>
                <span className="checkmark"></span>
            </label>
            <span className="cell type" style={{
                backgroundColor: colorize(user.type),
            }}
            >
                {short(user.type)}
            </span>
            <span className="cell name">{user.name}</span>
            <span className="cell email">{user.email}</span>
            <span className="cell telephone">{user.phone}</span>
            <label className="cell status switch">
                <input type="checkbox"
                       onChange={(e) => {
                           updateUser(user.id, user.name, user.email, user.phone, !user.active, user.type)
                       }}
                       checked={user.active}
                />
                    <span className="slider round"></span>
            </label>
        </div>
    );
};

const getUser = (state, id) => {
    return state.users.find(u => u.id === id)
}

const updateUser = (user, name, email, phone, active, type) => {
    console.log(1)
    return async function updateUserThunk(dispatch) {
        let updatedUser;
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, email: email, phone: phone, active: active, type: type })
        };

        await fetch(API_USER_UPDATE_URL + user, requestOptions).then(response => response.json())
            .then(data => updatedUser=data);

        dispatch({type: 'users/userUpdated', payload: {id: updatedUser.id,
                name: updatedUser.name, email: updatedUser.email, phone: updatedUser.phone,
                active: updatedUser.active, type: updatedUser.type}});

        return updatedUser;
    };
}

function mapStateToProps(state, ownProps) {
    return {
        user: getUser(state, ownProps.user)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: async (id, name, email, phone, active, type) => {
            await updateUser(id, name, email, phone, active, type)(dispatch)
            return dispatch({type: 'users/userUpdated', payload: {id: id,
                name: name, email: email, phone: phone, active: active, type: type}});
        },
        incrementCounter: () => {
            return dispatch({type: 'users/incrementCounter'})
        },
        decrementCounter: () => {
            return dispatch({type: 'users/decrementCounter'})
        },
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(UserRow)
