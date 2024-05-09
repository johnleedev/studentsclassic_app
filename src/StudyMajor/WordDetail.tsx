import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { Typography } from '../Components/Typography';
import axios from 'axios';
import MainURL from "../../MainURL";
import { Divider } from '../Components/Divider';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Loading } from '../Components/Loading';

export default function WordDetail (props : any) {
  
  const nation = props.route.params.nation;
  const setword = props.route.params.setword;
  const currentTime = new Date();
  const currentDate = currentTime.toISOString().slice(0, 19);

  interface WordsProps {
    id: number;
    word : string;
    meaning: string;
  }
  interface MeaningProps {
    num : number;
    genter : string;
    meaning: string[];
  }

  const [word, setWord] = useState<WordsProps[]>([]);
  const [meaning, setMeaning] = useState<MeaningProps[]>([]);
  const [isResdataFalse, setIsResdataFalse] = useState<boolean>(false);

  const fetchPosts = () => {
    axios.get(`${MainURL}/study/getworddata/${nation}/${setword}`)
    .then((res) => {
      if(res.data) {
        let copy = res.data;
        setWord(copy);
        let copy2 = res.data[0];
        const meaning = copy2.meaning ? JSON.parse(copy2.meaning) : [];
        setMeaning(meaning);
      } else {
        setIsResdataFalse(true);
      }
    })
    .catch((err:any)=>{
      console.log(err)
    })
  };

  useEffect(() => {
    fetchPosts();
  }, []);


  const handleWordReport = () => {
    Alert.alert(`단어 : ${setword}`, "수정 요청 하시겠습니까?", 
    [
      { text: '취소', onPress: () => {return}},
      { text: '확인', onPress: () => {postRequest()}}
    ]);
  };

  const postRequest = () => {
    axios.post(`${MainURL}/study/request`, {
      select : "word", nation: nation === "Itary" ? "이태리" : "독일",
      word : setword, date : currentDate,
      response : '수정'
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
  
  return (
    word.length === 0 && !isResdataFalse // axios 반응이 없을때
    ?  (
    <View style={{flex:1, width:'100%', height:'100%'}}>
      <Loading /> 
    </View>
    ) : (
    <View style={styles.container}>

      <View style={[styles.section, {flexDirection:'row', justifyContent:'space-between', alignItems:'center'}]}>
        <Typography fontSize={12} color='#8B8B8B'>{nation === 'Itary' ? '한국외국어대학교 지식출판원 이태리어-한국어사전' : '민중서림 엣센스 독한사전'}</Typography>
        <TouchableOpacity
          onPress={()=>{
            props.navigation.goBack()
          }}>
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Divider height={2} marginVertical={10}/>
      {
        !isResdataFalse // axios 반응이 있고, res.data가 true일때
        ?
        <ScrollView style={[styles.section]}>
          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginBottom:10}}>
            <Typography fontSize={24} fontWeightIdx={1}>{word[0].word}</Typography>
            <TouchableOpacity
             style={{borderRadius:5, borderWidth:1, borderColor:'#8B8B8B', padding:5}}
             onPress={handleWordReport}
            >
              <Typography fontSize={12} color='#8B8B8B'>수정요청하기</Typography>
            </TouchableOpacity>
          </View>
          <View style={{width:'100%', alignItems:'flex-end', marginBottom:20}}>
            <Typography fontSize={10} color='#8B8B8B'  >* 단어의 의미가 올바르지 않은 경우, 수정요청 해주세요.</Typography>
          </View>
          { meaning.length > 0 
            ?
            meaning.map((item:any, index:any)=>{

              return (
                <View key={index} style={{marginVertical:10}}>
                  <View style={{flexDirection:'row', alignItems:'center', marginBottom:10}}>
                    <Typography  fontWeightIdx={1}>{item.num} </Typography>
                    <Typography color='#8B8B8B' >{item.gender} </Typography>
                  </View>
                  <Typography marginBottom={10} >{item.meaning}</Typography>
                  {
                    item.addMeaning &&
                    <View style={{flexDirection:'row', alignItems:'center', flexWrap:'wrap', marginBottom:10}}>
                      {
                        item.addMeaning.length > 0 &&
                        item.addMeaning.map((addMeaning:any, addMeaningIdx:any)=>{
                          return(
                            <View key={addMeaningIdx} style={{flexDirection:'row', flexWrap:'wrap', marginBottom:5}}>
                              <Typography>{addMeaning.addNum}</Typography>
                              <Typography color='#8B8B8B'>{addMeaning.addGender}</Typography>
                              <Typography >{addMeaning.addMeaning}</Typography>
                            </View>
                          )
                        })
                      }
                    </View>
                  }
                  {
                    item.relationWord &&
                    <View style={{flexDirection:'row', alignItems:'center', flexWrap:'wrap'}}>
                      <Typography  fontSize={14}>유의어/반의어: </Typography>
                      <Typography  fontSize={14}>{item.relationWord}</Typography>
                    </View>
                  }
                </View>
              )
            })
            :
            <View style={{alignItems:'center', marginTop:20}}>
              <Typography fontSize={14}  marginBottom={5}>사전에 없는 단어입니다.</Typography>
              <Typography fontSize={14}  marginBottom={5}>어미(단어끝)가 변형된 단어이거나,</Typography>
              <Typography fontSize={14} >지명,인명일수 있습니다.</Typography>
            </View>
          }
        <View style={{height:100}}></View>
      </ScrollView>
      :
      // axios 반응이 있지만, res.data가 false일때
      <View style={[styles.section, {flex:1, alignItems:'center', justifyContent:'center'}]}>
        <Typography marginBottom={10} fontSize={24}>"{setword}"</Typography>
        <Typography>현재, 이 단어가 없습니다.</Typography>
        <TouchableOpacity 
          style={{padding:5, borderWidth:1, borderColor:'#E5625D', borderRadius:10, marginTop:15}}
          onPress={()=>{
            props.navigation.navigate('Request', { select : 'Word', setword : setword})
          }}
        >
          <Typography fontSize={12}  color='#E5625D'>단어 등록 요청</Typography>
        </TouchableOpacity>
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
  section : {
    padding: 20
  },
  backButton: {
    width: 40,
    height: 40,
  }
});