import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Typography } from '../Components/Typography';
import { Title } from '../Components/Title';
import WordMain from './WordMain';
import KeysMain from './KeysMain';
import TuneMain from './TuneMain';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function MusicMain (props : any) {

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
      <Title title='음악스터디' enTitle='StudyMusic'/>
      
      <View style={{width:'100%', flexDirection: 'row', alignItems: 'flex-start', paddingLeft:10,
                  borderBottomWidth:1, borderBottomColor:"#EFEFEF", marginBottom:20}}>
        <SelectMenu tabNum={1} title='음악용어'/>
        <SelectMenu tabNum={2} title='조성'/>
        <SelectMenu tabNum={3} title='음정'/>

        <TouchableOpacity 
          style={{position:'absolute', right:22, bottom:10, borderRadius:5,
                      borderWidth:1, borderColor:'#555', padding:5, flexDirection:'row', alignItems:'center'}}
          onPress={()=>{
            props.navigation.navigate('Main')
          }}
        >
          <Typography fontSize={14} color='#555' >노래스터디 </Typography>
          <AntDesign name='right'  color='#555' />
        </TouchableOpacity>
      </View>
      
      {currentTab === 1 && <WordMain navigation={props.navigation}/>}
      {currentTab === 2 && <KeysMain navigation={props.navigation}/>}
      {currentTab === 3 && <TuneMain navigation={props.navigation}/>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});


