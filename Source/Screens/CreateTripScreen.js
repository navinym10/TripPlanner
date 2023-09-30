import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, } from 'react-native'
import React, { useState } from 'react'

// colors
import { Colors } from '../Colors'

// images
import { day, destination, leftArrowLight, trip } from '../Images/Images'

// date picker
import DatePicker from 'react-native-date-picker'
import AsyncStorage from '@react-native-async-storage/async-storage'

const CreateTripScreen = ({ navigation }) => {

    const [tripName, setTripName] = useState('')
    const [place, setPlace] = useState('')

    const [startDate, setStartDate] = useState(new Date())
    const [openStartDate, setOpenStartDate] = useState(false)
    const [startDatePicked, setStartDatePicked] = useState(false)

    const [endDate, setEndDate] = useState(new Date())
    const [openEndDate, setOpenEndDate] = useState(false)
    const [endDatePicked, setEndDatePicked] = useState(false)

    const handleBackNavigation = () => {
        navigation.goBack()
    }

    const dateFormatter = (date) => {
        const inputDateString = date;
        const dateObject = new Date(inputDateString);
        const day = dateObject.getUTCDate().toString().padStart(2, '0');
        const month = (dateObject.getUTCMonth() + 1).toString().padStart(2, '0');
        const year = dateObject.getUTCFullYear();
        const formattedDateString = `${day}.${month}.${year}`;
        return formattedDateString
    }

    handleTripName = (text) => { setTripName(text) }
    handleDestination = (text) => { setPlace(text) }

    const handleStartDate = (date) => {
        setOpenStartDate(!openStartDate)
        setStartDate(date)
        // console.log(dateFormatter(startDate))
        setStartDatePicked(true)
    }

    const handleEndDate = (date) => {
        setOpenEndDate(!openEndDate)
        setEndDate(date)
        // console.log(dateFormatter(endDate))
        setEndDatePicked(true)
    }

    const handleContinue = async () => {
        console.log(`tripName: ${tripName}, destination: ${place}, startDate: ${dateFormatter(startDate)}, endDate: ${dateFormatter(endDate)}`)

        if (tripName != '' && place != '') {

            let tripDetails = {
                tripName: tripName,
                destination: place,
                startDate: dateFormatter(startDate),
                endDate: dateFormatter(endDate),
            }

            await AsyncStorage.setItem('tripAdded', 'true')
            await AsyncStorage.setItem('tripDetails', JSON.stringify(tripDetails))

            // let getData = await AsyncStorage.getItem('tripDetails')
            // console.log(JSON.parse(getData))

            navigation.push('HomeScreen')

        }
        else {
            console.log("Failed");
        }
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
                <Text style={Styles.registerText}>Create Trip</Text>
            </View>

            <View style={{ alignItems: "center", marginTop: 25 }}>

                {/* enter trip name */}
                <Text style={Styles.inputLabel}>Trip Name</Text>
                <View style={Styles.textInputcontianer}>
                    <Image style={Styles.inputImage} source={trip} />
                    <TextInput style={Styles.placeholder}
                        value={tripName}
                        onChangeText={handleTripName}
                        placeholder='Trip Name'
                        placeholderTextColor={'grey'} />
                </View>

                {/* enter dates */}
                <View style={{ flexDirection: 'row', }}>
                    {/* start date */}
                    <View style={Styles.dateContainer}>
                        <Text style={Styles.inputLabel}>Start Date</Text>
                        <View style={[Styles.textInputcontianer, { width: '80%', }]}>
                            <TouchableOpacity
                                onPress={() => setOpenStartDate(true)}
                                activeOpacity={0.5}>
                                <Image style={Styles.inputImage} source={day} />
                            </TouchableOpacity>
                            <DatePicker
                                modal
                                mode='date'
                                open={openStartDate}
                                date={startDate}
                                onConfirm={handleStartDate}
                                onCancel={() => {
                                    setOpenStartDate(!openStartDate)
                                }} />
                            <Text style={Styles.placeholder}>{startDatePicked ? dateFormatter(startDate) : 'Start Date'}</Text>
                        </View>
                    </View>

                    {/* end date */}
                    <View style={Styles.dateContainer}>
                        <Text style={Styles.inputLabel}>End Date</Text>
                        <View style={[Styles.textInputcontianer, { width: '80%' }]}>
                            <TouchableOpacity
                                onPress={() => setOpenEndDate(true)}
                                activeOpacity={0.5}>
                                <Image style={Styles.inputImage} source={day} />
                            </TouchableOpacity>
                            <DatePicker
                                modal
                                mode='date'
                                open={openEndDate}
                                date={endDate}
                                onConfirm={handleEndDate}
                                onCancel={() => {
                                    setOpenEndDate(!openEndDate)
                                }} />
                            <Text style={Styles.placeholder}>{endDatePicked ? dateFormatter(endDate) : 'End Date'}</Text>
                        </View>
                    </View>

                </View>

                {/* enter destination */}
                <Text style={Styles.inputLabel}>Destination</Text>
                <View style={Styles.textInputcontianer}>
                    <Image style={Styles.inputImage} source={destination} />
                    <TextInput style={Styles.placeholder}
                        value={place}
                        onChangeText={handleDestination}
                        placeholder='Destination'
                        placeholderTextColor={'grey'} />
                </View>

                <TouchableOpacity
                    onPress={handleContinue}
                    activeOpacity={0.5}
                    style={Styles.button}>
                    <Text style={Styles.buttonText}>Continue</Text>
                </TouchableOpacity>

            </View>

        </View>
    )
}

export default CreateTripScreen

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
    dateContainer: { flexDirection: "column", width: '50%', alignItems: 'center' },
    button: { height: 55, width: '50%', backgroundColor: Colors.buttonColor, borderRadius: 5, marginTop: 10, alignItems: 'center', justifyContent: 'center' },
    buttonText: { color: 'white', fontSize: 15, fontWeight: '500', letterSpacing: 1, textTransform: 'uppercase' },
})