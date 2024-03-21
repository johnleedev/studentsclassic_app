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
import { Divider } from '../Components/Divider';

export default function LyricsSongList (props : any) {

  interface songsProps {
    id: number;
    nation: string;
    songName : string;
    operName : string | null;
    author : string;
  }

  const [songs, setSongs] = useState<songsProps[]>([]);
  const [songsLast, setSongsLast] = useState<songsProps[]>([]);
  const [nation, setNation] = useState<string>('Itary');
  const [alphabet, setAlphabet] = useState<string>("전체");
  const [isResdataFalse, setIsResdataFalse] = useState<boolean>(false);

  const fetchPosts = () => {
    axios.get(`${MainURL}/study/getsongdataall/Song/${nation}/${alphabet}`).then((res) => {
      if (res.data !== false) {
        setIsResdataFalse(false);
        let copy: any = [...res.data];
        setSongsLast(copy.slice(-3).reverse());
        copy.sort((a:any, b:any) => (a.songName > b.songName ? 1 : -1));
        setSongs(copy);
        setSongsViewList(copy);
      } else {
        setIsResdataFalse(true);
      }
      
    });
  };

  useEffect(() => {
    fetchPosts();
  }, [nation, alphabet]);

  // inputbox ----------------------------------------------------------------------
  const [songsViewList, setSongsViewList] = useState<any>([]);
  const [inputValue, setInputValue] = useState('');  
  
  const filteredSongs = (inputText : string) => {
    const filteredList = songs.filter((song: any) => {
      const searchFields = [song.songName, song.author, song.operName];
      return searchFields.some((field) => field && field.toLowerCase().includes(inputText.toLowerCase()));
    });
    setSongsViewList(filteredList);
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

  const optionsNation = ["이태리", "독일"];
  
  const handleNationChange = (selected : any) => {
    if (selected === "이태리") {setNation('Itary');}
    if (selected === "독일") {setNation('German');}
  };


  return (
    songs.length === 0 && !isResdataFalse
    ?  (
    <View style={{flex:1, width:'100%', height:'100%'}}>
      <Loading />
    </View>
    ) : (
    <View style={styles.container}>
     
      <View style={{paddingHorizontal:20}}>
        
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <View style={styles.selectDropdown}>
              <Typography fontSize={14} color='#8C8C8C' >언어</Typography>
              <SelectDropdown
                data={optionsNation}
                onSelect={(selectedItem, index) => {
                  handleNationChange(selectedItem);
                }}
                defaultButtonText={optionsNation[0]}
                buttonStyle={{width:90, height:30, backgroundColor:'#fff'}}
                buttonTextStyle={{fontSize:14, fontWeight:'bold'}}
                dropdownStyle={{width:120, borderRadius:10}}
                rowStyle={{ width:120}}
                rowTextStyle={{fontSize:14, fontWeight:'bold'}}
              />
              <AntDesign name='down' size={12} color='#8C8C8C'/>
            </View>
          </View>


          {/* // ---------------------------------------------------------------------------- */}
          <View style={styles.seachBar}>
            <View style={[styles.flexBox, { alignItems:"center"}]}>
              <Entypo name="magnifying-glass" size={22} color="#8B8B8B" style={{marginRight:13}}/> 
              <TextInput 
                placeholder="곡명, 작곡가"
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

          {/* // ---------------------------------------------------------------------------- */}
          <ScrollView>
          {
            songsViewList.length === 0 || isResdataFalse
            ?
            <View style={{alignItems:'center', justifyContent:'center', paddingTop:20}}>
              <Typography color="#8B8B8B">검색결과가 없습니다.</Typography>
              <TouchableOpacity 
                style={{padding:5, borderWidth:1, borderColor:'#E5625D', borderRadius:10, marginTop:15}}
                onPress={()=>{
                  props.navigation.navigate('Request', {select : 'Song'})
                }}
              >
                <Typography fontSize={12}  color='#E5625D'>곡 등록 요청</Typography>
              </TouchableOpacity>
            </View>
            :
            <>
              { inputValue === '' &&
                <>
                  <View style={{marginTop:10, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                    <Typography color='#8C8C8C' fontSize={14}>최신 등록된 곡</Typography>
                    <Typography color='#8C8C8C' fontSize={12}>3개까지 보여집니다</Typography>
                  </View>
                  { 
                    songsLast.map((item:any, index:any)=>{

                      return (
                        <TouchableOpacity
                          key={index} 
                          style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginVertical:10}}
                          onPress={()=>{
                            props.navigation.navigate('LyricsDetail', { songID : item.id, sort : 'Song', nation : nation })
                          }}
                        >
                          <View>
                            <Typography fontSize={18} fontWeightIdx={1}>{item.songName}</Typography>
                            <Typography  fontSize={14} color='#8B8B8B'>{item.author}</Typography>
                          </View>
                          <AntDesign name='right'/>
                        </TouchableOpacity>
                      )
                    })
                  }
                  <Divider height={5} marginVertical={5}/>
                </>
              }
              
              {
                songsViewList.map((item:any, index:any)=>{

                  return (
                    <TouchableOpacity
                      key={index} 
                      style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginVertical:10}}
                      onPress={()=>{
                        props.navigation.navigate('LyricsDetail', { songID : item.id, sort : 'Song', nation : nation })
                      }}
                    >
                      <View>
                        <Typography fontSize={18} fontWeightIdx={1}>{item.songName}</Typography>
                        <Typography  fontSize={14} color='#8B8B8B'>{item.author}</Typography>
                      </View>
                      <AntDesign name='right'/>
                    </TouchableOpacity>
                  )
                })
              }
            </>
          }
          <View style={{height:150}}></View>
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


