import React, { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./LessonNote/Main";



const Stack = createNativeStackNavigator();

function Navi_Mentoring() {
  return (
    <Stack.Navigator 
      screenOptions={{headerShown: false}}
    >
      <Stack.Screen name={"Main"} component={Main} />

    </Stack.Navigator>
  );
}
export default Navi_Mentoring;