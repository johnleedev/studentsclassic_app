import React, { useState, useCallback, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import MainURL from '../../MainURL';
import AppText from '../../../AppText';
import SelectDropdown from 'react-native-select-dropdown'

function Logister (props : any) {

  const navi_dataSet = () => {
    if(props.route.params === null || props.route.params === undefined) {
      return
    } else {
      const navigation_data = props.route.params.data
      setUserAccount(navigation_data.email);
      setUserName(navigation_data.name);
    }
  }

  useEffect(()=>{
    navi_dataSet();
  }, [])

  const [userAccount, setUserAccount] = useState('');
  const [userName, setUserName] = useState('');
  const [userSchool, setUserSchool] = useState('');
  const [userSchNum, setUserSchNum] = useState('');
  const [userPart, setUserPart] = useState('');

  const [userAccountMessage, setUserAccountMessage] = useState('');
  const [isUserAccount, setIsUserAccount] = useState(false);
  const [userNameMessage, setUserNameMessage] = useState('');
  const [isUserName, setIsUserName] = useState(false);

  const schools = ["가천대학교", "경북대학교", "경희대학교", "계명대학교", "국민대학교", 
    "군산대학교", "단국대학교", "대구가톨릭대", "목원대학교", "서울대학교", "서울사이버대", 
    " 성신여대", "수원대학교", "숙명여대", "연세대학교", "영남대학교", "이화여대", "전주대학교", 
    "제주대학교", "중앙대학교", "추계예술대", "한세대학교", "한양대학교", "한예종"]

  const sch_num = ["25학번", "24학번", "23학번", "22학번", "21학번", "20학번", "19학번", "18학번", "17학번", "16학번", "15학번", "14학번", "13학번", 
          "12학번", "11학번", "10학번", "09학번", "08학번", "07학번", "06학번", "05학번", "04학번", "03학번", "02학번", "01학번", "00학번", "99학번 이상"]

  const part = ["Soprano", "Mezze", "Tenor", "Baritone", "Bass"]


  const onChangeUserAccount = (text : any) => {
    const userNameRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    setUserAccount(text);
    if (!userNameRegex.test(text)) {
      setUserAccountMessage('email 형식이 올바르지 않습니다.');
      setIsUserAccount(false);
    } else {
      setUserAccountMessage('올바른 형식의 메일입니다.');
      setIsUserAccount(true);
    }
  };

  const onChangeUserName = (text : any) => {
    const userNameRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    setUserName(text);
    if (!userNameRegex.test(text)) {
      setUserNameMessage('한글로 입력해주세요.');
      setIsUserName(false);
    } else if (text.length < 2 || text.length > 5) {
      setUserNameMessage('2글자 이상 5글자 미만으로 입력해주세요.');
      setIsUserName(false);
    } else {
      setUserNameMessage('올바른 형식의 이름입니다.');
      setIsUserName(true);
    }
  };

  // 회원가입하기
  const handleSignup = () => {
    if (userName !== null && userAccount !== null) {
      axios
        .post(`${MainURL}/login/logisterdo`, {
          userAccount: userAccount,
          userName: userName,
          userSchool: userSchool,
          userSchNum: userSchNum,
          userPart: userPart
        })
        .then((res) => {
          if (res.data === userName) {
            Alert.alert('회원가입이 완료되었습니다!');
            asycData();
            props.navigation.navigate("MyPageMain");
          } else {
            Alert.alert('다시 시도해 주세요.');
          }
        })
        .catch(() => {
          console.log('실패함');
        });
    } else {
      Alert.alert('빈칸을 입력해주세요');
    }
  };

  // AsyncStorage 데이터 저장하기
  const asycData = async () => {
    try {
      await AsyncStorage.setItem('name', userName);
      await AsyncStorage.setItem('school', userSchool);
      await AsyncStorage.setItem('schNum', userSchNum);
      await AsyncStorage.setItem('part', userPart);
    } catch (error) {
      console.log('AsycSet_err', error);
    }
  };
 

  return (
    <View style={styles.container}>
    
      <View style={styles.titleContainer}>
        <Text style={styles.title}>회원가입</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.inputContainer}>

        <AppText>계정(이메일)*</AppText>
        <TextInput
          style={styles.input}
          placeholder="e-mail"
          placeholderTextColor='gray'
          onChangeText={onChangeUserAccount}
          value={userAccount}
        />
        {userAccount.length > 0 && (
          <Text style={[styles.message, isUserAccount ? styles.success : styles.error]}>
            {userAccountMessage}
          </Text>
        )}
       
        <AppText>이름*</AppText>
        <TextInput
          style={styles.input}
          placeholder="이름"
          placeholderTextColor='gray'
          onChangeText={onChangeUserName}
          value={userName}
        />
        {userName.length > 0 && (
          <Text style={[styles.message, isUserName ? styles.success : styles.error]}>
            {userNameMessage}
          </Text>
        )}
        
        <AppText>학교*</AppText>
        <SelectDropdown
          data={schools}
          buttonStyle={styles.input}
          defaultButtonText= '선택'
          onSelect={(selectedItem, index) => {
            setUserSchool(selectedItem);
          }}
        />
                
        <AppText>학번*</AppText>
        <SelectDropdown
          data={sch_num}
          buttonStyle={styles.input}
          defaultButtonText= '선택'
          onSelect={(selectedItem, index) => {
            setUserSchNum(selectedItem);
          }}
        />

        <AppText>파트*</AppText>
        <SelectDropdown
          data={part}
          buttonStyle={styles.input}
          defaultButtonText= '선택'
          onSelect={(selectedItem, index) => {
            setUserPart(selectedItem);
          }}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>가입하기</Text>
        </TouchableOpacity>

        <View style={styles.linksContainer}>
          <TouchableOpacity onPress={() => {
            setUserAccount('');
            setUserName('');
            setUserSchool('');
            setUserSchNum('');
            setUserPart('');
            props.navigation.navigate("Login");
          }}>
            <Text style={styles.linkButton}>나가기</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
      
      
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
 },
  titleContainer: {
    width: '80%',
    alignItems: 'center',
    marginTop: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
  },  
  message: {
    marginBottom: 10,
  },
  success: {
    color: 'green',
  },
  error: {
    color: 'red',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linksContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkButton: {
    color: 'black',
    textDecorationLine: 'underline',
  },
});

export default Logister;
