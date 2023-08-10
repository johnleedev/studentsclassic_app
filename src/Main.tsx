import * as React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, Alert, Linking } from 'react-native';
import { getStatusBarHeight } from "react-native-status-bar-height";
import Navi_Home from './Navi_Home';
import Navi_Board from './Navi_Board';
import Navi_Competition from './Navi_Competition';
import Navi_MyPage from './Navi_MyPage';
import { Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { StatusBar } from "expo-status-bar";
import {checkNotifications, requestNotifications} from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createMaterialBottomTabNavigator();

export default function Main (props : any) {
  
  // 알림 설정 확인
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
    console.log(Platform.OS, 'firebase token');
  }  

  useEffect(() => {
    checkFireBaseApplicationPermission();
  }, []);


  return (
    <Tab.Navigator labeled={false} style={styles.container}>
      <Tab.Screen name="Navi_Home" component={Navi_Home}
        options={{tabBarIcon:()=> <Feather name="home" size={24} color="black" />}}
        ></Tab.Screen>
      <Tab.Screen  name='Navi_Competition' component={Navi_Competition}
        options={{tabBarIcon:()=> <Feather name="mic" size={24} color="black" />}}
      />
      <Tab.Screen name='Navi_Board' component={Navi_Board}
      
        options={{tabBarIcon:()=> <FontAwesome5 name="list-alt" size={24} color="black" />}}
      />
      <Tab.Screen name='Navi_MyPage' component={Navi_MyPage}
        options={{tabBarIcon:()=> <Ionicons name="person-outline" size={24} color="black" />}}
      />
    </Tab.Navigator>
  );
}


const styles = StyleSheet.create({
  container: {
    marginTop: getStatusBarHeight(),
  },
});



