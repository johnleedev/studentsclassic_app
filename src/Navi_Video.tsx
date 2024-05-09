import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./Video/Main";
import IsLikedList from "./Video/IsLikedList";

const Stack = createNativeStackNavigator();

function Navi_Video () {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
     >
      <Stack.Screen name={'Main'} component={Main}/>
      <Stack.Screen name={'IsLikedList'} component={IsLikedList}/>
    </Stack.Navigator>
  );
}
export default Navi_Video;