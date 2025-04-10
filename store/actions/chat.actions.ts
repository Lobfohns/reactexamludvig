import { Chatroom } from "../../entities/Chatroom";
import { Message } from "../../entities/Message";
import dateFormat, { masks } from "dateformat";

export const ADD_CHATROOM = 'ADD_CHATROOM';
export const FETCH_CHATROOMS = 'FETCH_CHATROOMS';

export const fetchChatrooms = () => {
    return async (dispatch: any, getState: any) => {
        const token = getState().user.idToken;

        const response = await fetch(
            'https://reactexamludvig-default-rtdb.europe-west1.firebasedatabase.app/chatrooms.json?auth=' + token, { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.log("failed to fetch");
            console.log( await response.json() )
            
        } else {
            const data = await response.json();
            let chatrooms: Chatroom[] = []

            for(const key in data) { //chatrooms
                let messages: Message[] = [];

                for(const key2 in data[key].messages) { //messages
                    let msg = data[key].messages[key2];
                    messages.push(new Message(msg.message, msg.sender, dateFormat(msg.timestamp), key2));
                }
                
                chatrooms.push(new Chatroom(data[key].title, data[key].status, data[key].messages ? messages : [], data[key].timestamp, key));
            }
            dispatch({ type: FETCH_CHATROOMS, payload: chatrooms })
            
        }
    };
}

export const addChatroom = (chatroom: Chatroom) => {
    return async (dispatch: any, getState: any) => {
        const token = getState().user.idToken;

        const response = await fetch(
            'https://reactexamludvig-default-rtdb.europe-west1.firebasedatabase.app/chatrooms.json?auth=' + token, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                chatroom
            )
        });

        if (!response.ok) {
            //There was a problem..
            //dispatch({type: ADD_CHATROOM_FAILED, payload: 'something'})
        } else {
            const data = await response.json();

            chatroom.id = data.name;

            dispatch({ type: ADD_CHATROOM, payload: chatroom })
        }
    };
}

// import { Chatroom } from "../../entities/Chatroom";

// export const TOGGLE_HAPPY = 'TOGGLE_HAPPY';
// export const ADD_CHATROOM = 'ADD_CHATROOM';
// export const FETCH_CHATROOMS = 'FETCH_CHATROOMS';

// export const toggleHappy = () => {
//     return { type: TOGGLE_HAPPY };
// };

// export const fetchChatrooms = () => {
//     return async (dispatch: any, getState: any) => {
//         const token = getState().user.idToken;

//         const response = await fetch(
//             'https://reactexamludvig-default-rtdb.europe-west1.firebasedatabase.app/chatrooms.json?auth=' + token, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });

//         // console.log(await response.json());

//         if (!response.ok) {
//             //There was a problem..
//             //dispatch({type: FETCH_CHATROOM_FAILED, payload: 'something'})
//         } else {
//             const data = await response.json(); // json to javascript
//             let chatrooms: Chatroom[] = []
//             for (const key in data) {
//                 // create Chatroom objects and push them into the array chatrooms.
//                 const obj = data[key];
//                 chatrooms.push(new Chatroom(obj.title, obj.status, obj.message, new Date(obj.timestamp), key))
//             }

//             console.log("chatrooms", chatrooms);

//             // console.log("data from server", data);
//             //chatroom.id = data.name;

//             dispatch({ type: 'FETCH_CHATROOMS', payload: chatrooms })
//         }
//     };  
// }

// export const addChatroom = (chatroom: Chatroom) => {
//     return async (dispatch: any, getState: any) => {
//         const token = getState().user.idToken;

//         console.log(token);

//         //delete chatroom.id // for an update, this would remove the id attribute (and value) from the chatroom
//         const response = await fetch(
//             'https://reactexamludvig-default-rtdb.europe-west1.firebasedatabase.app/chatrooms.json?auth=' + token, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(
//                 chatroom
//             )
//         });

//         // console.log(await response.json());

//         if (!response.ok) {
//             //There was a problem..
//             //dispatch({type: ADD_CHATROOM_FAILED, payload: 'something'})
//         } else {
//             const data = await response.json(); // json to javascript
//             // let chatrooms = []
//             // for (const key in data) {
//             //     console.log(data[key].name)​
//             // }

//             console.log("data from server", data);
//             chatroom.id = data.name;

//             dispatch({ type: ADD_CHATROOM, payload: chatroom })
//         }
//     };
// }