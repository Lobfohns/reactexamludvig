import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Button, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../App';
import EditProfileScreen from '../screens/EditProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SignupScreen from '../screens/SignupScreen';
import ChatListScreen from '../screens/ChatListScreen';
import ChatListScreen2 from '../screens/ChatListScreen2';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import NewChatScreen from './../screens/NewChatScreen';
import { StackParamList } from "./../typings/navigations";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LoginScreen from '../screens/LoginScreen';
import Ionicons from '@expo/vector-icons/Ionicons'


const Stack = createNativeStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator();
const TabTop = createMaterialTopTabNavigator();

function ChatStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Chat List" component={ChatTabNavigator} 
                options={({navigation}) => ({
                    headerRight: () => ( <Button title="new chat" onPress={ () => navigation.navigate('New Chat')} /> )})} 
            />
            <Stack.Screen name="Chat Room" component={ChatRoomScreen} />
            <Stack.Screen name="New Chat" component={NewChatScreen} />
        </Stack.Navigator>
    );
}

function ChatTabNavigator(){ 
    return (      
        <TabTop.Navigator >
            <TabTop.Screen name="chats" component={ChatListScreen} />
            <TabTop.Screen name="cats" component={ChatListScreen2} /> 
        </TabTop.Navigator>

    )
}


function ProfileStackNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        </Stack.Navigator>
    )
}


export default function Navigation() {
    const user = useSelector((state: RootState) => state.user.loggedInUser)

    return (
        <NavigationContainer>
            {/* Move navigation related code to a seperate component that is used here */}
            {/* Determine if the user is logged in and display:
            A stack navigator (only) with signup and login
            Our "normal" app with tabs navigation */}
            {user !== null ? (
                // Show the app with all navigation
                <Tab.Navigator screenOptions={{ headerShown: false }}>
                    <Tab.Screen name="Home" component={HomeScreen} options={{}} />
                    <Tab.Screen name="Chat" component={ChatStackNavigator} />
                    <Tab.Screen name="Menu" component={ProfileStackNavigator} />
                </Tab.Navigator>
            ) : (
                // show a stack navigator with only signup and login screens.
                <Stack.Navigator>
                    <Stack.Screen name="Signup" component={SignupScreen} />
                    <Stack.Screen name="Login" component={LoginScreen} /> 
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    chatTab: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    }
    
})

// Old chatstack navigator for the screens we used in class.
// import Screen1 from './../screens/Screen1';
// function ChatStackNavigator() {
//     return (
//         <Stack.Navigator>
//             <Stack.Screen name="Screen1" component={Screen1} />
//             <Stack.Screen name="Screen2" component={Screen2} />
//             <Stack.Screen name="Screen3" component={Screen3} />
//         </Stack.Navigator>
//     );
// }