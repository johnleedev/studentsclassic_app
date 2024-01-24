import React, { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CompetitionMain from './Competition/CompetitionMain';
import LastComptDetail from "./Competition/LastComptDetail";
import CompetitionPost from "./Competition/CompetitionPost";
import CompetitionEntry from "./Competition/CompetitionEntry";
import CompetitionEntryDetail from "./Competition/CompetitionEntryDetail";

const Stack = createNativeStackNavigator();

function Competition() {
  return (
    <Stack.Navigator 
      screenOptions={{headerShown: false}}
    >
      <Stack.Screen name={"Main"} component={CompetitionMain} />
      <Stack.Screen name={"LastComptDetail"} component={LastComptDetail} />
      <Stack.Screen name={"CompetitionPost"} component={CompetitionPost} />
      <Stack.Screen name={"CompetitionEntry"} component={CompetitionEntry} />
      <Stack.Screen name={"CompetitionEntryDetail"} component={CompetitionEntryDetail} />
    </Stack.Navigator>
  );
}
export default Competition;