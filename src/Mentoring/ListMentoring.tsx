import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, ScrollView, Alert, Platform, Image, TouchableOpacity } from 'react-native';
import {launchImageLibrary, ImageLibraryOptions, Asset} from 'react-native-image-picker';
import axios from 'axios';
import MainURL from "../../MainURL";
import { Typography } from '../Components/Typography';
import SelectDropdown from 'react-native-select-dropdown'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MainImageURL from "../../MainImageURL";
import { Divider } from '../Components/Divider';
import { ButtonBox } from '../Components/ButtonBox';
import { SubTitle } from '../Components/SubTitle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../Components/Loading';
import DateFormmating from '../Components/DateFormmating';


export default function ListMentoring(props : any) {

  const asyncGetData = props.route.params.asyncGetData;
  const sort = props.route.params.sort;
    
  const [isRegister, setIsRegister] = useState('');

  const [lists, setLists] = useState<any>([]);
  const [listsViewList, setListsViewList] = useState<any>([]);
  const [isResdataFalse, setIsResdataFalse] = useState<boolean>(false);

  const fetchlists = async () => {
    await axios.get(`${MainURL}/mentoring/getmentoringregister/${asyncGetData.userAccount}`).then((res) => {
      if(res.data) {
        const copy = res.data[0].mentoring;
        setIsRegister(copy);
      } 
    });
    axios.get(`${MainURL}/mentoring/get${sort}list`).then((res) => {
      if(res.data) {
        setIsResdataFalse(false);
        let copy: any = [...res.data];
        copy.reverse();
        setLists(copy);
        setListsViewList(copy);
      } else {
        setIsResdataFalse(true);
      }
    });
  };

  useEffect(() => {
    fetchlists();
  }, []);

  return (
    <View style={styles.container}>
      
      {/* title */}
      <SubTitle title={sort === 'mentor' ? '멘토 목록' : '멘티 목록'} navigation={props.navigation}/>
                
      <Divider height={2} />

      {
        isRegister === 'true'
        ?
        <View style={styles.section}>
          {
            listsViewList.length > 0
            ?
            <>
              {
                listsViewList.map((item:any, index:any)=>{

                  return (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={{marginBottom: 5, padding: 16, justifyContent: 'center'}}
                      key={index}
                      onPress={() => {
                        props.navigation.navigate('DetailMentoring', { data: item, sort : sort });
                      }}
                    >                      
                      <View style={{flexDirection:'row', height:110, marginBottom:10, paddingVertical:5}}>
                        <View style={{width:'30%', justifyContent:'center', alignItems:'center', marginRight:10}}>
                          <Image source={{uri: `${MainImageURL}/images/mentoring/${sort}/${item.userImageProfile}`}} style={{width:100, height:100, resizeMode:'cover', borderRadius:10}}/>
                        </View>
                        <View style={{width:'65%'}}>
                          <View style={{height:45}}>
                            <Typography fontSize={14} color='#8C8C8C'>{item.userRegion}</Typography>
                          </View>
                          <View style={{height:25, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                            <Typography fontSize={14} color='#8C8C8C'>{item.userSchool}</Typography>
                            <Typography fontSize={14} color='#8C8C8C'>{item.userSchNum} </Typography>
                            <Typography fontSize={14} color='#8C8C8C'>{item.userPart}</Typography>
                            <Typography fontSize={14} color='#000'>  {item.userName}</Typography>
                          </View>
                        </View>
                      </View>
                      
                      <Divider height={2}/>
                    </TouchableOpacity>
                  )
                })
              }
              <View style={{height:150}}></View>
            </>
            :
            <View style={{alignItems:'center', justifyContent:'center', paddingTop:20}}>
              <Typography color="#8B8B8B">등록된 {sort === 'mentor' ? '멘토' : '멘티'}가 없습니다.</Typography>
            </View>
          }
          </View>
        :
        <>
          <View style={{height:200, alignItems:'center', justifyContent:'center'}}>
            <Typography marginBottom={5}>현재 멘토&멘티에 정식 등록되지 않았습니다.</Typography>
            <Typography>멘토&멘티에 등록하신 후에 이용하실 수 있습니다.</Typography>
          </View>
          <View style={{alignItems:'center', justifyContent:'center'}}>
            <TouchableOpacity 
              style={{alignItems:'center', justifyContent:'center', borderWidth:1, borderColor:'#EAEAEA', marginTop:30, padding:10, borderRadius:10}}
              onPress={()=>{
                props.navigation.goBack();
              }}
            >
              <Typography color="#8B8B8B">뒤로가기</Typography>
            </TouchableOpacity >
          </View>
        </>      
      }

      
     
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
  
});

