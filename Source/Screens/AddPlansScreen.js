import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import React from 'react'

// colors
import { Colors } from '../Colors'

// images
import { day, destination, leftArrowLight, trip } from '../Images/Images'

const AddPlansScreen = ({ navigation }) => {

    const handleBackNavigation = () => {
        navigation.goBack()
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

            <View style={{ alignItems: "center", marginTop: 25 }}>

                {/* enter trip name */}
                <Text style={Styles.inputLabel}>Plan Name</Text>
                <View style={Styles.textInputcontianer}>
                    <Image style={Styles.inputImage} source={trip} />
                    <TextInput style={Styles.placeholder}
                        // value={tripName}
                        // onChangeText={handleTripName}
                        placeholder='Plan Name'
                        placeholderTextColor={'grey'} />
                </View>

                <Text style={Styles.inputLabel}>Place</Text>
                <View style={Styles.textInputcontianer}>
                    <Image style={Styles.inputImage} source={destination} />
                    <TextInput style={Styles.placeholder}
                        // value={tripName}
                        // onChangeText={handleTripName}
                        placeholder='Place'
                        placeholderTextColor={'grey'} />
                </View>

                <Text style={Styles.inputLabel}>Date & Time</Text>
                <View style={Styles.textInputcontianer}>
                    <Image style={Styles.inputImage} source={day} />
                    <TextInput style={Styles.placeholder}
                        // value={tripName}
                        // onChangeText={handleTripName}
                        placeholder='Date & Time'
                        placeholderTextColor={'grey'} />
                </View>

                <Text style={Styles.inputLabel}>Description</Text>
                <View style={Styles.textInputcontianer}>
                    <Image style={Styles.inputImage} source={trip} />
                    <TextInput style={Styles.placeholder}
                        // value={tripName}
                        // onChangeText={handleTripName}
                        placeholder='Description'
                        placeholderTextColor={'grey'} />
                </View>

                <TouchableOpacity
                    // onPress={handleAddPlans}
                    activeOpacity={0.5}
                    style={Styles.button}>
                    <Text style={Styles.buttonText}>Add</Text>
                </TouchableOpacity>

            </View>

        </View>
    )
}

export default AddPlansScreen

// styles
const Styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.primaryColor },
    headerContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 25, justifyContent: 'space-around' },
    backButtonContainer: { height: 30, width: 30, alignItems: 'center', justifyContent: 'center', position: "absolute", left: 0, marginStart: 25 },
    backButton: { height: 20, width: 20 },
    registerText: { color: 'white', fontSize: 25, fontWeight: 'bold', letterSpacing: 2, },
    textInputcontianer: { flexDirection: 'row', height: 58, width: '90%', margin: 10, borderRadius: 5, alignItems: 'center', borderWidth: 1, borderColor: 'white' },
    placeholder: { color: 'white', fontSize: 15, fontWeight: '500', letterSpacing: 1, width: '70%', marginStart: 10 },
    inputImage: { height: 30, width: 30, marginStart: 10 },
    inputLabel: { color: 'white', marginStart: 20, alignSelf: 'flex-start', letterSpacing: 1, fontWeight: '500', marginTop: 10 },
    button: { height: 55, width: '50%', backgroundColor: Colors.buttonColor, borderRadius: 5, marginTop: 10, alignItems: 'center', justifyContent: 'center' },
    buttonText: { color: 'white', fontSize: 15, fontWeight: '500', letterSpacing: 1, textTransform: 'uppercase' },

})