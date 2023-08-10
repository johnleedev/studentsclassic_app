import React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();


const Screen1 = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Screen 1</Text>
  </View>
);

const Screen2 = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Screen 2</Text>
  </View>
);

const Screen3 = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Screen 3</Text>
  </View>
);

function ScreenRoot () {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Tab1" component={Screen1} />
      <Tab.Screen name="Tab2" component={Screen2} />
      <Tab.Screen name="Tab3" component={Screen3} />
    </Tab.Navigator>
  );
};

function Test (props : any) {

  

  return (
    <View style={{ flex: 1 }}>
        <View>
          <Text>dfsf</Text>
        </View>
        <ScreenRoot></ScreenRoot>
    </View>
  );
}

export default Test;
