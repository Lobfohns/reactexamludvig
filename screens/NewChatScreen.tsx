import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { Chatroom, Status } from '../entities/Chatroom';
import dateFormat, { masks } from "dateformat";
import { useDispatch } from 'react-redux';
import { addChatroom } from '../store/actions/chat.actions';

export default function NewChatScreen({navigation: {goBack}}) {
    const dispatch = useDispatch()
    
    const [title, onChangeTitle] = React.useState('');
    
    const handleAddChatroom = () => {
        const chatroom: Chatroom = new Chatroom(title, Status.UNREAD, '', dateFormat());
        dispatch(addChatroom(chatroom));
        //if success -> go back
        //else it gives error
        goBack();
    }
    
    return (
        <View style={styles.container}>
            <Text>Create a new chat</Text>

            <TextInput
                style={styles.input}
                onChangeText={onChangeTitle}
                value={title}
                placeholder="Chatroom name"
            />
            <Button title="Create chatroom" onPress={handleAddChatroom} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addItemButton: {
        backgroundColor: '#eb8634',
        paddingVertical: 20,
        borderRadius: 5,
        alignItems: 'center',
      },
      buttonText: {color: '#fff', fontWeight: '500'},
      input: {
        padding: 15,
        borderColor: 'rgba(0, 0, 0, 0.2)',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
      },
})  