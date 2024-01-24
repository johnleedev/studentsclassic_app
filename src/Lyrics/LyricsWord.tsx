import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { Typography } from '../Components/Typography';
import axios from 'axios';
import MainURL from "../../MainURL";
import { Divider } from '../Components/Divider';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function LyricsWord (props : any) {

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

  const [word, setWord] = useState<WordsProps>();
  const [meaning, setMeaning] = useState<MeaningProps[]>([]);

  const fetchPosts = () => {
    axios.get(`${MainURL}/lyricssave/getworddataitary/${props.route.params.data}`)
    .then((res) => {
      if(res.data) {
        let copy = res.data[0];
        setWord(copy);
        const meaning = copy.meaning ? JSON.parse(copy.meaning) : [];
        setMeaning(meaning);
      }
    })
    .catch((err:any)=>{
      console.log(err)
    })
  };

  useEffect(() => {
    fetchPosts();
  }, []);
 
  return (
    <View style={styles.container}>

      <View style={[styles.section, {flexDirection:'row', justifyContent:'space-between', alignItems:'center'}]}>
        
        <Typography fontSize={24}>{word?.word}</Typography>
        <TouchableOpacity
          onPress={()=>{
            props.navigation.goBack()
          }}>
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Divider height={2} marginVertical={10}/>
      
      {
        word
        ?
        <ScrollView style={[styles.section]}>
      { meaning !== undefined && meaning.length > 0 &&
        meaning.map((item:any, index:any)=>{

          return (
            <View key={index} style={{marginVertical:10}}>
              <View style={{flexDirection:'row', alignItems:'center', marginBottom:10}}>
                <Typography >{item.num} </Typography>
                <Typography color='#8B8B8B' >{item.gender} </Typography>
              </View>
              <Typography marginBottom={10}>{item.meaning}</Typography>
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
                          <Typography fontWeight='500'>{addMeaning.addMeaning}</Typography>
                        </View>
                      )
                    })
                  }
                </View>
              }
              {
                item.relationWord &&
                <View style={{flexDirection:'row', alignItems:'center', flexWrap:'wrap'}}>
                  <Typography fontWeight='500' fontSize={14}>유의어/반의어: </Typography>
                  <Typography fontWeight='500' fontSize={14}>{item.relationWord}</Typography>
                </View>
              }
            </View>
          )
        })
      }
      <View style={{height:100}}></View>
      </ScrollView>
      :
      <Typography>단어가 없습니다.</Typography>

      }

      
    </View>
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