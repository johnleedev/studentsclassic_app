import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InfoMain from "./Info/InfoMain";
import Concours from "./Info/Concours/Concours";
import ConcoursDetail from "./Info/Concours/ConcoursDetail";
import ConcoursPost from "./Info/Concours/ConcoursPost";
import Concert from "./Info/Concert/Concert";
import ConcertDetail from "./Info/Concert/ConcertDetail";
import ConcertPost from "./Info/Concert/ConcertPost";
import Column from "./Info/Column/Column";
import ColumnDetail from "./Info/Column/ColumnDetail";

const Stack = createNativeStackNavigator();

function Navi_Info () {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
     >
      <Stack.Screen name={'InfoMain'} component={InfoMain}/>
      <Stack.Screen name={'Concert'} component={Concert}/>
      <Stack.Screen name={'ConcertDetail'} component={ConcertDetail}/>
      <Stack.Screen name={'ConcertPost'} component={ConcertPost}/>
      <Stack.Screen name={'Concours'} component={Concours}/>
      <Stack.Screen name={'ConcoursDetail'} component={ConcoursDetail}/>
      <Stack.Screen name={'ConcoursPost'} component={ConcoursPost}/>
      <Stack.Screen name={'Column'} component={Column}/>
      <Stack.Screen name={'ColumnDetail'} component={ColumnDetail}/>
    </Stack.Navigator>
  );
}
export default Navi_Info;