import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { Typography } from '../Components/Typography';
import axios from 'axios';
import MainURL from "../../MainURL";
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function LyricsMain (props : any) {

  interface songsProps {
    id: number;
    sort : string;
    nation: string;
    songName : string;
    author : string;
    lyrics : string;
  }

  const [songs, setSongs] = useState<songsProps[]>([]);

  const fetchPosts = () => {
    axios.get(`${MainURL}/lyricssave/getsongdataitary`).then((res) => {
      let copy: any = [...res.data];
      copy.sort((a:any, b:any) => (a.songName > b.songName ? 1 : -1));
      setSongs(copy);
    });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <View style={styles.container}>
      {
        songs.map((item:any, index:any)=>{

          const reform = item.lyrics.split('\n');

          return (
            <TouchableOpacity
              key={index} 
              style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginVertical:10}}
              onPress={()=>{
                props.navigation.navigate('LyricsDetail', { data : item })
              }}
            >
              <View>
                <Typography fontSize={18}>{item.songName}</Typography>
                <Typography fontSize={14} color='#8B8B8B'>{item.author}</Typography>
              </View>
              <AntDesign name='right'/>
            </TouchableOpacity>
          )
        })
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding:20
  },

});


