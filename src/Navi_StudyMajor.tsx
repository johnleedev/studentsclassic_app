import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./StudyMajor/Main";
import LyricsDetail from "./StudyMajor/LyricsDetail";
import WordDetail from "./StudyMajor/WordDetail";

const Stack = createNativeStackNavigator();

function Navi_StudyMajor () {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
     >
      <Stack.Screen name={'Main'} component={Main}/>
      <Stack.Screen name={'LyricsDetail'} component={LyricsDetail}/>
      <Stack.Screen name={'WordDetail'} component={WordDetail}/>
    </Stack.Navigator>
  );
}
export default Navi_StudyMajor;