import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, Image, TextInput, Button, Keyboard, SafeAreaView, ScrollView } from 'react-native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import {useSelector, useDispatch} from 'react-redux'
import {setUser} from '../store/action'
import { useIsFocused } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';


const Account = ({navigation}) => {
    const [name, setName]=useState(null)
    const [phone, setPhone]=useState(null)
    const userstore = useSelector(state => state);
    const dispatch = useDispatch();
    const isFocused = useIsFocused()

    useEffect(() => {
        setName(userstore.user.displayName)
        setPhone(userstore.user.phoneNumber)
     }, [isFocused]);

     const signOut = async () => {
        await auth().signOut()
        alert('SIGNED OUT')
        dispatch(setUser({ uid: 'guest'}))
        navigation.dangerouslyGetParent().navigate('Login')
     }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerHalf}>
                <Image source={require('../assets/Dyte-Logo.png')} style={styles.logo}/>
            </View>
            <View style={styles.accountHeader}>
                <MaterialCommunityIcons name="account-circle" color='white' size={35} />
                <Text style={styles.accountName}>{name}</Text>
            </View>
            <View
                style={{
                    top: 130,
                    borderBottomColor: 'grey',
                    borderBottomWidth: 1,                        
                    width: '90%',
                    alignSelf: 'center'
                }}
            />
            <View style={styles.phoneContent}>
                <MaterialIcons name="local-phone" color='white' size={35} />
                <Text style={styles.accountName}>{phone}</Text>
            </View>
            <View
                style={{
                    top: 190,
                    borderBottomColor: 'grey',
                    borderBottomWidth: 1,                        
                    width: '90%',
                    alignSelf: 'center'
                }}
            />
            <View style={{width: '30%', position:'absolute', top: 690, paddingLeft: 20}}>
                <Button mode="contained" onPress={signOut} title='SIGN OUT' color="#335ff4"/>
            </View>

        </SafeAreaView>
    )
}

export default Account

const styles=StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'black',
        // alignItems: 'center',
        // justifyContent: 'center'
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
    accountHeader: {
        position: 'absolute',
        top: 80,
        bottom: 0,
        left: 0,
        right:0,
        paddingLeft: 20,
        color: '#ffac41',
        fontSize: 20,
        flexDirection: 'row'
    },
    accountName: {
        color: 'white',
        paddingTop: 5.5,
        paddingLeft: 14,
        fontSize: 20
    },
    phoneContent: {
        position: 'absolute',
        top: 140,
        bottom: 0,
        left: 0,
        right:0,
        paddingLeft: 20,
        color: '#ffac41',
        fontSize: 20,
        flexDirection: 'row'
    }
})
