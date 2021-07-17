import React, { useRef, useState, useEffect } from "react"
import { View, StyleSheet, Text, TouchableOpacity, Image, Platform, SafeAreaView, SegmentedControlIOSComponent, PermissionsAndroid, Button } from "react-native"
import Permissions from 'react-native-permissions';
import PDFScanner from "@woonivers/react-native-document-scanner"
import ImagePicker from 'react-native-image-crop-picker';
import { useIsFocused } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux'
import {setImage} from '../store/action'
import RNFS from 'react-native-fs';

const Scanner = ({navigation}) => {
    const pdfScannerElement = useRef(null)
    const customCrop = useRef(null)
    // data stores the scanned content
    const [data, setData] = useState({})
    // stores if camera permission is granted
    const [camAllow, setCamAllow] = useState(false)
    // stores if permission to write to external storage is granted
    const [storageAllow, setStorageAllow]=useState(false)
    // stores if the document is being captured or has already been captured
    const [status, setStatus]=useState('capturing')
    // Checks if the screen has been brought into focus so that useeffect can be launched
    const isFocused = useIsFocused()
    // provides access to the redux store
    const userstore = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        async function requestCamera() {
          const result = await Permissions.request(Platform.OS === "android" ? "android.permission.CAMERA" : "ios.permission.CAMERA")
          if (result === "granted") setCamAllow(true)
        }
        async function requestStorage() {
            const result= await Permissions.request(Platform.OS === "android" ? "android.permission.WRITE_EXTERNAL_STORAGE" : "ios.permission.PHOTO_LIBRARY")
            if (result === "granted") setStorageAllow(true)
        }
        requestCamera()
        requestStorage()

    }, [isFocused])

    function handleOnPress() {
        pdfScannerElement.current.capture()
        setStatus('captured')
    }
    if (!camAllow && !storageAllow) {
        console.log("You must accept camera permission and storage permission")
        return (
            <View style={styles.container}>
                <Text style={{color: 'white'}}>You must accept camera permission and storage permission</Text>
            </View>
        )
    }

    const cropImg = () => {
        ImagePicker.openCropper({
          path: data.croppedImage,
          width: 300,
          height: 400,
          cropping: true,
          includeBase64: true,
          freeStyleCropEnabled: true // android only
        }).then(image => {
            // store the image in redux store so that it can be used in the 'Save' screen
          dispatch(setImage(image))
          navigation.dangerouslyGetParent().navigate('Save')
          setData({})
          setStatus('capturing')
        });
    }
    

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerHalf}>
                <Image source={require('../assets/Dyte-Logo.png')} style={styles.logo}/>
            </View>
            {status === 'capturing'? (
                <>
                    <PDFScanner
                        ref={pdfScannerElement}
                        style={styles.scanner}
                        onPictureTaken={(pic) => {setData(pic);setStatus('captured'); console.log(pic)}}
                        overlayColor="rgba(255,130,0, 0.7)"
                        enableTorch={false}
                        quality={0.5}
                        detectionCountBeforeCapture={5}
                        detectionRefreshRateInMS={50}
                    />
                    <View style={{width: '20%', alignSelf: 'center', top: 85}}>
                        <Button mode="contained" onPress={handleOnPress} title='CAPTURE' color="#335ff4"/>
                    </View>
                </>
            ):(
                <>
                    <Image source={{ uri: data.croppedImage }} style={styles.preview} />
                    <View style={styles.capturedOptions}>
                        <TouchableOpacity onPress={() => {setData({}),setStatus('capturing')}}>
                            <MaterialCommunityIcons name="repeat" color='white' size={42} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => cropImg()}>
                            <MaterialCommunityIcons name="crop" color='white' size={42} />
                        </TouchableOpacity>

                    </View>
                    
                </>

            )}

            
        </SafeAreaView>
    )
}

export default Scanner

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
    scanner: {
        top: 30,
        flex: 0.85,
        aspectRatio: undefined
    },
    preview: {
        top:50,
        flex: 0.85,
        // aspectRatio: undefined
        resizeMode: 'contain'
    },
    button: {
        alignSelf: "center",
        position: "absolute",
        bottom: 32,
        backgroundColor: '#335ff4'
      },
    buttonText: {
        backgroundColor: "rgba(245, 252, 255, 0.7)",
        fontSize: 32,
    },
    capturedOptions: {
        flexDirection: 'row',
        top: 70,
        justifyContent: 'space-around'
    }
})
