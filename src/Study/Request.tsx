import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert  } from 'react-native';
import { Typography } from '../Components/Typography';
import axios from 'axios';
import MainURL from "../../MainURL";
import { Divider } from '../Components/Divider';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SelectDropdown from 'react-native-select-dropdown'
import { ButtonBox } from '../Components/ButtonBox';


export default function Request (props : any) {
  
  const currentTime = new Date();
  const currentDate = currentTime.toISOString().slice(0, 19);

  const select = props.route.params.select;
  const setword = props.route.params.setword ? props.route.params.setword : '';
  const [selected, setSelected] = useState(select);
  const [requestSort, setRequestSort] = useState('가곡');
  const [requestNation, setRequestNation] = useState('이태리');
  const [requestSongName, setRequestSongName] = useState('');
  const [requestAuthor, setRequestAuthor] = useState('');
  const [requestWord, setRequestWord] = useState(setword);

  const optionsSort = ["가곡", "아리아"];
  const optionsNation = ["이태리", "독일"];

  const handleSortChange = (selected : any) => {
    if (selected === "가곡") {setRequestSort('가곡');}
    if (selected === "아리아") {setRequestSort('아리아');
}
  };
  const handleNationChange = (selected : any) => {
    if (selected === "이태리") {setRequestNation('이태리');}
    if (selected === "독일") {
      Alert.alert('준비중입니다.')
      // setRequestNation('독일');
    }
  };

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
      response : '등록'
    })
    .then((res) => {
      if(res.data === true) {
        Alert.alert("요청되었습니다.");
        props.navigation.replace("Main");
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

      <View style={styles.section}>
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', height:40, marginBottom:10}}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={()=>{
              props.navigation.goBack()
            }}>
            <EvilIcons name="arrow-left" size={30} color="black" />
          </TouchableOpacity>
          <View style={{flexDirection:'row'}}>
            <Typography>등록 요청</Typography>
          </View>
        </View>
        <Divider height={2}/>
      </View>
      
      <View style={{paddingHorizontal:20, flex:1}}>
        
        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:20}}>
          <Typography>선택 : </Typography>
          <TouchableOpacity 
            style={[styles.selectButton, {borderColor: selected === 'Song' ? '#333' : '#DFDFDF' }]}
            onPress={()=>{
              setSelected('Song');
              setRequestWord('');
            }}
          >
            <Typography color={selected === 'Song' ? '#333' : '#DFDFDF'}>곡</Typography> 
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.selectButton, {borderColor: selected === 'Word' ? '#333' : '#DFDFDF' }]}
            onPress={()=>{
              setSelected('Word');
              setRequestSongName('');
              setRequestAuthor('');
            }}
          >
            <Typography color={selected === 'Word' ? '#333' : '#DFDFDF'}>단어</Typography> 
          </TouchableOpacity>
        </View>

        <Divider marginVertical={10}/>

        <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:10}}>
          {
            selected === 'Song' &&
            <View style={styles.selectDropdown}>
              <Typography fontSize={14} color='#8C8C8C' fontWeightIdx={2}>형식</Typography>
              <SelectDropdown
                data={optionsSort}
                onSelect={(selectedItem, index) => {
                  handleSortChange(selectedItem);
                }}
                defaultButtonText={optionsSort[0]}
                buttonStyle={{width:90, height:30, backgroundColor:'#fff'}}
                buttonTextStyle={{fontSize:12, fontWeight:'bold'}}
                dropdownStyle={{width:100, borderRadius:10}}
                rowStyle={{ width:100}}
                rowTextStyle={{fontSize:12, fontWeight:'bold'}}
              />
            </View>
          }
          <View style={styles.selectDropdown}>
            <Typography fontSize={14} color='#8C8C8C' fontWeightIdx={2}>언어</Typography>
            <SelectDropdown
              data={optionsNation}
              onSelect={(selectedItem, index) => {
                handleNationChange(selectedItem);
              }}
              defaultButtonText={optionsNation[0]}
              buttonStyle={{width:90, height:30, backgroundColor:'#fff'}}
              buttonTextStyle={{fontSize:12, fontWeight:'bold'}}
              dropdownStyle={{width:100, borderRadius:10}}
              rowStyle={{ width:100}}
              rowTextStyle={{fontSize:12, fontWeight:'bold'}}
            />
          </View>
        </View>
        
        {
          selected === 'Song'
          ?
          <>
          <View style={styles.seachBar}>
            <View style={[styles.flexBox, { alignItems:"center"}]}>
              <Typography fontSize={14} color='#8C8C8C' fontWeightIdx={2}>곡명: </Typography>
              <TextInput 
                maxLength={20} 
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
              <Typography fontSize={14} color='#8C8C8C' fontWeightIdx={2}>작곡: </Typography>
              <TextInput 
                maxLength={20} 
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
              <Typography fontSize={14} color='#8C8C8C' fontWeightIdx={2}>단어: </Typography>
              <TextInput 
                maxLength={20} 
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
    width: 40,
    height: 40,
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
    height: 50,
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


