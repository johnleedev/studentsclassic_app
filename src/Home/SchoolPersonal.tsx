import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Image, ScrollView, Modal } from 'react-native';
import MainURL from "../../MainURL";
import axios from 'axios';
import { Typography } from '../Components/Typography';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useRoute } from '@react-navigation/native';
import { SubTitle } from '../Components/SubTitle';
import { Title } from '../Components/Title';
import { Divider } from '../Components/Divider';
import Entypo from 'react-native-vector-icons/Entypo';
import WebView from 'react-native-webview';


export default function SchoolPersonal (props : any) {

  const route : any = useRoute();

  // 사진 보기 모달
  const [selectedPhoto, setSelectedPhoto] = useState('');
  const [isViewPhotoModalVisible, setViewPhotoModalVisible] = useState(false);
  const viewPhotoToggleModal = () => {
    setViewPhotoModalVisible(!isViewPhotoModalVisible);
  };


  return (
    <View style={{flex:1}}>
    <View style={{backgroundColor:'#fff'}}>
      <SubTitle title={route.params.data?.userName} enTitle='user' navigation={props.navigation}/>
    </View>
    <ScrollView style={styles.container}>
      <View style={styles.infoContainer}>
        <Typography fontSize={24}>기본 정보</Typography>
         <View style={styles.infoBox}>
          <View style={styles.infoTextBox}>
            <Typography marginBottom={10} fontWeight='normal'>
              <Entypo name="beamed-note" size={16} color="black"/> 이름: {route.params.data?.userName}
            </Typography>
            <Typography marginBottom={10} fontWeight='normal'>
              <Entypo name="beamed-note" size={16} color="black"/> 학교: {route.params.data?.userSchool}
            </Typography>
            <Typography marginBottom={10} fontWeight='normal'>
              <Entypo name="beamed-note" size={16} color="black"/> 학번: <Text style={{fontWeight: '500'}}>{route.params.data?.userSchNum}</Text>
            </Typography>
            <Typography marginBottom={10} fontWeight='normal'>
              <Entypo name="beamed-note" size={16} color="black"/> 파트: <Text style={{fontWeight: '500'}}>{route.params.data?.userPart}</Text>
            </Typography>
          </View>
        </View>
      </View>

      <Divider height={2}/>
      
     <View style={styles.infoContainer}>
        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
          <Typography fontSize={24}>추가 정보</Typography>
        </View>
        <View style={styles.infoBox}>
          <View style={styles.infoTextBox}>
            <View style={{marginBottom:15}}>
              <Typography marginBottom={5} fontWeight='normal'>
                <Entypo name="beamed-note" size={16} color="black"/> 연락처
              </Typography>
              {
                route.params.data.contactNum !== null &&  route.params.data.contactNum !== 'undefined' && route.params.data.contactNum[0] !== undefined
                ?
                <View style={{padding:10, borderWidth:1, borderColor:'#EAEAEA', borderRadius:10}}>
                  <Typography fontWeight='500'>{route.params.data?.contactWhich === '1' ? '핸드폰': '카톡아이디'}: {route.params.data?.contactNum}</Typography>
                </View>
                :
                <Typography fontWeight='500' color='#8C8C8C' fontSize={12}>입력된 연락처가 없습니다.</Typography>
              }
            </View>
            <View style={{marginBottom:15}}>
              <Typography marginBottom={5} fontWeight='normal'>
                <Entypo name="beamed-note" size={16} color="black"/> 이력
              </Typography>
              {
                route.params.data.carrerInputs !== null && route.params.data.carrerInputs !== 'undefined' 
                ? 
                ( <View style={{ padding: 10, borderWidth: 1, borderColor: '#EAEAEA', borderRadius: 10 }}>
                    {route.params.data.carrerInputs.map((item :any, index:any) => (
                      <View key={index} style={{marginVertical:7}}>
                        <Typography fontWeight='500'>・ {item}</Typography>
                      </View>
                    ))}
                  </View>
                ) : (
                  <Typography fontWeight='500' color='#8C8C8C' fontSize={12}>입력된 이력이 없습니다.</Typography>
                )
              }
            </View>

            <View style={{marginBottom:15}}>
              <Typography marginBottom={5} fontWeight='normal'>
                <Entypo name="beamed-note" size={16} color="black"/> 사진
              </Typography>
              {
                route.params.data.imageNames!== null && route.params.data.imageNames !== 'undefined' && route.params.data.imageNames[0] !== undefined
                ?
                <View style={{height:110, flexDirection:'row', justifyContent:'space-between',
                              padding:10, borderWidth:1, borderColor:'#EAEAEA', borderRadius:10}}>
                  {
                    route.params.data.imageNames.map((item:any, index:any)=>{
                      return (
                        <TouchableOpacity
                          style={{width:'30%', height:100}}
                          key={index}
                          onPress={()=>{
                            setSelectedPhoto(item);
                            viewPhotoToggleModal();
                          }}
                        >
                          <Image style={{width:'100%', height:'100%', resizeMode:'center'}} 
                            source={{ uri: `${MainURL}/images/upload_profile/${item}`}}/>
                          <View style={{backgroundColor:'#333', width:15, height:15, position:'absolute',
                                    alignItems:'center', justifyContent:'center', borderRadius:5}}>
                            <Entypo name="magnifying-glass" size={12} color="#fff"/>
                          </View>
                        </TouchableOpacity>
                      )
                    })
                  }
                </View>
                :
                <Typography fontWeight='500' color='#8C8C8C' fontSize={12}>업로드된 사진이 없습니다.</Typography>
              }
            </View>
            
            <Modal
              animationType="slide" 
              transparent={true}
              visible={isViewPhotoModalVisible}
              onRequestClose={viewPhotoToggleModal}
            >
              <View style={{flex:1, paddingTop:30, backgroundColor:'#fff'}}>
                <TouchableOpacity
                  onPress={viewPhotoToggleModal}
                >
                  <AntDesign name="close" size={20} color="#333" style={{padding:10}}/>
                </TouchableOpacity>
                <WebView
                  style={{}}
                  source={{ uri: `${MainURL}/images/upload_profile/${selectedPhoto}`}}
                />
              </View>
            </Modal>
            
            <View style={{marginBottom:15}}>
              <Typography marginBottom={5} fontWeight='normal'>
                <Entypo name="beamed-note" size={16} color="black"/> 연주 영상
              </Typography>
              {
                route.params.data.videoLinks!== null && route.params.data.videoLinks !== 'undefined' && route.params.data.videoLinks[0] !== ""
                ?
                <View style={{padding:10, borderWidth:1, borderColor:'#EAEAEA', borderRadius:10}}>
                  {
                    route.params.data.videoLinks.map((item:any, index:any)=>{
                      return (
                        <TouchableOpacity 
                          key={index}
                          onPress={()=>Linking.openURL(`${item}`)}
                        >
                          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginVertical:7}}>
                            <Typography fontWeight='500'>・ {index+1}번째 연주 영상</Typography>
                            <AntDesign name="right" size={16} color="black"/>
                          </View>
                        </TouchableOpacity>
                      )
                    })
                  }
                </View>
                :
                <Typography fontWeight='500' color='#8C8C8C' fontSize={12}>입력된 링크 주소가 없습니다.</Typography>
              }
            </View>
          </View>
        </View> 
      </View> 
      <View style={{marginVertical:20}}></View>
    </ScrollView>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white'
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
  infoContainer: {
    flex: 2,
    paddingVertical: 10,
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


