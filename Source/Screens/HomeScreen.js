import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'

// async storage
import AsyncStorage from '@react-native-async-storage/async-storage'

const HomeScreen = ({ route }) => {

    const [userData, setUserData] = useState(null)

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const storedDataJSON = await AsyncStorage.getItem(route.params.asyncKey);
                if (storedDataJSON) {
                    const storedData = JSON.parse(storedDataJSON);
                    setUserData(storedData);
                }
            } catch (error) {
                console.error('Error loading user data:', error);
            }
        };
        loadUserData();
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            {userData ?
                <Text style={{ color: 'white' }}>{userData.username}</Text> :
                <ActivityIndicator size="small" color="#0000ff" />
            }
        </View>
    )
}

export default HomeScreen