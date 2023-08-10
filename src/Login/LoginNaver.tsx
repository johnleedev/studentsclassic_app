import React, { useState, useCallback, useEffect } from 'react';
import { View, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from "axios";
import MainURL from '../../MainURL';
import AsyncSetItem from '../AsyncSetItem'

const NaverLoginScreen = (props : any) => {
  
  const YOUR_CLIENT_ID = 'NJivxK1ooCxnPodocRjp';
  const YOUR_CALLBACK_URL = 'https://www.studentsclassic.com/redirect.html';
  const INJECTED_JAVASCRIPT : string = `window.ReactNativeWebView.postMessage('')`
  const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=token&client_id=${YOUR_CLIENT_ID}&redirect_uri=${YOUR_CALLBACK_URL}&state=YOUR_UNIQUE_STATE`;

  // 네이버 로그인 콜백 URL을 감지하고 결과를 처리하는 함수
  const handleGetAccessToken = (navState : any) => {
    if (navState.url.startsWith(YOUR_CALLBACK_URL)) {
      // 접근 토큰 값 출력
      const access_token = getParamFromUrl(navState.url, 'access_token');
      axios
        .post(`${MainURL}/login/loginnaver`, {
          AccessToken: access_token
        })
        .then((res: any)=>{
          if (res.data.isUser === true) {
            AsyncSetItem(res.data.refreshToken, res.data.userName, res.data.userSchool, res.data.userSchNum, res.data.userPart);
            props.navigation.replace('Navi_Main');
          } else if (res.data.isUser === false) {
            props.navigation.navigate("Logister", {data: res.data});
          }
        }).catch((err : string)=>{
          console.log('토큰요청_err :', err)
        });
    } 
  };

  const getParamFromUrl = (url : any, param : any) => {
    const params = url.split('#')[1];
    const paramArr = params.split('&');
    for (const p of paramArr) {
      const [key, value] = p.split('=');
      if (key === param) return value;
    }
    return null;
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        style={{ flex: 1 }}
        originWhitelist={['*']}
        injectedJavaScriptBeforeContentLoaded={INJECTED_JAVASCRIPT}
        source={{ uri: naverLoginUrl }}
        onMessage={(event)=> {
          const data = event.nativeEvent;
          handleGetAccessToken(data);
        }}
      />
    </View>
  );
};

export default NaverLoginScreen;
