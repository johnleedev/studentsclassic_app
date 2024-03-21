import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { Typography } from '../Components/Typography';
import axios from 'axios';
import MainURL from "../../MainURL";
import { Divider } from '../Components/Divider';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Loading from '../Components/Loading';
import YoutubePlayer from "react-native-youtube-iframe";

export default function LyricsDetail (props : any) {

  const sort = props.route.params.sort;
  const nation = props.route.params.nation;
  const songID = props.route.params.songID;

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

  // 곡정보 ----------------------------------------------------------------------
  interface songsProps {
    id: number;
    sort : string;
    nation: string;
    songName : string;
    operaName : string | null;
    author : string;
    lyrics : string;
    trans : string;
    youtube : string;
  }
  
  const [songInfo, setSongInfo] = useState<songsProps>();

  const fetchPosts = () => {
    axios.get(`${MainURL}/study/getsongdata/${sort}/${nation}/${songID}`).then((res) => {
      let copy = res.data[0];
      setSongInfo(copy);
    });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const [isViewTrans, setIsViewTrans] = useState<boolean>(false);
  const reform = songInfo?.lyrics.split('\n');
  const youtube = songInfo?.youtube ? JSON.parse(songInfo?.youtube) : [];
  
  const youtubeWidth = 350;
  const youtubeHeight = youtubeWidth * 5.7 / 10

  return (
    songInfo === undefined
    ?  (
    <View style={{flex:1, width:'100%', height:'100%'}}>
      <Loading />
    </View>
    ) : (
    <View style={styles.container}>

      <View style={styles.section}>
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={()=>{
              props.navigation.goBack()
            }}>
            <AntDesign name="left" size={20} color="black" />
          </TouchableOpacity>
          <View style={{flexDirection:'row', height:40}}>
            <Typography fontWeightIdx={1} color='#8C8C8C'>{nation === "Itary" ? "이태리" : "독일"} </Typography>
            <Typography fontWeightIdx={1} color='#8C8C8C'>{sort === "Song" ? "가곡" : "아리아"}</Typography>
          </View>
        </View>
        <Typography fontSize={20} marginBottom={10} fontWeightIdx={1}>{songInfo.songName}</Typography>
        <Typography color='#8B8B8B' >{songInfo.author}</Typography>
        {
          sort === "Aria" &&
          <Typography color='#8B8B8B' >from. {songInfo.operaName}</Typography>
        }
      </View>
      <Divider height={2}/>

      <View style={{width:'100%', flexDirection: 'row', alignItems: 'flex-start', paddingLeft:10,
                  borderBottomWidth:1, borderBottomColor:"#EFEFEF", marginVertical:20}}>
        <SelectMenu tabNum={1} title='가사'/>
        <SelectMenu tabNum={2} title='노래듣기'/>
      </View>
      
      <ScrollView style={styles.section}>
        {currentTab === 1 
        ?
        <>
        <View style={{alignItems:'flex-end'}}>
          <TouchableOpacity 
            activeOpacity={0.8}
            style={{borderBottomWidth:1, borderBottomColor:"#8C8C8C", paddingBottom:3, marginBottom:10}}
            onPress={()=>{setIsViewTrans(!isViewTrans);}}
          >
            <Typography fontSize={12} color='#8C8C8C'>{isViewTrans ? '가사 보기' : 'AI 한글 번역 보기'}</Typography>
          </TouchableOpacity>
        </View>
        {
          isViewTrans
          ?
          <>
            <Typography fontSize={12} color='#8C8C8C' marginBottom={15}  >* AI (chat GPT)의 번역으로, 다소 부자연스러울수 있습니다.</Typography>
            <View>
              <Typography><Text style={{lineHeight:25}}>{songInfo.trans}</Text></Typography>
            </View>
          </>
          :
          <>
            <Typography fontSize={12} color='#8C8C8C' marginBottom={15}  >* 단어를 누르면, 해당 단어의 사전적 의미를 볼수 있습니다.</Typography>
            {
              reform?.map((subItem:any, subIndex:any)=>{

                const copy = subItem.replaceAll('\n', ' \n').replaceAll(',', ' ,').replaceAll('!', ' !').replaceAll("'", "' ")
                              .replaceAll('.', ' .').replaceAll('´', '´ ').replaceAll('’', '’ ').replaceAll('?', ' ?');
                const result = copy.split(' ');

                return (
                  <View key={subIndex}>
                    <View style={{flexDirection:'row', marginVertical:5, flexWrap:'wrap'}}>
                    {
                      result.map((word:any, wordIndex:any)=>{
                        
                        const reform = (text : any) => {
                          const indexOfTarget = text.indexOf("'");
                          const resultString = word.slice(0, indexOfTarget) + '\\' + word.slice(indexOfTarget);
                          return resultString;
                        }
                        const wordcopy = word.includes("'") ? reform(word) : word
                        
                        return (
                          word === "," || word === "." || word ===  "!" || word === "´" || word === "?" || word ===  ":" || word === ";"
                          ?
                          <Typography key={wordIndex} fontSize={20} >{word} </Typography>
                          :
                          <TouchableOpacity
                            key={wordIndex}
                            onPress={()=>{
                              props.navigation.navigate('WordDetail', {setword : wordcopy, nation : nation});
                            }}
                          > 
                            <Typography fontSize={20} ><Text style={{textDecorationLine:'underline', textDecorationColor:'#8B8B8B'}}>{word}</Text> </Typography>
                          </TouchableOpacity>
                        )
                      })
                    }
                    </View>
                  </View>
                )
              })
            }
          </>
        }
        </>
        :
        <>
        <View style={{alignItems:'center'}}>
        
        { youtube.length > 0
          ?
          <>
          <View style={{width:'100%', alignItems:'flex-end', marginBottom:20}}>
            <Typography fontSize={12}>영상 로딩 시간이 2~3초 걸릴수 있습니다.</Typography>
          </View>
          {
            youtube.map((item:any, index:any)=>{
              return (
                <View key={index} >
                  <Typography fontSize={18} marginBottom={10}>{index+1}. {item.name}</Typography>
                  <View style={{marginBottom:40, backgroundColor:"#EAEAEA"}}>
                    <YoutubePlayer
                      width={youtubeWidth}
                      height={youtubeHeight}
                      videoId={item.url}
                    />
                  </View>
                </View>
              )
            })
          }
          </>
          :
          <>
            <Typography>등록된 영상이 없습니다.</Typography>
          </>
        }
        </View>
        </>
        }
        <View style={{height:100}}></View>
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
  section : {
    padding: 20
  },
  backButton: {
    width: 40,
    height: 40,
  }
});


