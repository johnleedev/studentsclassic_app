import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { Component, useEffect, useCallback } from "react";

import MyPageMain from './MyPage/MyPageMain';
import Notice from './MyPage/Notice/Notice'
import Advertising from "./MyPage/Notice/Advertising";
import Policy from "./MyPage/Notice/Policy";
import Question from "./MyPage/Notice/Question";
import PersonInfo from "./MyPage/Notice/PersonInfo";
import Test from "./MyPage/Notice/Test";

const Stack = createNativeStackNavigator();

function Navi_MyPage() {
  return (
    <Stack.Navigator >
      <Stack.Screen options={{headerShown: false}} name={'MyPageMain'} component={MyPageMain}/>
      <Stack.Screen name={'공지사항'} component={Notice}/>
      <Stack.Screen name={'문의하기'} component={Question}/>
      <Stack.Screen name={'광고&제휴'} component={Advertising}/>
      <Stack.Screen name={'약관&정책'} component={Policy}/>
      <Stack.Screen name={'개인정보처리방침'} component={PersonInfo}/>
      <Stack.Screen name={'test'} component={Test}/>
    </Stack.Navigator>
  );
}
export default Navi_MyPage;
