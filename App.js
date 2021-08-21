import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';

import { View, Text } from 'react-native';

import firebase from 'firebase/app';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk))



const firebaseConfig = {
  apiKey: "AIzaSyBncHy8YeGAVE7078GowF_VbhWeWNPFjVc",
  authDomain: "projeto-integrado-2-b83bb.firebaseapp.com",
  projectId: "projeto-integrado-2-b83bb",
  storageBucket: "projeto-integrado-2-b83bb.appspot.com",
  messagingSenderId: "312317803901",
  appId: "1:312317803901:web:9a80f9d8b193c334e62014",
  measurementId: "G-VHLTTQPT10"
};

if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import LoginScreen from './components/auth/Login'
import MainScreen from './components/Main'
import AddScreen from './components/main/Add'
import SaveScreen from './components/main/Save'

const Stack = createStackNavigator();

export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,

    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      }else{
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }
  render() {
    const { loggedIn, loaded } = this.state;
    if(!loaded){
      return(
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>Carregando</Text>
        </View>
      )
    }
    
    if(!loggedIn){
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Landing" component ={LandingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component ={RegisterScreen}/>
            <Stack.Screen name="Login" component ={LoginScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={MainScreen}/>
            <Stack.Screen name="Add" component={AddScreen} navigation={this.props.navigation} options={{ headerShown: true }}/>
            <Stack.Screen name="Save" component={SaveScreen} navigation={this.props.navigation} options={{ headerShown: true }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
      
    )
  }
}

export default App

