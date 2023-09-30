import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'

// images
import { destination, homeImage } from '../Images/Images'
import AsyncStorage from '@react-native-async-storage/async-storage'

const TripDetailsComponent = () => {

    const [tripData, setTripData] = useState('')

    useEffect(() => {
        const getData = async () => {
            const userData = await AsyncStorage.getItem('tripDetails')
            const data = JSON.parse(userData)
            setTripData(data)
        }
        getData()
    })

    return (
        <View style={{ flex: 1, marginTop: 15 }}>

            <ScrollView style={{ flex: 1 }}>

                <ImageBackground
                    imageStyle={{ borderBottomLeftRadius: 50, borderBottomRightRadius: 50 }}
                    source={homeImage}
                    style={Styles.imagesBackground}>

                    {/* trip name */}
                    <Text style={Styles.tripHeader}>{tripData.tripName}</Text>

                    {/* dates */}
                    <View style={Styles.datesContainer}>
                        <Text style={[Styles.tripHeader, { marginTop: 0 }]}>{tripData.startDate}</Text>
                        <Text style={Styles.tripHeader}>to</Text>
                        <Text style={Styles.tripHeader}>{tripData.endDate}</Text>
                    </View>

                    {/* destination */}
                    <View style={Styles.destinationContainer}>
                        <Image style={Styles.destinationImage} source={destination} />
                        <Text style={[Styles.tripHeader, { marginTop: 0 }]}> {tripData.destination}</Text>
                    </View>
                </ImageBackground>

            </ScrollView>
        </View >
    )
}

export default TripDetailsComponent

// styles
const Styles = StyleSheet.create({
    imagesBackground: { height: 400, width: '100%', alignSelf: 'center', alignItems: 'center' },
    createContainer: { height: 40, width: '50%', borderWidth: 2, borderColor: 'white', alignItems: 'center', justifyContent: 'center', borderRadius: 5 },
    createText: { color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 15 },
    tripHeader: { textTransform: 'capitalize', marginTop: 20, fontSize: 30, letterSpacing: 2, fontWeight: 'bold', color: 'white' },
    destinationContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 20 },
    datesContainer: { borderWidth: 1, borderRadius: 5, alignItems: 'center', justifyContent: 'center', padding: 10, marginTop: 20, backgroundColor: 'rgba(255, 255, 255, 0.3)' },
    destinationImage: { height: 30, width: 30 },
})