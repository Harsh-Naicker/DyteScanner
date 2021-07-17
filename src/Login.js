import React, {useState} from 'react'
import { View, Text, StyleSheet, Image, TextInput, Button, Keyboard, SafeAreaView, ScrollView } from 'react-native'
import auth from '@react-native-firebase/auth'
import {useSelector, useDispatch} from 'react-redux'
import {setUser} from '../store/action'

const Login = ({navigation}) => {
    const [phoneFocus, setPhoneFocus]=useState(false)
    const [phone, setPhone]=useState(null)
    const [confirm, setConfirm]=useState(null)
    const [code, setCode]=useState(null)

    const userstore = useSelector(state => state);
    const dispatch = useDispatch();

    const signIn = async () => {
        try{
            let str1='+91'
            const confirmation = await auth().signInWithPhoneNumber(str1.concat(phone))
            setConfirm(confirmation)
            console.log(confirm)
            setPhone(null)
        } catch(e) {
            alert(JSON.stringify(e))
        }
    }
    const confirmCode = async () => {
        try{
            // let code = (((((one*10)+two)*10+three)*10+four)*10+five)*10+six
            setConfirm(null)
            const response = await confirm.confirm(code)
            if(response){
                dispatch(setUser(auth().currentUser))
                if(auth().currentUser.displayName === null){
                    navigation.navigate('Registration')
                }
                else{
                    navigation.navigate('TabStack', {screen: 'HOME'})
                }
                
                console.log(auth().currentUser)
            }
        } catch (e) {
            alert(JSON.stringify(e))
        }
        
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerHalf}>
                <Image source={require('../assets/Dyte-Logo.png')} style={styles.logo}/>
            </View>
            <View>
                {confirm? (
                    <>
                        <View style={styles.otpform}>
                            
                            <TextInput 
                                onChangeText={d => setCode(d)}
                                value={code}
                                style={styles.textinput}
                                placeholder='* * * * * *'
                            />
                            
                        </View>
                        <View style={{width: '90%', alignSelf: 'center'}}>
                            <Button mode="contained" onPress={confirmCode} title='CONFIRM OTP' color="#335ff4" />
                        </View>
                        
                    </>
                ):(
                    <>
                        <View style={styles.loginform}>
                            <Text style={{color: 'grey',padding: 5}}>{phoneFocus? 'PHONE':''}</Text>
                            <View style={styles.loginFill}>
                                <View style={styles.rectangle}>
                                    <Text style={styles.rectangleText}>+91</Text>
                                </View>
                                <TextInput 
                                    onChangeText={phone => setPhone(phone)}
                                    style={phoneFocus? styles.focussedTextInput:styles.textinput}
                                    value={phone}
                                    placeholder={phoneFocus? '':'9999999999'}
                                    autoCapitalize="none"
                                    placeholderTextColor="grey"
                                    onFocus={()=> setPhoneFocus(true)}
                                    onBlur={()=>setPhoneFocus(false)}
                                    selectionColor='grey'
                                    onSubmitEditing={Keyboard.dismiss}
                                />

                            </View>
                            
                            
                        </View>
                        <View style={{width: '90%', alignSelf: 'center'}}>
                            <Button mode="contained" onPress={signIn} title='SEND OTP' color="#335ff4"/>
                        </View>
                        
                    </>
                )}
                
            </View>
            
        </SafeAreaView>
    )
}

export default Login

const styles=StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'black',
        // alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        height: 40, 
        width: 120,
    },
    screenHeader: {
        
        fontSize: 25,
        fontWeight: '900',
        color: 'white'
    },
    headerHalf: {
        position: 'absolute',
        top: 0, 
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop:10,
        paddingLeft:10,
        paddingRight:10,
        width: '100%'
    },
    loginform: {
        alignSelf: 'center',
        width: '90%',
    },
    otpform:{
        alignSelf: 'center',
        // justifyContent: 'space-between',
        width: '30%',
    },
    textinput: {
        marginBottom: 30, 
        color: 'grey',
        fontSize: 25, 
        padding: 5,
        // paddingBottom: 20,
        borderBottomWidth: 1.2, 
        borderColor: 'grey',
        height: 40,
        width: '90%'

    },
    focussedTextInput: {
        marginBottom: 20, 
        color: 'grey',
        fontSize: 25, 
        padding: 3, 
        borderBottomWidth: 1.2,
        borderColor: 'grey',
        width: '90%'
    },
    rectangle: {
        width: 45,
        height: 38,
        backgroundColor: "#335ff4",
        borderTopLeftRadius: 2,
        borderBottomLeftRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        // margin: 3
    },
    rectangleText: {
        color: 'white',
        fontSize: 22
    },
    loginFill: {
        flexDirection: 'row',
    }
})
