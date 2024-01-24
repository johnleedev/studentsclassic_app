import * as React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from './Login';
import Logister from "./Logister";
import Logister2 from "./Logister2";
import Agree from './Agree';
import Result from './Result';

const Stack = createNativeStackNavigator();

export default function Navi_Login() {
    return (
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name={'Login'} component={Login}/>
        <Stack.Screen options={{headerShown: false}} name={'Logister'} component={Logister}/>
        <Stack.Screen options={{headerShown: false}} name={'Logister2'} component={Logister2}/>
        <Stack.Screen options={{headerShown: false}} name={'Agree'} component={Agree}/>
        <Stack.Screen options={{headerShown: false}} name={'Result'} component={Result}/>
      </Stack.Navigator>
    )
  }
  

