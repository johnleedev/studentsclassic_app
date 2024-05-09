import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Modal,
          NativeSyntheticEvent, TextInputChangeEventData, Alert } from 'react-native';
import { Typography } from '../Components/Typography';
import axios from 'axios';
import MainURL from "../../MainURL";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Loading } from '../Components/Loading';
import { Divider } from '../Components/Divider';
import DateFormmating from '../Components/DateFormmating';
import { SubTitle } from '../Components/SubTitle';


export default function RequestMain (props : any) {

  // 커스텀 탭 버튼 ----------------------------------------------------------------------
  const [currentTab, setCurrentTab] = useState(1);

  interface SelectMenuProps {
    tabNum : number;
    title: string;
    select: string;
  }
  const SelectMenu: React.FC<SelectMenuProps> = ({ tabNum, title, select}) => {
    return (
      <TouchableOpacity
      style={{width:70, alignItems:'center', paddingTop:10}}
      onPress={() => {setCurrentTab(tabNum); setSelected(select)}}
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
  const [requestWords, setRequestWords] = useState<RequestWordsProps[]>([]);
  const [isResdataFalse, setIsResdataFalse] = useState<boolean>(false);

  const fetchPosts = () => {
    axios.get(`${MainURL}/study/getrequestall/${selected}`).then((res) => {
      if (res.data) {
        setIsResdataFalse(false);
        let copy: any = [...res.data];
        copy.reverse();
        if (selected === 'Song') {
          setRequestSongs(copy)
        } else if (selected === 'Word') {
          setRequestWords(copy);
        }
      } else {
        setIsResdataFalse(true);
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
    fontWeightIdx? :number;
  }
  
  const TextBox: React.FC<TextBoxProps> = ({ setwidth, fontSize, text, fontWeightIdx }) => (
    <View style={{ width: `${setwidth}%`, alignItems: 'center' }}>
      <Typography fontSize={fontSize ?? 12 } fontWeightIdx={fontWeightIdx ?? 0}>{text}</Typography>
    </View>
  );

  const renderPreview = (content : string) => {
    if (content?.length > 30) {
      return content.substring(0, 30) + '...';
    }
    return content;
  };

  return (
    (requestSongs.length === 0 && requestWords.length === 0) && !isResdataFalse
    ?  (
    <View style={{flex:1, width:'100%', height:'100%'}}>
      <Loading /> 
    </View>
    ) : (
    <View style={styles.container}>

      <SubTitle title='등록 요청 게시판' enTitle='' navigation={props.navigation}/>

      <View style={{width:'100%', flexDirection: 'row', alignItems: 'flex-start', paddingLeft:10,
                  borderBottomWidth:1, borderBottomColor:"#EFEFEF", marginBottom:20}}>
        <SelectMenu tabNum={1} title='곡' select='Song'/>
        <SelectMenu tabNum={2} title='단어' select='Word'/>
      </View>

      <View style={{position:'absolute', top:35, right:10,
                flexDirection:'row', alignItems:'center', justifyContent:'flex-end', height:40, marginVertical:15}}>
        <TouchableOpacity 
          style={{borderRadius:5, borderWidth:1, borderColor:'#555', padding:5}}
          onPress={()=>{
            props.navigation.navigate('RequestRegister', {select : selected})
          }}
        >
          <Typography fontSize={14} color='#555' >등록요청하기</Typography>
        </TouchableOpacity>
      </View>
    
      <View style={{paddingHorizontal:20}}>
       
        {
          !isResdataFalse
          ?
          <ScrollView >
          {
            selected === 'Song' 
            ?
            <>
              {
                requestSongs.map((item:any, index:any)=>{
                  return (
                    <View key={index} >
                      <View
                        style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginVertical:10}}
                      >
                        <View style={{ width: '80%', }}>
                          <Typography fontWeightIdx={0}>{renderPreview(item.songName)}</Typography>
                          <Typography fontSize={14} >{renderPreview(item.author)}</Typography>
                          <View style={{flexDirection:'row'}}>
                            <Typography fontSize={12} >{item.nation}</Typography>
                            <Typography fontSize={12} >{item.sort}</Typography>
                          </View>
                        </View>
                        <View style={{ width: '20%', alignItems: 'center' }}>
                          <Typography fontSize={12} >{DateFormmating(item.date)}</Typography>
                          <Typography fontSize={12} >{item.response}</Typography>
                        </View>
                      </View>
                      <Divider />
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
                    <TextBox setwidth={10} fontWeightIdx={2} text={item.nation} />
                    <TextBox setwidth={70} text={item.word} />
                    <View style={{ width: '20%', alignItems: 'center' }}>
                      <Typography fontSize={12} >{item.response === '등록' ? '등록완료' : '신청'}</Typography>
                      <Typography fontSize={12} >{DateFormmating(item.date)}</Typography>
                    </View>
                  </View>
                )
              })
            } 
            </>
          }
          <View style={{height:250}}></View>
          </ScrollView>
          :
          <View style={{alignItems:'center', marginTop:20}}>
            <Typography fontSize={14} >등록된 항목이 없습니다.</Typography>
          </View>
        }
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
    width: 30,
    height: 30,
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


