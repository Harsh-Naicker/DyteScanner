import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, Image, TextInput, Button, Keyboard, SafeAreaView, ScrollView, Linking, TouchableOpacity } from 'react-native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import {useSelector, useDispatch} from 'react-redux'
import {setUser} from '../store/action'
import { NavigationContainer } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import RNFetchBlob from 'rn-fetch-blob'


const Home = ({navigation}) => {
    const [name, setName]=useState(null)
    const userstore = useSelector(state => state);
    const dispatch = useDispatch();
    const isFocused = useIsFocused()
    const [files, setFiles]=useState([])
    const [folderPath, setFolderPath]=useState('/storage/emulated/0/DyteScanner')

    useEffect(() => {
        setName(userstore.user.displayName)
        // check if our folder path exists. If yes, the retrieve the file names in our folder path.
        RNFetchBlob.fs.isDir(folderPath).then((isDir) => {
            if(isDir) {
                RNFetchBlob.fs.ls(folderPath)
                .then((data) => {
                    console.log(data)
                    setFiles(data)
                })

            } 
        })

     }, [isFocused]);
    
    const openGallery = (name) => {
        // Uses intent to open the scanned image using gallery.
        // Android specific
        const android = RNFetchBlob.android
        const pathToFile=folderPath+'/'+name
        android.actionViewIntent(pathToFile, 'image/jpeg')
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerHalf}>
                <Image source={require('../assets/Dyte-Logo.png')} style={styles.logo}/>
            </View>
            <Text style={{color: 'white', top:100, fontSize: 20}}>{files.length === 0? 'No scanned files': ''}</Text>
            <ScrollView contentContainerStyle={styles.gridContainer}>
                {files.map((file) =>(
                <TouchableOpacity key={file} style={styles.box} onPress={() => openGallery(file)}>
                    <Text style={styles.fileText}>{file.replace('.jpg','')}</Text>
                </TouchableOpacity>
            ))}
            </ScrollView>
            

        </SafeAreaView>
    )
}

export default Home

const styles=StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
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
    gridContainer: {
        flex: 1,
        top: 100,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        // justifyContent:'space-around'
    },
    box: {
        height: 50,
        width:116,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#335ff4',
        borderRadius: 10
    },
    fileText: {
        fontSize: 18,
        color: 'white',
        padding: 10
    }
})
