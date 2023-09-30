import { View, Text, ActivityIndicator, StyleSheet, ImageBackground, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'

// async storage
import AsyncStorage from '@react-native-async-storage/async-storage'

// colors
import { Colors } from '../Colors'
import BottomTab from '../Components/BottomTab'
import { account, homeImage, trip } from '../Images/Images'
import TripDetailsComponent from '../Components/TripDetailsComponent'

const HomeScreen = ({ route, navigation }) => {

    const [userData, setUserData] = useState(null)
    const [tripAdded, setTripAdded] = useState(null)

    useEffect(() => {

        // const loadUserData = async () => {
        //     try {
        //         const storedDataJSON = await AsyncStorage.getItem(route.params.asyncKey);
        //         if (storedDataJSON) {
        //             const storedData = JSON.parse(storedDataJSON);
        //             setUserData(storedData);
        //         }
        //     } catch (error) {
        //         console.error('Error loading user data:', error);
        //     }
        // };
        // loadUserData();

        const tripData = async () => {
            const getTripData = await AsyncStorage.getItem('tripAdded')
            const data = JSON.parse(getTripData)
            console.log(data);
            setTripAdded(data)
        }
        tripData()
    }, [])

    const handleCreateTrip = () => { navigation.navigate('CreateTripScreen') }

    return (
        <View style={Styles.container}>

            {/* bottom tab */}
            {/* <BottomTab /> */}

            {/* header */}
            <View style={Styles.headerContainer}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => navigation.navigate('MyTripsScreen')}
                    style={Styles.imageContainer}>
                    <Image style={Styles.image} source={trip} />
                </TouchableOpacity>
                <Text style={Styles.header}>Trip Planner</Text>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => navigation.navigate('UserAccountScreen')}
                    style={Styles.imageContainer}>
                    <Image style={Styles.image} source={account} />
                </TouchableOpacity>
            </View>

            {/* image background */}
            {tripAdded ?
                <TripDetailsComponent />
                :
                <View style={{ alignItems: 'center', justifyContent: "center", marginTop: 10 }}>
                    <ImageBackground
                        imageStyle={{ borderRadius: 5 }}
                        source={homeImage}
                        style={Styles.imagesBackground}>
                        <TouchableOpacity
                            onPress={handleCreateTrip}
                            activeOpacity={0.5}
                            style={Styles.createContainer}>
                            <Text style={Styles.createText}>Create Trip</Text>
                        </TouchableOpacity>
                    </ImageBackground>
                    <Text style={Styles.slogan}>Discover, Explore, Unwind: Your Journey, Our Plan!</Text>
                </View>
            }


        </View>
    )
}

export default HomeScreen

// styles
const Styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.primaryColor },
    headerContainer: { backgroundColor: Colors.bottomTabColor, flexDirection: 'row', alignItems: "center", justifyContent: 'space-between', height: 60 },
    header: { textAlign: 'center', fontSize: 25, fontWeight: 'bold', color: "white", letterSpacing: 1, },
    imagesBackground: { height: 512, width: '100%', alignSelf: 'center', marginTop: 20, justifyContent: 'center', alignItems: 'center' },
    createContainer: { height: 40, width: '50%', borderWidth: 2, borderColor: 'white', alignItems: 'center', justifyContent: 'center', borderRadius: 5 },
    createText: { color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 15 },
    slogan: { color: 'white', fontSize: 16, fontWeight: '500', letterSpacing: 2, margin: 10, marginTop: 20, textAlign: 'center', marginBottom: 20 },
    imageContainer: { flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '20%' },
    image: { height: 24, width: 24 },
    text: { fontSize: 12, fontWeight: '500', lineHeight: 16, letterSpacing: 1, color: 'white', marginTop: 5 },
})