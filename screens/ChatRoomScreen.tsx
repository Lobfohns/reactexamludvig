import React, { useEffect, useRef } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Message } from '../entities/Message';
import { addMessage, fetchMessages } from '../store/actions/message.actions';
import MessageComponent from '../components/MessageComponent'
import dateFormat, { masks } from "dateformat";

export default function ChatRoom({route}) {
    const {id} = route.params;
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMessages(id))
    }, [])

    const [message, onChangeMessage] = React.useState('');

    const messages: Message[] = useSelector((state: any) => state.message.messages)

    const handleSendMessage = () => {
        const newMessage: Message = new Message(message, "You", dateFormat());
        dispatch(addMessage(newMessage, id));
        onChangeMessage('');
    }

    const renderMessages = ({ item }: { item: any }) => {
        return <MessageComponent message={item.message} sender={item.sender} timestamp={item.timestamp}></MessageComponent>
        //return <Text>{item.message} {item.sender} {item.timestamp}</Text> //component message
    }

    return (
        <View style={styles.container}>
            <FlatList 
                inverted
                data={messages.reverse()}
                renderItem={renderMessages}
            
            />
            <View style={styles.inputBox}>
                <TextInput style={styles.inputField}
                    onChangeText={onChangeMessage}
                    value={message}
                    placeholder="Send message"
                />
                <Button title="▶" onPress={handleSendMessage} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'black',
    },
    inputBox: {
        flexDirection: 'row',
        width: '80%',
        marginBottom: 10,
        marginHorizontal: '10%',
    },
    inputField: {
        backgroundColor: '#CCC',
        borderRadius: 5,
        marginRight: 10,
        flex: 9,
        paddingLeft: 5,
    },
    inputButton: {
        flex: 1,
        borderRadius: 5,
    }

})  