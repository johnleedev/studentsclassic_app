import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { Component } from "react";
import MyPageMain from './MyPage/MyPageMain';
import Login from './MyPage/Login/Login';
import Logister from "./MyPage/Login/Logister";
import Notice from './MyPage/Notice/Notice'
import Advertising from "./MyPage/Notice/Advertising";
import Policy from "./MyPage/Notice/Policy";
import Question from "./MyPage/Notice/Question";
import LoginNaver from './MyPage/Login/LoginNaver'
import LoginKakao from "./MyPage/Login/LoginKakao";

const Stack = createNativeStackNavigator();

function Navi_MyPage() {
  return (
    <Stack.Navigator >
      <Stack.Screen options={{headerShown: false}} name={'MyPageMain'} component={MyPageMain}/>
      <Stack.Screen options={{headerShown: false}} name={'Login'} component={Login}/>
      <Stack.Screen options={{headerShown: false}} name={'Logister'} component={Logister}/>
      <Stack.Screen options={{headerShown: false}} name={'LoginNaver'} component={LoginNaver}/>
      <Stack.Screen options={{headerShown: false}} name={'LoginKakao'} component={LoginKakao}/>
      <Stack.Screen name={'공지사항'} component={Notice}/>
      <Stack.Screen name={'문의하기'} component={Question}/>
      <Stack.Screen name={'광고&제휴'} component={Advertising}/>
      <Stack.Screen name={'약관&정책'} component={Policy}/>

    </Stack.Navigator>
  );
}
export default Navi_MyPage;
