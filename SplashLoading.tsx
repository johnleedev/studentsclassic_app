import * as React from "react";
import { useState, useEffect } from 'react';
import { ImageBackground, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import MainURL from './MainURL';
import NetInfo from "@react-native-community/netinfo";


export default function SplashLoading (props: any) {
   
  const checkToken = () => {
    
    NetInfo.fetch().then(state => {
      if(state.isConnected) {
        // 인터넷이 연결되어 있는 경우
        AsyncStorage.getItem('token').then((e)=>{
          // 토큰 검사하기
          {
            e === null ? 
            // 토큰이 없으면  
              props.navigation.replace("Navi_Login")
            : 
            // 토큰이 있으면 
            axios
              .post(`${MainURL}/login/verifytoken`, {  
                verifyToken : e
              })
              .then((res: any)=>{
                if (res.data.isUser === false) {
                  Alert.alert('로그인이 다시 필요합니다.')
                  props.navigation.replace("Navi_Login");
                } else if (res.data.isUser === true) {
                  AsyncStorage.setItem('token', res.data.refreshToken);
                  props.navigation.replace("Navi_Main");
                } else {
                  props.navigation.replace("Navi_Main");
                }          
              }).catch((err : string)=>{
                console.log('verifyToken_Err', err);
                props.navigation.replace("Navi_Main");
              });
          }
        })

      } else {
        // 인터넷이 연결되지 않는 경우
        Alert.alert('네트워크가 연결되어 있지 않습니다. 서비스에 제한이 있을 수 있습니다.');
        props.navigation.replace("Navi_Main");
      }
    });

  }

  useEffect(() => {
    const timer = setTimeout(() => {
      checkToken();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);


  return (
    <ImageBackground
      source={require("./assets/images/mainsplash.png")}
      style={{width:"100%",height:"100%"}}>
    </ImageBackground>
  );
    
}