import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// screens
import LoginScreen from './Source/Screens/LoginScreen';
import RegisterScreen from './Source/Screens/RegisterScreen';
import HomeScreen from './Source/Screens/HomeScreen';
import CreateTripScreen from './Source/Screens/CreateTripScreen';
import PlansScreen from './Source/Screens/PlansScreen';
import AddPlansScreen from './Source/Screens/AddPlansScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {

    const [login, setLogin] = React.useState(null)

    React.useEffect(() => {
        const isLoggedIn = async () => {
            let data = await AsyncStorage.getItem('isLoggedIn')
            console.log(data);
            setLogin(data)
        }
        isLoggedIn()
    })

    const checkLogin = () => {
        return login ? 'HomeScreen' : 'LoginScreen'
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={checkLogin()} screenOptions={{ headerShown: false }}>
                <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ animation: 'slide_from_right' }} />
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ animation: 'slide_from_right' }} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ animation: 'slide_from_right' }} />
                <Stack.Screen name="CreateTripScreen" component={CreateTripScreen} options={{ animation: 'slide_from_right' }} />
                <Stack.Screen name="PlansScreen" component={PlansScreen} options={{ animation: 'slide_from_right' }} />
                <Stack.Screen name="AddPlansScreen" component={AddPlansScreen} options={{ animation: 'slide_from_right' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}