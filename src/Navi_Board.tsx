import React, { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Detail from "./Board/Detail";
import Post from './Board/Post';
import BoardMain from "./Board/BoardMain";

const Stack = createNativeStackNavigator();

function Navi_Board() {
  return (
    <Stack.Navigator 
      screenOptions={{headerShown: false}}
    >
      <Stack.Screen name={"Main"} component={BoardMain} />
      <Stack.Screen name={"Detail"} component={Detail} />
      <Stack.Screen name={"Post"} component={Post} />
    </Stack.Navigator>
  );
}
export default Navi_Board;