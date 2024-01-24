import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';
import MainURL from "../../MainURL";
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncGetItem from '../AsyncGetItem';
import { Typography } from '../Components/Typography';
import { Divider } from '../Components/Divider';
import {launchImageLibrary, ImageLibraryOptions, Asset} from 'react-native-image-picker';
import { useRoute } from '@react-navigation/native';
import { ButtonBox } from '../Components/ButtonBox';

export default function CompetitionPost (props : any) {
  const route : any = useRoute();

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


  const [songTitle, setSongTitle] = useState('');
  const [songWriter, setSongWriter] = useState('');
  const [songUri, setSongUri] = useState('');

  // 사진 첨부 함수
  const [images, setImages] = useState<Asset[]>([]);
  const showPhoto = async ()=> {
    const option: ImageLibraryOptions = {
        mediaType : "photo",
        selectionLimit : 1,
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
      .post(`${MainURL}/competition/post`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        params: {
          comptNum : route.params.id,
          userAccount : asyncGetData.userAccount,
          userName : asyncGetData.userName,
          userSchool : asyncGetData.userSchool,
          userSchNum : asyncGetData.userSchNum,
          userPart : asyncGetData.userPart,
          songTitle : songTitle,
          songWriter: songWriter,
          songUri: songUri
        }        
      })
      .then((res) => {
        if (res.data === true) {
          Alert.alert('참가 신청되었습니다. 감사합니다.');
          props.navigation.replace('Main');
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
      Alert.alert('프로필 사진을 등록해주세요');
    } else if (songTitle === '' || songWriter === '' || songUri === '' ) {
      Alert.alert('빈칸을 모두 작성해주세요');
    } else {
      Alert.alert('작성하시겠습니까?', '', [
        { text: '취소', onPress: () => { return }},
        { text: '확인', onPress: () => createPost() }
      ]);
    }
  }

  const closeDetail = () => {
    props.navigation.goBack();
  };

  const [textInputAddView, setTextInputAddView] = useState<boolean>(false);

  return (
    <View style={{flex:1}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 100}
        style={{flex:1}}
      >
      <ScrollView style={styles.container}>
      <View style={{margin: 20, alignItems: 'center'}}>
        <Typography fontSize={24}>참가 신청하기</Typography>
      </View>
      <View style={{marginVertical: 5, width: '100%', justifyContent:'space-between'}}>
      <Typography fontSize={20} marginBottom={10}>{route.params.title}</Typography>
      </View>
      <View style={{marginVertical: 5, width: '100%', justifyContent:'space-between'}}>
        <Typography marginBottom={5}>참가자</Typography>
        <View style={styles.profileBox}>
          <Typography>{asyncGetData.userName} </Typography>
          <Typography>{asyncGetData.userSchool}</Typography>
          <Typography>{asyncGetData.userSchNum} </Typography>
          <Typography>{asyncGetData.userPart}</Typography>
        </View>
      </View>
    
      <View style={{marginVertical: 5}}>
        <Typography marginBottom={5}>* 프로필사진</Typography>
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

        <View style={{marginVertical: 5}}>
          <Typography marginBottom={5}>* 곡목</Typography>
          <TextInput
            style={styles.input}
            textAlign='center'
            value={songTitle} 
            onChangeText={setSongTitle}
            onFocus={()=>{
              setSongTitle(' ')
            }}
          />
        </View>

        <View style={{marginVertical: 5}}>
          <Typography marginBottom={5}>* 작곡가</Typography>
          <TextInput
            style={styles.input}
            textAlign='center'
            value={songWriter} 
            onChangeText={setSongWriter}
            onFocus={()=>{
              setSongWriter(' ')
            }}
          />
        </View>

        <View style={{marginVertical: 5}}>
          <Typography marginBottom={5}>* 유투브 영상 주소</Typography>
          <TextInput
            style={[styles.input, {flex:1}]}
            textAlign='center'
            value={songUri}
            onChangeText={setSongUri}
            onFocus={()=>{
              setTextInputAddView(true);
            }}
            onEndEditing={()=>{
              setTextInputAddView(false);
            }}
          />
          <View style={{alignItems:'center', marginBottom:20}}>
            <Typography fontSize={11} color='#8C8C8C'>* 링크 주소를 직접 적거나, 링크 주소를 복사 후 붙여넣기 해주세요.</Typography>
            <Typography fontSize={11} color='#8C8C8C'>서버 용량 문제로, 영상 파일을 직접 올리는 것은 불가합니다.</Typography>
          </View>
        </View>
      </View>

      <ButtonBox leftFunction={closeDetail} leftText='취소' rightFunction={alertPost} rightText='작성' marginBottom={20}/>
      {
        textInputAddView 
        && <View style={{height:400}}></View>
      }  
    </ScrollView>

    </KeyboardAvoidingView>

    

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
  profileBox:{
    height: 40,
    flexDirection:'row',
    borderBottomWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 4,
    alignItems:'center',
    justifyContent: 'center',
    marginBottom: 16
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
    justifyContent: 'center',
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
});