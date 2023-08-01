import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, Alert, Linking } from 'react-native';
import { NavigationContainer, Route } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Navi_Home from './Navi_Home';
import Navi_Board from './Navi_Board';
import Navi_Competition from './Navi_Competition';
import Navi_MyPage from './Navi_MyPage';
import { Feather, Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { StatusBar } from "expo-status-bar";
import {checkNotifications, requestNotifications} from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';

// import Page1 from './Opening/Page1';
// import Page2 from './Opening/Page2';
// import Page3 from './Opening/Page3';
// import Page4 from './Opening/Page4';
// import Page5 from './Opening/Page5';
// import Page6 from './Opening/Page6';

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();


function Navi_Main (props : any) {
  
  checkNotifications().then(({status, settings}) => {
    if (status === 'denied' || status === 'blocked'){
      requestNotifications(['alert', 'sound']);
    } else if (status === 'granted') {
      return
    } else {
      return
    }
  })
  
  // firebase notification 토큰받기
  async function checkFireBaseApplicationPermission() {
    const token = await messaging().getToken();
    console.log(Platform.OS, token);
  }  

  useEffect(()=>{
    checkFireBaseApplicationPermission();
  }, [])
  
  return (
    <Tab.Navigator labeled={false} style={styles.container}>
      <Tab.Screen name="Navi_Home" component={Navi_Home}
        options={{tabBarIcon:()=> <Feather name="home" size={24} color="black" />}}
        ></Tab.Screen>
      <Tab.Screen  name='Navi_Competition' component={Navi_Competition}
        options={{tabBarIcon:()=> <Feather name="mic" size={24} color="black" />}}
      />
      <Tab.Screen name='Navi_Board' component={Navi_Board}
        options={{tabBarIcon:()=> <Ionicons name="chatbubble-ellipses-outline" size={24} color="black" />}}
      />
      <Tab.Screen name='Navi_MyPage' component={Navi_MyPage}
        options={{tabBarIcon:()=> <Ionicons name="person-outline" size={24} color="black" />}}
      />
    </Tab.Navigator>
  );
}

function Navi_Opening() {
  return (
      <Stack.Navigator >
        {/* <Stack.Screen options={{headerShown: false}} name={'Page1'} component={Page1}/>
        <Stack.Screen options={{headerShown: false}} name={'Page2'} component={Page2}/>
        <Stack.Screen options={{headerShown: false}} name={'Page3'} component={Page3}/>
        <Stack.Screen options={{headerShown: false}} name={'Page4'} component={Page4}/>
        <Stack.Screen options={{headerShown: false}} name={'Page5'} component={Page5}/>
        <Stack.Screen options={{headerShown: false}} name={'Page6'} component={Page6}/> */}
      </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: getStatusBarHeight(),
  },
});


export default function Main() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <KeyboardAvoidingView behavior={Platform.select({ ios: "padding", android: undefined })}style={{ flex: 1 }}>  
        <Stack.Navigator>
          {/* <Stack.Screen name="Navi_Opening" component={Navi_Opening} options={{ headerShown: false }}/> */}
          <Stack.Screen name="Navi_Main" component={Navi_Main} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </KeyboardAvoidingView>
    </NavigationContainer>
  );
}
