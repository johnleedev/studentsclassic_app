import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { Component, useEffect, useCallback } from "react";
import MyPageMain from './MyPage/MyPageMain';
import Notice from './MyPage/Notice/Notice'
import Advertising from "./MyPage/Notice/Advertising";
import Policy from "./MyPage/Notice/Policy";
import Question from "./MyPage/Notice/Question";
import PersonInfo from "./MyPage/Notice/PersonInfo";
import DeleteAccount from "./MyPage/DeleteAccount";
import Report from "./MyPage/Notice/Report";

const Stack = createNativeStackNavigator();

function Navi_MyPage() {
  return (
    <Stack.Navigator 
      screenOptions={{headerShown: false}}
    >
      <Stack.Screen name={'MyPageMain'} component={MyPageMain}/>
      <Stack.Screen name={'Notice'} component={Notice}/>
      <Stack.Screen name={'Question'} component={Question}/>
      <Stack.Screen name={'Advertising'} component={Advertising}/>
      <Stack.Screen name={'Policy'} component={Policy}/>
      <Stack.Screen name={'PersonInfo'} component={PersonInfo}/>
      <Stack.Screen name={'DeleteAccount'} component={DeleteAccount}/>
      <Stack.Screen name={'Report'} component={Report}/>
    </Stack.Navigator>
  );
}
export default Navi_MyPage;
