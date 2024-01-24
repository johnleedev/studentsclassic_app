import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Modal, Linking, Image } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncGetItem from '../AsyncGetItem'
import { Typography } from '../Components/Typography';
import { Title } from '../Components/Title';
import { Divider } from '../Components/Divider';
import MyAddInfoRevise from './MyAddInfoRevise';
import axios from 'axios';
import MainURL from "../../MainURL";
import WebView from 'react-native-webview';
import MainVersion from '../../MainVersion';

function MyPageMain (props: any) {

  const [getProfile, setGetProfile] = useState<any>([]);
  const [contactNum, setContactNum] = useState<string>('');
  const [carrerInputs, setCarrerInputs] = useState<any>({});
  const [videoLinks, setVideoLinks] = useState<any>({});
  const [imageNames, setImageNames] = useState<any>({});
  const [asyncGetData, setAsyncGetData] = useState<any>({});
  const [refresh, setRefresh] = useState<boolean>(true);

  const asyncFetchData = async () => {
    try {
      const data = await AsyncGetItem();
      axios.get(`${MainURL}/mypage/getprofile/${data?.userAccount}`).then((res) => {
        setContactNum(res.data.contactNum);
        setCarrerInputs(res.data.carrerInputs);
        setVideoLinks(res.data.videoLinks);
        setImageNames(res.data.imageNames);
        setGetProfile(res.data);
      });
      setAsyncGetData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    asyncFetchData();
  }, [refresh]);
 
  const handleLogout = () => {
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('account');
    AsyncStorage.removeItem('name');
    AsyncStorage.removeItem('school');
    AsyncStorage.removeItem('schNum');
    AsyncStorage.removeItem('part');
    AsyncStorage.removeItem('URL');
    Alert.alert('로그아웃 되었습니다.');
    props.navigation.replace("Navi_Login")
  };

  const deleteAccount = () => {
    props.navigation.navigate("DeleteAccount")
  };
  
  // 프로필 추가 수정하기 모달
  const [isProfileReviseModalVisible, setProfileReviseModalVisible] = useState(false);
  const profileReviseToggleModal = () => {
    setProfileReviseModalVisible(!isProfileReviseModalVisible);
  };

  // 사진 보기 모달
  const [selectedPhoto, setSelectedPhoto] = useState('');
  const [isViewPhotoModalVisible, setViewPhotoModalVisible] = useState(false);
  const viewPhotoToggleModal = () => {
    setViewPhotoModalVisible(!isViewPhotoModalVisible);
  };

  return (
    <View style={{flex:1}}>
    <ScrollView style={styles.container}>
      
      <Title title='마이페이지' enTitle='My Page' />
      
      <Divider height={2} />
      <View style={styles.section}>
        <Typography fontSize={24}>기본 정보</Typography>
        <View style={styles.infoBox}>
          <View style={styles.infoTextBox}>
            <Typography marginBottom={10} fontWeight='normal'>
              <Entypo name="beamed-note" size={16} color="black"/> 이름: {asyncGetData.userName}
            </Typography>
            <Typography marginBottom={10} fontWeight='normal'>
              <Entypo name="beamed-note" size={16} color="black"/> 학교: {asyncGetData.userSchool}
            </Typography>
            <Typography marginBottom={10} fontWeight='normal'>
              <Entypo name="beamed-note" size={16} color="black"/> 학번: <Text style={{fontWeight: '500'}}>{asyncGetData.userSchNum}</Text>
            </Typography>
            <Typography marginBottom={10} fontWeight='normal'>
              <Entypo name="beamed-note" size={16} color="black"/> 파트: <Text style={{fontWeight: '500'}}>{asyncGetData.userPart}</Text>
            </Typography>
            <Typography marginBottom={10} fontWeight='normal'>
              <Entypo name="beamed-note" size={16} color="black"/> 로그인 방식: <Text style={{fontWeight: '500'}}>{asyncGetData.userURL}</Text>
            </Typography>
          </View>
        </View>
      </View>

      <Divider height={2}/>
     
      <Modal
        animationType="slide" 
        transparent={true}
        visible={isProfileReviseModalVisible}
        onRequestClose={profileReviseToggleModal}
      >
        <MyAddInfoRevise 
          profileReviseToggleModal={profileReviseToggleModal}
          asyncGetData={asyncGetData}
          refresh={refresh}
          setRefresh={setRefresh}
          getProfile={getProfile}
        />
      </Modal>

      <Divider height={2}/>

      <View style={styles.section}>
        <Text style={styles.bottomTitle}>기타</Text>
        <TouchableOpacity style={styles.bottomButton} onPress={()=>{
           props.navigation.navigate("Notice");
        }}>
          <Feather name="clipboard" size={20} color="black" style={{marginRight:15}}/>
          <View style={styles.bottomButtonRow}>
            <Typography color='#555' fontWeight='normal'>공지사항</Typography>
            <AntDesign name="right" size={15} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton} onPress={()=>{
           props.navigation.navigate("Question");
        }}>
          <AntDesign name="questioncircleo" size={20} color="black" style={{marginRight:15}}/>
          <View style={styles.bottomButtonRow}>
            <Typography color='#555' fontWeight='normal'>문의하기</Typography>
            <AntDesign name="right" size={15} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton} onPress={()=>{
           props.navigation.navigate("Report");
        }}>
          <MaterialCommunityIcons name="bullhorn-variant-outline" size={20} color="black" style={{marginRight:15}}/>
          <View style={styles.bottomButtonRow}>
            <Typography color='#555' fontWeight='normal'>신고하기</Typography>
            <AntDesign name="right" size={15} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton} onPress={()=>{
           props.navigation.navigate("Advertising");
        }}>
          <MaterialCommunityIcons name="advertisements" size={20} color="black" style={{marginRight:15}}/>
          <View style={styles.bottomButtonRow}>
            <Typography color='#555' fontWeight='normal'>광고 및 제휴</Typography>
            <AntDesign name="right" size={15} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton} onPress={()=>{
          props.navigation.navigate("Policy");
        }}>
          <MaterialIcons name="policy" size={20} color="black" style={{marginRight:15}}/>
          <View style={styles.bottomButtonRow}>
            <Typography color='#555' fontWeight='normal'>약관 및 정책</Typography>
            <AntDesign name="right" size={15} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton} onPress={()=>{
          props.navigation.navigate("PersonInfo");
        }}>
          <Entypo name="info" size={20} color="black" style={{marginRight:15}}/>
          <View style={styles.bottomButtonRow}>
            <Typography color='#555' fontWeight='normal'>개인정보처리방침</Typography>
            <AntDesign name="right" size={15} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton} onPress={()=>{
          props.navigation.navigate("BusinessInfo");
        }}>
          <FontAwesome name="building-o" size={20} color="black" style={{marginRight:15}}/>
          <View style={styles.bottomButtonRow}>
            <Typography color='#555' fontWeight='normal'>사업자정보</Typography>
            <AntDesign name="right" size={15} color="black" />
          </View>
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

      <TouchableOpacity
        hitSlop={{ top: 15, bottom: 15 }}
        style={styles.deleteAccountContainer}
        onPress={deleteAccount}
      >
        <Text style={styles.deleteAccountText}>회원탈퇴를 하시려면 여기를 눌러주세요</Text>
      </TouchableOpacity> 

      <View style={{marginBottom: 30, alignItems:'flex-end', marginRight:20}}>
                                     {/* MainURL확인하기 & splash.tsx & result.tsx(Login) 확인하기 */}
        <Typography fontSize={10} color='#8C8C8C'>버전정보 : {MainVersion}</Typography>
      
      </View>

    </ScrollView>

    <View style={isViewPhotoModalVisible ? styles.modalBackCover :  { display: 'none'}}></View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  section : {
    padding: 20,
  },
  profileContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
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
  bottomContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: 10,
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
  bottomButtonRow: {
    flex:1, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center'
  },
  logoutContainer : {
    flex: 1,
  },
  logoutButton: {
    padding: 10,
    borderRadius: 5,
    margin: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  logoutButtonText: {
    color: 'gray',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  deleteAccountContainer : {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: 20,
    height: 50,
  },
  deleteAccountText: {
    color: 'gray',
    textDecorationLine:'underline',
    fontSize: 12
  },
  modalBackCover : {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#333',
    opacity: 0.8
  },
});

export default MyPageMain;
