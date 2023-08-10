import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function Advertising (props : any) {
  return (
    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>

        <Text style={styles.text}> 메일로 요청해주세요 </Text>
        <Text style={styles.text}> johnleedev@naver.com </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    margin: 10
  },
})

export default Advertising ;
