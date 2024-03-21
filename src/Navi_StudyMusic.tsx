import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./StudyMusic/Main"
import WordQuiz from "./StudyMusic/WordQuiz";
import KeysDetail from "./StudyMusic/KeysDetail";

const Stack = createNativeStackNavigator();

function Navi_StudyMusic () {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
     >
      <Stack.Screen name={'Main'} component={Main}/>
      <Stack.Screen name={'WordQuiz'} component={WordQuiz}/>
      <Stack.Screen name={'KeysDetail'} component={KeysDetail}/>
    </Stack.Navigator>
  );
}
export default Navi_StudyMusic;