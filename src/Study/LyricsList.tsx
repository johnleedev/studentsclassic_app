import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Modal,
          NativeSyntheticEvent, TextInputChangeEventData, Alert } from 'react-native';
import { Typography } from '../Components/Typography';
import axios from 'axios';
import MainURL from "../../MainURL";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import SelectDropdown from 'react-native-select-dropdown'
import Loading from '../Components/Loading';

export default function LyricsList (props : any) {

  interface songsProps {
    id: number;
    sort : string;
    nation: string;
    songName : string;
    operName : string | null;
    author : string;
  }

  const [songs, setSongs] = useState<songsProps[]>([]);
  const [sort, setSort] = useState<string>('Song');
  const [nation, setNation] = useState<string>('Itary');
  const [alphabet, setAlphabet] = useState<string>('A');

  const fetchPosts = () => {
    axios.get(`${MainURL}/study/getsongdataall/${sort}/${nation}/${alphabet}`).then((res) => {
      let copy: any = [...res.data];
      copy.sort((a:any, b:any) => (a.songName > b.songName ? 1 : -1));
      setSongs(copy);
      setSongsViewList(copy);
    });
  };

  useEffect(() => {
    fetchPosts();
  }, [sort, nation, alphabet]);

  // inputbox ----------------------------------------------------------------------
  const [songsViewList, setSongsViewList] = useState<any>([]);
  const [inputValue, setInputValue] = useState('');  
  
  const filteredSongs = (inputText : string) => {
    const filteredListAddress = songs.filter((song: any) => {
      const searchFields = [song.songName, song.author, song.operName];
      return searchFields.some((field) => field && field.toLowerCase().includes(inputText.toLowerCase()));
    });
    setSongsViewList(filteredListAddress);
  }

  const changeInputValue = async(event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const inputText = event.nativeEvent.text;
    setInputValue(inputText);
    filteredSongs(inputText);
  };

  const handleResetPress = () => {
    setInputValue('');
    setSongsViewList(songs);
  }

  const optionsSort = ["가곡", "아리아"];
  const optionsNation = ["이태리", "독일"];
  const optionsAlphabet = ["전체", "A~", "B~", "C~", "D~", "E~", "F~", "G~", "H~", "I~", "J~", "K~", "L~", "M~", 
                          "N~", "O~", "P~", "Q~", "R~", "S~", "T~", "U~", "V~", "W~", "X~", "Y~", "Z~"];

  const handleSortChange = (selected : any) => {
    if (selected === "가곡") {setSort('Song');}
    if (selected === "아리아") {setSort('Aria');}
  };
  const handleNationChange = (selected : any) => {
    if (selected === "이태리") {setNation('Itary');}
    if (selected === "독일") {
      Alert.alert('준비중입니다.')
      // setNation('German');
    }
  };

  const handleAlphabetChange = (selected : any) => {
    if (selected === '전체') {
      setAlphabet(selected);  
    } else {
      const copy = selected.slice(0,1);
      setAlphabet(copy);
    }
  };

  return (
    songs === undefined
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
              <Typography fontSize={14} color='#8C8C8C' fontWeightIdx={2}>형식</Typography>
              <SelectDropdown
                data={optionsSort}
                onSelect={(selectedItem, index) => {
                  handleSortChange(selectedItem);
                }}
                defaultButtonText={optionsSort[0]}
                buttonStyle={{width:110, height:30, backgroundColor:'#fff'}}
                buttonTextStyle={{fontSize:12, fontWeight:'bold'}}
                dropdownStyle={{width:120, borderRadius:10}}
                rowStyle={{ width:120}}
                rowTextStyle={{fontSize:12, fontWeight:'bold'}}
              />
            </View>
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
                defaultButtonText={optionsAlphabet[1]}
                buttonStyle={{width:270, height:30, backgroundColor:'#fff'}}
                buttonTextStyle={{fontSize:12, fontWeight:'bold'}}
                dropdownStyle={{width:270, borderRadius:10}}
                rowStyle={{ width:270}}
                rowTextStyle={{fontSize:12, fontWeight:'bold'}}
              />
            </View>
          </View>

          {/* // ---------------------------------------------------------------------------- */}
          <View style={styles.seachBar}>
            <View style={[styles.flexBox, { alignItems:"center"}]}>
              <Entypo name="magnifying-glass" size={22} color="#8B8B8B" style={{marginRight:13}}/> 
              <TextInput 
                maxLength={20} 
                placeholder={sort === "Aria" ? '곡명, 작곡가, 오페라 제목' : '곡명, 작곡가'}
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
            songsViewList.length > 0
            ?
            <>
              {
                songsViewList.map((item:any, index:any)=>{

                  return (
                    <TouchableOpacity
                      key={index} 
                      style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginVertical:10}}
                      onPress={()=>{
                        props.navigation.navigate('LyricsDetail', { songID : item.id, sort : sort, nation : nation })
                      }}
                    >
                      <View>
                        <Typography fontSize={18}>{item.songName}</Typography>
                        {
                          sort === "Aria" &&
                          <Typography fontWeightIdx={1}><Text style={{color:'#8B8B8B', fontSize:12}}>from </Text>"{item.operaName}"</Typography>
                        }
                        <Typography fontWeightIdx={1} fontSize={14} color='#8B8B8B'>{item.author}</Typography>
                      </View>
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
                  props.navigation.navigate('Request', {select : 'Song'})
                }}
              >
                <Typography fontSize={12} fontWeightIdx={2} color='#E5625D'>곡 등록 요청</Typography>
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
  }

});


