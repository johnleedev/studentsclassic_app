import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Pressable, Alert, Image } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from './Login/Login';
import { MaterialCommunityIcons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import MainURL from '../MainURL';
import ProfileEdit from './Login/ProfileEdit'
import axios from "axios";

function MyPageMain (props: any) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
 
  const [userName, setUserName] = useState<string>('');
  const [userSchool, setUserSchool] = useState<string>('');
  const [userPart, setUserPart] = useState<string>('');
  const [userSchNum, setUserSchNum] = useState<string>('');

  useEffect(() => {
    getData();
  }, []);

  const getData = useCallback(
    async () => {
      try {
        const Name : any = await AsyncStorage.getItem('name');
        const School : any = await AsyncStorage.getItem('school');
        const Part : any = await AsyncStorage.getItem('part');
        const Number : any = await AsyncStorage.getItem('schNum');
        
        if(Name) {
          setUserName(Name);
          setUserSchool(School);
          setUserPart(Part);
          setUserSchNum(Number);
        } else {
          return
        }

      } catch (error) {
        console.log('AsyncStorage 데이터 가져오기 실패:', error);
      }
  }, [])

  
  

  let removeData = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('name');
      await AsyncStorage.removeItem('gender');
      await AsyncStorage.removeItem('birthday');
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Alert.alert('로그아웃 되었습니다.');
    // if (AccessToken) {
    //   axios ({
    //     method: 'POST',
    //     url: 'https://kapi.kakao.com/v1/user/logout',
    //     headers: {
    //       Authorization : `Bearer ${AccessToken}`
    //     },
    //   }).then((response) => {
    //     console.log('카카오 로그아웃되었습니다.');
    //   }).catch(function (error) {
    //     console.log('error', error);
    //   })
    // }
    removeData();
  };

  return isLoggedIn ?
  (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        
        <Text style={styles.name}>{userName}님, 환영합니다.</Text>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <ProfileEdit 
          modalVisible={modalVisible} setModalVisible={setModalVisible}
          // name={name} school={school} part={part} sch_num={sch_num}
          // setName={setName} setSchool={setSchool} setPart={setPart} setSch_num={setSch_num}
          />
        </Modal>

        <TouchableOpacity style={styles.editProfileButton} onPress={()=>{
            setModalVisible(true)
          }}>
        <Text style={styles.editProfileButtonText}>프로필 수정</Text>
        </TouchableOpacity>
      </View> 

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>회원 정보</Text>
        <View style={styles.infoBox}>
          <View style={styles.infoTextBox}>
            <Text style={styles.infoText}>{userName}</Text>
            {/* <Text style={styles.infoText}>{gender}</Text>
            <Text style={styles.infoText}>{birthday}</Text> */}
          </View>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.bottomTitle}>기타</Text>
        <TouchableOpacity style={styles.bottomButton} onPress={()=>{
           props.navigation.navigate("공지사항");
        }}>
          <MaterialCommunityIcons name="bullhorn-variant-outline" size={20} color="black" />
          <Text style={styles.bottomButtonText}>공지사항</Text>
          <AntDesign name="right" size={15} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton} onPress={()=>{
           props.navigation.navigate("문의하기");
        }}>
          <AntDesign name="questioncircleo" size={20} color="black" />
          <Text style={styles.bottomButtonText}>문의하기</Text>
          <AntDesign name="right" size={15} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton} onPress={()=>{
           props.navigation.navigate("광고&제휴");
        }}>
          <MaterialCommunityIcons name="advertisements" size={20} color="black" />
          <Text style={styles.bottomButtonText}>광고 및 제휴</Text>
          <AntDesign name="right" size={15} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton} onPress={()=>{
          props.navigation.navigate("약관&정책");
        }}>
          <MaterialIcons name="policy" size={20} color="black" />
          <Text style={styles.bottomButtonText}>약관 및 정책</Text>
          <AntDesign name="right" size={15} color="black" />
        </TouchableOpacity>
      </View>


      <TouchableOpacity
        hitSlop={{ top: 15, bottom: 15 }}
        onPress={handleLogout}
        style={styles.logoutButton}
      >
        <Text style={styles.logoutButtonText}>로그아웃</Text>
      </TouchableOpacity> 

    </View>
  ) : <Login navigation={props.navigation} setIsLoggedIn={setIsLoggedIn}/>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  profileContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  editProfileButton: {
    marginTop: 10,
  },
  editProfileButtonText: {
    fontSize: 16,
    color: '#555',
    textDecorationLine: 'underline',
  },
  infoContainer: {
    flex: 1,
    padding: 20,
    marginBottom: 20
  },
  infoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  infoImgBox: {
    width: 100,
    height: 100,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoImg: {
    width: 80,
    height: 80,
  },
  infoTextBox: {
    flex: 1,
  },
  infoText: {
    fontSize: 18,
    marginBottom: 5,
  },
  bottomContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  bottomTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bottomButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 35
  },
  bottomButtonText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#555',
  },
  logoutButton: {
    padding: 10,
    borderRadius: 5,
    margin: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  logoutButtonText: {
    color: 'gray',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  }
});

export default MyPageMain;
