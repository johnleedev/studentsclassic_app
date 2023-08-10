import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Pressable, Alert, Image, ScrollView } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons, MaterialIcons, AntDesign, Entypo } from '@expo/vector-icons';
import AsyncGetItem from '../AsyncGetItem'

function MyPageMain (props: any) {

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
 
  const handleLogout = () => {
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('name');
    AsyncStorage.removeItem('school');
    AsyncStorage.removeItem('schNum');
    AsyncStorage.removeItem('part');
    Alert.alert('로그아웃 되었습니다.');
    props.navigation.replace("Navi_Login")
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
         <Text style={styles.name}>{asyncGetData.userName}님, 환영합니다.</Text>  
      </View> 

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>회원 정보</Text>
        <View style={styles.infoBox}>
          <View style={styles.infoTextBox}>
            <Text style={styles.infoText}>이름: {asyncGetData.userName}</Text>
            <Text style={styles.infoText}>학교: {asyncGetData.userSchool}</Text>
            <Text style={styles.infoText}>학번: {asyncGetData.userSchNum}</Text>
            <Text style={styles.infoText}>파트: {asyncGetData.userPart}</Text>
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
        <TouchableOpacity style={styles.bottomButton} onPress={()=>{
          props.navigation.navigate("개인정보처리방침");
        }}>
          <Entypo name="info" size={20} color="black" />
          <Text style={styles.bottomButtonText}>개인정보처리방침</Text>
          <AntDesign name="right" size={15} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.logoutContainer}>
        <TouchableOpacity
          hitSlop={{ top: 15, bottom: 15 }}
          onPress={handleLogout}
          style={styles.logoutButton}
        >
          <Text style={styles.logoutButtonText}>로그아웃</Text>
        </TouchableOpacity> 
      </View>

    </ScrollView>
  )
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
    flex: 2,
    padding: 20,
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
    marginTop: 15,
  },
  bottomContainer: {
    flex: 1,
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
  logoutContainer : {
    flex: 1,
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
