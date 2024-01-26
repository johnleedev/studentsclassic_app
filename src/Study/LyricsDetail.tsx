import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { Typography } from '../Components/Typography';
import axios from 'axios';
import MainURL from "../../MainURL";
import { Divider } from '../Components/Divider';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Loading from '../Components/Loading';


export default function LyricsDetail (props : any) {

  const sort = props.route.params.sort;
  const nation = props.route.params.nation;
  const songID = props.route.params.songID;

  interface songsProps {
    id: number;
    sort : string;
    nation: string;
    songName : string;
    operName : string | null;
    author : string;
    lyrics : string;
  }

  const [songInfo, setSongInfo] = useState<songsProps>();

  const fetchPosts = () => {
    axios.get(`${MainURL}/study/getsongdata/${sort}/${nation}/${songID}`).then((res) => {
      let copy = res.data[0];
      setSongInfo(copy);
    });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const reform = songInfo?.lyrics.split('\n');

  return (
    songInfo === undefined
    ?  (
    <View style={{flex:1, width:'100%', height:'100%'}}>
      <Loading />
    </View>
    ) : (
    <View style={styles.container}>

      <View style={styles.section}>
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={()=>{
              props.navigation.goBack()
            }}>
            <EvilIcons name="arrow-left" size={30} color="black" />
          </TouchableOpacity>
          <View style={{flexDirection:'row', height:40}}>
            <Typography fontWeightIdx={1} color='#8C8C8C'>{nation === "Itary" ? "이태리" : "독일"} </Typography>
            <Typography fontWeightIdx={1} color='#8C8C8C'>{sort === "Song" ? "가곡" : "아리아"}</Typography>
          </View>
        </View>
        <Typography fontSize={20} marginBottom={10}>{songInfo.songName}</Typography>
        <Typography color='#8B8B8B'>{songInfo.author}</Typography>
      </View>
      <Divider height={2}/>
      
      <ScrollView style={[styles.section]}>
      <Typography fontSize={12} color='#8C8C8C' marginBottom={15}>* 단어를 누르면, 해당 단어의 사전적 의미를 볼수 있습니다.</Typography>
      {
        reform?.map((subItem:any, subIndex:any)=>{

          const copy = subItem.replaceAll('\n', ' \n').replaceAll(',', ' ,').replaceAll('!', ' !').replaceAll("'", "' ")
                        .replaceAll('.', ' .').replaceAll('´', '´ ').replaceAll('’', '’ ').replaceAll('?', ' ?');
          const result = copy.split(' ');

          return (
            <View key={subIndex}>
              <View style={{flexDirection:'row', marginVertical:5, flexWrap:'wrap'}}>
              {
                result.map((word:any, wordIndex:any)=>{
                  
                  return (
                    word === "," || word === "." || word ===  "!" || word === "´" || word === "?"
                    ?
                    <Typography key={wordIndex} fontSize={20} fontWeightIdx={2}>{word} </Typography>
                    :
                    <TouchableOpacity
                      key={wordIndex}
                      onPress={()=>{
                        props.navigation.navigate('WordDetail', {setword : word, nation : nation});
                      }}
                    > 
                      <Typography fontSize={20} fontWeightIdx={2}><Text style={{textDecorationLine:'underline', textDecorationColor:'#8B8B8B'}}>{word}</Text> </Typography>
                    </TouchableOpacity>
                  )
                })
              }
              </View>
            </View>
          )
        })
      }
      <View style={{height:100}}></View>
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
  section : {
    padding: 20
  },
  backButton: {
    width: 40,
    height: 40,
  }
});


