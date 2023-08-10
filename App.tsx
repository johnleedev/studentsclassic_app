import * as React from "react";
import { useState, useEffect, useCallback } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import * as Font from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer, Route } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import SplashLoading from "./SplashLoading";
import Main from "./src/Main";
import Navi_Login from './src/Login/Navi_Login'

const Stack = createNativeStackNavigator();

const getFonts = async () => {
  await Font.loadAsync({
    "Montserrat": require("./assets/Montserrat/Montserrat-VariableFont_wght.ttf"),
    "Montserrat-Bold": require("./assets/Montserrat/static/Montserrat-Bold.ttf"),
  });
};

export default function App () {

  useEffect(() => {
    getFonts();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <KeyboardAvoidingView behavior={Platform.select({ ios: "padding", android: undefined })}style={{ flex: 1 }}>  
        <Stack.Navigator>
          <Stack.Screen name="SplashLoading" component={SplashLoading} options={{ headerShown: false }} />
          <Stack.Screen name="Navi_Main" component={Main} options={{ headerShown: false }} />
          <Stack.Screen name="Navi_Login" component={Navi_Login} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </KeyboardAvoidingView>
    </NavigationContainer>
  );

};

