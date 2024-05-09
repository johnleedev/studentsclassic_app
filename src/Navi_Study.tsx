import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./StudyMajor/Main";
import LyricsDetail from "./StudyMajor/LyricsDetail";
import WordDetail from "./StudyMajor/WordDetail";
import MusicMain from "./StudyMusic/Main";
import WordQuiz from "./StudyMusic/WordQuiz";
import KeysDetail from "./StudyMusic/KeysDetail";

const Stack = createNativeStackNavigator();

function Navi_StudyMajor () {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
     >
      <Stack.Screen name={'Main'} component={Main}/>
      <Stack.Screen name={'LyricsDetail'} component={LyricsDetail}/>
      <Stack.Screen name={'WordDetail'} component={WordDetail}/>
      <Stack.Screen name={'MusicMain'} component={MusicMain}/>
      <Stack.Screen name={'WordQuiz'} component={WordQuiz}/>
      <Stack.Screen name={'KeysDetail'} component={KeysDetail}/>
    </Stack.Navigator>
  );
}
export default Navi_StudyMajor;