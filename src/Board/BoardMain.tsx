import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import axios from 'axios';
import MainURL from "../../MainURL";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncGetItem from '../AsyncGetItem';
import { Typography } from '../Components/Typography';
import { Title } from '../Components/Title';
import DateFormmating from '../Components/DateFormmating';
import { Divider } from '../Components/Divider';
import MainImageURL from "../../MainImageURL";
import { Loading } from '../Components/Loading';

interface PostoptionsProps {
  views: string;
  isLiked: string;
  commentCount : string;
}

const PostOptions : React.FC<PostoptionsProps> = ({ views, isLiked, commentCount }) => (
  <View style={{flexDirection: 'row', alignItems: 'center'}}>
    <View style={{flexDirection:'row', alignItems:'center'}}>
      <Ionicons name="eye-outline" size={14} color="#E7AA0E" />
      <Typography fontSize={14} color='#E7AA0E' > {views}</Typography>
    </View>
    <View style={{width:2, height:15, backgroundColor:'#BDBDBD', marginHorizontal:7}}></View>
    <View style={{flexDirection:'row', alignItems:'center'}}>
      <Feather name="thumbs-up" size={14} color="#DD4A4A" />
      <Typography fontSize={14} color='#DD4A4A' > {isLiked}</Typography>
    </View>
    <View style={{width:2, height:15, backgroundColor:'#BDBDBD', marginHorizontal:7}}></View>
    <View style={{flexDirection:'row', alignItems:'center'}}>
      <Ionicons name="chatbubble-ellipses-outline" size={14} color="#333" />
      <Typography fontSize={14} color='#333' > {commentCount ? commentCount : '0' }</Typography>
    </View>
  </View>
);


function BoardMain(props: any) {

  const [asyncGetData, setAsyncGetData] = useState<any>({});
  const [posts, setposts] = useState<any>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [postsViewList, setPostsViewList] = useState<any>([]);
  const userPosts = postsViewList.filter((e:any) => e.userAccount === asyncGetData.userAccount);
  const otherPosts = postsViewList.filter((e:any) => e.userAccount !== asyncGetData.userAccount);
  const [postListNum, setPostListNum] = useState<number>(10);
  const [currentTab, setCurrentTab] = useState(1);
  const [isResdataFalse, setIsResdataFalse] = useState<boolean>(false);

  useEffect(() => {
    asyncFetchData();
    fetchPosts();
  }, [refresh]);

  const fetchPosts = () => {
    axios.get(`${MainURL}/board/posts/get`).then((res) => {
      if(res.data) {
        setIsResdataFalse(false);
        let copy: any = [...res.data];
        copy.reverse();
        setposts(copy);
        setPostsViewList(copy);
      } else {
        setIsResdataFalse(true);
      }
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

   
  return (
    posts.length === 0 && !isResdataFalse
    ?  (
    <View style={{flex:1, width:'100%', height:'100%'}}>
      <Loading /> 
    </View>
    ) : (
    <View style={{flex:1, backgroundColor:'#fff'}}>

      {/* title */}
      <Title title='커뮤니티' enTitle='Community'/>
      <Divider height={2} />

      <ScrollView 
        style={styles.container}
      >
        {userPosts.length > 0 && 
          <View style={styles.section}>
            <View style={styles.postBox}>
            <Typography fontSize={18} marginBottom={10} fontWeightIdx={1}>내가 작성한 글</Typography>
            {
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
                      <Typography fontSize={14} color='#000'>{post.userName === '관리자' ? '관리자' : modifiedName}  </Typography>
                      <Typography fontSize={14} color='#8C8C8C'>{post.userSchool}</Typography>
                      <Typography fontSize={14} color='#8C8C8C'>{post.userSchNum} </Typography>
                      <Typography fontSize={14} color='#8C8C8C'>{post.userPart}</Typography>
                    </View>
                    <View style={{marginBottom:10}}>
                      <Typography marginBottom={8}>{renderPreview(post.title)}</Typography>
                      <Typography fontSize={14} marginBottom={5} >{renderPreview(post.content)}</Typography>
                    </View>
                    <View style={styles.postFooter}>
                      <Typography fontSize={12} color='#8C8C8C'>{DateFormmating(post.date)}</Typography>
                      <PostOptions views={post.views} isLiked={post.isLiked} commentCount={post.commentCount}/>
                    </View>
                    <Divider height={2}/>
                  </TouchableOpacity>
                )
                
              })
            }              
            </View>
            <Divider height={5} />
          </View>    
        }
        
        <View style={styles.section}>
          <View style={styles.postBox}>
          {
            otherPosts.length > 0
            ? 
            (
              otherPosts.slice(0,postListNum).map((item: any, index:any) => {
                const firstCharacter = item.userName.charAt(0);
                const restOfTheString = 'O'.repeat(item.userName.length - 1);
                const modifiedName = firstCharacter + restOfTheString;

                const images = item.images ? JSON.parse(item.images) : '';

                return (
                  <TouchableOpacity
                    style={styles.postContainer}
                    key={index}
                    onPress={() => openPostDetails(item)}
                  >
                    <View style={{marginBottom:10}}>
                      <Typography marginBottom={8} fontWeightIdx={1}>{renderPreview(item.title)}</Typography>
                      <Typography fontSize={14} marginBottom={5} >{renderPreview(item.content)}</Typography>
                    </View>
                    <View style={styles.postAuthor}>
                      <Typography fontSize={14} color='#000'>{item.userName === '관리자' ? '관리자' : modifiedName}  </Typography>
                      <Typography fontSize={14} color='#8C8C8C' >{item.userSchool}</Typography>
                      <Typography fontSize={14} color='#8C8C8C' >{item.userSchNum} </Typography>
                      <Typography fontSize={14} color='#8C8C8C' >{item.userPart}</Typography>
                    </View>
                    <View style={styles.postFooter}>
                      <Typography fontSize={12} color='#8C8C8C'  >{DateFormmating(item.date)}</Typography>
                      <PostOptions views={item.views} isLiked={item.isLiked} commentCount={item.commentCount}/>
                    </View>
                    <Divider height={2}/>
                  </TouchableOpacity>
                )
              })
            )
            :  
            <View style={{alignItems:'center', height:100}}>
              <Typography>등록된 글이 없습니다.</Typography> 
            </View>
          }
          </View>
        </View>
        {
          otherPosts.length > postListNum 
          &&
          <TouchableOpacity
            style={styles.button} 
            onPress={()=>{
              setPostListNum(postListNum + 10)
            }}
          >
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Typography color='#8C8C8C'  fontSize={14}>더보기 </Typography>
              <AntDesign name="down" size={16} color="#8C8C8C"/>
            </View>
          </TouchableOpacity>
        }
      </ScrollView>
      <TouchableOpacity style={styles.newPostButton} onPress={goToPostScreen}>
        <Entypo name="plus" size={25} color="#fff"/>
      </TouchableOpacity>
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
    justifyContent: 'flex-end'
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
    borderTopWidth:1,
    borderColor: '#EAEAEA',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  }
});

export default BoardMain;
