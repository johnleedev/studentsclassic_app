import React, { useState, useEffect} from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Image, RefreshControl } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { Typography } from '../Components/Typography';
import { Divider } from '../Components/Divider';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import MainURL from "../../MainURL";
import Ionicons from 'react-native-vector-icons/Ionicons';


interface PostoptionsProps {
  views: string;
  commentCount : string;
}

const PostOptions : React.FC<PostoptionsProps> = ({ views, commentCount }) => (
  <View style={{flexDirection: 'row', alignItems: 'center'}}>
    <View style={{flexDirection:'row', alignItems:'center'}}>
      <Ionicons name="eye-outline" size={14} color="#E7AA0E" />
      <Typography fontSize={14} color='#E7AA0E'> {views}</Typography>
    </View>
    <View style={{width:2, height:15, backgroundColor:'#BDBDBD', marginHorizontal:7}}></View>
    <View style={{flexDirection:'row', alignItems:'center'}}>
      <Entypo name="pencil" size={14} color="#8C8C8C" />
      <Typography fontSize={14} color='#333'> {commentCount ? commentCount : '0' }</Typography>
    </View>
  </View>
);


export default function CompetitionEntry (props: any) {

  // 스크롤뷰 리프레쉬
  const [refresh, setRefresh] = useState<boolean>(false);
  const onRefresh = React.useCallback(() => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 500);
  }, []);

  const route : any = useRoute();
  const [entry, setEntry] = useState<any>([]);

  const fetchPosts = () => {
    axios.get(`${MainURL}/competition/getentry/${route.params.id}`).then((res) => {
      let copy: any = [...res.data];
      copy.reverse();
      setEntry(copy);
    });
  };  

  useEffect(() => {
    fetchPosts();
  }, [refresh]);

  // 화면 표시되는 글자수 제한
  const renderPreview = (content : string) => {
    if (content?.length > 80) {
      return content.substring(0, 80) + '...';
    }
    return content;
  };

  const openEnrtyDetails = async (post: any) => {
    // 조회수 증가시킨 후에, 디테일 페이지로 넘어가기
    axios.post(`${MainURL}/competition/evaluate/${post.id}/views`).then(()=>{
        setRefresh(!refresh);
        props.navigation.navigate('CompetitionEntryDetail', { 
          data : post, evaluatePeriod : route.params.evaluatePeriod, evaluateUntil : route.params.evaluateUntil
        });
      }).catch((error)=>{
        console.error(error);
      })
  };

  return (
    
    <View style={{flex:1}}>
      <ScrollView 
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
      >
        <View style={styles.contentTitleBox}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={()=>{
              props.navigation.goBack();
            }}
            >
            <EvilIcons name="arrow-left" size={30} color="black" />
          </TouchableOpacity>
          <Typography fontSize={22} marginBottom={10}>{route.params.title}</Typography>
          <Typography color='#C9AE00' fontSize={12}>Online {route.params.id}th ConCours</Typography>
        </View>
        
        {/* 참가자 리스트 */}
        { entry.length > 0 
          ?
          entry.map((item : any, index: any)=>{

            return (
              <TouchableOpacity
                key={index}
                onPress={()=>{
                  openEnrtyDetails(item);
                }}
              >
                <View style={{padding:10}}>
                  <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                    <View style={{flexDirection:'row', marginBottom:10}}>
                      <View style={{width: 50, height: 50, justifyContent:'center', borderRadius: 25, marginRight:20}}>
                        <Image source={{uri: `${MainURL}/images/upload_comptProfile/${item.profileImage}`}} 
                          style={{ borderRadius:25, width: '100%', height: '100%', resizeMode: "cover"}}/>
                      </View>
                      <View style={{justifyContent:'center'}}>
                        <Typography fontSize={18} marginBottom={5}>{item.userName} </Typography>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                          <Typography fontSize={14} color='#8C8C8C'>{item.userSchool}</Typography>
                          <Typography fontSize={14} color='#8C8C8C'>{item.userSchNum} </Typography>
                          <Typography fontSize={14} color='#8C8C8C'>{item.userPart}</Typography>
                        </View>
                      </View>
                    </View>
                    <AntDesign size={20} name='right' />
                  </View>
                  <Typography fontSize={14}>{renderPreview(item.title)}</Typography>
                  <View style={{marginVertical:5, alignItems:'flex-end'}}>
                     <PostOptions views={item.views} commentCount={item.evaluateCount}/>
                  </View>
                </View>
                <Divider height={2} marginVertical={10}/>
              </TouchableOpacity>
            )
          })
          : 
          <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Typography>참가자가 없습니다.</Typography>
          </View>
        }
  
      </ScrollView>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    position:'absolute',
    top: 0,
    left: 0,
    width: 40,
    height: 40,
  },
  contentTitleBox : {
    marginTop: 20,
    alignItems:'flex-end'
  },

});

