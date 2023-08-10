import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppText from '../../AppText';
import MainURL from '../../MainURL';

function ProfileEdit (props : any) {

  const [modalVisible, setModalVisible] = useState(props.modalVisible);
  
  const [name, setName] = useState<string>(props.userName);
  const [school, setSchool] = useState<string>(props.userSchool);
  const [schNum, setSchNum] = useState<string>(props.userSchNum);
  const [part, setPart] = useState<string>(props.userPart);
  
  const [originName, setoriginName] = useState<string>(props.userName);
  const [originSchool, setoriginSchool] = useState<string>(props.userSchool);
  const [originSchNum, setoriginSchNum] = useState<string>(props.userSchNum);

  const handleProfileUpdate = async () => {
    try {
      await axios
          .post(`${MainURL}/login/editprofile`, {
            originName : originName, originSchool : originSchool, originSchNum : originSchNum,
            name: name, school: school, part: part, schNum: schNum,
          })
          .then((res) => {
            if (res.data) {
              changeProfile(res.data.userName, res.data.school, res.data.part, res.data.schNum)

              props.setName(res.data.userName)
              props.setSchool(res.data.school)
              props.setPart(res.data.part)
              props.setSchNum(res.data.schNum)
              
            } else {
              console.log('EditProfile failed!');
            }})
          .catch(() => {
            console.log('EeditProfile failed!');
          });
    } catch (error) {
      console.log('EeditProfile failed!', error);
    }
    props.setModalVisible(!modalVisible)
  };

  const changeProfile = async (data1 : string, data2 : string, data3 : string, data4 : string) => {
    try {
      await AsyncStorage.mergeItem('이름', data1);
      await AsyncStorage.mergeItem('학교', data2);
      await AsyncStorage.mergeItem('파트', data3);
      await AsyncStorage.mergeItem('학번', data4);
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.editBox1}>
        <AppText style={styles.title}>프로필 수정</AppText> 
      </View>
      <View style={styles.editBox2}>
        <AppText style={styles.label}>이름</AppText>
        <TextInput style={styles.input} value={name} onChangeText={setName} />

        <AppText style={styles.label}>학교</AppText>
        <TextInput style={styles.input} value={school} onChangeText={setSchool} />

        <AppText style={styles.label}>파트</AppText>
        <TextInput style={styles.input} value={part} onChangeText={setPart} />

        <AppText style={styles.label}>학번</AppText>
        <TextInput style={styles.input} value={schNum} onChangeText={setSchNum} />

        <TouchableOpacity style={styles.button} onPress={handleProfileUpdate}>
          <AppText style={styles.buttonText}>수정하기</AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  editBox1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 25
  },
  editBox2: {
    flex: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    textAlign: 'center'
  },
  button: {
    backgroundColor: 'blacke',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProfileEdit;
