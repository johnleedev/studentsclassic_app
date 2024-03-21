import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert  } from 'react-native';
import { Typography } from '../Components/Typography';
import axios from 'axios';
import MainURL from "../../MainURL";
import { Divider } from '../Components/Divider';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SelectDropdown from 'react-native-select-dropdown'
import { ButtonBox } from '../Components/ButtonBox';
import { SubTitle } from '../Components/SubTitle';
import AsyncGetItem from '../AsyncGetItem';


export default function RequestRegister (props : any) {
  const select = props.route.params.select;
  const setword = props.route.params.setword ? props.route.params.setword : '';

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

  // 커스텀 탭 버튼 ----------------------------------------------------------------------
  const [currentTab, setCurrentTab] = useState(select === 'Song' ? 1 : 2);

  interface SelectMenuProps {
    tabNum : number;
    title: string;
    select: string;
  }
  const SelectMenu: React.FC<SelectMenuProps> = ({ tabNum, title, select}) => {
    return (
      <TouchableOpacity
      style={{width:70, alignItems:'center', paddingTop:10}}
      onPress={() => {setCurrentTab(tabNum); setSelected(select)}}
    >
      <Typography fontSize={14} fontWeightIdx={1} color={currentTab === tabNum ? '#333' : '#8B8B8B'}>{title}</Typography>
      {
        currentTab === tabNum
        ? <View style={{width:60, height:2, backgroundColor:'#333', marginTop:10}}></View>
        : <View style={{width:60, height:2, backgroundColor:'#fff', marginTop:10}}></View>
      }
    </TouchableOpacity>
    )    
  }; 
  
  const currentTime = new Date();
  const currentDate = currentTime.toISOString().slice(0, 19);


  const [selected, setSelected] = useState(select);
  const [requestSort, setRequestSort] = useState('가곡');
  const [requestNation, setRequestNation] = useState('이태리');
  const [requestSongName, setRequestSongName] = useState('');
  const [requestAuthor, setRequestAuthor] = useState('');
  const [requestWord, setRequestWord] = useState(setword);

  const handleRequest = () => {
    Alert.alert(selected === 'Song' ? "곡 등록 요청 확인" : "단어 등록 요청 확인", 
     selected === 'Song' 
     ? `\n형식:${requestSort}\n언어:${requestNation}\n곡명:${requestSongName}\n작곡:${requestAuthor}` 
     : `\n언어:${requestNation}\n단어:${requestWord}`, 
    [
      { text: '취소', onPress: () => {return}},
      { text: '확인', onPress: () => {postRequest()}}
    ]);
  }

  const postRequest = () => {
    axios.post(`${MainURL}/study/request`, {
      select : selected,
      sort : requestSort, nation: requestNation,
      songName : requestSongName, author : requestAuthor,
      word : requestWord, date : currentDate,
      response : '신청',
      userAccount : asyncGetData.userAccount,
      userName : asyncGetData.userName
    })
    .then((res) => {
      if(res.data === true) {
        Alert.alert("요청되었습니다.");
        props.navigation.goBack();
      } else {
        Alert.alert(res.data);
      }
    })
    .catch((err:any)=>{
      console.log(err)
    })
  }


  const closeDetail = () => {
    props.navigation.goBack();
  };
   
  return (
    <View style={styles.container}>

      <SubTitle title='등록 요청 하기' enTitle='' navigation={props.navigation}/>

      <View style={{width:'100%', flexDirection: 'row', alignItems: 'flex-start', paddingLeft:10,
                  borderBottomWidth:1, borderBottomColor:"#EFEFEF", marginBottom:20}}>
        <SelectMenu tabNum={1} title='곡' select='Song'/>
        <SelectMenu tabNum={2} title='단어' select='Word'/>
      </View>

      
      <View style={{paddingHorizontal:20, flex:1}}>
        {
        selected === 'Song' &&
        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginVertical:10}}>
          <Typography fontWeightIdx={1}>형식 : </Typography>
          <TouchableOpacity 
            style={[styles.selectButton, {borderColor: requestSort === '가곡' ? '#333' : '#DFDFDF' }]}
            onPress={()=>{
              setRequestSort('가곡')
            }}
          >
            <Typography color={requestSort === '가곡' ? '#333' : '#DFDFDF'} fontWeightIdx={1}>가곡</Typography> 
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.selectButton, {borderColor: requestSort === '아리아' ? '#333' : '#DFDFDF' }]}
            onPress={()=>{
              setRequestSort('아리아')
            }}
          >
            <Typography color={requestSort === '아리아' ? '#333' : '#DFDFDF'} fontWeightIdx={1}>아리아</Typography> 
          </TouchableOpacity>
        </View>
        }

        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginVertical:10}}>
          <Typography fontWeightIdx={1}>언어 : </Typography>
          <TouchableOpacity 
            style={[styles.selectButton, {borderColor: requestNation === '이태리' ? '#333' : '#DFDFDF' }]}
            onPress={()=>{
              setRequestNation('이태리')
            }}
          >
            <Typography color={requestNation === '이태리' ? '#333' : '#DFDFDF'} fontWeightIdx={1}>이태리</Typography> 
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.selectButton, {borderColor: requestNation === '독일' ? '#333' : '#DFDFDF' }]}
            onPress={()=>{
              setRequestNation('독일')
            }}
          >
            <Typography color={requestNation === '독일' ? '#333' : '#DFDFDF'} fontWeightIdx={1}>독일</Typography> 
          </TouchableOpacity>
        </View>

        <Divider marginVertical={5}/>
        <Typography fontSize={14} color='#8C8C8C'> * 곡명과 작곡가를 잘 확인하고 요청해주세요.</Typography>
        {
          selected === 'Song'
          ?
          <>
          <View style={styles.seachBar}>
            <View style={[styles.flexBox, { alignItems:"center"}]}>
              <Typography fontSize={14} color='#333' >곡명: </Typography>
              <TextInput 
                placeholder="첫글자는 대문자로 적어주세요"
                placeholderTextColor="#DBDBDB"
                value={requestSongName}
                onChange={(e)=>{setRequestSongName(e.nativeEvent.text)}} 
                style={{height:'100%', flex:1}}
              />
              <TouchableOpacity onPress={()=>{setRequestSongName('')}}>
                <AntDesign  name="closecircle" size={14} color="#C1C1C1"/> 
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.seachBar}>
            <View style={[styles.flexBox, { alignItems:"center"}]}>
              <Typography fontSize={14} color='#333' >작곡가: </Typography>
              <TextInput 
                placeholder="첫글자는 대문자로 적어주세요"
                placeholderTextColor="#DBDBDB"
                value={requestAuthor}
                onChange={(e)=>{setRequestAuthor(e.nativeEvent.text)}} 
                style={{height:'100%', flex:1}}
              />
              <TouchableOpacity onPress={()=>{setRequestAuthor('')}}>
                <AntDesign  name="closecircle" size={14} color="#C1C1C1"/> 
              </TouchableOpacity>
            </View>
          </View>
          </>
          :
          <View style={styles.seachBar}>
            <View style={[styles.flexBox, { alignItems:"center"}]}>
              <Typography fontSize={14} color='#8C8C8C' >단어: </Typography>
              <TextInput 
                value={requestWord}
                onChange={(e)=>{setRequestWord(e.nativeEvent.text)}} 
                style={{height:'100%', flex:1}}
              />
              <TouchableOpacity onPress={()=>{setRequestWord('')}}>
                <AntDesign  name="closecircle" size={14} color="#C1C1C1"/> 
              </TouchableOpacity>
            </View>
          </View>
        }
      </View>

      <View style={styles.section}>
        <ButtonBox leftFunction={closeDetail} leftText='취소' rightFunction={handleRequest} rightText='요청'/>
      </View>
    
    </View>
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
  backButton: {
    width: 30,
    height: 30,
    justifyContent:'center',
    alignItems:'center',
  },
  selectDropdown : {
    width:'48%',
    borderWidth:1, 
    borderRadius:5, 
    borderColor:'#DFDFDF', 
    paddingHorizontal:15,
    paddingVertical:5,
    flexDirection:'row', 
    alignItems:'center',
  },
  selectButton : {
    width:'40%',
    height: 40,
    borderWidth:1, 
    borderRadius:5, 
    paddingHorizontal:15,
    paddingVertical:5,
    flexDirection:'row', 
    alignItems:'center',
    justifyContent:'center'
  },
  seachBar:{
    borderWidth:1,
    borderRadius:12,
    height: 48,
    borderColor: '#EAEAEA',
    flexDirection:"row",
    alignItems:"center",
    paddingHorizontal:15,
    marginTop:10
  },
  flexBox:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
});


