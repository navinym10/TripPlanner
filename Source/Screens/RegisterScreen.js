import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard, ToastAndroid } from 'react-native'
import React, { useState } from 'react'

// async storage
import AsyncStorage from '@react-native-async-storage/async-storage'

// firebase auth
import auth from '@react-native-firebase/auth';

// images
import { hide, leftArrowLight, lock, mail, user, view } from '../Images/Images'

// colors
import { Colors } from '../Colors';

const RegisterScreen = ({ navigation }) => {

    const [showPassword, setShowPassword] = useState(false)
    const [secureText, setSecureText] = useState(true)
    const [username, setUsername] = useState('')
    const [mailId, setMailId] = useState('')
    const [password, setPassword] = useState('')

    const [showPassword1, setShowPassword1] = useState(false)
    const [secureText1, setSecureText1] = useState(true)
    const handleShowPassword1 = () => {
        setShowPassword1(!showPassword1)
        setSecureText1(!secureText1)
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
        setSecureText(!secureText)
    }

    const handleBackNavigation = () => {
        navigation.goBack()
    }

    const handleUsername = (text) => { setUsername(text) }
    const handleMailId = (text) => { setMailId(text) }
    const handlePassword = (text) => { setPassword(text) }

    const handleRegister = async () => {

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/

        if (reg.test(mailId) && username != '' && password != '') {
            if (password.length <= 5) {
                ToastAndroid.show('Password should be greater than 6 characters', ToastAndroid.SHORT)
            } else {
                // async storage
                let userData = {
                    username: username,
                    mail: mailId,
                    password: password,
                }
                await AsyncStorage.setItem(mailId, JSON.stringify(userData))

                // const getData = await AsyncStorage.getItem("key1")
                // console.log(JSON.parse(getData));
                try {
                    await auth().createUserWithEmailAndPassword(mailId, password)
                    ToastAndroid.show('Account Created!', ToastAndroid.SHORT)
                    navigation.navigate('LoginScreen')
                } catch {
                    ToastAndroid.show('The email address is already in use.', ToastAndroid.SHORT)
                }
            }
        } else {
            console.log('Failed');
        }
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <View style={Styles.container}>

                    {/* header */}
                    <View style={Styles.headerContainer}>
                        <TouchableOpacity activeOpacity={0.5}
                            onPress={handleBackNavigation}
                            style={Styles.backButtonContainer}>
                            <Image style={Styles.backButton} source={leftArrowLight} />
                        </TouchableOpacity>
                        <Text style={Styles.registerText}>Register</Text>
                    </View>

                    {/* input fields */}
                    <View style={{ alignItems: "center", marginTop: 25 }}>

                        {/* enter username */}
                        <View style={Styles.textInputcontianer}>
                            <Image style={Styles.inputImage} source={user} />
                            <TextInput style={Styles.placeholder}
                                value={username}
                                onChangeText={handleUsername}
                                placeholder='Username'
                                placeholderTextColor={'grey'} />
                        </View>

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

                        {/* re-enter password */}
                        <View style={Styles.textInputcontianer}>
                            <Image style={Styles.inputImage} source={lock} />
                            <TextInput style={Styles.placeholder}
                                placeholder='Re-Enter Password'
                                placeholderTextColor={'grey'}
                                secureTextEntry={secureText1} />
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={handleShowPassword1}
                                style={Styles.securePassword}>
                                <Image style={Styles.passwordImage} source={showPassword1 ? hide : view} />
                            </TouchableOpacity>
                        </View>

                        {/* register button */}
                        <TouchableOpacity
                            onPress={handleRegister}
                            activeOpacity={0.5}
                            style={Styles.button}>
                            <Text style={Styles.buttonText}>Register</Text>
                        </TouchableOpacity>

                    </View>

                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

// styles
const Styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.primaryColor, },
    headerContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 25, justifyContent: 'space-around' },
    backButtonContainer: { height: 30, width: 30, alignItems: 'center', justifyContent: 'center', position: "absolute", left: 0, marginStart: 25 },
    backButton: { height: 20, width: 20 },
    registerText: { color: 'white', fontSize: 25, fontWeight: 'bold', letterSpacing: 2, },
    textInputcontianer: { flexDirection: 'row', height: 58, width: '90%', margin: 10, borderRadius: 5, alignItems: 'center', borderWidth: 1, borderColor: 'white' },
    placeholder: { color: 'white', fontSize: 15, fontWeight: '500', letterSpacing: 1, width: '70%', marginStart: 10 },
    securePassword: { height: 35, width: 35, alignItems: 'center', justifyContent: 'center', marginStart: 5 },
    inputImage: { height: 35, width: 35, marginStart: 10 },
    passwordImage: { height: 20, width: 20, },
    button: { height: 55, width: '50%', backgroundColor: Colors.buttonColor, borderRadius: 5, marginTop: 10, alignItems: 'center', justifyContent: 'center' },
    buttonText: { color: 'white', fontSize: 15, fontWeight: '500', letterSpacing: 1, textTransform: 'uppercase' },
})