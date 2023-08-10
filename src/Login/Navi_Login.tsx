import * as React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from './Login';
import Logister from "./Logister";
import LoginNaver from './LoginNaver'
import LoginKakao from "./LoginKakao";

const Stack = createNativeStackNavigator();

export default function Navi_Login() {
    return (
      <Stack.Navigator >
        <Stack.Screen options={{headerShown: false}} name={'Login'} component={Login}/>
        <Stack.Screen options={{headerShown: false}} name={'Logister'} component={Logister}/>
        <Stack.Screen options={{headerShown: false}} name={'LoginNaver'} component={LoginNaver}/>
        <Stack.Screen options={{headerShown: false}} name={'LoginKakao'} component={LoginKakao}/>
      </Stack.Navigator>
    )
  }
  
  