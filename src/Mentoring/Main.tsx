import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import { Divider } from '../Components/Divider';
import { Title } from '../Components/Title';
import { Typography } from '../Components/Typography';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import AsyncGetItem from '../AsyncGetItem';

export default function Main (props: any) {


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

  return (
    <View style={{flex:1, backgroundColor:'#fff'}}>

      <Title title='멘토링' enTitle='Mentoring' />
      
      <Divider height={2} />

      <ScrollView style={styles.container}>
        
        <View style={styles.section}>
          <View style={styles.selectBoxCover}>
            <TouchableOpacity 
              style={styles.selectBox}
              onPress={()=>{
                props.navigation.navigate('NoticeMentoring', {sort: 'mentor'});
              }}
            >
              <View style={{flexDirection:'row'}}>
                <Image
                  source={require("../images/study/orangemiddle.png")}
                  style={{width:10, height:20, resizeMode:'cover', opacity:0.5, marginRight:5}}>
                </Image>
                <Typography fontSize={20} fontWeightIdx={1} marginBottom={5}>멘토란?</Typography>
              </View>
              <Typography fontSize={14} color='#BDBDBD'>멘토에 대한 안내</Typography>
              <View style={{flex:1, flexDirection:'row', alignItems:'flex-end', justifyContent:'flex-end'}}>
                <AntDesign name='questioncircleo' size={25} color='#333' style={{marginRight:5}}/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.selectBox}
              onPress={()=>{
                props.navigation.navigate('NoticeMentoring', {sort: 'mentee'});
              }}
            >
              <View style={{flexDirection:'row'}}>
                <Image
                  source={require("../images/study/greenmiddle.png")}
                  style={{width:10, height:20, resizeMode:'cover', opacity:0.5, marginRight:5}}>
                </Image>
                <Typography fontSize={20} fontWeightIdx={1} marginBottom={5}>멘티란?</Typography>
              </View>
              <Typography fontSize={14} color='#BDBDBD'>멘티에 대한 안내</Typography>
              <View style={{flex:1, flexDirection:'row', alignItems:'flex-end', justifyContent:'flex-end'}}>
                <AntDesign name='questioncircleo' size={25} color='#333' style={{marginRight:5}}/>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.selectBoxCover}>
          <TouchableOpacity 
              style={styles.selectBox}
              onPress={()=>{
                  props.navigation.navigate('RegisterMentoring', {asyncGetData : asyncGetData, sort: 'mentor'});
              }}
            >
              <View style={{flexDirection:'row'}}>
                <Image
                  source={require("../images/study/orangemiddle.png")}
                  style={{width:10, height:20, resizeMode:'cover', opacity:0.5, marginRight:5}}>
                </Image>
                <Typography fontSize={20} fontWeightIdx={1} marginBottom={5}>멘토신청</Typography>
              </View>
              <Typography fontSize={14} color='#BDBDBD'>멘토 등록 하기</Typography>
              <View style={{flex:1, flexDirection:'row', alignItems:'flex-end', justifyContent:'flex-end'}}>
                <Feather name='send' size={25} color='#333' style={{marginRight:5}}/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.selectBox}
              onPress={()=>{
                props.navigation.navigate('RegisterMentoring', {asyncGetData : asyncGetData, sort: 'mentee'});
              }}
            >
              <View style={{flexDirection:'row'}}>
                <Image
                  source={require("../images/study/greenmiddle.png")}
                  style={{width:10, height:20, resizeMode:'cover', opacity:0.5, marginRight:5}}>
                </Image>
                <Typography fontSize={20} fontWeightIdx={1} marginBottom={5}>멘티신청</Typography>
              </View>
              <Typography fontSize={14} color='#BDBDBD'>멘티 등록 하기</Typography>
              <View style={{flex:1, flexDirection:'row', alignItems:'flex-end', justifyContent:'flex-end'}}>
                <Feather name='send' size={25} color='#333' style={{marginRight:5}}/>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.selectBoxCover}>
          <TouchableOpacity 
              style={styles.selectBox}
              onPress={()=>{
                props.navigation.navigate('ListMentoring', {asyncGetData : asyncGetData, sort: 'mentor'});
              }}
            >
              <View style={{flexDirection:'row'}}>
                <Image
                  source={require("../images/study/orangemiddle.png")}
                  style={{width:10, height:20, resizeMode:'cover', opacity:0.5, marginRight:5}}>
                </Image>
                <Typography fontSize={20} fontWeightIdx={1} marginBottom={5}>멘토목록</Typography>
              </View> 
              <Typography fontSize={14} color='#BDBDBD'>등록된 멘토들 보기</Typography>
              <View style={{flex:1, flexDirection:'row', alignItems:'flex-end', justifyContent:'flex-end'}}>
                <Feather name='list' size={30} color='#333' style={{marginRight:5}}/>
              </View>
              
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.selectBox}
              onPress={()=>{
                props.navigation.navigate('ListMentoring', {asyncGetData : asyncGetData, sort: 'mentee'});
              }}
            >
              <View style={{flexDirection:'row'}}>
                <Image
                  source={require("../images/study/greenmiddle.png")}
                  style={{width:10, height:20, resizeMode:'cover', opacity:0.5, marginRight:5}}>
                </Image>
                <Typography fontSize={20} fontWeightIdx={1} marginBottom={5}>멘티목록</Typography>
              </View>
              <Typography fontSize={14} color='#BDBDBD'>등록된 멘티들 보기</Typography>
              <View style={{flex:1, flexDirection:'row', alignItems:'flex-end', justifyContent:'flex-end'}}>
                <Feather name='list' size={30} color='#333' style={{marginRight:5}}/>
              </View>
              
            </TouchableOpacity>
          </View>
        </View>
      

      </ScrollView>
   
    
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  section : {
    padding: 20,
  },
  selectBoxCover : {
    flexDirection:'row', 
    alignItems:'center', 
    justifyContent:'space-between',
    marginBottom: 20
  },
  selectBox : {
    width: '48%',
    height: 150,
    borderWidth: 1, 
    borderRadius:10,
    borderColor:'#BDBDBD',
    padding: 20
  }
 
});


