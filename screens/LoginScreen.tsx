import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { rehydrateUser, login } from '../store/actions/user.actions';

export default function LoginScreen() {
    const [email, setEmail] = useState('test@mail.dk');
    const [password, setPassword] = useState('123456');
    const dispatch = useDispatch(); 

    return (
        <View style={styles.container}>
            <Text>Login Screen</Text>
            <TextInput value={email} placeholder="email" onChangeText={setEmail} />
            <TextInput value={password} placeholder="password" onChangeText={setPassword} />
            <Button title="Login" onPress={() => dispatch(login(email, password))} />
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
})