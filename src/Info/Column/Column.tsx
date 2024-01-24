import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { Typography } from '../../Components/Typography';
import { Divider } from '../../Components/Divider';
import axios from 'axios';
import MainURL from "../../../MainURL";
import { Title } from '../../Components/Title';
import { SubTitle } from '../../Components/SubTitle';

export default function Column (props: any) {

  // const [posts, setPosts] = useState<any>([]);

  // const fetchPosts = () => {
  //   axios.get(`${MainURL}/column/get`).then((res) => {
  //     let copy: any = [...res.data];
  //     copy.reverse();
  //     setPosts(copy);
  //   });
  // };

  // useEffect(() => {
  //   fetchPosts();
  // }, []);

  const posts = [
    {title : "테스트1", content : "테스트1입니다."},
    {title : "테스트2", content : "테스트2입니다."},
    {title : "테스트3", content : "테스트3입니다."}
  ]

  const openPostDetails =(post: any) => {
    props.navigation.navigate('RecruitDetail', { data: post });
  };

  const alertPost = () => { 
    Alert.alert('글쓰기 주의사항', '불건전하거나 불법적인 내용 작성시, 서비스 사용에 제한이 있을 수 있습니다.', [
      { text: '취소', onPress: () => { return }},
      { text: '확인&글쓰기', onPress: () => props.navigation.navigate("RecruitPost") }
    ]);
  }

  // 화면 표시되는 글자수 제한
  const renderPreviewTitle = (content : string) => {
    if (content?.length > 20) {
      return content.substring(0, 20) + '...';
    }
    return content;
  };
  const renderPreviewContent = (content : string) => {
    if (content?.length > 40) {
      return content.substring(0, 40) + '...';
    }
    return content;
  };

  const [postListNum, setPostListNum] = useState<number>(5);

  return (
    <View style={{flex:1}}>
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <View style={styles.postBox}>
            {
              posts.slice(0,postListNum).map((item:any, index:any)=>{
                return(
                  <TouchableOpacity
                    key={index}
                    style={styles.postContainer}
                    onPress={() => {openPostDetails(item)}}
                  >
                    <Image 
                      style={{height:100, width: 100, resizeMode:'cover', borderRadius:10}} 
                      // source={{ uri: `${MainURL}/images/upload_concert/${item.imageName1}`}}
                      source={{ uri: `https://cdn.fanzeel.com/rep/302/5e1c0e75a8b89.jpg`}}
                    />
                    <View style={{justifyContent:'center', marginLeft:10}}>
                      <View style={{flexWrap:'wrap', justifyContent:'space-between', alignItems:'center', padding:5}}>
                        <Typography fontSize={20}>{renderPreviewTitle(item.title)}</Typography>
                      </View>
                      <View style={{flexWrap:'wrap', justifyContent:'space-between', alignItems:'center', padding:5}}>
                        <Typography fontWeight='normal'>{renderPreviewContent(item.content)}</Typography>
                      </View>
                    </View>
                   
                  </TouchableOpacity>
                )
              })
            }
            
          </View>
          {
            posts.length > postListNum 
            &&
            <TouchableOpacity
              style={styles.button} 
              onPress={()=>{
                setPostListNum(postListNum + 5)
              }}
            >
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Typography color='#333'>더보기 </Typography>
                <AntDesign name="down" size={20} color="#333"/>
              </View>
            </TouchableOpacity>
          }
        </View>
      </ScrollView>
      <TouchableOpacity 
        style={styles.newPostButton} 
        onPress={alertPost}
      >
       <Entypo name="plus" size={25} color="#fff"/>
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
  contentTitleBox : {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    marginBottom: 15
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  postBox :{
    flex: 1,
  },
  postContainer: {
    marginBottom: 20,
    flexDirection:'row'
  },
  newPostButton: {
    width:50,
    height:50,
    borderRadius: 25,
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#000',
    padding: 12,
    alignItems: 'center',
    justifyContent:'center'
  },
  button: {
    borderWidth:1,
    borderColor: '#8C8C8C',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
});


