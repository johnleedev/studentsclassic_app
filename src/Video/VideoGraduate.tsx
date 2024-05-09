import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, TextInput, 
      NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import axios from 'axios';
import MainURL from "../../MainURL";
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncGetItem from '../AsyncGetItem';
import { Typography } from '../Components/Typography';
import { Loading } from '../Components/Loading';
import YoutubePlayer from "react-native-youtube-iframe";
import SelectDropdown from 'react-native-select-dropdown'
import { Divider } from '../Components/Divider';


export default function VideoMain (props: any) {

  const youtubeWidth = Dimensions.get('window').width;
  const youtubeHeight = youtubeWidth * 5.65 / 10

  interface PostsProps {
    id: number;
    url: string;
    year : string;
    school : string;
    name : string;
    part : string;
    isLiked : number;
    userIsliked : number
  }

  const [asyncGetData, setAsyncGetData] = useState<any>({});
  const [postsAllNum, setPostsAllNum] = useState(0);
  const [postsSchoolAllNum, setPostsSchoolAllNum] = useState(0);
  const [posts, setPosts] = useState<PostsProps[]>([]);
  const [postsViewList, setPostsViewList] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [schoolPage, setSchoolPage] = useState<number>(1);
  const [selectSchool, setSchool] = useState('');
  const [isSelectAll, setIsSelectAll] = useState<boolean>(true);
  const [isResdataFalse, setIsResdataFalse] = useState<boolean>(false);

  const asyncFetchData = async () => {
    try {
      const data = await AsyncGetItem();
      if (data) {
        setAsyncGetData(data);
        fetchPosts(data.userAccount, page);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 접속수 증가
  const videoUseCount = () => {
    const currentTime = new Date();
    const currentDate = currentTime.toISOString().slice(0, 10);
    axios
      .post(`${MainURL}/videos/videocount`, {
        date : currentDate
      })
      .then((res) => {return})
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    asyncFetchData();
    videoUseCount();
  }, []);


  const fetchPosts = (account:any, page:any) => {
    axios.get(`${MainURL}/videos/getgraduate/${account}/${page}`).then((res) => {
      if(res.data.isData) {
        setIsResdataFalse(false);
        let postsAllNum = res.data.totalRowNum;
        setPostsAllNum(postsAllNum);
        let copy: any = [...res.data.resultRow];
        copy.sort((a:any, b:any) => b.id - a.id);
        const schools = res.data.schools;
        schools.unshift("전체");
        setSchools(schools);
        setPosts(copy);
        setPostsViewList(copy);
      } else {
        setIsResdataFalse(true);
      }
    });
  };

  const schoolPosts = (account:any, school:any, schoolPage:any) => {
    axios.get(`${MainURL}/videos/getgraduatesearch/${account}/${school}/${schoolPage}`).then((res) => {
      if(res.data.isData) {
        setIsResdataFalse(false);
        let postsAllNum = res.data.totalRowNum;
        setPostsSchoolAllNum(postsAllNum);
        let copy: any = [...res.data.resultRow];
        copy.sort((a:any, b:any) => b.id - a.id);
        setPostsViewList(copy);
      } else {
        setIsResdataFalse(true);
      }
    });
  };

  const toggleLike = (postId:any) => {
    const currentTime = new Date();
    const currentDate = currentTime.toISOString().slice(0, 19);
    axios
      .post(`${MainURL}/videos/postgraduateisliked`, {
        postId : postId,
        date : currentDate,
        userAccount: asyncGetData.userAccount,
        userName : asyncGetData.userName,
        userSchool : asyncGetData.userSchool,
        userSchNum : asyncGetData.userSchNum,
        userPart : asyncGetData.userPart
      })
      .then((res) => {
        fetchPosts(asyncGetData.userAccount, page);
      });
  };

  // 검색 ---------------------------------------------------------------------

  const [schools, setSchools] = useState<any>([]);
  const handleNationChange = (selected : any) => {
    if (selected === '전체' ) {
      setIsSelectAll(true);
      fetchPosts(asyncGetData.userAccount, page);
    } else {
      setIsSelectAll(false);
      setSchool(selected);
      schoolPosts(asyncGetData.userAccount, selected, schoolPage);
    }
  };

  return (
    posts.length === 0 && !isResdataFalse
    ?  (
    <View style={{flex:1, width:'100%', height:'100%'}}>
      <Loading/>
    </View>
    ) : (
    <View style={{flex:1, backgroundColor:'#fff'}}>

      <View style={{paddingHorizontal:20, paddingBottom:20, flexDirection:'row', justifyContent:'space-between'}}>
        <View style={styles.selectDropdown}>
          <Typography fontSize={14} color='#8C8C8C' >학교</Typography>
          <SelectDropdown
            data={schools}
            onSelect={(selectedItem, index) => {
              handleNationChange(selectedItem);
            }}
            defaultButtonText={schools[0]}
            buttonStyle={{width:90, height:30, backgroundColor:'#fff'}}
            buttonTextStyle={{fontSize:14, fontWeight:'bold'}}
            dropdownStyle={{width:120, borderRadius:10}}
            rowStyle={{ width:120}}
            rowTextStyle={{fontSize:14, fontWeight:'bold'}}
          />
          <AntDesign name='down' size={12} color='#8C8C8C'/>
        </View>
      </View>

      <ScrollView 
        style={styles.container}
      >
        <View style={{padding:15, backgroundColor:'rgba(215, 111, 35, 0.10)', marginBottom:20}}>
          <Typography fontSize={12} color='#8C8C8C'>* 본영상은 현재 유투브에 올라와있는 영상들입니다. 정보수청 및 삭제요청이나 문의사항이 있으시면, 카카오채널을 통해 문의해주세요.</Typography>
        </View>

        <View style={styles.postBox}>
          {
            postsViewList.length > 0
            ? 
            (
              postsViewList.map((item: any, index:any) => {

                return (
                  <View style={styles.postContainer} key={index}>
                    <View style={{paddingHorizontal:20, marginVertical:10, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                      <View style={{borderWidth:1, borderColor:'#EAEAEA', padding:10, borderRadius:10}}>
                        {item.sort === 'graduate' && <Typography fontSize={14}>대학졸연</Typography>}
                        {item.sort === 'regular' && <Typography fontSize={14}>정기연주회</Typography>}
                        {item.sort === 'user' && <Typography fontSize={14}>회원영상</Typography>}
                      </View>
                      <View style={{flexDirection:'row'}}>
                        <Typography fontWeightIdx={1}>{item.year}년. </Typography>
                        <Typography fontWeightIdx={1}>{item.school} </Typography>
                        <Typography fontWeightIdx={1}>{item.part}</Typography>
                        <Typography fontWeightIdx={1}>{item.name}</Typography>
                      </View>
                    </View>
                    <View style={{width:youtubeWidth, height:youtubeHeight}}>
                      <Loading backgroundColor='#EAEAEA'/>
                      <View style={{position:'absolute'}}>
                        <YoutubePlayer
                          width={youtubeWidth}
                          height={youtubeHeight}
                          videoId={item.url}
                        />
                      </View>
                    </View>
                    <View style={{paddingHorizontal:20, marginVertical:10, flexDirection:'row', justifyContent:'space-between'}}>
                      <View style={{flexDirection:'row', alignItems:'center'}}>
                        <TouchableOpacity
                          style={{marginRight:10}}
                          onPress={()=>{toggleLike(item.id)}}
                        >
                          <AntDesign name={item.userIsliked === 1 ? 'heart' : 'hearto'} size={20} color="#DD4A4A"/>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={()=>{
                            props.navigation.navigate('IsLikedList', {itemID : item.id})
                          }}
                        >
                          <Typography fontSize={16} color='#8C8C8C'>{item.isLiked}개</Typography>
                        </TouchableOpacity>
                      </View>
                      <View style={{flexDirection:'row'}}>
                        
                      </View>
                    </View>
                  </View>
                )
              })
            )
            :  
            <View style={{alignItems:'center', height:100}}>
              <Typography>등록된 글이 없습니다.</Typography> 
            </View>
          }
          </View>
          {
            postsViewList.length < (isSelectAll ? postsAllNum : postsSchoolAllNum) && (
            <TouchableOpacity
              style={styles.button} 
              onPress={() => {
                if (isSelectAll) {
                  fetchPosts(asyncGetData.userAccount, page + 1);
                  setPage(page + 1);
                } else {
                  schoolPosts(asyncGetData.userAccount, selectSchool, schoolPage + 1);
                  setSchoolPage(schoolPage + 1);
                }
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Typography color='#8C8C8C' fontSize={14}>더보기 </Typography>
                <AntDesign name="down" size={16} color="#8C8C8C"/>
              </View>
            </TouchableOpacity>
          )}
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
    padding:20
  },
  postBox :{
    flex: 1
  },
  postContainer: {
    marginBottom: 15,
    justifyContent: 'center',
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


