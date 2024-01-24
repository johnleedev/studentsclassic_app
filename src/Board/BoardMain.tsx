import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import axios from 'axios';
import MainURL from "../../MainURL";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncGetItem from '../AsyncGetItem';
import { Typography } from '../Components/Typography';
import { Title } from '../Components/Title';
import DateFormmating from '../Components/DateFormmating';
import { Divider } from '../Components/Divider';
import AntDesign from 'react-native-vector-icons/AntDesign';


interface PostoptionsProps {
  views: string;
  isLiked: string;
  commentCount : string;
}

const PostOptions : React.FC<PostoptionsProps> = ({ views, isLiked, commentCount }) => (
  <View style={{flexDirection: 'row', alignItems: 'center'}}>
    <View style={{flexDirection:'row', alignItems:'center'}}>
      <Ionicons name="eye-outline" size={14} color="#E7AA0E" />
      <Typography fontSize={14} color='#E7AA0E'> {views}</Typography>
    </View>
    <View style={{width:2, height:15, backgroundColor:'#BDBDBD', marginHorizontal:7}}></View>
    <View style={{flexDirection:'row', alignItems:'center'}}>
      <Feather name="thumbs-up" size={14} color="#DD4A4A" />
      <Typography fontSize={14} color='#DD4A4A'> {isLiked}</Typography>
    </View>
    <View style={{width:2, height:15, backgroundColor:'#BDBDBD', marginHorizontal:7}}></View>
    <View style={{flexDirection:'row', alignItems:'center'}}>
      <Ionicons name="chatbubble-ellipses-outline" size={14} color="#333" />
      <Typography fontSize={14} color='#333'> {commentCount ? commentCount : '0' }</Typography>
    </View>
  </View>
);


function BoardMain(props: any) {

  const [asyncGetData, setAsyncGetData] = useState<any>({});
  const [posts, setposts] = useState<any>([]);
  const [notice, setNotice] = useState<any>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const userPosts = posts.filter((e:any) => e.userAccount === asyncGetData.userAccount);
  const otherPosts = posts.filter((e:any) => e.userAccount !== asyncGetData.userAccount);
  
  const onRefresh = React.useCallback(() => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 500);
  }, []);

  useEffect(() => {
    asyncFetchData();
    fetchPosts();
  }, [refresh]);

  const fetchPosts = () => {
    axios.get(`${MainURL}/board/posts/get`).then((res) => {
      let copy: any = [...res.data];
      copy.reverse();
      setposts(copy);
    });
    axios.get(`${MainURL}/notice/noticelist`).then((res) => {
      let copy: any = [...res.data];
      copy.reverse();
      setNotice(copy[0]);
    });
  };

  const asyncFetchData = async () => {
    try {
      const data = await AsyncGetItem();
      setAsyncGetData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const openPostDetails = async (post: any) => {
    // 조회수 증가시킨 후에, 디테일 페이지로 넘어가기
    axios.post(`${MainURL}/board/posts/${post.id}/views`).then(()=>{
        setRefresh(!refresh);
        props.navigation.navigate('Detail', { data: post, user: asyncGetData });
      }).catch((error)=>{
        console.error(error);
      })
  };

  const renderPreview = (content : string) => {
    if (content?.length > 20) {
      return content.substring(0, 20) + '...';
    }
    return content;
  };

  const goToPostScreen = () => {
    props.navigation.navigate('Post', { post: null, editMode: null})
  };


  const [postListNum, setPostListNum] = useState<number>(5);

  return (
    <View style={{flex:1}}>
      <ScrollView 
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }  
      >

        {/* title */}
        <Title title='자유게시판' enTitle='Community'/>
                
        <Divider height={2} />

        <View style={styles.section}>
          <View style={styles.postBox}>
          <Typography fontSize={20} marginBottom={10}>내 글</Typography>
            {userPosts.length > 0 ? (
              userPosts.map((post: any, index:any) => {
                const firstCharacter = post.userName.charAt(0);
                const restOfTheString = '0'.repeat(post.userName.length - 1);
                const modifiedName = firstCharacter + restOfTheString;

                return (
                  <TouchableOpacity
                    style={styles.postContainer}
                    key={index}
                    onPress={() => openPostDetails(post)}
                  >
                    <View style={styles.postAuthor}>
                      <Typography fontSize={14} color='#000'>{modifiedName}  </Typography>
                      <Typography fontSize={14} color='#8C8C8C'>{post.userSchool}</Typography>
                      <Typography fontSize={14} color='#8C8C8C'>{post.userSchNum} </Typography>
                      <Typography fontSize={14} color='#8C8C8C'>{post.userPart}</Typography>
                    </View>
                    <View style={{marginBottom:10}}>
                      <Typography marginBottom={8}>{renderPreview(post.title)}</Typography>
                      <Typography fontSize={14} marginBottom={5} fontWeight='normal'>{renderPreview(post.content)}</Typography>
                    </View>
                    <View style={styles.postFooter}>
                      <Typography fontSize={12} color='#8C8C8C'>{DateFormmating(post.date)}</Typography>
                      <PostOptions views={post.views} isLiked={post.isLiked} commentCount={post.commentCount}/>
                    </View>
                    <Divider height={2}/>
                  </TouchableOpacity>
                )
              })
            ) : ( <Typography fontWeight='normal'>작성된 글이 없습니다.</Typography>
            )}
          </View>
        </View>
        
        <Divider height={5} />

        <View style={styles.section}>
          <View style={styles.postBox}>
          <TouchableOpacity
            style={styles.postContainer}
            onPress={() => {
              props.navigation.navigate('Navi_MyPage', {screen: 'Notice'})
            }}
          >
            <View style={styles.postAuthor}>
           
              <Typography fontSize={14} color='#DD4A4A'>* 공지사항</Typography>
            </View>
            <View style={{marginBottom:10}}>
              <Typography marginBottom={8}>{notice.title}</Typography>
              <Typography fontSize={14} marginBottom={5} fontWeight='normal'>{notice.content}</Typography>
            </View>
            <View style={styles.postFooter}>
              <Typography fontSize={12} color='#8C8C8C'>{DateFormmating(notice.date)}</Typography>
            </View>
            <Divider height={2}/>
          </TouchableOpacity>
            {otherPosts ? (
              otherPosts.slice(0,postListNum).map((post: any, index:any) => {
                const firstCharacter = post.userName.charAt(0);
                const restOfTheString = 'O'.repeat(post.userName.length - 1);
                const modifiedName = firstCharacter + restOfTheString;
                return (
                  <TouchableOpacity
                    style={styles.postContainer}
                    key={index}
                    onPress={() => openPostDetails(post)}
                  >
                    <View style={styles.postAuthor}>
                      <Typography fontSize={14} color='#000'>{modifiedName}  </Typography>
                      <Typography fontSize={14} color='#8C8C8C'>{post.userSchool}</Typography>
                      <Typography fontSize={14} color='#8C8C8C'>{post.userSchNum} </Typography>
                      <Typography fontSize={14} color='#8C8C8C'>{post.userPart}</Typography>
                    </View>
                    <View style={{marginBottom:10}}>
                      <Typography marginBottom={8}>{renderPreview(post.title)}</Typography>
                      <Typography fontSize={14} marginBottom={5} fontWeight='normal'>{renderPreview(post.content)}</Typography>
                    </View>
                    <View style={styles.postFooter}>
                      <Typography fontSize={12} color='#8C8C8C'>{DateFormmating(post.date)}</Typography>
                      <PostOptions views={post.views} isLiked={post.isLiked} commentCount={post.commentCount}/>
                    </View>
                    <Divider height={2}/>
                  </TouchableOpacity>
                )
              })
            ) : ( <Text></Text> )}
          </View>

          {
            otherPosts.length > postListNum 
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
      <TouchableOpacity style={styles.newPostButton} onPress={goToPostScreen}>
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
  section : {
    padding:20
  },
  postBox :{
    flex: 1
  },
  postContainer: {
    marginBottom: 5,
    padding: 16,
    justifyContent: 'center',
  },
  postAuthor: {
    fontSize: 16,
    marginBottom: 15,
    color: '#555555',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom:10
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
  }
});

export default BoardMain;
