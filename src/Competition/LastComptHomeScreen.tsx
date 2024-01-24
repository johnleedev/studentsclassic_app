import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Linking } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { Typography } from '../Components/Typography';
import { Divider } from '../Components/Divider';
import axios from 'axios';
import MainURL from "../../MainURL";
import { Title } from '../Components/Title';

export default function LastComptHomeScreen (props: any) {

  const [posts, setposts] = useState<any>([]);

  const fetchPosts = () => {
    axios.get(`${MainURL}/competition/getlast`).then((res) => {
      let copy: any = [...res.data];
      copy.reverse();
      setposts(copy);
    });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const openPostDetails =(post: any) => {
    props.navigation.navigate('LastComptDetail', { data: post });
  };

  // 화면 표시되는 글자수 제한
  const renderPreview = (content : string) => {
    if (content?.length > 20) {
      return content.substring(0, 20) + '...';
    }
    return content;
  };

  return (
    <View style={{flex:1}}>
      <Title title='지난 콩쿨' enTitle='Last ConCours' paddingHorizontal={20}/>
      <View style={styles.container}>
      <ScrollView>
        {
          posts.slice(0, 5).map((item:any, index:any)=>{
            
            return (
              <View key={index} style={{padding:20}}>
                <TouchableOpacity
                  onPress={()=>{openPostDetails(item)}}
                >
                  <View style={{flexDirection:'row'}}>
                    <View style={{width: 80, height: 80}}>
                      <Image source={{uri: `${MainURL}/images/competition/last/compt${item.id}/${item.noticeImage1}`}} 
                        style={{width:'100%', height:'100%', resizeMode: "cover", overflow: 'hidden'}}/>
                    </View>
                    <View style={{alignItems:'flex-start', padding:10}}>
                      <Typography fontSize={14} marginBottom={5}>{renderPreview(item.title)}</Typography>
                      <View style={{flexDirection:'row', marginBottom:5}}>
                        <Typography fontSize={12} color='#8C8C8C' fontWeight='normal'>참가신청:</Typography>
                        <Typography fontSize={12} color='#8C8C8C' fontWeight='normal'> ~ {item.acceptPeriod}까지</Typography>
                      </View>
                      <View style={{flexDirection:'row'}}>
                        <Typography fontSize={12} color='#8C8C8C' fontWeight='normal'>심사기간:</Typography>
                        <Typography fontSize={12} color='#8C8C8C' fontWeight='normal'> ~ {item.evaluatePeriod}까지</Typography>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )
          })
        }
      </ScrollView> 

      <View style={{marginVertical:20, alignItems:'flex-end', paddingRight:10}}>
        <Typography fontSize={12} marginBottom={10} color='#5D5D5D'>**</Typography>
        <Typography fontSize={12} marginBottom={10} color='#5D5D5D'>지난 콩쿨에 대한 상세 요강은</Typography>
        <Typography fontSize={12} marginBottom={10} color='#5D5D5D'>네이버카페 '성악하는대학생들'을 참조해주세요</Typography>
        <TouchableOpacity 
          onPress={()=>{Linking.openURL('https://cafe.naver.com/studentofmusic')}}
        >
          <Typography fontSize={12} marginBottom={10} color='blue'><Text style={{textDecorationLine:'underline'}}>카페 링크</Text></Typography>
        </TouchableOpacity>
      </View>
      </View>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginVertical : 10,
    padding: 10
  }
});

