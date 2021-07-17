import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, Image, TextInput, Button, Keyboard, SafeAreaView, ScrollView, LogBox } from 'react-native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import {useSelector, useDispatch} from 'react-redux'
import {setImage} from '../store/action'
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import RNFetchBlob from 'rn-fetch-blob'

LogBox.ignoreAllLogs();

const Save = ({navigation}) => {
    // provides access to redux store
    const userstore = useSelector(state => state);
    const dispatch = useDispatch();
    const [filename, setFilename]=useState('')
    const [nameFocus, setNameFocus]=useState(false)
    const [savePath, setSavePath]=useState(null)
    const [saved, setSaved]=useState(false)

    const saveImage = () => {
        const folderPath='/storage/emulated/0/DyteScanner'
        const filepath=folderPath+'/'+filename+'.jpg'
        setSavePath(filepath)
        RNFetchBlob.fs.isDir(folderPath).then((isDir) => {
            if(isDir) {
                addImage()
            } 
            else {
                RNFetchBlob.fs.mkdir(folderPath).then(() =>{
                    addImage()
                })
            }
        })
    }
    const addImage = async () => {
        
        await RNFetchBlob.fs.createFile(savePath, userstore.img.data, 'base64' )
        .then((response) => {
            RNFetchBlob.fs.scanFile([{path: savePath,mime: userstore.img.mime}]).then((response) => {
                console.log('File has been scanned and saved')
                navigation.replace('TabStack', {screen: 'Home'})
            }).catch(err => console.log(err))
        }).catch(e => console.log('Tap again'))
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerHalf}>
                <Image source={require('../assets/Dyte-Logo.png')} style={styles.logo}/>
                
            </View>
            <Image source={{ uri: userstore.img.path }} style={styles.preview} />
            <View style={styles.enterFileName}>
                <Text style={{color: 'grey',padding: 5, top: 5}}>{nameFocus? 'Document Name':''}</Text>
                <TextInput 
                    onChangeText={name => setFilename(name)}
                    style={nameFocus? styles.focussedTextInput:styles.textinput}
                    value={filename}
                    placeholder={nameFocus? '':'Document Name'}
                    autoCapitalize="none"
                    placeholderTextColor="grey"
                    onFocus={()=> setNameFocus(true)}
                    onBlur={()=>setNameFocus(false)}
                    selectionColor='grey'
                    onSubmitEditing={Keyboard.dismiss}
                />
            </View>
            <View style={{width: '30%', alignSelf: 'center', top: 40}}>
                <Button mode="contained" onPress={() => saveImage()} title='TAP TWICE TO SAVE' color="#335ff4"/>
            </View>

        </SafeAreaView>
    )
}

export default Save

const styles=StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'black',
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
    preview: {
        top:50,
        flex: 0.85,
        // aspectRatio: undefined
        resizeMode: 'contain'
    },
    enterFileName: {
        top: 40,
        width: '70%',
        alignSelf: 'center'

    },
    askName: {
        fontSize: 25,
        color: 'white'

    },
    textinput: {
        marginBottom: 30, 
        color: 'grey',
        fontSize: 25, 
        padding: 5,
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
})