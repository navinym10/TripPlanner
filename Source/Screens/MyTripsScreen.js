import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'

// async storage
import AsyncStorage from '@react-native-async-storage/async-storage'

// colors
import { Colors } from '../Colors'

// images
import { addTrip, home } from '../Images/Images'

const MyTripsScreen = ({ route, navigation }) => {

    const [userData, setUserData] = useState(null)

    useEffect(() => { }, [])

    return (
        <View style={Styles.container}>
            <View style={Styles.headerContainer}>
                <Text style={Styles.headerText}>My Trips</Text>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('CreateTripScreen') }}
                    activeOpacity={0.5}
                    style={Styles.headerImage}>
                    <Image style={Styles.addImage} source={addTrip} />
                </TouchableOpacity>
            </View>

        </View >
    )
}

export default MyTripsScreen

// styles
const Styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.primaryColor },
    headerContainer: { height: 70, width: '100%', backgroundColor: Colors.bottomTabColor, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10 },
    headerText: { fontSize: 25, fontWeight: 'bold', color: "white", letterSpacing: 1 },
    headerImage: { height: 35, width: 35, alignItems: 'center', justifyContent: 'center', },
    addImage: { height: 30, width: 30 },
})