import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./Study/Main";
import LyricsDetail from "./Study/LyricsDetail";
import WordDetail from "./Study/WordDetail";
import Request from "./Study/Request";
import RequestList from "./Study/RequestList";


const Stack = createNativeStackNavigator();

function Navi_Study () {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
     >
      <Stack.Screen name={'Main'} component={Main}/>
      <Stack.Screen name={'LyricsDetail'} component={LyricsDetail}/>
      <Stack.Screen name={'WordDetail'} component={WordDetail}/>
      <Stack.Screen name={'Request'} component={Request}/>
      <Stack.Screen name={'RequestList'} component={RequestList}/>
    </Stack.Navigator>
  );
}
export default Navi_Study;