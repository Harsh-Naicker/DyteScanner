import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, Image, TextInput, Button, Keyboard, SafeAreaView, ScrollView} from 'react-native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import {useSelector, useDispatch} from 'react-redux'
import {setUser} from '../store/action'

const Registration = ({navigation}) => {
    const [email, setEmail]=useState(null)
    const [emailFocus, setEmailFocus]=useState(false)
    const [name, setName]=useState(null)
    const [nameFocus, setNameFocus]=useState(false)

    const userstore = useSelector(state => state);
    const dispatch = useDispatch();

    const register = async () => {
        try{
            const update = {
                displayName: name,
                email: email,
            };
                  
            await auth().currentUser.updateProfile(update);
            const user=auth().currentUser
    
            dispatch(setUser(user))
            navigation.replace('TabStack', {screen: 'HOME'})
        } catch(e) {
            alert(JSON.stringify(e))
        }
    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerHalf}>
                <Image source={require('../assets/Dyte-Logo.png')} style={styles.logo}/>
            </View>
            <View style={styles.loginform}>
                <Text style={{color: 'grey',paddingBottom:2}}>{emailFocus? 'Email':''}</Text>
                <TextInput 
                    onChangeText={email => setEmail(email)}
                    style={emailFocus? styles.focussedTextInput:styles.textinput}
                    value={email}
                    placeholder={emailFocus? '':'Email'}
                    autoCapitalize="none"
                    placeholderTextColor="grey"
                    onFocus={()=> setEmailFocus(true)}
                    onBlur={()=>setEmailFocus(false)}
                    selectionColor='grey'
                />
                <Text style={{color: 'grey',paddingBottom:2}}>{nameFocus? 'Name':''}</Text>
                <TextInput 
                    onChangeText={name => setName(name)}
                    style={nameFocus? styles.focussedTextInput:styles.textinput}
                    value={name}
                    placeholder={nameFocus? '':'Name'}
                    autoCapitalize="none"
                    placeholderTextColor="grey"
                    onFocus={()=> setNameFocus(true)}
                    onBlur={()=>setNameFocus(false)}
                    selectionColor='grey'
                />
                <Button mode="contained" onPress={register} title='REGISTER DETAILS' color="#335ff4" />


            </View>

        </SafeAreaView>
    )
}

export default Registration

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black'
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
        // position: 'absolute',
        // top: 150
    },
    textinput: {
        marginBottom: 20, 
        color: 'grey',
        fontSize: 17, 
        padding: 5,
        // paddingBottom: 20,
        borderBottomWidth: 1.2, 
        borderColor: 'grey',
        height: 30
    },
    focussedTextInput: {
        marginBottom: 20, 
        color: 'grey',
        fontSize: 17, 
        padding: 5, 
        borderBottomWidth: 1.2,
        borderColor: 'grey'
    },
    pickerStyle: {
        margin: -2,
        height: 10, 
        color: 'black',
        // borderWidth:1,
        // borderColor: 'white'
    }
})
