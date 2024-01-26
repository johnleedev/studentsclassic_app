import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Typography } from '../Components/Typography';
import { Title } from '../Components/Title';
import LyricsList from './LyricsList';
import WordList from './WordList';
import Loading from '../Components/Loading';
import RequestList from './RequestList';

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
       style={{width:80, alignItems:'center', paddingTop:10}}
       onPress={() => setCurrentTab(tabNum)}
     >
       <Typography fontSize={14} color={currentTab === tabNum ? '#333' : '#8B8B8B'}>{title}</Typography>
       {
         currentTab === tabNum
         ? <View style={{width:70, height:2, backgroundColor:'#333', marginTop:10}}></View>
         : <View style={{width:70, height:2, backgroundColor:'#fff', marginTop:10}}></View>
       }
     </TouchableOpacity>
    )    
  };

  return (
    <View style={styles.container}>

      {/* title */}
      <Title title='스터디' enTitle='Study'/>
      
      <View style={{width:'100%', flexDirection: 'row', alignItems: 'flex-start', paddingLeft:10,
                  borderBottomWidth:1, borderBottomColor:"#EFEFEF", marginBottom:20}}>
        <SelectMenu tabNum={1} title='곡'/>
        <SelectMenu tabNum={2} title='단어'/>
        
        <TouchableOpacity 
          style={{position:'absolute', right:22, bottom:10, borderRadius:5,
                      borderWidth:1, borderColor:'#555', padding:5}}
          onPress={()=>{
            props.navigation.navigate('RequestList')
          }}
        >
          <Typography fontSize={14} color='#555' fontWeightIdx={2}>요청게시판</Typography>
        </TouchableOpacity>
      </View>
      
      {currentTab === 1 && <LyricsList navigation={props.navigation}/>}
      {currentTab === 2 && <WordList  navigation={props.navigation}/>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});


