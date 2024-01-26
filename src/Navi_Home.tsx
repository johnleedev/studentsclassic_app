import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeMain from './Home/HomeMain';
import Notificaion from "./Home/Notification";
import NotificationSetting from "./Home/NotificationSetting";

const Stack = createNativeStackNavigator();

function Navi_Home() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
     >
      <Stack.Screen name={'HomeMain'} component={HomeMain}/>
      <Stack.Screen name={'Notification'} component={Notificaion}/>
      <Stack.Screen name={'NotificationSetting'} component={NotificationSetting}/>
      
    </Stack.Navigator>
  );
}
export default Navi_Home;