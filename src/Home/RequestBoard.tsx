import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRoute } from '@react-navigation/native';
import MainURL from "../../MainURL";
import AsyncGetItem from '../AsyncGetItem'
import Entypo from 'react-native-vector-icons/Entypo';
import { Typography } from '../Components/Typography';
import { Title } from '../Components/Title';
import { Divider } from '../Components/Divider';
import DateFormmating from '../Components/DateFormmating';

export default function RequestBoard (props : any) {

  interface RequestSongsProps {
    id: number;
    sort : string;
    nation: string;
    songName : string;
    author : string;
    date : string;
    response : string;
  }
  const [requestSongs, setRequestSongs] = useState<RequestSongsProps[]>([]);
  const [isResdataFalse, setIsResdataFalse] = useState<boolean>(false);

  const fetchPosts = () => {
    axios.get(`${MainURL}/study/getrequestall/Song`).then((res) => {
      if (res.data) {
        setIsResdataFalse(false);
        let copy: any = [...res.data];
        copy.reverse();
        setRequestSongs(copy)
      } else {
        setIsResdataFalse(true);
      }
      
    });
  };

  useEffect(() => {
    fetchPosts();
  }, []);


  interface TextBoxProps {
    setwidth: number;
    fontSize? : number;
    text: any;
    fontWeightIdx? :number;
  }
  
  const TextBox: React.FC<TextBoxProps> = ({ setwidth, fontSize, text, fontWeightIdx }) => (
    <View style={{ width: `${setwidth}%`, alignItems: 'center' }}>
      <Typography fontSize={fontSize ?? 12 } fontWeightIdx={fontWeightIdx ?? 0}>{text}</Typography>
    </View>
  );

  const renderPreview = (content : string) => {
    if (content?.length > 30) {
      return content.substring(0, 30) + '...';
    }
    return content;
  };

  return (
    <View style={styles.container}>
      <Title title='곡 등록 요청 목록' enTitle='Suggestion'/>
      <View style={{paddingHorizontal:20, width:'100%', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
        <Typography fontSize={12} color='#8C8C8C'>최근 10개까지 보여집니다.</Typography>
        <TouchableOpacity 
          style={{borderRadius:5, borderWidth:1, borderColor:'#555', padding:5}}
          onPress={()=>{
            props.navigation.navigate('Navi_Request', {screen : 'RequestMain'})
          }}
        >
          <Typography fontSize={14} color='#555'>요청게시판</Typography>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        {
          requestSongs.slice(0,5).map((item:any, index:any)=>{
            return (
              <View key={index} >
                <View
                  style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginVertical:10}}
                >
                  <View style={{ width: '80%', }}>
                    <Typography fontWeightIdx={0}>{renderPreview(item.songName)}</Typography>
                    <Typography fontSize={14} >{renderPreview(item.author)}</Typography>
                    <View style={{flexDirection:'row'}}>
                      <Typography fontSize={12} >{item.nation}</Typography>
                      <Typography fontSize={12} >{item.sort}</Typography>
                    </View>
                  </View>
                  <View style={{ width: '20%', alignItems: 'center' }}>
                    <Typography fontSize={12} >{DateFormmating(item.date)}</Typography>
                    <Typography fontSize={12} >{item.response}</Typography>
                  </View>
                </View>
                <Divider />
              </View>
            )
          })
        } 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#fff'
  },
  section :{
    padding:20
  },
  

});


