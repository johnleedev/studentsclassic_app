import React, { useState, useCallback, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import MainURL from '../../MainURL';
import AppText from '../../../AppText';
import SelectDropdown from 'react-native-select-dropdown'

function Logister (props : any) {

  const [userAccount, setUserAccount] = useState('');
  const [userName, setUserName] = useState('');
  const [userNameMessage, setUserNameMessage] = useState('');
  const [isUserName, setIsUserName] = useState(false);

  const [isUserIDAvailable, setIsUserIDAvailable] = useState(true);

  const schools = ["가천대학교", "경북대학교", "경희대학교", "계명대학교", "국민대학교", 
    "군산대학교", "단국대학교", "대구가톨릭대", "목원대학교", "서울대학교", "서울사이버대", 
    " 성신여대", "수원대학교", "숙명여대", "연세대학교", "영남대학교", "이화여대", "전주대학교", 
    "제주대학교", "중앙대학교", "추계예술대", "한세대학교", "한양대학교", "한예종"]

  const sch_num = ["25", "24", "23", "22", "21", "20", "19", "18", "17", "16", "15", "14", "13", 
          "12", "11", "10", "09", "08", "07", "06", "05", "04", "03", "02", "01", "00", "99이상"]

  const part = ["Soprano", "Mezze", "Tenor", "Baritone", "Bass"]

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

  const handleSignup = () => {
    if (userName !== null) {
      axios
        .post(`${MainURL}/login/logisterdo`, {
          userName: userName
        })
        .then((res) => {
          if (res.data === userName) {
            Alert.alert('회원가입이 완료되었습니다!');
            props.closeModallogister();
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

  const handleCheckAvailability = useCallback(() => {
    axios
      .post(`${MainURL}/login/searchid`, { userName })
      .then((res) => {
        setIsUserIDAvailable(res.data);
      })
      .catch((error) => {
        setIsUserIDAvailable(true);
      });
  }, [userName]);

  

  return (
    <View style={styles.container}>
    
      <View style={styles.titleContainer}>
        <Text style={styles.title}>회원가입</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.inputContainer}>

        <AppText>게정(이메일)*</AppText>
        <TextInput
          style={styles.input}
          placeholder="e-mail"
          placeholderTextColor='gray'
          // onChangeText={onChangeUserName}
          value={userAccount}
        />
        {userName.length > 0 && (
          <Text style={[styles.message, isUserName ? styles.success : styles.error]}>
            {userNameMessage}
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
            
          }}
        />
                
        <AppText>학번*</AppText>
        <SelectDropdown
          data={sch_num}
          buttonStyle={styles.input}
          defaultButtonText= '선택'
          onSelect={(selectedItem, index) => {
            
          }}
        />

        <AppText>파트*</AppText>
        <SelectDropdown
          data={part}
          buttonStyle={styles.input}
          defaultButtonText= '선택'
          onSelect={(selectedItem, index) => {
            
          }}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>회원가입</Text>
        </TouchableOpacity>

        <View style={styles.linksContainer}>
          <TouchableOpacity onPress={() => {
            props.closeModallogister();
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
