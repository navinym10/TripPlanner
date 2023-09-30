import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

//navigation
import { useNavigation } from '@react-navigation/native';

// images
import { account, home, leftArrowLight, trip } from '../Images/Images';

// colors
import { Colors } from '../Colors';

const BottomTab = () => {

    //navigationMethod
    const navigation = useNavigation()

    return (
        <View style={Styles.mainContainer}>
            <View style={Styles.container} >
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => navigation.navigate('HomeScreen')}
                    style={Styles.imageContainer}>
                    <Image style={Styles.image} source={home} />
                    <Text style={Styles.text}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => navigation.navigate('MyTripsScreen')}
                    style={Styles.imageContainer}>
                    <Image style={Styles.image} source={trip} />
                    <Text style={Styles.text}>My Trips</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => navigation.navigate('UserAccountScreen')}
                    style={Styles.imageContainer}>
                    <Image style={Styles.image} source={account} />
                    <Text style={Styles.text}>Account</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default BottomTab

// styles
const Styles = StyleSheet.create({
    mainContainer: { height: '100%', justifyContent: 'flex-end', position: 'absolute', width: '100%', },
    container: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: Colors.bottomTabColor, height: 70, borderWidth: 0.4, borderColor: 'grey', },
    imageContainer: { flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '20%' },
    image: { height: 24, width: 24 },
    text: { fontSize: 12, fontWeight: '500', lineHeight: 16, letterSpacing: 1, color: 'white', marginTop: 5 },
})