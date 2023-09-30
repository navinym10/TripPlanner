import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

// images
import { destination, dropDown, itinerary, leftArrowLight } from '../Images/Images'

// colors
import { Colors } from '../Colors'

const PlansScreen = ({ navigation }) => {

    const handleBackNavigation = () => {
        navigation.goBack()
    }

    const handleAddPlans = () => {
        navigation.navigate('AddPlansScreen')
    }

    return (
        <View style={Styles.container}>

            {/* header */}
            <View style={Styles.headerContainer}>
                <TouchableOpacity activeOpacity={0.5}
                    onPress={handleBackNavigation}
                    style={Styles.backButtonContainer}>
                    <Image style={Styles.backButton} source={leftArrowLight} />
                </TouchableOpacity>
                <Text style={Styles.registerText}>Itinerary Plans</Text>
            </View>

            <View style={{ flex: 3 / 4, alignItems: "center", justifyContent: 'center' }}>
                <Image style={{ height: 256, width: 256 }} source={itinerary} />
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', letterSpacing: 2, marginTop: 20 }}>No plans are added!</Text>
                <TouchableOpacity
                    onPress={handleAddPlans}
                    activeOpacity={0.5}
                    style={Styles.button}>
                    <Text style={Styles.buttonText}>Add Plans</Text>
                </TouchableOpacity>
            </View>

            {/* <View style={{ flexDirection: "row", height: 80, marginTop: 20, alignItems: "center", justifyContent: "space-between", padding: 10 }}>
                <View style={{ flexDirection: "column", alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <View style={{ height: '30%', width: 2, backgroundColor: 'white' }} />
                    <Image style={{ height: 30, width: 30 }} source={destination} />
                    <View style={{ height: '50%', width: 2, backgroundColor: 'white' }} />
                </View>

                <View style={{ flexDirection: 'column', justifyContent: 'center', left: -25 }}>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: "bold", letterSpacing: 2 }}>Theme Park</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: 'white', fontSize: 15, fontWeight: '500', letterSpacing: 2 }}>Chennai</Text>
                        <Text style={{ color: 'white', fontSize: 15, fontWeight: '500', letterSpacing: 2, marginStart: 10 }}>1 October 1PM</Text>
                    </View>
                </View>

                <TouchableOpacity style={{ height: 35, width: 35, alignItems: "center", justifyContent: 'center', }}>
                    <Image style={{ height: 30, width: 30 }} source={dropDown} />
                </TouchableOpacity>

            </View> */}

        </View>
    )
}

export default PlansScreen

// styles
const Styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.primaryColor },
    headerContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 25, justifyContent: 'space-around', marginBottom: 20 },
    backButtonContainer: { height: 30, width: 30, alignItems: 'center', justifyContent: 'center', position: "absolute", left: 0, marginStart: 25 },
    backButton: { height: 20, width: 20 },
    registerText: { color: 'white', fontSize: 25, fontWeight: 'bold', letterSpacing: 2, },
    button: { height: 55, width: '50%', backgroundColor: Colors.buttonColor, borderRadius: 5, marginTop: 50, alignItems: 'center', justifyContent: 'center' },
    buttonText: { color: 'white', fontSize: 15, fontWeight: '500', letterSpacing: 1, textTransform: 'uppercase' },

})