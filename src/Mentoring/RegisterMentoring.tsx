import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, ScrollView, Alert, Platform, Image, TouchableOpacity } from 'react-native';
import {launchImageLibrary, ImageLibraryOptions, Asset} from 'react-native-image-picker';
import axios from 'axios';
import MainURL from "../../MainURL";
import { Typography } from '../Components/Typography';
import SelectDropdown from 'react-native-select-dropdown'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { Divider } from '../Components/Divider';
import { ButtonBox } from '../Components/ButtonBox';
import { SubTitle } from '../Components/SubTitle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../Components/Loading';


export default function RegisterMentoring(props : any) {

  const asyncGetData = props.route.params.asyncGetData;
  const sort = props.route.params.sort;

  const [isRegister, setIsRegister] = useState('');
  const [isRegisterState, setIsRegisterState] = useState('');
  const [registerSortState, setRegisterSortState] = useState('');

  const fetchlists = async () => {
    await axios.get(`${MainURL}/mentoring/getmentoringregister/${asyncGetData.userAccount}`).then((res) => {
      if(res.data) {
        const copy = res.data[0].mentoring;
        setIsRegister(copy);
      } 
    });
    await axios.get(`${MainURL}/mentoring/getregisterstate/${asyncGetData.userAccount}`).then((res) => {
      if(res.data) {
        setIsRegisterState('true');
        setRegisterSortState(res.data[0].sort);
      } else {
        setIsRegisterState('false');
        setRegisterSortState('null');
      }
    });
  };

  useEffect(() => {
    fetchlists();
  }, []);

  const [userAccount, setUserAccount] = useState(asyncGetData.userAccount);
  const [userName, setUserName] = useState(asyncGetData.userName);
  const [userSchool, setUserSchool] = useState(asyncGetData.userSchool);
  const [userSchNum, setUserSchNum] = useState(asyncGetData.userSchNum);
  const [userPart, setUserPart] = useState(asyncGetData.userPart);
  const [userLocation, setUserLocation] = useState('한국');
  const [userRegion, setUserRegion] = useState('서울/인천/경기');
  const [userCareer, setUserCareer] = useState('');
  const [userYoutubeLink, setUserYoutubeLink] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [images, setImages] = useState<Asset[]>([{},{}]);
  const [imageProfileNames, setImageProfileNames] = useState('');
  const [imageAuthNames, setImageAuthNames] = useState('');
  
  const optionsLocation = ["한국", "외국"];
  const optionsRegion = ["서울/인천/경기", "대전/세종/충청", "광주/전라", "대구/경북", "부산/경남"];
   
  // 사진 첨부 함수 -----------------------------------------------------------------
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const showPhoto = async (sort:any)=> {
    setImageLoading(true);
    const option: ImageLibraryOptions = {
        mediaType : "photo",
        selectionLimit : 1,
        maxWidth: 300,
        maxHeight: 300,
        includeBase64: Platform.OS === 'android'
    }
    await launchImageLibrary(option, async(res) => {
      if(res.didCancel) Alert.alert('취소')
      else if(res.errorMessage) Alert.alert('Error : '+ res.errorMessage)
      else {
        const uris: Asset[] = res.assets || [];
        if (sort === 1) {
          const copy = `${asyncGetData.userAccount}_${uris[0].fileName}`
          uris[0].fileName = copy
          const imageCopy = [...images]
          imageCopy[0] = uris[0];
          setImages(imageCopy);
          setImageProfileNames(copy);
        } else {
          const copy = `${asyncGetData.userAccount}_${uris[0].fileName}`
          uris[0].fileName = copy
          const imageCopy = [...images]
          imageCopy[1] = uris[0];
          setImages(imageCopy);
          setImageAuthNames(copy);
        }        
      }
      setImageLoading(false);
    }) 
  }

  // 등록 하기 함수 -----------------------------------------------------------------
  const createPost = async () => {

    const getParams = {
      sort : sort,
      userAccount : userAccount,
      userName : userName,
      userSchool : userSchool,
      userSchNum : userSchNum,
      userPart : userPart,
      userLocation : userLocation,
      userRegion : userRegion,
      userCareer : userCareer,
      userYoutubeLink : userYoutubeLink,
      userPhone: userPhone,
      userImageProfile : imageProfileNames,
      userImageAuth : imageAuthNames,
    };

    try {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append("img", {
          name: image.fileName,
          type: image.type,
          uri: image.uri,
        });
      });
      await axios.post(`${MainURL}/mentoring/registermentoring`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        params: getParams,
      }).then(async (res) => {
        if (res.data) {
          Alert.alert("신청되었습니다. 2~3일 심사 후 정식 등록 됩니다.");
          props.navigation.goBack();
        } else {
          Alert.alert("다시 시도하세요.");
        }
      })
      .catch(() => {
        console.log('실패함');
      });
    } catch (error) {
      Alert.alert('다시 시도해 주세요.');
    }
  };


  const alertRegister = () => { 
    if (userName && userLocation && userYoutubeLink && userPhone) {
      Alert.alert('다음 내용으로 등록하시겠습니까?',
`
이름 : ${userName}
학교학번 : ${userSchool} ${userSchNum}
파트: ${userPart}
거주지 : ${userLocation}
이력 : ${userCareer}
유투브링크 : ${userYoutubeLink}
번호 : ${userPhone}
`, [
      { text: '취소', onPress: () => { return }},
      { text: '확인', onPress: () => createPost() }
    ]);
    } else {
      Alert.alert('필수 항목을 입력헤주세요')
    }
    
  }

  const closeDetail = () => {
    props.navigation.goBack();
  };

  return (
    registerSortState === undefined || registerSortState === null || registerSortState === ''
    ?  (
    <View style={{flex:1, width:'100%', height:'100%'}}>
      <Loading /> 
    </View>
    ) : (
    <View style={styles.container}>
      
      {/* title */}
      <SubTitle title={sort === 'mentor' ? '멘토 등록' : '멘티 등록'} navigation={props.navigation}/>
                
      <Divider height={2} />

      {
        isRegister === 'false' && isRegisterState === 'false'
        ?
        <ScrollView style={styles.section}>

          <View style={{marginVertical:5}}>
            <Typography color='#8C8C8C' fontWeightIdx={1}>이름 <Typography color='#E94A4A'>*</Typography></Typography>
            <TextInput
              style={[styles.input, {width: '100%', marginBottom:30}]}
              placeholder="이름"
              placeholderTextColor='#BDBDBD'
              onChangeText={(e)=>{setUserName(e)}}
              value={userName}
            />
          </View>

          <View style={{marginVertical:5}}>
            <Typography color='#8C8C8C' fontWeightIdx={1}>학교 <Typography color='#E94A4A'>*</Typography></Typography>
            <TextInput
              style={[styles.input, {width: '100%', marginBottom:30}]}
              placeholder="학교"
              placeholderTextColor='#BDBDBD'
              onChangeText={(e)=>{setUserSchool(e)}}
              value={userSchool}
            />
          </View>

          <View style={{marginVertical:5}}>
            <Typography color='#8C8C8C' fontWeightIdx={1}>학번 <Typography color='#E94A4A'>*</Typography></Typography>
            <TextInput
              style={[styles.input, {width: '100%', marginBottom:30}]}
              placeholder="학번"
              placeholderTextColor='#BDBDBD'
              onChangeText={(e)=>{setUserSchNum(e)}}
              value={userSchNum}
            />
          </View>

          <View style={{marginVertical:5}}>
            <Typography color='#8C8C8C' fontWeightIdx={1}>파트 <Typography color='#E94A4A'>*</Typography></Typography>
            <TextInput
              style={[styles.input, {width: '100%', marginBottom:30}]}
              placeholder="파트"
              placeholderTextColor='#BDBDBD'
              onChangeText={(e)=>{setUserPart(e)}}
              value={userPart}
            />
          </View>

          {sort === 'mentor' &&
            <View style={{marginVertical:5}}>
              <Typography color='#8C8C8C' fontWeightIdx={1}>현재 국내외 거주 여부 <Typography color='#E94A4A'>*</Typography></Typography>
              <View style={[styles.input, {flexDirection:'row', justifyContent:'space-between', alignItems:'center'}]}>
                <SelectDropdown
                  data={optionsRegion}
                  defaultValue={''}
                  onSelect={(selectedItem, index) => {
                    setUserLocation(selectedItem);
                  }}
                  defaultButtonText={optionsLocation[0]}
                  buttonStyle={{width:'100%', height:30, backgroundColor:'#fff'}}
                  buttonTextStyle={{fontSize:16}}
                  dropdownStyle={{width:250, borderRadius:10}}
                  rowStyle={{ width:250, height: 60}}
                  rowTextStyle={{fontSize:16}}
                />
                <AntDesign name='down' size={12} color='#8C8C8C' style={{position:'absolute', right:30}}/>
              </View>
            </View>
          }

          {
            userLocation === '한국' &&
            <View style={{marginVertical:5}}>
              <Typography color='#8C8C8C' fontWeightIdx={1}>현재 거주지 <Typography color='#E94A4A'>*</Typography></Typography>
              <View style={[styles.input, {flexDirection:'row', justifyContent:'space-between', alignItems:'center'}]}>
                <SelectDropdown
                  data={optionsRegion}
                  defaultValue={''}
                  onSelect={(selectedItem, index) => {
                    setUserRegion(selectedItem);
                  }}
                  defaultButtonText={optionsRegion[0]}
                  buttonStyle={{width:'100%', height:30, backgroundColor:'#fff'}}
                  buttonTextStyle={{fontSize:16}}
                  dropdownStyle={{width:250, borderRadius:10}}
                  rowStyle={{ width:250, height: 60}}
                  rowTextStyle={{fontSize:16}}
                />
                <AntDesign name='down' size={12} color='#8C8C8C' style={{position:'absolute', right:30}}/>
              </View>
            </View>
          }
          

          <View style={{marginVertical:5}}>
            <Typography color='#8C8C8C' fontWeightIdx={1} marginBottom={5}>본인 이력 <Typography color='#E94A4A'>*</Typography></Typography>
            <Typography color='#8C8C8C' fontSize={14} marginBottom={10}>본인의 이력에 대해 자세히 작성해주세요. (최대10줄)</Typography>
            <TextInput
              style={[styles.inputbox, {width: '100%', marginBottom:30}]}
              placeholder=""
              placeholderTextColor='#5D5D5D'
              onChangeText={(e)=>{setUserCareer(e)}}
              value={userCareer}
              multiline
            />
          </View>

          <View style={{marginVertical:5, marginBottom:30}}>
            {/* 사진 첨부 */}
            <Typography color='#8C8C8C' fontWeightIdx={1} marginBottom={5}>프로필 사진 <Typography color='#E94A4A'>*</Typography></Typography>
            <Typography color='#8C8C8C' fontSize={14} marginBottom={10}>본인을 가장 잘 나타내는 사진을 첨부해주세요</Typography>
            <View>
              { Object.keys(images[0]).length !== 0
                ? 
                <View style={{flexDirection:'row'}}>
                  <View style={{ width: 150, height: 200, margin: 5 }}>
                    <Image source={{ uri: images[0].uri }} style={{ width: '100%', height: '100%', borderRadius:10 }} />
                  </View>
                  <TouchableOpacity
                    onPress={()=>{
                      setImageAuthNames('')
                      const imageCopy = [...images]
                      imageCopy[0] = {};
                      setImages(imageCopy); 
                    }}
                  >
                    <View style={{width:30, height:30, borderWidth:1, borderColor:'#8C8C8C', borderRadius:5,
                                  alignItems:'center', justifyContent:'center', marginHorizontal:5, marginVertical:10}}>
                      <AntDesign name="close" size={20} color="#8C8C8C"/>
                    </View>
                  </TouchableOpacity>
                </View>
                :
                <>
                {
                  imageLoading ?
                  <View style={{position:'absolute', alignItems:'center', justifyContent:'center'}}>
                    <View style={{width:150, height:200}}>
                      <Loading />
                    </View>
                  </View>
                  :
                  <TouchableOpacity
                    onPress={()=>{showPhoto(1)}}
                  >
                    <View style={{width:150, height:200, borderWidth:1, borderColor:'#8C8C8C', borderRadius:5,
                                  alignItems:'center', justifyContent:'center', marginHorizontal:5, marginVertical:10}}>
                      <Entypo name="plus" size={20} color="#8C8C8C"/>
                    </View>
                  </TouchableOpacity>
                }
                </>
              }
            </View>
          </View>

          <View style={{marginVertical:5, marginBottom:30}}>
            {/* 사진 첨부 */}
            <Typography color='#8C8C8C' fontWeightIdx={1} marginBottom={5}>인증용 사진 <Typography color='#E94A4A'>*</Typography></Typography>
            {
              sort === 'mentor' 
              ?
              <Typography color='#8C8C8C' fontSize={14} marginBottom={10}>최종 학력에 대해 인증할 수 있는 사진을 첨부해주세요.
              사진에 개인정보(이름제외)가 포함되어 있다면 마스킹을 해주세요. 사진은 인증 후에 삭제됩니다. ex) 졸업 증명서, 학위증 등</Typography>
              :
              <Typography color='#8C8C8C' fontSize={14} marginBottom={10}>입력된 정보와 같은, 학교 학생인지 확인할 수 있는 사진을 첨부해주세요.
              사진에 개인정보(이름제외)가 포함되어 있다면 마스킹을 해주세요. 사진은 인증 후에 삭제됩니다. ex) 학생증 등</Typography>
            }
            
            <View>
              { Object.keys(images[1]).length !== 0
                ? 
                <View style={{flexDirection:'row'}}>
                  <View style={{ width: 200, height: 200, margin: 5 }}>
                    <Image source={{ uri: images[1].uri }} style={{ width: '100%', height: '100%', borderRadius:10 }} />
                  </View>
                  <TouchableOpacity
                    onPress={()=>{
                        setImageAuthNames('')
                        const imageCopy = [...images]
                        imageCopy[1] = {}
                        setImages(imageCopy); 
                      }}
                  >
                    <View style={{width:30, height:30, borderWidth:1, borderColor:'#8C8C8C', borderRadius:5,
                                  alignItems:'center', justifyContent:'center', marginHorizontal:5, marginVertical:10}}>
                      <AntDesign name="close" size={20} color="#8C8C8C"/>
                    </View>
                  </TouchableOpacity>
                </View>
                :
                <>
                {
                  imageLoading ?
                  <View style={{position:'absolute', alignItems:'center', justifyContent:'center'}}>
                    <View style={{width:200, height:200}}>
                      <Loading />
                    </View>
                  </View>
                  :
                  <TouchableOpacity
                    onPress={()=>{showPhoto(2)}}
                  >
                    <View style={{width:200, height:200, borderWidth:1, borderColor:'#8C8C8C', borderRadius:5,
                                  alignItems:'center', justifyContent:'center', marginHorizontal:5, marginVertical:10}}>
                      <Entypo name="plus" size={20} color="#8C8C8C"/>
                    </View>
                  </TouchableOpacity>
                }
                </>
              }
            </View>
          </View>

          <View style={{marginVertical:5}}>
            <Typography color='#8C8C8C' fontWeightIdx={1} marginBottom={5}>유투브 영상 링크 주소 <Typography color='#E94A4A'>*</Typography></Typography>
            <Typography color='#8C8C8C' fontSize={14}>본인의 실력을 보여줄 수 있는 영상을 첨부해주세요</Typography>
            <TextInput
              style={[styles.input, {width: '100%', marginBottom:30}]}
              placeholder="유투브 주소"
              placeholderTextColor='#BDBDBD'
              onChangeText={(e)=>{setUserYoutubeLink(e)}}
              value={userYoutubeLink}
            />
          </View>

          <View style={{marginVertical:5}}>
            <Typography color='#8C8C8C' fontWeightIdx={1}>연락처 (본인 확인용 / 비공개) <Typography color='#E94A4A'>*</Typography></Typography>
            <TextInput
              style={[styles.input, {width: '100%', marginBottom:30}]}
              placeholder="카톡 아이디, 전화번호"
              placeholderTextColor='#BDBDBD'
              onChangeText={(e)=>{setUserPhone(e)}}
              value={userPhone}
            />
          </View>

          <View style={{padding:15, backgroundColor:'rgba(215, 111, 35, 0.10)', marginBottom:20}}>
            <Typography fontSize={12} >등록 하시면, 운영진의 심사를 통해, 멘토&멘티로 정식 등록됩니다. 심사기간은 2~3일이 걸릴 수 있습니다.</Typography>
          </View>
          
          <ButtonBox leftFunction={closeDetail} leftText='취소' rightFunction={alertRegister} rightText='등록하기'/>
          <View style={{height:100}}></View>
        </ScrollView>
        :
        <View style={{height:200, alignItems:'center', justifyContent:'center'}}>
          <Typography>이미 {registerSortState === 'mentor' ? '멘토' : '멘티'}로 신청되었습니다.</Typography>
        </View>
        }

    </View> 
    )
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    padding:20
  },
  input: {
    height: 40,
    borderColor: '#DFDFDF',
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
    color: '#333',
    fontSize:16
  },  
  selectDropdown : {
    borderWidth:1, 
    borderRadius:5, 
    borderColor:'#DFDFDF', 
    paddingHorizontal:15,
    paddingVertical:5,
    flexDirection:'row', 
    alignItems:'center',
    marginVertical:5
  },
  inputbox: {
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    fontSize: 16,
    height: 'auto',
    color: '#333',
    minHeight: 150,
    textAlignVertical: 'top',
  },
});

