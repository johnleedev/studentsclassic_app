import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert, Modal, Button } from 'react-native';
import axios from 'axios'
import AppText from '../../../AppText';
import { AntDesign } from '@expo/vector-icons';
import MainURL from '../../MainURL';
import LoginNaver from "./LoginNaver";
import LoginKakao from './LoginKakao';
import Logister from './Logister';

function Login (props : any) {

  const [showModalKakao, setShowModalKakao] = useState<boolean>(false);
  const [showModalNaver, setShowModalNaver] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <View style={styles.mainlogo}>
        <Image source={require('../../../assets/images/mainlogomini.png')} style={styles.img} />
      </View>

      {/* 카카오톡 로그인 */}
      <TouchableOpacity style={styles.loginButtonkakao} onPress={()=>{setShowModalKakao(true)}}>
        <Text style={styles.loginButtonTextkakao}>카카오톡 로그인</Text>
      </TouchableOpacity>

      <Modal visible={showModalKakao} animationType="slide">
        <LoginKakao 
          closeModal={() => setShowModalKakao(false)} 
          setIsLoggedIn={props.setIsLoggedIn}
        />
      </Modal>

      {/* 네이버 로그인 */}
      <TouchableOpacity style={styles.loginButtonNaver} onPress={()=>{setShowModalNaver(true)}}>
        <Text style={styles.loginButtonTextNaver}>네이버 로그인</Text>
      </TouchableOpacity>

      <Modal visible={showModalNaver} animationType="slide">
        <LoginNaver
          closeModal={() => setShowModalNaver(false)} 
          setIsLoggedIn={props.setIsLoggedIn}
        />
      </Modal>

      <TouchableOpacity
        style={{ marginTop: 50 }}
        hitSlop={{ top: 15, bottom: 15 }}
        onPress={() => {
          props.navigation.navigate("Logister");
        }}>
        <AppText style={{ textDecorationLine: 'underline' }}>회원가입</AppText>
      </TouchableOpacity>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#faf7f2',
  },
  mainlogo: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    height: 250,
  },
  img: {
    width: 250,
    height: 250,
  },
  loginButtonkakao : {
    backgroundColor: '#fef01b',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10
  },
  loginButtonTextkakao: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginButtonNaver : {
    backgroundColor: '#03C75A',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10
  },
  loginButtonTextNaver: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default Login;