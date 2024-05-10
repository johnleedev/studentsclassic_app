import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Alert, TouchableOpacity, Text, ScrollView, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios'
import MainURL from "../../MainURL";
import AsyncGetItem from '../AsyncGetItem'
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Typography } from '../Components/Typography';
import { SubTitle } from '../Components/SubTitle';
import { ButtonBox } from '../Components/ButtonBox';
import { Divider } from '../Components/Divider';
import SelectDropdown from 'react-native-select-dropdown'
import { Loading } from '../Components/Loading';
import YoutubePlayer from "react-native-youtube-iframe";

export default function VideoPost(props: any) {
  
  const youtubeWidth = Dimensions.get('window').width;
  const youtubeHeight = youtubeWidth * 5.65 / 10
  const userData = props.route.params.userData;


  const [sort, setSort] = useState('graduate');
  const [viewUrl, setViewUrl] = useState('');
  const [url, setUrl] = useState('');
  const [year, setYear] = useState('');
  const [school, setSchool] = useState(userData.userSchool);
  const [name, setName] = useState(userData.userName);
  const [part, setPart] = useState(userData.userPart);
  

  const createPost = async () => {
    
    const currentTime = new Date();
    const currentDate = currentTime.toISOString().slice(0, 19);

    axios
    .post(`${MainURL}/videos/postvideo`, {
      date: currentDate, 
      userAccount : userData.userAccount,
      sort: sort, url: url, year : year, 
      name: name, school: school, part : part
    })
    .then((res) => {
      if (res.data === true) {
        Alert.alert('입력되었습니다.');
        props.navigation.replace('Main');
      } else {
        Alert.alert(res.data)
      }
    })
    .catch(() => {
      console.log('실패함')
    })   
  };

  const closeDetail = () => {
    props.navigation.goBack();
  };

  // 셀렉박스 ---------------------------------------------------------------------

  const sortSelect = [
    "졸업연주회", "정기연주회", "기타연주회"
  ]
  const handleSortChange = (selected : any) => {
    if (selected === '졸업연주회' ) {setSort('graduate')}
    if (selected === '정기연주회' ) {setSort('regular')}
    if (selected === '기타연주회' ) {setSort('etc')}
  };

  // 유투브 주소 함수 ---------------------------------------------------------------------
  const handleUrl = (e:any) => {
    setViewUrl(e);
    const keyword = "https://youtu.be/";
    const startIndex = e.indexOf(keyword);
    const isInclude = e.includes(keyword);
    if (isInclude) {
      const extractedValue = e.substring(startIndex + keyword.length, e.indexOf("?"));
      setUrl(extractedValue);
    } 
  };

  const handleResetPress = () => {
    setUrl('');
    setViewUrl('');
  }
  

  return (
    <View style={styles.container}>
      <SubTitle title='노래영상 글쓰기' enTitle='writing' navigation={props.navigation}/>
      <Divider height={2} />
      <ScrollView style={{flex:1}}>
        <View style={styles.section}>

          <View style={{padding:15, backgroundColor:'rgba(215, 111, 35, 0.10)', marginBottom:20}}>
            <Typography fontSize={12} >장난스러운 글이나, 불건전하거나, 불법적인 내용 작성시, 경고 없이 곧바로 글은 삭제됩니다. 또한 사용자 계정은 서비스 사용에 제한이 있을 수 있습니다. </Typography>
          </View>

          <View style={styles.userBox}>
            <Typography><Entypo name="pencil" size={20} color="black"/> </Typography>
            <Typography>{userData.userName} </Typography>
            <Typography color='#8C8C8C'>{userData.userSchool}</Typography>
            <Typography color='#8C8C8C'>{userData.userSchNum} </Typography>
            <Typography color='#8C8C8C'>{userData.userPart}</Typography>
          </View>

          <View style={{paddingBottom:20, flexDirection:'row', justifyContent:'space-between'}}>
            <View style={styles.selectDropdown}>
              <Typography fontSize={14} color='#8C8C8C'>종류</Typography>
              <SelectDropdown
                data={sortSelect}
                onSelect={(selectedItem, index) => {
                  handleSortChange(selectedItem);
                }}
                defaultButtonText={sortSelect[0]}
                buttonStyle={{width:'85%', height:30, backgroundColor:'#fff'}}
                buttonTextStyle={{fontSize:14, fontWeight:'bold'}}
                dropdownStyle={{borderRadius:10}}
                rowTextStyle={{fontSize:14, fontWeight:'bold'}}
              />
              <AntDesign name='down' size={12} color='#8C8C8C'/>
            </View>
          </View>

          <View>
            <TextInput
              style={[styles.input]}
              placeholder="연주년도"
              placeholderTextColor='#8C8C8C'
              value={year}
              onChangeText={setYear}
            />
          </View>

          <View>
            <TextInput
              style={[styles.input]}
              placeholder="학교"
              placeholderTextColor='#8C8C8C'
              value={school}
              onChangeText={setSchool}
            />
          </View>

          <View>
            <TextInput
              style={[styles.input]}
              placeholder="이름"
              placeholderTextColor='#8C8C8C'
              value={name}
              onChangeText={setName}
            />
          </View>

          <View>
            <TextInput
              style={[styles.input]}
              placeholder="파트"
              placeholderTextColor='#8C8C8C'
              value={part}
              onChangeText={setPart}
            />
          </View>

          <View style={styles.seachBar}>
            <View style={[styles.flexBox, { alignItems:"center"}]}>
              <TextInput 
                style={{height:'100%', flex:1}}
                placeholder="유투브주소"
                placeholderTextColor='#8C8C8C'
                value={viewUrl}
                onChangeText={handleUrl}
              />
              <TouchableOpacity onPress={handleResetPress}>
                <AntDesign  name="closecircle" size={14} color="#C1C1C1"/> 
              </TouchableOpacity>
            </View>
          </View>
          { url !== '' && <Typography fontSize={12}>* 유투브 주소는, 아래 미리보기가 정상으로 나오면, 올바르게 첨부된 것입니다.</Typography>}
        </View>

        { url !== '' && 
        <>
        <View style={{alignItems:"center"}}>
          <Typography>* 미리보기</Typography>
        </View>
        <View style={{width:youtubeWidth, height:youtubeHeight, marginBottom:30}}>
          <Loading backgroundColor='#EAEAEA'/>
          <View style={{position:'absolute'}}>
            <YoutubePlayer
              width={youtubeWidth}
              height={youtubeHeight}
              videoId={url}
            />
          </View>
        </View>
        </>}

        <ButtonBox leftFunction={closeDetail} leftText='취소' rightFunction={createPost} rightText='완료'/>
        <View style={{height:150}}></View>
      </ScrollView>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  section : {
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  addTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  userBox: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    fontSize: 16,
    height: 40,
    color: '#333',
  },
  contentInput: {
    minHeight: 280,
    textAlignVertical: 'top',
  },
  selectDropdown : {
    width:'100%',
    borderWidth:1, 
    borderRadius:5, 
    borderColor:'#DFDFDF', 
    paddingHorizontal:15,
    paddingVertical:5,
    flexDirection:'row', 
    alignItems:'center',
  },
  seachBar:{
    borderWidth:1,
    borderRadius:5,
    height: 40,
    borderColor: '#EAEAEA',
    flexDirection:"row",
    alignItems:"center",
    paddingLeft:8,
    paddingRight:15,
    marginBottom:10
  },
  flexBox:{
    flexDirection:'row',
    justifyContent:'space-between',
  }
});


