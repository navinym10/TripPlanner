import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard, ToastAndroid, BackHandler, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'

// firebase auth
import auth from '@react-native-firebase/auth';

// async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// images
import { hide, lock, mail, travel, view } from '../Images/Images'

// colors
import { Colors } from '../Colors';

const LoginScreen = ({ navigation }) => {

    const [showPassword, setShowPassword] = useState(false)
    const [secureText, setSecureText] = useState(true)
    const [mailId, setMailId] = useState('')
    const [password, setPassword] = useState('')

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
        setSecureText(!secureText)
    }

    useEffect(() => {
        const backAction = () => {
            Alert.alert('Hold on!', 'Are you sure you want to exit the App?', [
                {
                    text: 'Cancel',
                    onPress: () => null,
                    style: 'cancel',
                },
                { text: 'YES', onPress: () => BackHandler.exitApp() },
            ]);
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );
        return () => backHandler.remove();
    }, [])

    const handleMailId = (text) => { setMailId(text) }
    const handlePassword = (text) => { setPassword(text) }

    const handleRegister = () => {
        navigation.navigate('RegisterScreen')
    }

    const handleLogin = async () => {

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/

        if (reg.test(mailId) && password != '') {

            try {
                await auth().signInWithEmailAndPassword(mailId, password)
                console.log("Success")
                navigation.navigate('HomeScreen', { asyncKey: mailId })
                await AsyncStorage.setItem('isLoggedIn', 'true')
            } catch {
                ToastAndroid.show("Invalid Credentials!", ToastAndroid.SHORT)
            }
        } else {
            ToastAndroid.show("Invalid Credentials!", ToastAndroid.SHORT)
        }
    }

    return (

        <KeyboardAvoidingView style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <View style={Styles.container}>

                    <Image style={Styles.logo} source={travel} />
                    <Text style={Styles.name}>Trip Planner</Text>
                    <Text style={Styles.slogan}>Discover, Explore, Unwind: Your Journey, Our Plan!</Text>

                    {/* enter mail */}
                    <View style={Styles.textInputcontianer}>
                        <Image style={Styles.inputImage} source={mail} />
                        <TextInput style={Styles.placeholder}
                            value={mailId}
                            onChangeText={handleMailId}
                            placeholder='Mail ID'
                            placeholderTextColor={'grey'} />
                    </View>

                    {/* enter password */}
                    <View style={Styles.textInputcontianer}>
                        <Image style={Styles.inputImage} source={lock} />
                        <TextInput style={Styles.placeholder}
                            value={password}
                            onChangeText={handlePassword}
                            placeholder='Password'
                            placeholderTextColor={'grey'}
                            secureTextEntry={secureText} />
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={handleShowPassword}
                            style={Styles.securePassword}>
                            <Image style={Styles.passwordImage} source={showPassword ? hide : view} />
                        </TouchableOpacity>
                    </View>

                    {/* login button */}
                    <TouchableOpacity
                        onPress={handleLogin}
                        activeOpacity={0.5}
                        style={Styles.button}>
                        <Text style={Styles.buttonText}>Login</Text>
                    </TouchableOpacity>

                    {/* register */}
                    <View style={Styles.registerContainer}>
                        <Text style={Styles.registerText}>Don't have an account?</Text>
                        <TouchableOpacity
                            onPress={handleRegister}
                            activeOpacity={0.5}>
                            <Text style={[Styles.registerText, { color: '#1573FE', marginStart: 10 }]}>Register</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

// styles
const Styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.primaryColor },
    logo: { height: 256, width: 256 },
    name: { color: 'white', fontSize: 30, fontWeight: 'bold', letterSpacing: 2, marginTop: 20 },
    slogan: { color: 'white', fontSize: 16, fontWeight: '500', letterSpacing: 2, margin: 10, marginTop: 20, textAlign: 'center', marginBottom: 20 },
    textInputcontianer: { flexDirection: 'row', height: 58, width: '90%', margin: 10, borderRadius: 5, alignItems: 'center', borderWidth: 1, borderColor: 'white' },
    placeholder: { color: 'white', fontSize: 15, fontWeight: '500', letterSpacing: 1, width: '70%', marginStart: 10 },
    inputImage: { height: 35, width: 35, marginStart: 10 },
    securePassword: { height: 35, width: 35, alignItems: 'center', justifyContent: 'center', marginStart: 5 },
    passwordImage: { height: 20, width: 20, },
    button: { height: 55, width: '50%', backgroundColor: '#1573FE', borderRadius: 5, marginTop: 10, alignItems: 'center', justifyContent: 'center' },
    buttonText: { color: 'white', fontSize: 15, fontWeight: '500', letterSpacing: 1, textTransform: 'uppercase' },
    registerContainer: { flexDirection: 'row', margin: 10, marginTop: 20 },
    registerText: { color: 'white', fontSize: 15, letterSpacing: 1 },
})