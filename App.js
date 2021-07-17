// general imports
import React, {useState, useEffect} from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// screen imports
import Login from './src/Login'
import Home from './src/Home'
import Registration from './src/Registration';
import Account from './src/Account'
import Scanner from './src/Scanner'
import Save from './src/Save'

// redux imports
import {Provider} from 'react-redux'
import store from './store/store'
import {useSelector, useDispatch} from 'react-redux'
import {setUser} from './store/action'

// creating stack and tab navigator
const AppStack = createStackNavigator()
const Tab = createBottomTabNavigator()

// functional component
const App = () => {
  const [uid, setUid] = useState('guest') //initially set as guest user
  const [initializing, setInitializing] = useState(true); //flag to check if app is currenlt initializing
  const [u, setU]=useState(null) //set initial user to null

  function onAuthStateChanged(user) {
    // setUser(user);
    // const user=auth().currentUser
    if(user!==null){
      console.log('The current user is',user.uid)
      setUid(user.uid)
      setU(user)
      console.log(uid)
      store.dispatch(setUser(user))
    } else {
      console.log('The user is logged out, using app as a guest user')
      setUid('guest')
      store.dispatch(setUser({uid: 'guest', email: 'guest'}))
    }
    
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    
    let isMounted=true
    if(isMounted) {

      if(auth){
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; 
      }
      // unsubscribe on unmount

    }
    return () => { isMounted = false }
  }, [])
  if (initializing) return null;

  function TabStack() {
    return (
      <Tab.Navigator 
        initialRouteName = 'HOME'
        tabBarOptions = {{
          activeTintColor: '#335ff4',
          inactiveTintColor: 'grey',
          style: {
            backgroundColor: 'black'
          }
        }}
      >
        <Tab.Screen name="HOME" component={Home} 
          options = {{
            tabBarLabel: 'HOME',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            )
          }}
        />
        <Tab.Screen name="SCANNER" component={Scanner} 
          options = {{
            tabBarLabel: 'SCAN',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="scan-helper" color={color} size={26} />
            )
          }}
        />


        <Tab.Screen name="ACCOUNT" component={Account} 
          options={{
            tabBarLabel: 'PROFILE',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        />

      </Tab.Navigator>
    )
  }
  
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppStack.Navigator 
          headerMode="none" 
          initialRouteName={uid !=='guest'? 'TabStack':'Login'}
        >
          <AppStack.Screen name="Login" component={Login} />
          <AppStack.Screen name="Registration" component={Registration} />
          <AppStack.Screen name="Save" component={Save} />
          <AppStack.Screen name="TabStack" component={TabStack} />
        </AppStack.Navigator>
      </NavigationContainer>
    </Provider>

    
  )
}

export default App