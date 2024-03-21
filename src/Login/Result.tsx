import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Typography } from "../Components/Typography";
import AsyncGetItem from '../AsyncGetItem'

export default function Result (props : any) {

    // AsyncGetData
    const [asyncGetData, setAsyncGetData] = useState<any>({});
    const asyncFetchData = async () => {
      try {
        const data = await AsyncGetItem();
        setAsyncGetData(data);
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
      asyncFetchData();
    }, []);
  
  return (
    <View style={Platform.OS === 'android' ? styles.android : styles.ios}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../images/login/result.png")}
          style={{width:"100%",height:"100%"}}>
        
        <View style={{flex:1, width:'100%', justifyContent: 'center'}}>
          <Typography fontSize={28} marginBottom={5} fontWeightIdx={1}>{asyncGetData.userName}님</Typography>
          <Typography fontSize={28} marginBottom={8} fontWeightIdx={1}>회원가입이 완료되었어요!</Typography>
          <Typography fontSize={12} marginBottom={3}>학교 : {asyncGetData.userSchool}</Typography>
          <Typography fontSize={12} marginBottom={3}>학번 : {asyncGetData.userSchNum}</Typography>
          <Typography fontSize={12} marginBottom={15}>파트 : {asyncGetData.userPart}</Typography>
          <Typography fontSize={12} fontWeightIdx={1}>"성악과학생들"의 다양한 컨텐츠에 참여해보세요.</Typography>
        </View>
        
        <View style={{justifyContent: 'center', alignItems:'center'}}>
          <TouchableOpacity 
              onPress={()=>{
                props.navigation.replace('Navi_Main');
              }}
              style={styles.nextBtnBox}
              >
              <Text style={styles.nextBtnText}>시작하기</Text>
          </TouchableOpacity>
        </View>

        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  android: {
    flex: 1,
    backgroundColor: 'black',
  },
  ios : {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: getStatusBarHeight(),
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 24
  },
  mainlogo: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    height: 250,
  },
  backButton: {
    position:'absolute',
    top: 0,
    left: 0,
    width: 30,
    height: 30,
  },
  nextBtnBox: {
    borderRadius: 16,
    width: '100%',
    marginBottom: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  nextBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});