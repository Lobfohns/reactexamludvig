import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { useDispatch } from 'react-redux';
import { logout } from '../store/actions/user.actions';

export default function HomeScreen() {
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <Text style={styles.text} >Home Screen</Text>
            <Text>Navigate using the bar at the bottom or you can logout</Text>
            <Button title="Logout" onPress={() => dispatch(logout())} />
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
    text: {
        fontWeight: 'bold',
        alignSelf: "center",
        padding: 50
    }
})