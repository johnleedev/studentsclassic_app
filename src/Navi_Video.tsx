import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./Video/Main";
import IsLikedList from "./Video/IsLikedList";
import VideoPost from "./Video/VideoPost";

const Stack = createNativeStackNavigator();

function Navi_Video () {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
     >
      <Stack.Screen name={'Main'} component={Main}/>
      <Stack.Screen name={'IsLikedList'} component={IsLikedList}/>
      <Stack.Screen name={'VideoPost'} component={VideoPost}/>
    </Stack.Navigator>
  );
}
export default Navi_Video;