import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import LoginScreen from './Source/Screens/LoginScreen';
import RegisterScreen from './Source/Screens/RegisterScreen';
import HomeScreen from './Source/Screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ animation: 'slide_from_right' }} />
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ animation: 'slide_from_right' }} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ animation: 'slide_from_right' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}