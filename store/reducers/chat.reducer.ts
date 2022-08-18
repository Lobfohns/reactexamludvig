import { Chatroom } from "../../entities/Chatroom";
import { ADD_CHATROOM, FETCH_CHATROOMS } from "../actions/chat.actions";

interface ReduxState {
    chatrooms: Chatroom[]
}

const initialState: ReduxState = {
    chatrooms: []
}

interface ReduxAction {
    type: string,
    payload?: Chatroom
}

const chatReducer = (state: ReduxState = initialState, action: ReduxAction) => {
    switch (action.type) {
        
        case ADD_CHATROOM:
            return { ...state, chatrooms: [...state.chatrooms, action.payload] }
        

        case FETCH_CHATROOMS:
            // create a new state object with the action.payload assigned to the chatrooms array.
            return { ...state, chatrooms: action.payload }

        default:
            return state;
    }
};

export default chatReducer;

// import { Chatroom } from "../../entities/Chatroom";
// import { ADD_CHATROOM, FETCH_CHATROOMS } from "../actions/chat.actions";

// interface ReduxState {
//     chatrooms: Chatroom[]
//     isHappy: boolean
//     counter: number
//     name: string
// }

// const initialState: ReduxState = {
//     chatrooms: [],
//     isHappy: false,
//     counter: 0,
//     name: "Peter"
// }

// interface ReduxAction {
//     type: string,
//     //måske? boolean | number | string |
//     payload?: Chatroom
// }

// const chatReducer = (state: ReduxState = initialState, action: ReduxAction) => {
//     switch (action.type) {
//         case TOGGLE_HAPPY:
//             console.log("mood changed");

//             return { ...state, isHappy: !state.isHappy }

//         case ADD_CHATROOM:
//             console.log(action.payload);
//             return { ...state, chatrooms: [...state.chatrooms, action.payload] }
//         // state.chatrooms.push(chatroom) // mutating state. Not allowed

//         case FETCH_CHATROOMS:
//             // create a new state object with the action.payload assigned to the chatrooms array.
//             return { ...state, chatrooms: action.payload }

//         default:
//             return state;
//     }
// };

// export default chatReducer;