import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'

// images
import { addTrip, cancel, destination, dropDown, edit, itinerary, leftArrowLight, complete } from '../Images/Images'

// colors
import { Colors } from '../Colors'
import AsyncStorage from '@react-native-async-storage/async-storage'

const PlansScreen = ({ navigation }) => {

    const [plansAdded, setPlansAdded] = useState(null)
    const [planData, setPlanData] = useState('')

    useEffect(() => {

        const plandata = async () => {
            const getPlanData = await AsyncStorage.getItem('planAdded')
            const data = JSON.parse(getPlanData)
            console.log('Plans:', data);
            setPlansAdded(data)
        }
        plandata()

        const plans = async () => {

            let tripDetails = JSON.parse(await AsyncStorage.getItem('tripDetails'))
            console.log(tripDetails[0].destination);

            const plannings = await AsyncStorage.getItem(tripDetails[0].destination)
            const data = JSON.parse(plannings)
            setPlanData(data)
        }
        plans()

    }, [])

    const handleBackNavigation = () => {
        navigation.navigate('HomeScreen')
    }

    const handleAddPlans = () => {
        navigation.navigate('AddPlansScreen')
    }

    const Render = ({ item }) => {

        const [expand, setExpand] = useState(false)
        const [planComplete, setPlanComplete] = useState(false)

        const handleExpand = () => {
            setExpand(!expand)
        }

        const handleEdit = () => {
            ToastAndroid.show('Modifying data can\'t be done in Async Storage!', ToastAndroid.SHORT)
        }

        const handleComplete = () => {
            setPlanComplete(true)
        }

        return (
            <View>

                <View style={Styles.flatlistContainer}>
                    <View style={Styles.containerLeft}>
                        <View style={Styles.leftLine} />
                        <Image style={Styles.leftImage} source={destination} />
                        <View style={Styles.leftLine} />
                    </View>

                    <View style={Styles.textField}>
                        <Text style={Styles.planName}>{item.planName}</Text>
                        {planComplete ?
                            <Text style={[Styles.placeName, { color: '#B0EF8F' }]}>Completed</Text>
                            :
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={Styles.placeName}>{item.place} -</Text>
                                <Text style={[Styles.placeName, { marginStart: 10 }]}>{item.date}</Text>
                            </View>
                        }
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={handleExpand}
                        style={Styles.containerRight}>
                        <Image style={Styles.leftImage} source={expand ? cancel : dropDown} />
                    </TouchableOpacity>
                </View>

                {expand &&
                    <View style={Styles.expandContainer}>

                        <View style={Styles.details}>
                            <Text style={[Styles.expandText, { color: Colors.buttonColor }]}>Details:</Text>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={handleEdit}
                                style={Styles.editContainer}>
                                <Image style={{ height: 28, width: 28 }} source={edit} />
                                <Text style={[Styles.expandText, { marginStart: 10, textAlign: "center", margin: 0, color: Colors.buttonColor }]}>Edit</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={Styles.expandText}>{`Name: ${item.planName}`}</Text>
                        <Text style={Styles.expandText}>{`Place: ${item.place}`}</Text>
                        <Text style={Styles.expandText}>{`Date: ${item.date}`}</Text>
                        <Text style={Styles.expandText}>Description:</Text >
                        <Text style={[Styles.expandText, { marginTop: 0, marginLeft: 50 }]}>{item.description}</Text >

                        <View style={Styles.completeContainer}>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={handleComplete}
                                style={Styles.editContainer}>
                                <Image style={{ height: 30, width: 30 }} source={complete} />
                                <Text style={[Styles.expandText, { marginStart: 10, textAlign: "center", margin: 0, color: '#B0EF8F' }]}>{planComplete ? 'Completed' : 'Complete'}</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                }

            </View>

        )
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
                <TouchableOpacity
                    onPress={() => { navigation.push('AddPlansScreen') }}
                    activeOpacity={0.5}
                    style={Styles.headerImage}>
                    <Image style={Styles.addImage} source={addTrip} />
                </TouchableOpacity>
            </View>

            {plansAdded ?

                <FlatList
                    data={planData}
                    renderItem={({ item }) => <Render item={item} />}
                />
                :
                <View style={Styles.noListContainer}>
                    <Image style={Styles.noListImage} source={itinerary} />
                    <Text style={Styles.noPlans}>No plans are added!</Text>
                    <TouchableOpacity
                        onPress={handleAddPlans}
                        activeOpacity={0.5}
                        style={Styles.button}>
                        <Text style={Styles.buttonText}>Add Plans</Text>
                    </TouchableOpacity>
                </View>

            }

        </View>
    )
}

export default PlansScreen

// styles
const Styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.primaryColor },
    headerContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 25, justifyContent: 'space-around', marginBottom: 20 },
    backButtonContainer: { height: 30, width: 30, alignItems: 'center', justifyContent: 'center', left: 0 },
    backButton: { height: 20, width: 20 },
    registerText: { color: 'white', fontSize: 25, fontWeight: 'bold', letterSpacing: 2, },
    button: { height: 55, width: '50%', backgroundColor: Colors.buttonColor, borderRadius: 5, marginTop: 50, alignItems: 'center', justifyContent: 'center' },
    buttonText: { color: 'white', fontSize: 15, fontWeight: '500', letterSpacing: 1, textTransform: 'uppercase' },
    flatlistContainer: { flexDirection: "row", height: 80, alignItems: "center", justifyContent: "space-between", padding: 10 },
    containerLeft: { flexDirection: "column", alignItems: 'center', justifyContent: 'center', height: '100%' },
    leftLine: { height: '30%', width: 2, backgroundColor: 'white' },
    leftImage: { height: 30, width: 30 },
    textField: { flexDirection: 'column', justifyContent: 'center', position: "absolute", marginLeft: '13%' },
    planName: { color: 'white', fontSize: 20, fontWeight: "bold", letterSpacing: 2 },
    placeName: { color: 'white', fontSize: 15, fontWeight: '500', letterSpacing: 2 },
    containerRight: { height: 35, width: 35, alignItems: "center", justifyContent: 'center', },
    noListContainer: { flex: 3 / 4, alignItems: "center", justifyContent: 'center' },
    noListImage: { height: 256, width: 256 },
    noPlans: { color: 'white', fontSize: 20, fontWeight: 'bold', letterSpacing: 2, marginTop: 20 },
    headerImage: { height: 35, width: 35, alignItems: 'center', justifyContent: 'center', },
    addImage: { height: 30, width: 30 },
    expandText: { color: 'white', letterSpacing: 1, margin: 10, fontWeight: '500' },
    expandContainer: { height: 'auto', borderRadius: 5, borderWidth: 2, margin: 15, borderColor: "white" },
    editContainer: { height: 35, width: 'auto', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginEnd: 10 },
    details: { flexDirection: 'row', alignItems: "center", justifyContent: "space-between" },
    completeContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: "center", margin: 10, borderWidth: 1, padding: 5, borderColor: "#B0EF8F" },
})