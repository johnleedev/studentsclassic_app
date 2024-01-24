import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LyricsMain from "./Lyrics/LyricsMain";
import LyricsDetail from "./Lyrics/LyricsDetail";
import LyricsWord from "./Lyrics/LyricsWord";


const Stack = createNativeStackNavigator();

function Navi_Lyrics () {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
     >
      <Stack.Screen name={'LyricsMain'} component={LyricsMain}/>
      <Stack.Screen name={'LyricsDetail'} component={LyricsDetail}/>
      <Stack.Screen name={'LyricsWord'} component={LyricsWord}/>
    </Stack.Navigator>
  );
}
export default Navi_Lyrics;