import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import { Divider } from '../Components/Divider';
import { Title } from '../Components/Title';
import { Typography } from '../Components/Typography';
import AsyncGetItem from '../AsyncGetItem';
import Schedule from './Schedule';
import axios from 'axios';
import MainURL from '../../MainURL';
import { Loading } from '../Components/Loading';
import Notes from './Notes';

export default function Main (props: any) {

  // 커스텀 탭 버튼 ----------------------------------------------------------------------
  const [currentTab, setCurrentTab] = useState(1);
  const [refresh, setRefresh] = useState<boolean>(true);

  interface SelectMenuProps {
    tabNum : number;
    title: string;
  }
  const SelectMenu: React.FC<SelectMenuProps> = ({ tabNum, title}) => {
    return (
      <TouchableOpacity
      style={{width:70, alignItems:'center', paddingTop:10}}
      onPress={() => setCurrentTab(tabNum)}
    >
      <Typography fontSize={14} fontWeightIdx={1} color={currentTab === tabNum ? '#333' : '#8B8B8B'}>{title}</Typography>
      {
        currentTab === tabNum
        ? <View style={{width:60, height:2, backgroundColor:'#333', marginTop:10}}></View>
        : <View style={{width:60, height:2, backgroundColor:'#fff', marginTop:10}}></View>
      }
    </TouchableOpacity>
    )    
  };

  // AsyncGetData
  const [asyncGetData, setAsyncGetData] = useState<any>({});
  const asyncFetchData = async () => {
    try {
      const data = await AsyncGetItem();
      setAsyncGetData(data);
      fetchPosts(data?.userAccount)
    } catch (error) {
      console.error(error);
    }
  };

  const [notes, setNotes] = useState<any>([]);
  const [isResdataFalse, setIsResdataFalse] = useState<boolean>(false);

  const fetchPosts = (userAccount:any) => {
    axios.get(`${MainURL}/lessonnote/notes/${userAccount}`).then((res) => {
      if(res.data) {
        setIsResdataFalse(false);
        let copy: any = [...res.data];
        copy.reverse();
        setNotes(copy);
      } else {
        setIsResdataFalse(true);
      }
    });
  };

  useEffect(() => {
    asyncFetchData();
  }, [refresh]);

  return (
    <View style={{flex:1, backgroundColor:'#fff'}}>

      <Title title='레슨일지' enTitle='LessonNote' />
      
      <View style={{width:'100%', flexDirection: 'row', alignItems: 'flex-start', paddingLeft:10,
                  borderBottomWidth:1, borderBottomColor:"#EFEFEF", marginBottom:20}}>
        <SelectMenu tabNum={1} title='레슨일정'/>
        <SelectMenu tabNum={2} title='레슨기록'/>
  
      </View>
      
      {currentTab === 1 && <Schedule navigation={props.navigation} userAccount={asyncGetData.userAccount} notes={notes} isResdataFalse={isResdataFalse}
                            refresh={refresh} setRefresh={setRefresh}/>}
      {currentTab === 2 && <Notes navigation={props.navigation} userAccount={asyncGetData.userAccount} notes={notes} isResdataFalse={isResdataFalse} 
                            refresh={refresh} setRefresh={setRefresh}/>}
      
   
    
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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


