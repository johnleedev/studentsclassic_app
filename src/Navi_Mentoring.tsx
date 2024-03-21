import React, { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./Mentoring/Main";
import RegisterMentoring from "./Mentoring/RegisterMentoring";
import ListMentoring from "./Mentoring/ListMentoring";
import DetailMentoring from "./Mentoring/DetailMentoring";
import NoticeMentoring from "./Mentoring/NoticeMentoring";


const Stack = createNativeStackNavigator();

function Navi_Mentoring() {
  return (
    <Stack.Navigator 
      screenOptions={{headerShown: false}}
    >
      <Stack.Screen name={"Main"} component={Main} />
      <Stack.Screen name={"NoticeMentoring"} component={NoticeMentoring} />
      <Stack.Screen name={"RegisterMentoring"} component={RegisterMentoring} />
      <Stack.Screen name={"ListMentoring"} component={ListMentoring} />
      <Stack.Screen name={"DetailMentoring"} component={DetailMentoring} />
    </Stack.Navigator>
  );
}
export default Navi_Mentoring;