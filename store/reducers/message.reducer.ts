import { Message } from "../../entities/Message";
import { ADD_MESSAGE, FETCH_MESSAGES } from "../actions/message.actions";

interface ReduxState {
    messages: Message[] 
}

const initialState: ReduxState = {
    messages: []
    //messages: [new Message("lol","lol","1212",undefined)] 
}

interface ReduxAction {
    type: string,
    payload?: Message | Message[]
}

const messageReducer = (state: ReduxState = initialState, action: ReduxAction) => {
    switch (action.type) {
        case ADD_MESSAGE:            
            return { ...state, messages: [...state.messages, action.payload] }

        case FETCH_MESSAGES:
            return { ...state, messages: action.payload }

        default:
            return state;
    }
}

export default messageReducer;