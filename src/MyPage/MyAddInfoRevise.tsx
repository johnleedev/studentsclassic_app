import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Image, TextInput, Platform, KeyboardAvoidingView } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { Typography } from '../Components/Typography';
import { Divider } from '../Components/Divider';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import MainURL from "../../MainURL";
import { SubTitle } from '../Components/SubTitle';
import {launchImageLibrary, ImageLibraryOptions, Asset} from 'react-native-image-picker';
import { Title } from '../Components/Title';
import { ButtonBox } from '../Components/ButtonBox';

export default function MyAddInfoRevise (props: any) {

  const [contactWhich, setContactWhich] = useState<string>(
    props.getProfile.contactWhich !== null && props.getProfile.contactWhich !== 'undefined'
      ? props.getProfile.contactWhich
      : '1'
  );
  const [contactNum, setContactNum] = useState<string>(
    props.getProfile.contactNum !== null && props.getProfile.contactNum !== 'undefined'
      ? props.getProfile.contactNum
      : ''
  );
  const [carrerInputs, setCarrerInputs] = useState<string[]>(
    props.getProfile.carrerInputs !== null && props.getProfile.carrerInputs !== 'undefined'
      ? props.getProfile.carrerInputs
      : ['']
  );
  const [videoLinks, setVideoLinks] = useState<string[]>(
    props.getProfile.videoLinks !== null && props.getProfile.videoLinks !== 'undefined'
      ? props.getProfile.videoLinks
      : ['']
  );
  const [imageNames, setImageNames] = useState<string[]>(
    props.getProfile.imageNames !== null && props.getProfile.imageNames !== 'undefined'
      ? props.getProfile.imageNames
      : []
  );

  // 이력 입력란 내용 변경
  const handleCarrerInputChange = (text: string, index: number) => {
    const inputs = [...carrerInputs];
    inputs[index] = text;
    setCarrerInputs(inputs);
  };

  // 이력 입력란 추가
  const addCarrerInput = () => {
    setCarrerInputs([...carrerInputs, '']);
  };

  // 이력 입력란 삭제
  const removeCarrerInput = (index: number) => {
    const inputs = [...carrerInputs];
    inputs.splice(index, 1);
    setCarrerInputs(inputs);
  };

  // 영상 입력란 내용 변경
  const handleVideoLinksChange = (text: string, index: number) => {
    const inputs = [...videoLinks];
    inputs[index] = text;
    setVideoLinks(inputs);
  };

  // 영상 입력란 추가
  const addVideoLink = () => {
    setVideoLinks([...videoLinks, '']);
  };

  // 영상 입력란 삭제
  const removeVideoLinks = (index: number) => {
    const links = [...videoLinks];
    links.splice(index, 1);
    setVideoLinks(links);
  };
  
  // 사진 첨부 함수
  const [images, setImages] = useState<Asset[]>([]);
  const showPhoto = async ()=> {
    const option: ImageLibraryOptions = {
        mediaType : "photo",
        selectionLimit : 3,
        maxWidth: 500,
        maxHeight: 500,
        includeBase64: Platform.OS === 'android'
    }
    await launchImageLibrary(option, async(res) => {
      if(res.didCancel) Alert.alert('취소')
      else if(res.errorMessage) Alert.alert('Error : '+ res.errorMessage)
      else {
        const uris: Asset[] = res.assets || [];
        setImages(uris);
      }
    }) 
  }

  const alertPushPhoto = () => {
    if (imageNames.length > 0) {
      Alert.alert(
        '기존의 사진은 모두 지워지며, 다시 새로 업로드해야 합니다.',
        '업로드 하시겠습니까?',
        [
          { text: '취소', onPress: () => {} },
          { text: '업로드', onPress: () => {
            setImageNames([]);
            deleteImage();
            showPhoto();
          }},
        ]
      );
    } else {
      Alert.alert(
        '사진은 최대 3장까지만 업로드 할 수 있습니다.',
        '업로드 하시겠습니까?',
        [
          { text: '취소', onPress: () => {} },
          { text: '업로드', onPress: showPhoto },
        ]
      );
    }
  };

  // 글쓰기 함수
  const createPost = async () => {

    const getParams = {
      userAccount: props.asyncGetData.userAccount,
      userName: props.asyncGetData.userName,
      contactWhich: contactWhich,
      contactNum: contactNum,
      carrerInputs: carrerInputs,
      videoLinks: videoLinks,
      imageNamesOrigin : imageNames,
    };

    try {
      const formData = new FormData();
      // 사진 포함
      if (images.length > 0) {
        images.forEach((image) => {
          formData.append("img", {
            name: image.fileName,
            type: image.type,
            uri: image.uri,
          });
        });
        await axios.post(`${MainURL}/mypage/profilerevisewithphoto`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          params: getParams,
        });
      } else {
        // 사진 미포함
        await axios.post(`${MainURL}/mypage/profilerevisewithoutphoto`, getParams);
      }
  
      Alert.alert('수정되었습니다.');
      props.setRefresh(!props.refresh);
      props.profileReviseToggleModal();

    } catch (error) {
      console.error('실패함', error);
      Alert.alert('다시 시도해 주세요.');
    }
  };

  // 이미지 삭제
  const deleteImage = async () => {
    if (imageNames.length > 0) {
      try {
        await axios.post(`${MainURL}/mypage/deleteimage`, {
          imageNames : imageNames
        });
        Alert.alert('기존의 사진이 모두 삭제되었습니다.');
      } catch (error) {
        console.error('실패함', error);
        Alert.alert('다시 시도해 주세요.');
      }
    } else {
      return
    }
  };

  const alertDeletePhoto = () => {
    Alert.alert(
      '기존의 사진은 모두 지워지며, 다시 새로 업로드해야 합니다.',
      '정말 모두 삭제 하시겠습니까?',
      [
        { text: '취소', onPress: () => { return } },
        { text: '삭제하기', onPress: deleteImage},
      ]
    );
  };

  
  
  const closeDetail = () => {
    props.profileReviseToggleModal();
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
        {/* title */}
        <Title title='추가정보 수정' enTitle='My AddInfo Revise'/>

         {/* 연락처 */}
        <View style={styles.infoContainer}>
          <Typography fontSize={24} marginBottom={10}>연락처</Typography>
          <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:5}}>
            <TouchableOpacity
              style={ contactWhich === '1' ? styles.contactBoxSelected : styles.contactBox }
              onPress={()=>{
                setContactWhich('1')
              }}
            >
              <Typography>핸드폰</Typography>
            </TouchableOpacity>
            <TouchableOpacity
              style={ contactWhich === '2' ? styles.contactBoxSelected : styles.contactBox }
              onPress={()=>{
                setContactWhich('2')
              }}
            >
              <Typography>카톡아이디</Typography>
            </TouchableOpacity>
          </View>
          <View style={styles.infoBox}>
            <TextInput
              style={[styles.inputBox]}
              placeholder="입력하세요"
              placeholderTextColor="#8C8C8C"
              value={contactNum}
              onChangeText={setContactNum}
            />
          </View>
        </View>     
        
        <Divider height={2}/>

        {/* 이력 */}
        <View style={styles.infoContainer}>
          <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
          <Typography fontSize={24}>이력</Typography>
            {
              carrerInputs?.length > 0 && carrerInputs[0] !== ""
              ?
              <TouchableOpacity
                onPress={()=>{
                  setCarrerInputs([""]);
                }}
              >
                <View style={{width:100, height:30, borderWidth:1, borderColor:'#8C8C8C', borderRadius:5,
                              alignItems:'center', justifyContent:'center'}}>
                  <Typography color='#8C8C8C' fontSize={12}>이력모두삭제</Typography>
                </View>
              </TouchableOpacity>
              : 
              <View></View>
            }
          </View> 
          <View style={styles.infoBox}>
            {
              carrerInputs?.map((item, index) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                  style={[styles.inputBox, { flex: 1 }]}
                  placeholder="ex) 한국대 졸업"
                  placeholderTextColor="#8C8C8C"
                  value={item}
                  onChangeText={(text) => handleCarrerInputChange(text, index)}
                />
                {
                  index === carrerInputs.length -1
                  ?
                  <TouchableOpacity onPress={addCarrerInput}>
                    <View style={styles.plusMinusBox}>
                      <Entypo name="plus" size={20} color="#8C8C8C"/>
                    </View>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity onPress={() => removeCarrerInput(index)}>
                  <View style={styles.plusMinusBox}>
                    <Entypo name="minus" size={20} color="#8C8C8C" />
                  </View>
                  </TouchableOpacity>
                }
              </View>
              ))
            }
          </View>
        </View>      

        <Divider height={2}/>

        {/* 사진 */}
        <View style={styles.infoContainer}>
          <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <Typography fontSize={24}>사진</Typography>
            {
              images?.length > 0 || imageNames?.length > 0 
              ?
              <TouchableOpacity
                onPress={()=>{
                  setImageNames([""]);
                  setImages([]);
                  alertDeletePhoto();
                }}
              >
                <View style={{width:100, height:30, borderWidth:1, borderColor:'#8C8C8C', borderRadius:5,
                              alignItems:'center', justifyContent:'center'}}>
                  <Typography color='#8C8C8C' fontSize={12}>사진모두삭제</Typography>
                </View>
              </TouchableOpacity>
              : 
              <View></View>
            }
          </View>
          <View style={{marginVertical: 5}}>
            <View style={{flexDirection:'row', flexWrap:'wrap', alignItems:"center"}}>
              {
                imageNames?.length > 0
                &&
                <View style={{height:100, flexDirection:'row', justifyContent:'space-between', alignItems:"center"}}>
                  {
                    imageNames?.map((item:any, index:any)=>{
                      return (
                        <View 
                          key={index}
                          style={{width:100, height:100, margin:5}}
                        >
                            <Image style={{width:'100%', height:'100%', resizeMode:'cover'}} 
                              source={{ uri: `${MainURL}/images/upload_profile/${item}`}}/>
                        </View>
                      )
                    })
                  }
                </View>
              }
              {images?.map((image, index) => (
                <View key={index} style={{ width: 100, height: 100, margin: 5  }}>
                  <Image source={{ uri: image.uri }} style={{ width: '100%', height: '100%', borderRadius:10 }} />
                </View>
              ))}
              <TouchableOpacity
                onPress={alertPushPhoto}
              >
                <View style={{width:100, height:100, borderWidth:1, borderColor:'#8C8C8C', borderRadius:5,
                              alignItems:'center', justifyContent:'center', marginHorizontal:5, marginVertical:10}}>
                  <Entypo name="plus" size={20} color="#8C8C8C"/>
                </View>
              </TouchableOpacity>

            </View>
         </View>
        </View>     

        <Divider height={2}/> 

        {/* 영상 */}  
        <View style={styles.infoContainer}>
          <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <Typography fontSize={24}>영상 링크</Typography>
            {
              videoLinks?.length > 0 && videoLinks[0] !== ""
              ?
              <TouchableOpacity
                onPress={()=>{
                  setVideoLinks([""]);
                }}
              >
                <View style={{width:100, height:30, borderWidth:1, borderColor:'#8C8C8C', borderRadius:5,
                              alignItems:'center', justifyContent:'center'}}>
                  <Typography color='#8C8C8C' fontSize={12}>영상모두삭제</Typography>
                </View>
              </TouchableOpacity>
              : 
              <View></View>
            }
          </View> 
          <View style={styles.infoBox}>
            {
              videoLinks?.length > 0 &&
              videoLinks.map((item, index) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                  style={[styles.inputBox, { flex: 1 }]}
                  placeholder="영상(ex.유투브) 주소 입력"
                  placeholderTextColor="#8C8C8C"
                  value={item}
                  onChangeText={(text) => handleVideoLinksChange(text, index)}
                  onFocus={()=>{
                    setTextInputAddView(true);
                  }}
                  onEndEditing={()=>{
                    setTextInputAddView(false);
                  }}
                />
                {
                  index === videoLinks.length - 1
                  ?
                  <TouchableOpacity onPress={addVideoLink}>
                    <View style={styles.plusMinusBox}>
                      <Entypo name="plus" size={20} color="#8C8C8C"/>
                    </View>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity onPress={() => removeVideoLinks(index)}>
                  <View style={styles.plusMinusBox}>
                    <Entypo name="minus" size={20} color="#8C8C8C" />
                  </View>
                  </TouchableOpacity>
                }
              </View>
              ))
            }
          </View>
        </View>      

        <ButtonBox leftFunction={closeDetail} leftText='취소' rightFunction={createPost} rightText='수정완료' marginBottom={30}/>
        
        
        {
          textInputAddView 
          && <View style={{height:400}}></View>
        }

      </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  infoContainer: {
    flex: 2,
    paddingVertical: 10,
  },
  infoBox: {
    alignItems: 'center',
    justifyContent:'center',
    marginTop: 10,
  },
  contactBox : {
    width:'48%', 
    padding:15, 
    borderWidth:1, 
    borderColor:'#EAEAEA', 
    borderRadius:10,
    alignItems:'center'
  },
  contactBoxSelected : {
    width:'48%', 
    padding:15, 
    borderWidth:1, 
    borderColor:'#333', 
    borderRadius:10,
    alignItems:'center'
  },
  inputBox: {
    width:'95%',
    minHeight: 50,
    height: 'auto',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
  },
  plusMinusBox: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 10,
  },
  buttonContainer: {
    justifyContent: 'center',
    marginBottom: 30
  },
  button: {
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff'
  }  
});


