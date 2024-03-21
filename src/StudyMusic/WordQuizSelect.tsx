import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,  Image, ScrollView } from 'react-native';
import { Typography } from '../Components/Typography';
import { Divider } from '../Components/Divider';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import MainURL from "../../MainURL";
import Loading from '../Components/Loading';
import SelectDropdown from 'react-native-select-dropdown'

interface WordsProps {
  id: number;
  sort: string;
  word : string;
  meaning : string;
}

export default function WordQuizSelect (props : any) {

  const [wordsList, setWordsList] = useState<WordsProps[]>([]);
  const [isResdataFalse, setIsResdataFalse] = useState<boolean>(false);
  
  const fetchPosts = () => {
    axios.get(`${MainURL}/study/getmusicwordall`)
    .then((res) => {
      if(res.data) {
        setIsResdataFalse(false);
        let data: any = [...res.data];
        setWordsList(data);
      } else {
        setIsResdataFalse(true);
      }
    });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const wordsList1: WordsProps[] = wordsList.filter(word => word.sort === '템포');
  const wordsList2: WordsProps[] = wordsList.filter(word => word.sort === '강약');
  const wordsList3: WordsProps[] = wordsList.filter(word => word.sort === '연주법');
  const wordsList4: WordsProps[] = wordsList.filter(word => word.sort === '분위기');
  const wordsList5: WordsProps[] = wordsList.filter(word => word.sort === '반복');
  const wordsList6: WordsProps[] = wordsList.filter(word => word.sort === '일반');

  return (
    wordsList.length === 0 && !isResdataFalse
    ?  (
    <View style={{flex:1, width:'100%', height:'100%'}}>
      <Loading /> 
    </View>
    ) : (
    <View style={styles.container}>
      

      
      <ScrollView >
      <View style={{paddingHorizontal:20, flexDirection:'row', flexWrap:'wrap', justifyContent:'space-between'}}>
        <TouchableOpacity 
          style={styles.select}
          onPress={()=>{
            props.navigation.navigate('WordQuiz', { data: wordsList1, sortko: '템포' })
          }}
        >
          <View style={styles.selectText}>
            <Typography fontSize={18} fontWeightIdx={1} marginBottom={3}>템포</Typography> 
            <Typography fontSize={12}>{wordsList1.length}개 단어</Typography>
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.select}
          onPress={()=>{
            props.navigation.navigate('WordQuiz', { data: wordsList2, sortko: '강약' })
          }}
        >
          <View style={styles.selectText}>
            <Typography fontSize={18} fontWeightIdx={1} marginBottom={3}>강약</Typography> 
            <Typography fontSize={12}>{wordsList2.length}개 단어</Typography>
          </View>
        </TouchableOpacity >
        <TouchableOpacity 
          style={styles.select}
          onPress={()=>{
            props.navigation.navigate('WordQuiz', { data: wordsList3, sortko: '연주법' })
          }}
        >
          <View style={styles.selectText}>
            <Typography fontSize={18} fontWeightIdx={1} marginBottom={3}>연주법</Typography> 
            <Typography fontSize={12}>{wordsList3.length}개 단어</Typography>
          </View>
        </TouchableOpacity >
        <TouchableOpacity 
          style={styles.select}
          onPress={()=>{
            props.navigation.navigate('WordQuiz', { data: wordsList4, sortko: '분위기' })
          }}
        >
          <View style={styles.selectText}>
            <Typography fontSize={18} fontWeightIdx={1} marginBottom={3}>분위기</Typography> 
            <Typography fontSize={12}>{wordsList4.length}개 단어</Typography>
          </View>
        </TouchableOpacity >
        <TouchableOpacity 
          style={styles.select}
          onPress={()=>{
            props.navigation.navigate('WordQuiz', { data: wordsList5, sortko: '반복' })
          }}
        >
          <View style={styles.selectText}>
            <Typography fontSize={18} fontWeightIdx={1} marginBottom={3}>반복</Typography> 
            <Typography fontSize={12}>{wordsList5.length}개 단어</Typography>
          </View>
        </TouchableOpacity >
        <TouchableOpacity 
          style={styles.select}
          onPress={()=>{
            props.navigation.navigate('WordQuiz', { data: wordsList6, sortko: '일반' })
          }}
        >
          <View style={styles.selectText}>
            <Typography fontSize={18} fontWeightIdx={1} marginBottom={3}>일반</Typography> 
            <Typography fontSize={12}>{wordsList6.length}개 단어</Typography>
          </View>
        </TouchableOpacity >
       
      </View>
      <View style={{height:50}}></View>
      </ScrollView>
      
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
    padding: 20
  },
  backButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  select: {
    width:'48%', 
    height:100,
    paddingVertical:10,
    paddingHorizontal:20,
    borderWidth:1, 
    borderColor:'#BDBDBD', 
    borderRadius:10, 
    flexDirection:'row',
    alignItems:'center', 
    justifyContent:'center',
    marginVertical:10,
  },
  selectText : {
    alignItems:'center', 
  }
  
});

