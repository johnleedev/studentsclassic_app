import React, {Component} from "react";
import { View, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { WebView } from 'react-native-webview';
import axios from "axios";
import MainURL from '../../MainURL';

function LoginKakao (props : any) {

  const REST_API_KEY = 'ece291900807a6c37ef7506bac5c1c40';
  const REDIRECT_URI = 'https://www.studentsclassic.com/';
  const INJECTED_JAVASCRIPT : string = `window.ReactNativeWebView.postMessage('')`
  var authorize_code : any;

  // 인가코드필터 - 인가코드를 "code="를 제외하고 나머지만 가져오는 함수
  function KakaoLoginWebView (data : string) {
    const exp = "code=";
    var condition = data.indexOf(exp);
    if (condition != -1) {
      authorize_code = data.substring(condition + exp.length);
      console.log('authorize_code : ', authorize_code);
      requestToken(authorize_code);
    };
  }

  // 인가코드를 통해, 토큰을 받아오는 함수
  const requestToken = async (authorize_code : string) => {
    var AccessToken = "";
    var token_url = "https://kauth.kakao.com/oauth/token";
    axios({
        method: "post",
        url: token_url,
        params: {
            grant_type: 'authorization_code',
            client_id: REST_API_KEY,
            redirect_uri: REDIRECT_URI,
            code: authorize_code,
        },
    }).then((res: any)=>{
        AccessToken = res.data.access_token;
        console.log('AccessToken : ', AccessToken);
        // 발급받은 토큰을 백엔드로 보냄
        axios
          .post(`${MainURL}/login/loginkakao`, {
            AccessToken: AccessToken,
          })
          .then((res: any)=>{
            if (res) {
              console.log(res.data);
              // const name = res.data.name;
              props.setIsLoggedIn(true);
              // storeData(AccessToken, name)
            }
          }).catch((err : string)=>{
            console.log('토큰요청_err :', err)
          });
    }).catch((err : string)=>{
      console.log('requestToken_error : ', err);
    });
  };

  // AsyncStorage에 유저 정보 저장하기
  // const storeData = async (token : string, name : string, gender : string, birthday : string) => {
  //   if (token && name && gender && birthday) {
  //     try {
  //       await AsyncStorage.setItem('token', token);
  //       await AsyncStorage.setItem('name', name);
  //       await AsyncStorage.setItem('gender', gender);
  //       await AsyncStorage.setItem('birthday', birthday);
  //     } catch (err) {
  //       console.log('AsyncStorage_set_err : ', err)
  //     }
  //   } else {
  //     console.log('token && name && gender && birthday 값이 없습니다.', )
  //   }
    
  // }

  const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`

  return (
    <View style={Styles.container}>      
      <WebView
        style={{ flex: 1 }}
        originWhitelist={['*']}
        injectedJavaScriptBeforeContentLoaded={INJECTED_JAVASCRIPT}
        source={{ uri: kakaoLoginUrl }}
        onMessage={(event)=> {
          const url = event.nativeEvent.url;
          KakaoLoginWebView(url)
        }}
      />
    </View>
  )
}

export default LoginKakao;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },    
});