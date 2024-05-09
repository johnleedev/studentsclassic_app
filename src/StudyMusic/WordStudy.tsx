import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,  Image, ScrollView } from 'react-native';
import { Typography } from '../Components/Typography';
import { Divider } from '../Components/Divider';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import MainURL from "../../MainURL";
import { Loading } from '../Components/Loading';
import SelectDropdown from 'react-native-select-dropdown'

interface WordsProps {
  id: number;
  word : string;
  meaning : string;
}

export default function WordStudy (props : any) {

  const [wordsList, setWordsList] = useState<WordsProps[]>([]);
  const [isResdataFalse, setIsResdataFalse] = useState<boolean>(false);
  const [wordsListView, setWordsListView] = useState<WordsProps[]>([]);
  
  const fetchPosts = () => {
    axios.get(`${MainURL}/study/getmusicwordall`)
    .then((res) => {
      if(res.data) {
        setIsResdataFalse(false);
        let data: any = [...res.data];
        setWordsList(data);
        setWordsListView(data);
      } else {
        setIsResdataFalse(true);
      }
    });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const optionsSort = ["전체", "템포", "강약", "연주법", "분위기", "반복", "일반"];


  const wordsLength = wordsListView.length;
  const [isViewMeaning, setIsViewMeaning] = useState(Array(wordsList.length).fill(false));

  const handleIsViewMeaning = (index:number, boolean: boolean ) => {
    const copy = [...isViewMeaning];
    copy[index] = boolean;
    setIsViewMeaning(copy);
  }

  const handleNationChange = (selected : any) => {
    if (selected === '전체') {
      setWordsListView(wordsList);  
    } else {
      const copy = wordsList.filter((item:any)=> item.sort === selected)
      setWordsListView(copy);
    }    
  };

  return (
    wordsListView.length === 0 && !isResdataFalse
    ?  (
    <View style={{flex:1, width:'100%', height:'100%'}}>
      <Loading /> 
    </View>
    ) : (
    <View style={styles.container}>
      <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:5, paddingHorizontal:20}}>
        <View style={{width:'50%', flexDirection:'row', justifyContent:'space-between'}}>
          <View style={styles.selectDropdown}>
            <Typography fontSize={14} color='#8C8C8C' >구분</Typography>
            <SelectDropdown
              data={optionsSort}
              onSelect={(selectedItem, index) => {
                handleNationChange(selectedItem);
              }}
              defaultButtonText={optionsSort[0]}
              buttonStyle={{width:90, height:30, backgroundColor:'#fff'}}
              buttonTextStyle={{fontSize:14, fontWeight:'bold'}}
              dropdownStyle={{width:120, borderRadius:10}}
              rowStyle={{ width:120}}
              rowTextStyle={{fontSize:14, fontWeight:'bold'}}
            />
            <AntDesign name='down' size={12} color='#8C8C8C'/>
          </View>
        </View>
        <Typography fontSize={14} color='#8C8C8C'>{wordsLength}개 단어</Typography>
      </View>  

      
      <ScrollView style={styles.section}>
      {
        wordsListView.map((item:any, index:any)=>{

          return ( 
            <View
              key={index} 
              style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginVertical:10}}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={()=>{handleIsViewMeaning(index, !isViewMeaning[index])}}
                style={{flexDirection:'row', justifyContent:'space-between', padding:15, alignItems:'center',
                            borderWidth:1, borderRadius:10, borderColor:'#DFDFDF', minHeight:70
                }}>
                { !isViewMeaning[index] ?
                <>
                  <View style={{width:'50%', justifyContent:'flex-start', flexDirection:'row', alignItems:'center'}}>
                    <Image
                      source={require("../images/study/orangemiddle.png")}
                      style={{width:10, height:20, resizeMode:'cover', opacity:0.5, marginRight:5}}>
                    </Image>
                    <Typography>{item.word}</Typography>
                  </View>
                  <View style={{width:'50%', alignItems:'flex-end'}}>
                    <View
                      style={{height:40, justifyContent:'center', paddingHorizontal:30, borderWidth:1, borderColor:'#EAEAEA', borderRadius:5}}
                    >
                      <Typography color='#8C8C8C'>의미보기</Typography>
                    </View>
                  </View>
                </>
                :
                <>
                  <View style={{width:'10%', justifyContent:'center'}}>
                    <AntDesign name='left' color='#333'/>           
                  </View>
                  <View style={{width:'90%', alignItems:'flex-end'}}>
                    <Typography>{item.meaning}</Typography>
                  </View>
                </>
                }
              </TouchableOpacity>
            </View>
          )
        })
      }
      <View style={{height:50}}></View>
      </ScrollView>
      
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
    padding: 20
  },
  backButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionsContainer: {
    marginTop:20,
  },
  optionButton: {
    height:50,
    marginVertical: 10,
    padding: 10,
    borderWidth:1,
    borderColor:'#BDBDBD',
    borderRadius: 5,
    flexDirection:'row',
    alignItems:'center'
  },
  selectDropdown : {
    width:'100%',
    borderWidth:1, 
    borderRadius:5, 
    borderColor:'#DFDFDF', 
    paddingHorizontal:15,
    paddingVertical:5,
    flexDirection:'row', 
    alignItems:'center',
  },
  
});

