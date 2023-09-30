import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// screens
import LoginScreen from './Source/Screens/LoginScreen';
import RegisterScreen from './Source/Screens/RegisterScreen';
import HomeScreen from './Source/Screens/HomeScreen';
import MyTripsScreen from './Source/Screens/MyTripsScreen';
import UserAccountScreen from './Source/Screens/UserAccountScreen';
import CreateTripScreen from './Source/Screens/CreateTripScreen';
import PlansScreen from './Source/Screens/PlansScreen';
import AddPlansScreen from './Source/Screens/AddPlansScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ animation: 'slide_from_right' }} />
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ animation: 'slide_from_right' }} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ animation: 'slide_from_right' }} />
                <Stack.Screen name="MyTripsScreen" component={MyTripsScreen} options={{ animation: 'slide_from_left' }} />
                <Stack.Screen name="UserAccountScreen" component={UserAccountScreen} options={{ animation: 'slide_from_right' }} />
                <Stack.Screen name="CreateTripScreen" component={CreateTripScreen} options={{ animation: 'slide_from_right' }} />
                <Stack.Screen name="PlansScreen" component={PlansScreen} options={{ animation: 'slide_from_right' }} />
                <Stack.Screen name="AddPlansScreen" component={AddPlansScreen} options={{ animation: 'slide_from_right' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}