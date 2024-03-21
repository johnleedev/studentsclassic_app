import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,  Image, ScrollView, Alert } from 'react-native';
import { Typography } from '../Components/Typography';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function TuneMain (props : any) {

  const notesSharp = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C'];
  const notesFlat = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B', 'C'];
  const [isSeletedSharp, setIsSeletedSharp] = useState<boolean>(true);
  const [ViewNotes, setViewNotes] = useState(notesSharp);
  const leftLocation = [0, 20, 37, 60, 74, 111, 132, 148, 170, 185, 208, 222, 259]
  const [selected1Note, setSelected1Note] = useState(null);
  const [selected1Index, setSelected1Index] = useState(0);
  const [selected2Note, setSelected2Note] = useState(null);
  const [selected2Index, setSelected2Index] = useState(0);
  const [ViewTune, setViewTune] = useState('');
 

  // 두 음 사이의 음정 계산 함수
  const calculateInterval = (note1:any, Idx1:number, note2:any, Idx2:number) => {
    let result = ''

    if (Idx2 - Idx1 < 0) {
      Alert.alert('두번째음이 첫번째음보다 아래입니다. 다시 선택해주세요');
      setSelected1Note(null);
      setSelected2Note(null);
      setViewTune('');
    }
    if (Idx2 - Idx1 === 1) {
      result = isSeletedSharp ? '증1도' : '단2도';
    } else if (Idx2 - Idx1 === 2) {
      result = '장2도'
    } else if (Idx2 - Idx1 === 3) {
      result = isSeletedSharp ? '증2도' : '단3도';
    } else if (Idx2 - Idx1 === 4) {
      result = '장3도'
    } else if (Idx2 - Idx1 === 5) {
      result = '완전4도'
    } else if (Idx2 - Idx1 === 6) {
      result = isSeletedSharp ? '증4도' : '단5도';
    } else if (Idx2 - Idx1 === 7) {
      result = '완전5도'
    } else if (Idx2 - Idx1 === 8) {
      result = isSeletedSharp ? '증5도' : '단6도';
    } else if (Idx2 - Idx1 === 9) {
      result = '장6도'
    } else if (Idx2 - Idx1 === 10) {
      result = isSeletedSharp ? '증6도' : '단7도';
    } else if (Idx2 - Idx1 === 11) {
      result = '장7도'
    } else if (Idx2 - Idx1 === 12) {
      result = '완전8도'
    } 

    return result;
  };

  // 건반 선택 시 호출되는 함수
  const handleNotePress = (note:any, index:number) => {

    if (selected1Note && selected2Note) {
      setSelected1Note(null);
      setSelected2Note(null);
      setViewTune('');
    } else if (selected1Note) {
        setSelected2Note(note);
        setSelected2Index(index);
        const interval = calculateInterval(selected1Note, selected1Index, note, index);
        setViewTune(interval);
    } else {
        setSelected1Note(note);
        setSelected1Index(index);
    }
  };
   

  return (
    
    <View style={styles.container}>

      <View style={[styles.section, {flexDirection:'row', justifyContent:'space-between', alignItems:'center'}]}>
        <View style={{paddingHorizontal:20}}>
          <Typography fontSize={20} fontWeightIdx={1}>'{isSeletedSharp ? '#' : 'b'}' 음계</Typography>
        </View>
        <TouchableOpacity 
          style={{alignItems:'center', justifyContent:'center'}}
          onPress={()=>{setIsSeletedSharp(!isSeletedSharp); setViewNotes(isSeletedSharp ? notesFlat : notesSharp);}}
        >
          <View style={{padding:5, borderWidth:1, borderRadius:5, borderColor:"#BDBDBD", flexDirection:'row', alignItems:'center'}}>
            <AntDesign name='retweet' color='#333' style={{marginRight:10}}/>
            <Typography color="#333">'{isSeletedSharp ? 'b' : '#'}'으로 보기</Typography>
          </View>
        </TouchableOpacity>
      </View>

      <View style={[styles.section, {alignItems:'center'}]}>
        <View style={{width:300, height:120, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          {ViewNotes.map((note, index) => (
            index === 1 || index === 3 || index === 6 || index === 8 || index === 10
            ?
            <TouchableOpacity 
              key={index}
              onPress={() => handleNotePress(note, index)} 
              style={{ backgroundColor: note.includes(isSeletedSharp ? '#' : 'b') ? 'black' : 'white', borderWidth:1, 
                        position:'absolute', top:0, left:leftLocation[index], zIndex:9}}
            >
              <View style={{alignItems:'center', justifyContent:'flex-start', width:30, height:70, paddingTop:5}}>
                <Typography color={note.includes(isSeletedSharp ? '#' : 'b') ? 'white' : 'black'}>{note}</Typography>
              </View>
            </TouchableOpacity>
            :
            <TouchableOpacity 
              key={index}
              onPress={() => handleNotePress(note, index)} 
              style={{ backgroundColor: note.includes(isSeletedSharp ? '#' : 'b') ? 'black' : 'white', borderWidth:1,
                        position:'absolute', top:10, left:leftLocation[index], zIndex:7}}
            >
              <View style={{alignItems:'center', justifyContent:'flex-end', width:37, height:100, paddingBottom:5}}>
                <Typography color={note.includes(isSeletedSharp ? '#' : 'b') ? 'white' : 'black'} >{note}</Typography>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={{height:100, borderWidth:1, marginHorizontal:20, borderColor:"#BDBDBD", borderRadius:5}}>
          <View style={{width:'100%', flexDirection:'row', borderBottomWidth:1, borderColor:"#BDBDBD",
                        justifyContent:'space-between', alignItems:'center', padding:10}}>
            <View style={{width:'50%', alignItems:'center'}}>
              <Typography fontSize={18}>{selected1Note}</Typography>
            </View>
            <View style={{width:1, height:'100%', backgroundColor:"#BDBDBD"}}></View>
            <View style={{width:'50%', alignItems:'center'}}>
              <Typography fontSize={18}>{selected2Note}</Typography>  
            </View>
          </View>
          <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Typography fontSize={18} fontWeightIdx={1} >{ViewTune}</Typography>
          </View>
        </View>
      </View>
      
      <TouchableOpacity 
        style={{alignItems:'center', justifyContent:'center'}}
        onPress={()=>{
          setSelected1Note(null);
          setSelected2Note(null);
          setViewTune('');
        }}
      >
        <View style={{padding:5, borderWidth:1, borderRadius:5, borderColor:"#BDBDBD"}}>
          <Typography color="#8C8C8C">다시하기</Typography>
        </View>
      </TouchableOpacity>
      
      
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    padding: 20
  },
});

