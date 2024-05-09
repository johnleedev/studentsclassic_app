import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView, 
        Alert, Linking, KeyboardAvoidingView, Platform, RefreshControl, ImageBackground } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { Typography } from '../Components/Typography';
import AsyncGetItem from '../AsyncGetItem'
import { Title } from '../Components/Title';
import Swiper from 'react-native-swiper'
import MainImageURL from "../../MainImageURL";
import axios from 'axios';
import MainURL from "../../MainURL";
import SuggestionBoard from './SuggestionBoard';
import {checkNotifications, requestNotifications} from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';
import { Divider } from '../Components/Divider';
import Clipboard from '@react-native-clipboard/clipboard';
import RequestBoard from './RequestBoard';
import { useRecoilState } from 'recoil';
import { recoilIsViewedMainModal } from '../RecoilStore';

function HomeMain(props : any) {

  // 스크롤뷰 리프레쉬
  const [refresh, setRefresh] = useState<boolean>(false);

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

  // 게시판 최신 글 가져오기
  const [posts, setposts] = useState<any>([]);
  const [advs, setAdvs] = useState<any>([]);
  const [mainModal, setMainModal] = useState<any>();
  const [isViewedMainModal, setIsViewedMainModal] = useRecoilState(recoilIsViewedMainModal);
  const fetchPosts = () => {
    axios.get(`${MainURL}/board/posts/get`).then((res) => {
      let copy: any = [...res.data];
      copy.reverse();
      setposts(copy);
    });
    axios.get(`${MainURL}/home/getadvertise`).then((res) => {
      let copy: any = [...res.data];
      const mainModalCopy = copy.filter((item:any)=> item.imageName === 'mainModal');
      if (mainModalCopy[0].url !== "") {
        setMainModal(mainModalCopy[0]);
      }
      const advResult = copy.filter((item:any)=> item.imageName !== 'mainModal');
      advResult.reverse();
      setAdvs(advResult);
    });
   };
  
  useEffect(() => {
    asyncFetchData();
    fetchPosts();
  }, [refresh]);


  // 이벤트 함수
  const handleevent = async () => {
    Clipboard.setString('https://studentsclassic.page.link/3N7P')
    Alert.alert('초대링크가 복사되었습니다.')
  }  

  // 알림 허용 여부 확인
  const handleCheckNotifications = async () => {
    const check = await checkNotifications();
    if (check.status === 'denied' || check.status === 'blocked'){
      requestNotifications(['alert', 'sound']).then(()=>{
        if (check.status === 'denied' || check.status === 'blocked') {
          Alert.alert('알림을 허용해주세요', '', [
            { text: '취소', onPress: () => {return }},
            { text: '허용', onPress: () => Linking.openSettings() }
          ]);
        }
      })
    } else if (check.status === 'granted') {
      props.navigation.navigate("Navi_Notifi", {screen:"Notification", params: { userAccount: asyncGetData.userAccount }});
    } else {
      return
    }
  }  
  
  // background 상태일 때, 알림 받기
  useEffect(()=>{
    messaging().onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage) {
        props.navigation.navigate("Navi_Home", {screen:"Notification"});
      }
    });;
  }, []); 

  // quit 상태일 때, 알림 받기
  useEffect(()=>{
    messaging().getInitialNotification().then(remoteMessage => {
      if (remoteMessage) {
        props.navigation.navigate("Navi_Home", {screen:"Notification"});
      }
    });;
  }, []); 

  // forground 상태일 때, 알림 받기
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (remoteMessage) {
        Toast.show({
          type: 'success',
          text1: remoteMessage.notification?.title,
          text2: remoteMessage.notification?.body,
          onPress() {
            props.navigation.navigate("Navi_Home", {screen:"Notification"});
          }
        })
      }
    });;
    return unsubscribe
  }, []);

  
  return (
    <View style={styles.container}>

      {
        mainModal !== undefined && mainModal.url !== null && !isViewedMainModal &&
        <>
          <View style={{position:'absolute', top:0, width:'100%', height:'100%',
                        alignItems:'center', justifyContent:'center', zIndex:8}}>
            <View style={{width:'100%', backgroundColor:'#fff', padding:20, zIndex:9}}>
              <View style={{borderWidth:1, width:'100%', alignItems:'center', padding:20, borderRadius:10}}>
                <Typography fontSize={20} fontWeightIdx={0} marginBottom={20}>NOTICE</Typography>
                <Typography>{mainModal?.url}</Typography>
              </View>            
              <TouchableOpacity 
                style={{marginTop:10, alignItems:'flex-end', paddingHorizontal:10}}
                onPress={()=>{setIsViewedMainModal(true)}}
              >
                <Typography>닫기 X</Typography>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{position:'absolute', width:'100%', height:'100%', backgroundColor:'#333', opacity:0.5, zIndex:7}}></View>
        </>
      }

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 100}
        style={{flex:1}}
      >
      <ScrollView 
        style={{flex:1}}
      >
        <View style={{height:300}}>
          <ImageBackground
            source={require("../images/stage.jpeg")}
            style={{width:"100%",height:"100%"}}>
          </ImageBackground>
          <View style={{position:'absolute',left:20, top:20}}>
            <View style={{width:'100%', flexDirection: 'row', justifyContent:'flex-end', paddingRight:30, marginBottom:5}}>
              <TouchableOpacity 
                hitSlop={{ top: 15, bottom: 15 }}
                onPress={handleevent}
              >
                <AntDesign name="sharealt" size={24} color="#fff" style={{width: 30, marginRight: 5}}/>
              </TouchableOpacity>
              <TouchableOpacity 
                hitSlop={{ top: 15, bottom: 15 }}
                onPress={handleCheckNotifications}
              >
                <AntDesign name="bells" size={24} color="#fff" style={{width: 30, marginRight: 5}}/>
              </TouchableOpacity>
            </View>  
            <View>
              <Typography color='#fff' fontSize={20} marginBottom={5} fontWeightIdx={0}>성악과 학생들의 </Typography>
              <Typography color='#fff' fontSize={20} marginBottom={10} fontWeightIdx={0}>커뮤니티 플랫폼</Typography>
              <Typography color='#fff' fontSize={12} marginBottom={5} fontWeightIdx={0}>"성악과학생들"은</Typography>
              <Typography color='#fff' fontSize={12} marginBottom={5} fontWeightIdx={0}>모든 성악도 학생들을 응원합니다.</Typography>
            </View>
          </View>
        </View>

        <Divider height={5} />

        {/* 광고란 */}
        <Divider height={2} />
          <View style={styles.advBox}>
            <Swiper 
                showsPagination={true}
                paginationStyle={{bottom:0}}
            >
              {
                advs?.map((item:any, index:any)=>{
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={()=>Linking.openURL(item.url)}
                    >
                      <View style={styles.advslide}>
                        <Image style={styles.advimg} source={{uri: `${MainImageURL}/images/advertise/${item.imageName}`}} />
                      </View>
                    </TouchableOpacity>
                  )
                })
              }
            </Swiper>
          </View>
        <Divider height={5} />

        {/* 스터디 */}
        <View style={{padding:20, alignItems:'center'}}>
          <Typography fontSize={18} marginBottom={10} fontWeightIdx={1}>NOTICE</Typography>
          <View style={{width:'100%', padding:15, backgroundColor:'rgba(215, 111, 35, 0.10)', alignItems:'center', marginBottom:10}}>
            <Typography marginBottom={5}>성악과학생들에 오신 여러분들을 환영합니다.</Typography>
            <Typography marginBottom={5}>앱이 시작되고 한번 꺼졌다가 다시 켜지는 것은</Typography>
            <Typography marginBottom={5}>오류가 아니라 자동 업데이트 되는 것입니다.</Typography>
            <Typography marginBottom={5}>그외 다른 불편하신 사항이 있으시면,</Typography>
            <Typography>아래 문의하기나 카카오채널을 이용해주세요.</Typography>
          </View>
          <TouchableOpacity
            style={{width:250, flexDirection:'row', justifyContent:'space-between', alignItems:'center', 
                      borderWidth:1, borderRadius:10, borderColor:'#EAEAEA', padding:10, marginBottom:10}}
            onPress={()=>{
              Linking.openURL("http://pf.kakao.com/_YrCrG");
            }}
             >
            <View style={{width:30, alignItems:'center'}}>
              <Image
                source={require("../images/login/kakao.png")}
                style={{width:25, height:25, resizeMode:'contain'}}>
              </Image>
            </View>
            <Typography>카카오채널로 문의하기</Typography>
            <AntDesign name='right' size={16} color='#333'/>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=>{
              props.navigation.navigate('SuggestionBoard')
            }}
            style={{width:250, flexDirection:'row', justifyContent:'space-between', alignItems:'center', 
                    borderWidth:1, borderRadius:10, borderColor:'#EAEAEA', padding:10}}
             >
            <View style={{width:30, alignItems:'center'}}>
              <AntDesign name='filetext1' size={22} color='#333'/>
            </View>
            <Typography>문의하기 게시판</Typography>
            <AntDesign name='right' size={16} color='#333'/>
          </TouchableOpacity>
        </View>


        <Divider height={5} />

        <Title title='최신글' enTitle='Community'/>
        <View style={styles.section}>
          {/* 자유게시판 */}
          {
             posts.slice(0,3).map((item:any, index:any)=>{
                return(
                  <TouchableOpacity
                    key={index}
                    onPress={()=>{
                      props.navigation.navigate("Navi_Board")
                    }}
                  >
                    <View 
                      style={{borderWidth:1, borderColor:'#EAEAEA', borderRadius:10, padding:10, marginBottom:10}}
                    >
                      <Typography marginBottom={10} fontWeightIdx={1}>{item.title}</Typography>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Typography fontSize={14} ><Ionicons name="eye-outline" size={14} color="black" /> {item.views} </Typography>
                        <Typography fontSize={14} ><Feather name="thumbs-up" size={14} color="black" /> {item.isLiked} </Typography>
                        <Typography fontSize={14} ><Ionicons name="chatbubble-ellipses-outline" size={14} color="black" /> {item.commentCount ? item.commentCount : '0' } </Typography>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              })
            }
        </View>
        
        {/* 곡 등록 요청 목록 */}
        <RequestBoard navigation={props.navigation}/>
   
    
      </ScrollView>
      </KeyboardAvoidingView>
         

    </View> 
   );
}
export default HomeMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    padding:20
  },
  topmenu: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  mainlogo: {
    width: 100,
    height: 50,
    resizeMode:'contain',
    marginRight: 10
  },
  searchInput: {
    flex: 1,
    height: 30,
    margin: 12,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5
  },
  noticeBox : {
    height: 270,
    paddingVertical: 20,
  },
  slide: {
    alignItems: 'center',
  },
  img: {
    width: 320,
    height: 210,
    resizeMode:'contain',
  },
  advBox : {
    height: 95,
  },
  advslide: {
    alignItems: 'center',
  },
  advimg: {
    height: '100%',
    width: '100%',
    resizeMode:'contain',
  },
  button: {
    borderWidth:1,
    borderColor: '#8C8C8C',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
});

const contents = StyleSheet.create({
  box: {
    width: '95%',
    backgroundColor: 'white',
    marginVertical : 10,
    padding: 15
  },
  titlebox: {
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 35,
    height: 60,
    color: 'black'
  },
  title2: {
    fontSize: 18,
    letterSpacing: -0.3
  },
  imgbox: {
    height: 500,
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    flex: 1,
    width: '100%',
    resizeMode: "cover",
    overflow: 'hidden',
    borderRadius : 10
  },
  contentBox: {
    backgroundColor: 'white'
  },
  contentTitleBox : {
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

