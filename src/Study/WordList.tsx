import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, NativeSyntheticEvent, TextInputChangeEventData, Alert } from 'react-native';
import { Typography } from '../Components/Typography';
import axios from 'axios';
import MainURL from "../../MainURL";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { Title } from '../Components/Title';
import { Divider } from '../Components/Divider';
import SelectDropdown from 'react-native-select-dropdown'
import Loading from '../Components/Loading';

export default function WordList (props : any) {

  interface WordsProps {
    id: number;
    word : string;
  }

  const [words, setWords] = useState<WordsProps[]>([]);
  const [nation, setNation] = useState<string>('Itary');
  const [alphabet, setAlphabet] = useState<string>('A');

  const fetchPosts = () => {
    axios.get(`${MainURL}/study/getworddataall/${nation}/${alphabet}`)
    .then((res) => {
      if(res.data) {
        setWords(res.data);
        setWordsViewList(res.data);
      }
    });
  };

  useEffect(() => {
    fetchPosts();
  }, [nation, alphabet]);

  // inputbox ----------------------------------------------------------------------
  const [wordsViewList, setWordsViewList] = useState<any>([]);
  const [inputValue, setInputValue] = useState('');  
  
  const filteredwords = (inputText : string) => {
    const filteredListAddress = words.filter((word: any) => {
      const searchFields = [word.word];
      return searchFields.some((field) => field && field.toLowerCase().includes(inputText.toLowerCase()));
    });
    setWordsViewList(filteredListAddress);
  }

  const changeInputValue = async(event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const inputText = event.nativeEvent.text;
    setInputValue(inputText);
    filteredwords(inputText);
  };

  const handleResetPress = () => {
    setInputValue('');
    setWordsViewList(words);
  }

  const optionsNation = ["이태리", "독일"];
  const optionsAlphabet = ["A~", "B~", "C~", "D~", "E~", "F~", "G~", "H~", "I~", "J~", "K~", "L~", "M~", 
                          "N~", "O~", "P~", "Q~", "R~", "S~", "T~", "U~", "V~", "W~", "X~", "Y~", "Z~"];

  const handleNationChange = (selected : any) => {
    if (selected === "이태리") {setNation('Itary');}
    if (selected === "독일") {
      Alert.alert('준비중입니다.')
      // setNation('German');
    }
  };


  const handleAlphabetChange = (selected : any) => {
    const copy = selected.slice(0,1);
    setAlphabet(copy);
  };


  return (
    words.length === 0
    ?  (
    <View style={{flex:1, width:'100%', height:'100%'}}>
      <Loading /> 
    </View>
    ) : (
    <View style={styles.container}>
     
      <View style={{paddingHorizontal:20}}>
        
        <ScrollView>
          
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <View style={styles.selectDropdown}>
              <Typography fontSize={14} color='#8C8C8C' fontWeightIdx={2}>언어</Typography>
              <SelectDropdown
                data={optionsNation}
                onSelect={(selectedItem, index) => {
                  handleNationChange(selectedItem);
                }}
                defaultButtonText={optionsNation[0]}
                buttonStyle={{width:110, height:30, backgroundColor:'#fff'}}
                buttonTextStyle={{fontSize:12, fontWeight:'bold'}}
                dropdownStyle={{width:120, borderRadius:10}}
                rowStyle={{ width:120}}
                rowTextStyle={{fontSize:12, fontWeight:'bold'}}
              />
            </View>
          </View>


          <View style={{marginTop:10, alignItems:'center'}}>
            <View style={[styles.selectDropdown, {width:'100%'}]}>
              <Typography fontSize={14} color='#8C8C8C' fontWeightIdx={2}>첫문자</Typography>
              <SelectDropdown
                data={optionsAlphabet}
                onSelect={(selectedItem, index) => {
                  handleAlphabetChange(selectedItem);
                }}
                defaultButtonText={optionsAlphabet[0]}
                buttonStyle={{width:270, height:30, backgroundColor:'#fff'}}
                buttonTextStyle={{fontSize:12, fontWeight:'bold'}}
                dropdownStyle={{width:270, borderRadius:10}}
                rowStyle={{ width:270}}
                rowTextStyle={{fontSize:12, fontWeight:'bold'}}
              />
            </View>
          </View>


          <View style={styles.seachBar}>
            <View style={[styles.flexBox, { alignItems:"center"}]}>
              <Entypo name="magnifying-glass" size={22} color="#8B8B8B" style={{marginRight:13}}/> 
              <TextInput 
                maxLength={20} 
                placeholder="단어"
                placeholderTextColor="#DBDBDB"
                value={inputValue}
                onChange={changeInputValue} 
                style={{height:'100%', flex:1}}
              />
              <TouchableOpacity onPress={handleResetPress}>
                <AntDesign  name="closecircle" size={14} color="#C1C1C1"/> 
              </TouchableOpacity>
            </View>
          </View>

          {
            wordsViewList.length > 0
            ?
            <>
              {
                wordsViewList.map((item:any, index:any)=>{

                  return (
                    <TouchableOpacity
                      key={index} 
                      style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginVertical:10}}
                      onPress={()=>{
                        props.navigation.navigate('WordDetail', { setword : item.word, nation : nation })
                      }}
                    >
                      <Typography fontSize={18}>{item.word}</Typography>
                      <AntDesign name='right'/>
                    </TouchableOpacity>
                  )
                })
              }
            </>
            :
            <View style={{alignItems:'center', justifyContent:'center', paddingTop:20}}>
              <Typography color="#8B8B8B">검색결과가 없습니다.</Typography>
              <TouchableOpacity 
                style={{padding:5, borderWidth:1, borderColor:'#E5625D', borderRadius:10, marginTop:15}}
                onPress={()=>{
                  props.navigation.navigate('Request', {select : 'Word', setword : inputValue})
                }}
              >
                <Typography fontSize={12} fontWeightIdx={2} color='#E5625D'>단어 등록 요청</Typography>
              </TouchableOpacity>
            </View>
          }
          
        </ScrollView>
      </View>

    </View>
    )
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
  selectDropdown : {
    width:'48%',
    borderWidth:1, 
    borderRadius:5, 
    borderColor:'#DFDFDF', 
    paddingHorizontal:15,
    paddingVertical:5,
    flexDirection:'row', 
    alignItems:'center',
  },
  seachBar:{
    borderWidth:1,
    borderRadius:5,
    height: 48,
    borderColor: '#EAEAEA',
    flexDirection:"row",
    alignItems:"center",
    paddingHorizontal:15,
    marginVertical:10
  },
  flexBox:{
    flexDirection:'row',
    justifyContent:'space-between',
  },

});


