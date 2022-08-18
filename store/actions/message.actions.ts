import { Message } from "../../entities/Message";
import dateFormat, { masks } from "dateformat";

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const FETCH_MESSAGES = 'FETCH_MESSAGES';

export const addMessage = (message: Message, chatroomId: string) => { 
    return async (dispatch: any, getState: any) => {
        const token = getState().user.idToken;

        const response = await fetch(
            'https://reactexamludvig-default-rtdb.europe-west1.firebasedatabase.app/chatrooms/' + chatroomId + '/messages.json?auth=' + token, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                message
            )
        });

        if (!response.ok){
            console.log("failure adding message");
            
        } else {
            const data = await response.json();
            console.log("message added success", data);

            message.id = data.name;

            dispatch({type: ADD_MESSAGE, payload: message })
        }
    }
}

export const fetchMessages = (chatroomId: string) => {
    return async (dispatch: any, getState: any) => {
        const token = getState().user.idToken;
        console.log(chatroomId);
        
        const response = await fetch(
            'https://reactexamludvig-default-rtdb.europe-west1.firebasedatabase.app/chatrooms/' + chatroomId + '/messages.json?auth=' + token, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.log("fetch messages failed");
            console.log( await response.json() )
            
        } else {
            //console.log("hej");
            
            const data = await response.json();
            let messages: Message[] = [];
            
            for(const key in data) {
                let msg = data[key];
                messages.push(new Message(msg.message, msg.sender, dateFormat(msg.timestamp), key));
            }
            
            dispatch({type: FETCH_MESSAGES, payload: messages})
        }
    
    }
}