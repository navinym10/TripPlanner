import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, ToastAndroid } from 'react-native'
import React, { useState } from 'react'

// colors
import { Colors } from '../Colors'

// images
import { day, description, destination, leftArrowLight, trip } from '../Images/Images'

// date picker
import DatePicker from 'react-native-date-picker'

// async storage
import AsyncStorage from '@react-native-async-storage/async-storage'

const AddPlansScreen = ({ navigation }) => {

    const [planName, setPlanName] = useState('')
    const [place, setPlace] = useState('')
    const [desc, setDesc] = useState('')

    const [dateTime, setDateTime] = useState(new Date())
    const [openDateTime, setOpenDateTime] = useState(false)
    const [dateTimePicked, setDateTimePicked] = useState(false)


    const handleBackNavigation = () => {
        navigation.goBack()
    }

    const handlePlanName = (text) => { setPlanName(text) }
    const handlePlace = (text) => { setPlace(text) }
    const handleDescription = (text) => { setDesc(text) }

    const dateFormatter = (date) => {
        const inputDateString = date;
        const dateObject = new Date(inputDateString);
        const day = dateObject.getUTCDate().toString().padStart(2, '0');
        const month = (dateObject.getUTCMonth() + 1).toString().padStart(2, '0');
        const year = dateObject.getUTCFullYear();
        const formattedDateString = `${day}.${month}.${year}`;
        return formattedDateString
    }

    const handleDateTime = (date) => {
        setOpenDateTime(!openDateTime)
        setDateTime(date)
        // console.log(dateFormatter(dateTime))
        setDateTimePicked(true)
    }

    handleAddPlans = async () => {
        console.log(`Name: ${planName}, Place: ${place}, Time: ${dateFormatter(dateTime)}, Desc: ${desc}`)

        if (planName != '' & place != '') {


            let tripDetails = JSON.parse(await AsyncStorage.getItem('tripDetails'))
            console.log(tripDetails[0].destination);

            const plans = await AsyncStorage.getItem(tripDetails[0].destination)
            let existingPlans = plans ? JSON.parse(plans) : []

            let planDetails = {
                planName: planName,
                place: place,
                date: dateFormatter(dateTime),
                description: desc,
            }

            existingPlans.push(planDetails)
            console.log(existingPlans);


            await AsyncStorage.setItem('planAdded', 'true')
            await AsyncStorage.setItem(tripDetails[0].destination, JSON.stringify(existingPlans))

            navigation.push('PlansScreen')

        } else {
            ToastAndroid.show("Please add Plan name & Place", ToastAndroid.SHORT)
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
                <Text style={Styles.registerText}>Itinerary Plans</Text>
            </View>

            <View style={{ alignItems: "center", marginTop: 25 }}>

                {/* enter trip name */}
                <Text style={Styles.inputLabel}>Plan Name</Text>
                <View style={Styles.textInputcontianer}>
                    <Image style={Styles.inputImage} source={trip} />
                    <TextInput style={Styles.placeholder}
                        value={planName}
                        maxLength={15}
                        onChangeText={handlePlanName}
                        placeholder='Plan Name (max 15 char.)'
                        placeholderTextColor={'grey'} />
                </View>

                <Text style={Styles.inputLabel}>Place</Text>
                <View style={Styles.textInputcontianer}>
                    <Image style={Styles.inputImage} source={destination} />
                    <TextInput style={Styles.placeholder}
                        value={place}
                        onChangeText={handlePlace}
                        maxLength={15}
                        placeholder='Place (max 15 char.)'
                        placeholderTextColor={'grey'} />
                </View>

                <Text style={Styles.inputLabel}>Date & Time</Text>
                <View style={Styles.textInputcontianer}>
                    <TouchableOpacity
                        onPress={() => { setOpenDateTime(true) }}
                        activeOpacity={0.5}>
                        <Image style={Styles.inputImage} source={day} />
                    </TouchableOpacity>
                    <DatePicker
                        modal
                        mode='date'
                        open={openDateTime}
                        date={dateTime}
                        onConfirm={handleDateTime}
                        onCancel={() => {
                            setOpenDateTime(!openDateTime)
                        }} />
                    <Text style={Styles.placeholder}>{dateTimePicked ? dateFormatter(dateTime) : 'Date & Time'}</Text>

                </View>

                <Text style={Styles.inputLabel}>Description</Text>
                <View style={Styles.textInputcontianer}>
                    <Image style={Styles.inputImage} source={description} />
                    <TextInput style={Styles.placeholder}
                        value={desc}
                        onChangeText={handleDescription}
                        placeholder='Description (optional)'
                        placeholderTextColor={'grey'} />
                </View>

                <TouchableOpacity
                    onPress={handleAddPlans}
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