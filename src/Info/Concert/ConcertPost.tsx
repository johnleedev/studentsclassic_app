import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput, Alert, Modal, Platform } from 'react-native';
import axios from 'axios';
import MainURL from "../../../MainURL";
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncGetItem from '../../AsyncGetItem';
import { Typography } from '../../Components/Typography';
import { Divider } from '../../Components/Divider';
import CalendarComponent from '../CalendarComponent';
import {launchImageLibrary, ImageLibraryOptions, Asset} from 'react-native-image-picker';
import { ButtonBox } from '../../Components/ButtonBox';

export default function ConcertPost (props : any) {

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


  const [title, setTitle] = useState('');
  const [concertDate, setConcertDate] = useState('선택');
  const [concertTime, setConcertTime] = useState('');
  const [location, setLocation] = useState('선택');
  const locationList = ["서울", "인천", "대전", "세종", "광주", "대구", "부산", "경기", "충청", "강원", "전라", "경상"]
  const [concertPlace, setConcertPlace] = useState('');
  const [concertPrice, setConcertPrice] = useState('선택');
  const concertPriceList = ["무료", "유료"]
  const [superViser, setSuperViser] = useState('');
  const [inquiry, setInquiry] = useState('');
  const [webPage , setWebPage ] = useState('');

  // 일자 선택 모달
  const [whichCalendar, setWhichCalendar] = useState('');
  const [isCalendarModalVisible, setCalendarModalVisible] = useState(false);
  const calendarToggleModal = () => {
    setCalendarModalVisible(!isCalendarModalVisible);
  };

  // 지역 선택 모달
  const [islocationModalVisible, setlocationModalVisible] = useState(false);
  const locationToggleModal = () => {
    setlocationModalVisible(!islocationModalVisible);
  };

  // 비영 선택 모달
  const [isConcertPriceModalVisible, setConcertPriceModalVisible] = useState(false);
  const concertPriceToggleModal = () => {
    setConcertPriceModalVisible(!isConcertPriceModalVisible);
  };

  // 사진 첨부 함수
  const [images, setImages] = useState<Asset[]>([]);
  const showPhoto = async ()=> {
    const option: ImageLibraryOptions = {
        mediaType : "photo",
        selectionLimit : 5,
        maxWidth: 500,
        maxHeight: 500,
        includeBase64: Platform.OS === 'android'
    }
    await launchImageLibrary(option, async(res) => {
      if(res.didCancel) Alert.alert('취소')
      else if(res.errorMessage) Alert.alert('Error : '+ res.errorMessage)
      else {
        const uris: Asset[] = [];
        res.assets?.forEach((value) => uris.push(value));
        setImages(uris);
      }
    }) 
  }

  // 글쓰기 함수
  const createPost = async () => {
    // 이미지 업로드 객체 만들기
    const formData = new FormData();
    images.forEach(image => {
      formData.append("img", {
        name : image.fileName,
        type: image.type,
        uri: image.uri
      });
    });
    // axios 전송하기
    axios
      .post(`${MainURL}/concert/post`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        params: {
          userAccount : asyncGetData.userAccount,
          title: title,
          concertDate: concertDate,
          concertTime: concertTime,
          location : location,
          concertPlace : concertPlace,
          concertPrice: concertPrice,
          superViser : superViser,
          inquiry : inquiry,
          webPage : webPage,
        }        
      })
      .then((res) => {
        if (res.data === true) {
          Alert.alert('입력되었습니다.');
          props.navigation.replace('Concert');
        } else {
          Alert.alert(res.data)
        }
      })
      .catch(() => {
        console.log('실패함')
      })
  };

  const alertPost = () => { 
    if (images.length === 0) {
      Alert.alert('사진을 1개 이상 등록해주세요');
    } else if (title === '' || concertPlace === '' || concertPrice === '' || superViser === '' || inquiry === '' ) {
      Alert.alert('빈칸을 모두 작성해주세요');
    } else {
      Alert.alert('다음 내용으로 작성하시겠습니까?', 
`연주회 이름 : ${title}, 
일자 : ${concertDate},
시간 : ${concertTime},
지역 : ${location},
연주회 장소 : ${concertPlace},
관람료 : ${concertPrice},
주관 : ${superViser},
문의전화 : ${inquiry},
웹페이지 : ${webPage}
`,
      [
        { text: '취소', onPress: () => { return }},
        { text: '확인', onPress: () => createPost() }
      ]);
    }
  }

  const closeDetail = () => {
    props.navigation.goBack();
  };
  

  return (
    <View style={{flex:1}}>
      <ScrollView style={styles.container}>
      <View style={{margin: 20, alignItems: 'center'}}>
        <Typography fontSize={24}>연주회 게시판 글쓰기</Typography>
      </View>
      <View style={styles.addTitleBox}>
        <View style={styles.addTitleTextbox}>
          <Typography><Entypo name="pencil" size={20} color="black"/> </Typography>
          <Typography>{asyncGetData.userName} </Typography>
          <Typography color='gray'>{asyncGetData.userSchool}</Typography>
          <Typography color='gray'>{asyncGetData.userSchNum} </Typography>
          <Typography color='gray'>{asyncGetData.userPart}</Typography>
        </View>
        </View>
      <View style={{marginVertical: 5}}>
        <Typography marginBottom={5}>* 연주회 이름</Typography>
        <TextInput
          style={styles.input}
          textAlign='center'
          value={title} 
          onChangeText={setTitle}
        />
      </View>
      <View style={{marginVertical: 5, flexDirection:'row', width: '100%', justifyContent:'space-between'}}>
        <View style={{width:'48%'}}>
          <Typography marginBottom={5}>* 일자</Typography>
          <View style={[styles.calendarbox,
            
            {flexDirection:'row', alignItems:'center', justifyContent:'center', height:40}]}>
            <TouchableOpacity
              style={{width:'100%'}}
              onPress={()=>{
                setWhichCalendar('concertDate');
                calendarToggleModal();
              }}
            >
              <View style={{width:'100%', height:30, justifyContent:'center', alignItems:'center'}}>
                <Typography fontSize={14} color='#5D5D5D'>{concertDate}</Typography>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{width:'48%'}}>
          <Typography marginBottom={5}>* 시간</Typography>
          <TextInput
            style={[styles.input, {height:40}]}
            textAlign='center'
            value={concertTime} onChangeText={setConcertTime}
        />
        </View>
      </View>
     
      <Modal
        animationType="slide" 
        transparent={true}
        visible={isCalendarModalVisible}
        onRequestClose={calendarToggleModal}
      >
        <CalendarComponent 
          calendarToggleModal={calendarToggleModal}
          whichCalendar={whichCalendar}
          setConcertDate={setConcertDate}
        />
      </Modal>  

      <View style={{marginVertical: 5}}>
        <Typography marginBottom={5}>* 지역</Typography>
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
          <TouchableOpacity
            style={[styles.input, {width:'100%'}]}
            onPress={locationToggleModal}
          >
            <View style={{width:'100%', alignItems:'center'}}>
              <Typography fontSize={14} color='#5D5D5D'>{location}</Typography>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide" 
        transparent={true}
        visible={islocationModalVisible}
        onRequestClose={locationToggleModal}
      >
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
          <View style={{ width:'100%', backgroundColor:'#fff', borderRadius:10, alignItems:'center', justifyContent:'center'}}>
          {
            locationList.map((item, index)=>{
              return(
                <TouchableOpacity
                  key={index}
                  onPress={()=>{
                    setLocation(item);
                    locationToggleModal();
                  }}
                  style={{width:'100%'}}
                > 
                  <View style={{height:35, margin:5, alignItems:'center', justifyContent:'center'}}>
                    <Typography>{item}</Typography> 
                  </View>
                  <Divider height={1}/>
                </TouchableOpacity>
              )
            })
          }
          </View>
        </View>
      </Modal>

      <View style={{marginVertical: 5}}>
        <Typography marginBottom={5}>* 연주회 장소</Typography>
        <TextInput
          style={styles.input}
          textAlign='center'
          value={concertPlace} onChangeText={setConcertPlace}
        />
      </View>

      <View style={{marginVertical: 5}}>
        <Typography marginBottom={5}>* 관람료</Typography>
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
          <TouchableOpacity
            style={[styles.input, {width:'100%'}]}
            onPress={concertPriceToggleModal}
          >
            <View style={{width:'100%', alignItems:'center'}}>
              <Typography fontSize={14} color='#5D5D5D'>{concertPrice}</Typography>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide" 
        transparent={true}
        visible={isConcertPriceModalVisible}
        onRequestClose={concertPriceToggleModal}
      >
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
          <View style={{ width:'100%', backgroundColor:'#fff', borderRadius:10, alignItems:'center', justifyContent:'center'}}>
          {
            concertPriceList.map((item, index)=>{
              return(
                <TouchableOpacity
                  key={index}
                  onPress={()=>{
                    setConcertPrice(item);
                    concertPriceToggleModal();
                  }}
                  style={{width:'100%'}}
                > 
                  <View style={{height:40, margin:5, alignItems:'center', justifyContent:'center'}}>
                    <Typography>{item}</Typography> 
                  </View>
                  <Divider height={1}/>
                </TouchableOpacity>
              )
            })
          }
          </View>
        </View>
      </Modal>

      <View style={{marginVertical: 5}}>
        <Typography marginBottom={5}>* 주관</Typography>
        <TextInput
          style={styles.input}
          textAlign='center'
          value={superViser} onChangeText={setSuperViser}
        />
      </View>

      <View style={{marginVertical: 5}}>
        <Typography marginBottom={5}>* 문의전화</Typography>
        <TextInput
          style={styles.input}
          textAlign='center'
          value={inquiry} onChangeText={setInquiry}
        />
      </View>

      <View style={{marginVertical: 5}}>
        <Typography marginBottom={5}>웹페이지(선택)</Typography>
        <TextInput
          style={[styles.input, {flex:1}]}
          textAlign='center'
          value={webPage}
          onChangeText={setWebPage}
        />
        <View style={{alignItems:'center', marginBottom:20}}>
          <Typography fontSize={11} color='#8C8C8C'>* 링크 주소를 직접 적거나, 링크를 복사 후 붙여넣기 하세요.</Typography>
        </View>
      </View>
      
      <View style={{marginVertical: 5}}>
        <Typography marginBottom={5}>* 첨부사진</Typography>
        <View style={{flexDirection:'row', flexWrap:'wrap'}}>
          {images.map((image, index) => (
            <View key={index} style={{ width: 100, height: 150, margin: 5 }}>
              <Image source={{ uri: image.uri }} style={{ width: '100%', height: '100%' }} />
            </View>
          ))}
          <TouchableOpacity
            onPress={showPhoto}
          >
            <View style={{width:100, height:150, borderWidth:1, borderColor:'#8C8C8C', borderRadius:5,
                          alignItems:'center', justifyContent:'center', margin:5}}>
              <Entypo name="plus" size={20} color="#8C8C8C"/>
            </View>
          </TouchableOpacity>
        </View>
        
      </View>
      
      <ButtonBox leftFunction={closeDetail} leftText='취소' rightFunction={alertPost} rightText='작성하기' marginTop={20} marginBottom={30}/>
      
    </ScrollView>

    <View style={isCalendarModalVisible ? styles.modalBackCover :  { display: 'none'}}></View>
    <View style={islocationModalVisible ? styles.modalBackCover :  { display: 'none'}}></View>
    <View style={isConcertPriceModalVisible ? styles.modalBackCover :  { display: 'none'}}></View>

  </View>
  );
}

 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding:20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  addTitleBox: {
    marginBottom: 8,
  },
  addTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  addTitleTextbox: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center'
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 4,
    marginBottom: 16,
    height: 'auto',
    minHeight: 40,
    fontSize: 14,   
    color: '#5D5D5D',
    fontWeight:'bold',
    justifyContent: 'center'
  },
  calendarbox: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  modalBackCover : {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#333',
    opacity: 0.8
  },
});