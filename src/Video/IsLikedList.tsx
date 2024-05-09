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
import { SubTitle } from '../Components/SubTitle';

export default function IsLikedList (props : any) {

  const postID = props.route.params.itemID;
  
  interface ListProps {
    userAccount : string;
    userName: string;
    userSchool: string;
    userSchNum : string;
    userPart : string;
    date : string;
  }
  const [list, setList] = useState<ListProps[]>([]);
  const [isResdataFalse, setIsResdataFalse] = useState<boolean>(false);

  const fetchPosts = () => {
    axios.get(`${MainURL}/videos/getgraduateislikedlist/${postID}`).then((res) => {
      if (res.data) {
        setIsResdataFalse(false);
        let copy: any = [...res.data];
        copy.reverse();
        setList(copy)
      } else {
        setIsResdataFalse(true);
      }
    });
  };

  useEffect(() => {
    fetchPosts();
  }, []);


  return (
    <View style={styles.container}>
      <SubTitle title='좋아요' enTitle='Good' navigation={props.navigation}/>
      <Divider height={2}/>
      <View style={styles.section}>
        {
          list.length > 0
          ?
          list.map((item:any, index:any)=>{
            return (
              <View key={index} >
                <View
                  style={{flexDirection:'row', alignItems:'center', marginVertical:10, justifyContent:'space-between'}}
                >
                  <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Typography>{item.userSchool} </Typography>
                    <Typography>{item.userSchNum}학번  </Typography>
                    <Typography>{item.userPart} </Typography>
                    <Typography>{item.userName}</Typography>
                  </View>
                  <Typography fontSize={14}>{DateFormmating(item.date)}</Typography>
                </View>
                <Divider />
              </View>
            )
          })
          :
          <View style={{flexDirection:'row', alignItems:'center',justifyContent:'center'}}>
             <Typography>좋아요가 아직 없습니다.</Typography>
          </View>
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


