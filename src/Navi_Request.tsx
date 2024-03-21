import React, { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Platform } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import RequestMain from "./Request/RequestMain";
import RequestRegister from "./Request/RequestRegister";


const Stack = createNativeStackNavigator();

function Navi_Request() {
  return (
    <Stack.Navigator 
      screenOptions={{headerShown: false, contentStyle: Platform.OS === 'android' ? styles.android : styles.ios }}
    >
      <Stack.Screen name={'RequestMain'} component={RequestMain}/>
      <Stack.Screen name={'RequestRegister'} component={RequestRegister}/>
    </Stack.Navigator>
  );
}
export default Navi_Request;

const styles = StyleSheet.create({
  android: {
    backgroundColor: '#000',
  },
  ios : {
    backgroundColor: '#000',
    paddingTop: getStatusBarHeight()
  },
});