import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { Component } from "react";
import HomeMain from './Home/HomeMain';
import Notifi from "./Home/Notifi";
import ScreenB from './Home/ScreenB';


const Stack = createNativeStackNavigator();

function Navi_Home() {
  return (
    <Stack.Navigator >
      <Stack.Screen options={{headerShown: false}} name={'HomeMain'} component={HomeMain}/>
      <Stack.Screen name={'알림'} component={Notifi}/>
      <Stack.Screen name={'ScreenB'} component={ScreenB}/>
    </Stack.Navigator>
  );
}
export default Navi_Home;