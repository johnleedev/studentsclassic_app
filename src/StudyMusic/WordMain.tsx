import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Typography } from '../Components/Typography';
import { Title } from '../Components/Title';
import { Loading } from '../Components/Loading';
import WordSearch from './WordSearch';
import WordStudy from './WordStudy';
import WordQuizSelect from './WordQuizSelect';


export default function WordMain (props : any) {

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
       <Typography fontSize={14} fontWeightIdx={1} color={currentTab === tabNum ? '#C9AE00' : '#8B8B8B'}>{title}</Typography>
       {
         currentTab === tabNum
         ? <View style={{width:60, height:2, backgroundColor:'#C9AE00', marginTop:10}}></View>
         : <View style={{width:60, height:2, backgroundColor:'#fff', marginTop:10}}></View>
       }
     </TouchableOpacity>
    )    
  };

  return (
    <View style={styles.container}>

      {/* title */}
      
      <View style={{width:'100%', flexDirection: 'row', alignItems: 'flex-start', paddingLeft:10,
                  borderBottomWidth:1, borderBottomColor:"#EFEFEF", marginBottom:20}}>
        <SelectMenu tabNum={1} title='기초학습'/>
        <SelectMenu tabNum={2} title='기초문제'/>
        <SelectMenu tabNum={3} title='용어검색'/>
      
        
      </View>
      {currentTab === 1 && <WordStudy navigation={props.navigation}/>}
      {currentTab === 2 && <WordQuizSelect navigation={props.navigation}/>}
      {currentTab === 3 && <WordSearch navigation={props.navigation}/>}
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});


