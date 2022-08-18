import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import dateFormat, { masks } from "dateformat";



const MessageComponent = ({ message, sender, timestamp }:
    { message: string, sender: string, timestamp: string,}) => {

    return (
        <View style={styles.container}>
            <Text style={styles.sender}>{sender}</Text>
            <Text style={styles.messageBox}>{message}</Text>
            <Text style={styles.timestamp}>{dateFormat(new Date(),"d mmm") == dateFormat(timestamp, "d mmm") ? dateFormat(timestamp, "H:MM") : dateFormat(timestamp, "d mmm")}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '95%',
        alignItems: 'flex-end',
        margin: 10,
        color: 'white',
    },
    sender: {
        fontSize: 10,
        color: 'white',
    },
    messageBox:{
        flex: 5,
        borderColor: 'black',
        borderRadius: 10,
        backgroundColor: '#6AF',
        padding: 5,
        maxWidth: '65%',
        alignItems: 'flex-end',
    },
    timestamp: {
        fontSize: 10,
        color: 'white',
    },
})

export default MessageComponent;