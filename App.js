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

// colors
import { Colors } from './Source/Colors';
import { Image } from 'react-native';
import { home } from './Source/Images/Images';
import CreateTripScreen from './Source/Screens/CreateTripScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ animation: 'slide_from_right' }} />
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ animation: 'slide_from_right' }} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ animation: 'slide_from_right' }} />
                <Stack.Screen name="MyTripsScreen" component={MyTripsScreen} options={{ animation: 'slide_from_right' }} />
                <Stack.Screen name="UserAccountScreen" component={UserAccountScreen} options={{ animation: 'slide_from_right' }} />
                <Stack.Screen name="CreateTripScreen" component={CreateTripScreen} options={{ animation: 'slide_from_right' }} />
            </Stack.Navigator>

            {/* <Tab.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName="HomeScreen">
                <Tab.Screen name="HomeScreen" component={HomeScreen}
                    options={{
                        tabBarLabel: 'Profile',
                        tabBarIcon: () => (
                            <Image source={home} style={{ height: 25, width: 25 }} />
                        )
                    }} />
                <Tab.Screen name="MyTripsScreen" component={MyTripsScreen} />
                <Tab.Screen name="UserAccountScreen" component={UserAccountScreen} />
            </Tab.Navigator> */}

        </NavigationContainer>
    );
}