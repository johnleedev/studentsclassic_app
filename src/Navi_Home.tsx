import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeMain from './Home/HomeMain';
import Notificaion from "./Home/Notification";
import SchoolDetail from "./Home/SchoolDetail";
import SchoolPersonal from "./Home/SchoolPersonal";
import NewsList from "./Home/NewsList";
import NewsDetail from "./Home/NewsDetail";
import NotificationSetting from "./Home/NotificationSetting";

const Stack = createNativeStackNavigator();

function Navi_Home() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
     >
      <Stack.Screen name={'HomeMain'} component={HomeMain}/>
      <Stack.Screen name={'NewsList'} component={NewsList}/>
      <Stack.Screen name={'NewsDetail'} component={NewsDetail}/>
      <Stack.Screen name={'SchoolDetail'} component={SchoolDetail}/>
      <Stack.Screen name={'SchoolPersonal'} component={SchoolPersonal}/>
      <Stack.Screen name={'Notification'} component={Notificaion}/>
      <Stack.Screen name={'NotificationSetting'} component={NotificationSetting}/>
      
    </Stack.Navigator>
  );
}
export default Navi_Home;