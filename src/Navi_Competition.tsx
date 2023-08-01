import React, { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from './Competition/CompetitionMain';
import Post from './Competition/Post';

const Stack = createNativeStackNavigator();

function Competition() {
  return (
    <Stack.Navigator >
      <Stack.Screen options={{headerShown: false}} name={"Main"} component={Main} />
      <Stack.Screen options={{headerShown: false}} name={"Post"} component={Post} />
    </Stack.Navigator>
  );
}
export default Competition;