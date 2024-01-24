import React, { useState, useEffect} from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Typography } from '../../Components/Typography';
import axios from 'axios';
import MainURL from "../../../MainURL";

interface PostNoticeProps {
  name : string;
  notice: string;
}

const PostNotice: React.FC<PostNoticeProps> = ({ name, notice }) => (
  <View style={PostListstyles.container}>
    <View style={{width:'30%'}}>
      <Typography fontSize={14} fontWeight='normal'>{name}</Typography>
    </View>
    <View style={{width:'70%', flexDirection:'row', flexWrap:'wrap', justifyContent:'space-between'}}>
      <Typography fontSize={14}>{notice}</Typography>
    </View>
  </View>
);

const PostListstyles = StyleSheet.create({
  container: {
    flexDirection:'row', 
    marginBottom:5
  },
})


export default function Concert (props: any) {

  const [posts, setPosts] = useState<any>([]);

  const fetchPosts = () => {
    axios.get(`${MainURL}/concert/posts/get`).then((res) => {
      let copy: any = [...res.data];
      copy.reverse();
      setPosts(copy);
    });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const openPostDetails =(post: any) => {
    props.navigation.navigate('ConcertDetail', { data: post });
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
                    <Image style={{height:200, resizeMode:'cover', marginBottom:10}} source={{ uri: `${MainURL}/images/upload_concert/${item.imageName1}`}}/>
                    <View style={{width: 50, height: 25, alignItems:'center', justifyContent:'center', 
                                  borderWidth:1, borderColor: '#C9AE00', borderRadius:10, marginBottom:10}}>
                      <Typography>{item.location}</Typography>
                    </View>
                    <View style={{flexWrap:'wrap', justifyContent:'space-between', alignItems:'center', padding:5}}>
                      <Typography fontSize={20}>{item.title}</Typography>
                    </View>
                    <View style={{width:'100%', padding:5}}>
                      <PostNotice name='장소' notice={item.concertPlace}/>
                      <PostNotice name='일자' notice={item.concertDate}/>
                      <PostNotice name='시간' notice={item.concertTime}/>
                      <PostNotice name='관람료' notice={item.concertPrice}/>
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
        <View style={[styles.section, {marginBottom:30}]}>
          <Typography color='#8C8C8C' fontSize={14} fontWeight='normal'>* 공지 : 게시글 삭제를 원하시면, 문의하기(마이페이지)를 통해 요청해 주시기 바랍니다.</Typography>
        </View>
      </ScrollView>
      
    </View>
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
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-between',
    alignItems:'flex-start'
  },
  boxDivider: {
    height: 1,
    backgroundColor: 'black',
    marginVertical: 20
  },
  postContainer: {
    width:'48%',
    marginBottom: 20,
    justifyContent: 'center',
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


