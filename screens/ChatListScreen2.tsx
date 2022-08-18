import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Button, FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Chatroom, Status } from '../entities/Chatroom';
import { StackParamList } from "../typings/navigations";
import dateFormat, { masks } from "dateformat";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

type ScreenNavigationType = NativeStackNavigationProp<
    StackParamList,
    "Chat List2"
>

const queryClient = new QueryClient();
//can't access getState, can't access token for firebase??
export default function ChatListScreen2() {
    return (
      <QueryClientProvider client={queryClient}>
        <GetChat />
      </QueryClientProvider> 
       
    );
}

const GetChat = () => {
    const { isLoading, error, data } = useQuery('repoData', () =>
        fetch('https://api.thecatapi.com/v1/images/search',).then(res =>
            res.json()
        )
    )
    if (isLoading) return <Text>Loading...</Text>
    if(error) return <Text>An error has occurred: {error.message}</Text>
    console.log(data);
    
    return (
        <View>
        <Text>New random cat picture in order to show off query</Text>
        {/* <Text>{data[0].url}</Text> */}
        <Image
                style = {styles.catPicture} 
                source={{uri: data[0].url}}
        />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    catPicture: {
        width: '100%',
        height: '100%',
      },
})