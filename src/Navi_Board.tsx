import React, { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from './Board/BoardMain';
import Detail from "./Board/Detail";
import Post from './Board/Post';

const Stack = createNativeStackNavigator();

function Board() {
  return (
    <Stack.Navigator >
      <Stack.Screen options={{headerShown: false}} name={"Main"} component={Main} />
      <Stack.Screen name={"Detail"} options={{title: '커뮤니티'}} component={Detail} />
      <Stack.Screen options={{headerShown: false}} name={"Post"} component={Post} />
    </Stack.Navigator>
  );
}
export default Board;