import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import {applyMiddleware, createStore} from "@reduxjs/toolkit";
import userReducer  from "./users/userReducer";
import {API_USERS_INDEX_URL} from "./constants";
import './fonts/Montserrat-VariableFont_wght.ttf';

const asyncFunctionMiddleware = storeAPI => next => action => {
    // If the "action" is actually a function instead...
    if (typeof action === 'function') {
        // then call the function and pass `dispatch` and `getState` as arguments
        return action(storeAPI.dispatch, storeAPI.getState)
    }

    // Otherwise, it's a normal action - send it onwards
    return next(action)
}

const middlewareEnhancer = applyMiddleware(asyncFunctionMiddleware)
const store = createStore(userReducer, middlewareEnhancer)

const fetchData = (dispatch, getState) => {
    fetch(API_USERS_INDEX_URL).then(users => users.json()).then(users => {
        // Dispatch an action with the todos we received
        dispatch({type: 'users/usersLoaded', payload: users})
    });
}

store.dispatch(fetchData)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
