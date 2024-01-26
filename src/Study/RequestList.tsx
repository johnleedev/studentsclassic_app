import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Modal,
          NativeSyntheticEvent, TextInputChangeEventData, Alert } from 'react-native';
import { Typography } from '../Components/Typography';
import axios from 'axios';
import MainURL from "../../MainURL";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Loading from '../Components/Loading';
import { Divider } from '../Components/Divider';
import DateFormmating from '../Components/DateFormmating';


export default function RequestList (props : any) {

  interface RequestSongsProps {
    id: number;
    sort : string;
    nation: string;
    songName : string;
    author : string;
    date : string;
    response : string;
  }
  interface RequestWordsProps {
    id: number;
    word : string;
    nation: string;
    date : string;
    response : string;
  }

  const [selected, setSelected] = useState('Song');
  const [requestSongs, setRequestSongs] = useState<RequestSongsProps[]>([]);
  const [requestWords, setRequestWords] = useState<RequestSongsProps[]>([]);

  const fetchPosts = () => {
    axios.get(`${MainURL}/study/getrequestall/${selected}`).then((res) => {
      let copy: any = [...res.data];
      if (selected === 'Song') {
        setRequestSongs(copy)
      } else if (selected === 'Word') {
        setRequestWords(copy);
      }
    });
  };

  useEffect(() => {
    fetchPosts();
  }, [selected]);

  interface TextBoxProps {
    setwidth: number;
    fontSize? : number;
    text: any;
  }
  
  const TextBox: React.FC<TextBoxProps> = ({ setwidth, fontSize, text }) => (
    <View style={{ width: `${setwidth}%`, alignItems: 'center' }}>
      <Typography fontSize={fontSize ?? 12 }>{text}</Typography>
    </View>
  );

  const renderPreview = (content : string) => {
    if (content?.length > 20) {
      return content.substring(0, 20) + '...';
    }
    return content;
  };

  return (
    requestSongs.length === 0
    ?  (
    <View style={{flex:1, width:'100%', height:'100%'}}>
      <Loading /> 
    </View>
    ) : (
    <View style={styles.container}>

      <View style={styles.section}>
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', height:40, marginBottom:10}}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={()=>{
              props.navigation.goBack()
            }}>
            <EvilIcons name="arrow-left" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={{borderRadius:5, borderWidth:1, borderColor:'#555', padding:5}}
            onPress={()=>{
              props.navigation.navigate('Request', {select : selected})
            }}
          >
            <Typography fontSize={14} color='#555' fontWeightIdx={2}>등록요청하기</Typography>
          </TouchableOpacity>
        </View>
        <Divider height={2}/>
      </View>
     
      <View style={{paddingHorizontal:20}}>

        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:20}}>
          <Typography>선택 : </Typography>
          <TouchableOpacity 
            style={[styles.selectButton, {borderColor: selected === 'Song' ? '#333' : '#DFDFDF' }]}
            onPress={()=>{
              setSelected('Song');
            }}
          >
            <Typography color={selected === 'Song' ? '#333' : '#DFDFDF'}>곡</Typography> 
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.selectButton, {borderColor: selected === 'Word' ? '#333' : '#DFDFDF' }]}
            onPress={()=>{
              setSelected('Word');
            }}
          >
            <Typography color={selected === 'Word' ? '#333' : '#DFDFDF'}>단어</Typography> 
          </TouchableOpacity>
        </View>
        
        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginVertical:10}}>
          {
            selected === 'Song' 
            ?
            <>
              <TextBox setwidth={10} fontSize={14} text='구분' />
              <TextBox setwidth={60} fontSize={14} text='곡목&저자' />
              <TextBox setwidth={20} fontSize={14} text='날짜' />
              <TextBox setwidth={10} fontSize={14} text='구분' />
            </>
            :
            <>
              <TextBox setwidth={10} fontSize={14} text='언어' />
              <TextBox setwidth={60} fontSize={14} text='단어' />
              <TextBox setwidth={20} fontSize={14} text='날짜' />
              <TextBox setwidth={10} fontSize={14} text='구분' />
          </>
          }
        </View>

        <Divider />
        
        <ScrollView>
        {
          selected === 'Song' 
          ?
          <>
            {
              requestSongs.map((item:any, index:any)=>{
                return (
                  <View
                    key={index} 
                    style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginVertical:10}}
                  >
                    <View style={{ width: '10%', alignItems: 'center' }}>
                      <Typography fontSize={12}>{item.nation}</Typography>
                      <Typography fontSize={12}>{item.sort}</Typography>
                    </View>
                    <View style={{ width: '60%', alignItems: 'center' }}>
                      <Typography fontSize={14}>{renderPreview(item.songName)}</Typography>
                      <Typography fontSize={12}>{renderPreview(item.author)}</Typography>
                    </View>
                    <TextBox setwidth={20} text={DateFormmating(item.date)} />
                    <TextBox setwidth={10} text={item.response} />
                  </View>
                )
              })
            } 
          </>
          :
          <>
          {
            requestWords.map((item:any, index:any)=>{
              return (
                <View
                  key={index} 
                  style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginVertical:10}}
                >
                  <TextBox setwidth={10} text={item.nation} />
                  <TextBox setwidth={60} text={item.word} />
                  <TextBox setwidth={20} text={DateFormmating(item.date)} />
                  <TextBox setwidth={10} text={item.response} />
                </View>
              )
            })
          } 
        </>
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
  backButton: {
    width: 40,
    height: 40,
    justifyContent:'center',
    alignItems:'center',
  },
  selectButton : {
    width:'40%',
    height: 50,
    borderWidth:1, 
    borderRadius:5, 
    paddingHorizontal:15,
    paddingVertical:5,
    flexDirection:'row', 
    alignItems:'center',
    justifyContent:'center'
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
  }

});


