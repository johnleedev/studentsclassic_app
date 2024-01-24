import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image} from 'react-native';
import { Typography } from '../../Components/Typography';
import axios from 'axios';
import MainURL from "../../../MainURL";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { differenceInDays, parse } from 'date-fns';

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

export default function Concours (props: any) {

  const [posts, setPosts] = useState<any>([]);

  const fetchPosts = () => {
    axios.get(`${MainURL}/concours/posts/get`).then((res) => {
      let copy: any = [...res.data];
      copy.reverse();
      setPosts(copy);
    });
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  const openPostDetails =(post: any) => {
    props.navigation.navigate('ConcoursDetail', { data: post });
  };

  const [postListNum, setPostListNum] = useState<number>(5);

  return (
    <View style={{flex:1}}>
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <View style={styles.postBox}>
          { 
            posts.slice(0,postListNum).map((item : any, index : any)=>{

              const formmatDate = (name : string) => {
                const today = new Date();
                const targetDate = parse(name, 'yyyy.MM.dd', new Date());
                const remainingDays = differenceInDays(targetDate, today);
                return remainingDays
              }
              const acceptPeriodFromReform = formmatDate(item.acceptPeriodFrom);
              const acceptPeriodUntilReform = formmatDate(item.acceptPeriodUntil);
              const concoursPeriodFromReform = formmatDate(item.concoursPeriodFrom);
              const concoursPeriodUntilReform = formmatDate(item.concoursPeriodUntil);

              return (
                <TouchableOpacity
                  key={index}
                  style={styles.postContainer}
                  onPress={() => {openPostDetails(item)}}
                >
                  <Image style={{height:200, resizeMode:'cover', marginBottom:10}} source={{ uri: `${MainURL}/images/upload_concours/${item.imageName1}`}}/>
                  <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                    <View style={{width: 50, height: 25, alignItems:'center', justifyContent:'center', 
                                  borderWidth:1, borderColor: '#C9AE00', borderRadius:10}}>
                      <Typography>{item.location}</Typography>
                    </View>
                    {
                      concoursPeriodUntilReform > 0
                      ?
                      <View>
                        {
                          acceptPeriodUntilReform > 0
                          ?
                          <>
                            {
                              acceptPeriodFromReform > 0
                              ?
                              <View style={[styles.noticeBox, {backgroundColor: '#B2CCFF'}]}>
                                <Typography fontSize={14}>접수전</Typography>
                              </View>
                              :
                              <View style={[styles.noticeBox, {backgroundColor: '#FAED7D'}]}>
                                <Typography fontSize={14}>접수중</Typography>
                              </View>
                            }
                          </>
                          :
                          <View style={[styles.noticeBox, {backgroundColor: '#BDBDBD'}]}>
                            <Typography fontSize={14}>접수마감</Typography>
                          </View>
                        }
                      </View>
                      :
                      <View style={[styles.noticeBox, {backgroundColor: '#5D5D5D'}]}>
                        <Typography color='#BDBDBD' fontSize={14}>대회마감</Typography>
                      </View>
                    }
                  </View>
                  <View style={{flexWrap:'wrap', justifyContent:'space-between', alignItems:'center', padding:5}}>
                    <Typography fontSize={20}>{item.title}</Typography>
                  </View>
                  <View style={{width:'100%', padding:5}}>
                    <PostNotice name='지역' notice={item.location}/>
                    <PostNotice name='주최' notice={item.superViser}/>
                    <PostNotice name='대회' notice={`${item.concoursPeriodUntil}까지`}/>
                    <PostNotice name='접수' notice={`${item.acceptPeriodUntil}까지`}/>
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
  noticeBox : {
    width: 80, 
    height: 25, 
    marginVertical: 10,
    alignItems:'center', 
    justifyContent:'center', 
    borderRadius:10
  }
});



