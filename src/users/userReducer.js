const initialState = {
    users: [],
    counter: 0,
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'users/usersLoaded':
            state = { ...state, users: action.payload }
            return state

        case 'users/userUpdated':
            state = {
                ...state,
                users: state.users.map(
                    user => user.id === action.payload.id ? {...action.payload} : user
                ),
            }
            return state;

        case 'users/incrementCounter':
            state = {
                users: state.users,
                counter: state.counter + 1,
            }
            return state

        case 'users/decrementCounter':
            state = {
                users: state.users,
                counter: state.counter - 1,
            }
            return state

        default:
            return state
    }
}