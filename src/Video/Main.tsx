import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Typography } from '../Components/Typography';
import { Title } from '../Components/Title';
import AntDesign from 'react-native-vector-icons/AntDesign';
import VideoGraduate from './VideoGraduate';
import VideoMy from './VideoMy';

export default function Main (props : any) {

   // 커스텀 탭 버튼 ----------------------------------------------------------------------
  const [currentTab, setCurrentTab] = useState(1);
 
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

  return (
    <View style={styles.container}>

      {/* title */}
      <Title title='노래영상' enTitle='SingingVideo'/>
      
      <View style={{width:'100%', flexDirection: 'row', alignItems: 'flex-start', paddingLeft:10,
                  borderBottomWidth:1, borderBottomColor:"#EFEFEF", marginBottom:20}}>
        <SelectMenu tabNum={1} title='연주영상'/>
        <SelectMenu tabNum={2} title='나의영상'/>
      </View>

      {currentTab === 1 && <VideoGraduate navigation={props.navigation}/>}
      {currentTab === 2 && <VideoMy navigation={props.navigation}/>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});


