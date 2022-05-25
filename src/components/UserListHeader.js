import React from 'react';

const UserListHeader = () => {
    return (
        <div className="UserListHeader">
            <label className="heading checkbox-container">
                <input type="checkbox"/>
                <span className="checkmark"></span>
            </label>
            <span className="heading type">type</span>
            <span className="heading name">name</span>
            <span className="heading email">email</span>
            <span className="heading telephone">telephone</span>
            <span className="heading status">status</span>
        </div>
    );
};

export default UserListHeader
