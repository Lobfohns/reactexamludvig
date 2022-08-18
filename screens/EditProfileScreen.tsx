import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../App';
import Input from '../components/Input';
import { User } from '../entities/User';

export default function EditProfileScreen() {
    const user: User = useSelector((state: RootState) => state.user.loggedInUser);
    const [textEmail, setTextEmail] = useState(user.email)
    // console.log(user.email);

    const onSave = () => {
        if (textEmail !== ''  /* && other inputs are not empty */) {
            // save the data to the server
        } else {
            //Show error message
        }
    }

    return (
        <View style={styles.container}>
            <Text>Edit Profile Screen</Text>
            <Input title="Type new email"
                inputValue={textEmail}
                setText={setTextEmail}
                error="Email cannot be empty"
                
            />

            <Button title="Save" onPress={() => console.log("hi")} />
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
    input: {
        padding: 15,
        borderColor: 'rgba(0, 0, 0, 0.2)',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
      },
})