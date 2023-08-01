import React from 'react';
import {View, Text, Button} from 'react-native';

function ScreenB(props : any) {
    return (
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
  
          <Text>이것은 ScreenB 라고 합니다.</Text>
  
          <Button 
              title='A스크린으로 이동하기'
              onPress={()=>{
                  props.navigation.navigate('ScreenA');
              }} />
  
          <Button 
              title='C스크린으로 이동하기'
              onPress={()=>{
                  props.navigation.navigate('ScreenC')
              }} />
  
      </View>
    );
  }

export default ScreenB;
