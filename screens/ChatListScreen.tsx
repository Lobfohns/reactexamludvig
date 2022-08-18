import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Button, FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Chatroom, Status } from '../entities/Chatroom';
import { addChatroom, fetchChatrooms } from '../store/actions/chat.actions';
import { StackParamList } from "../typings/navigations";
import dateFormat, { masks } from "dateformat";

type ScreenNavigationType = NativeStackNavigationProp<
    StackParamList,
    "Chat List"
>

export default function ChatListScreen() {
    const navigation = useNavigation<ScreenNavigationType>()

    const chatrooms: Chatroom[] = useSelector((state: any) => state.chat.chatrooms)

    const dispatch = useDispatch()

    useEffect(() => { // only runs dispatch the first time the component renders
        dispatch(fetchChatrooms())
    }, [])

    const renderChatroom = ({ item }: { item: any }) => { 
        return (
        <View style={styles.flatlist}>
            <Pressable onPress={() => navigation.navigate('Chat Room', {id: item.id})}>
            <View style={{flexDirection: 'row'}}>
                <Image 
                style={styles.chatimage}
                source={require('../assets/penguin.png')}
                />
                <View style={{flex: 6, flexDirection:'column', justifyContent: 'space-between'}}>
                    <Text style={styles.chatroomTitle}>
                        {item.title}
                    </Text>
                    <View style={{flexDirection:'row'}}>
                        <Text numberOfLines={1} style={[styles.chatroommessage, item.status == 'unread' ? styles.msgread : styles.msgunread]}>
                            {item.message ? item.message : "no message"} 
                        </Text>
                        <Text style={styles.chatroomtime}>
                            {dateFormat(new Date(),"d mmm") == dateFormat(item.timestamp, "d mmm") ? dateFormat(item.timestamp, "H:MM") : dateFormat(item.timestamp, "d mmm")}
                        </Text>
                    </View>
                </View>
            </View>
            </Pressable>
        </View>
        )
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={chatrooms}
                renderItem={renderChatroom}
            />
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
    flatlist: {
        textAlign: 'left',
        backgroundColor: 'gold',
        height: 50,
        width: 300,
        borderRadius: 15,
        margin: 10,
        padding: 5,
    },
    chatimage: {
        flex: 1,
        width: 40,
        height: 40,
        borderRadius: 50,
    },
    chatroomTitle: {
        color: 'black',
        fontWeight: 'bold',
        marginLeft: 5, 
    },
    chatroommessage: {
        flex: 4,
        marginLeft: 5,
    },
    chatroomtime: {
        flex: 1,
        alignItems: 'flex-end',
        color: 'red',
        fontWeight: 'bold',
    },
    msgread: {
        color: 'black'
    },
    msgunread: {
        color: 'black',
        fontWeight: 'bold',
    },
})