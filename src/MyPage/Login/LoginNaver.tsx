import React from 'react';
import { View, Alert } from 'react-native';
import { WebView } from 'react-native-webview';

const NaverLoginScreen = () => {

  const YOUR_CLIENT_ID = 'NJivxK1ooCxnPodocRjp';
  const YOUR_CALLBACK_URL = 'https://www.studentsclassic.com/';
  const INJECTED_JAVASCRIPT : string = `window.ReactNativeWebView.postMessage('')`

  // 네이버 로그인 콜백 URL을 감지하고 결과를 처리하는 함수
  const handleNavigationStateChange = (navState : any) => {
    if (navState.url.startsWith(YOUR_CALLBACK_URL)) {
      // 접근 토큰 값 출력
      const access_token = getParamFromUrl(navState.url, 'access_token');
      Alert.alert('Access Token', access_token);
      // 네이버 사용자 프로필 조회
      
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

  const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=token&client_id=${YOUR_CLIENT_ID}&redirect_uri=${YOUR_CALLBACK_URL}&state=YOUR_UNIQUE_STATE`;

  return (
    <View style={{ flex: 1 }}>
      <WebView
        style={{ flex: 1 }}
        originWhitelist={['*']}
        injectedJavaScriptBeforeContentLoaded={INJECTED_JAVASCRIPT}
        source={{ uri: naverLoginUrl }}
        onMessage={(event)=> {
          const data = event.nativeEvent;
          handleNavigationStateChange(data);
        }}
      />
    </View>
  );
};

export default NaverLoginScreen;
