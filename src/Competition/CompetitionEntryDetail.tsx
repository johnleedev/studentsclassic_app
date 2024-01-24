import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Linking, Modal, Alert } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Typography } from '../Components/Typography';
import { Divider } from '../Components/Divider';
import { useRoute } from '@react-navigation/native';
import MainURL from "../../MainURL";
import axios from 'axios';
import EvaluateModal from './EvaluateModal';
import { ButtonBox } from '../Components/ButtonBox';
import { differenceInDays, parse, format } from 'date-fns';
import Entypo from 'react-native-vector-icons/Entypo';

const Note = () => (
  <View style={{width: 10, height: 16, marginBottom:10}}>
    <Image source={require('../images/Concours/note.png')} 
      style={{width:'100%', height:'100%', resizeMode: "cover", overflow: 'hidden'}}/>
  </View>
);

export default function CompetitionEntryDetail (props: any) {

  const route : any = useRoute();
  const [refresh, setRefresh] = useState<boolean>(true);

  const [sameSchPosts, setSameSchPosts] = useState<any>([]);
  const [otherSchPosts, setOtherSchPosts] = useState<any>([]);
  const [commentPosts, setCommentPosts] = useState<any>([]);
  const fetchPosts = () => {
    const id = route.params.data.id
    axios.get(`${MainURL}/competition/getevaluate/${id}`).then((res) => {
      let copy: any = [...res.data];
      const sameSch = copy.filter((e:any)=> e.userSchool === route.params.data.userSchool);
      const otherSch = copy.filter((e:any)=> e.userSchool !== route.params.data.userSchool && e.userSchool !== '일반대' && e.userPart !== '비전공');
      const comment = copy.filter((e:any)=> e.evaluateText !== "" && e.evaluateText !== null);
      setSameSchPosts(sameSch);
      setOtherSchPosts(otherSch);
      setCommentPosts(comment);
    });
  };

  useEffect(() => {
    fetchPosts();
  }, [refresh]);

  const calculateAverageScore = (posts: any[], evaluationType: string) => {
    const totalScore = posts?.reduce((total:number, evaluation:any) => total + evaluation[evaluationType], 0);
    const averageScore = totalScore / posts.length || 0; // Avoid division by zero
    return averageScore.toFixed(2);
  }
  
  const getAverages = (posts: any[]) => {
    const singing = calculateAverageScore(posts, 'scoreSinging');
    const express = calculateAverageScore(posts, 'scoreExpress');
    const lyrics = calculateAverageScore(posts, 'scoreLyrics');
    
    return [singing, express, lyrics];
  }
  
  const [averageSinging, averageExpress, averageLyrics] = getAverages(sameSchPosts);
  const [averageSinging2, averageExpress2, averageLyrics2] = getAverages(otherSchPosts);
  
  // 날짜 기능 함수
  const formmatDate = (name : string) => {
    const today = new Date();
    const copy = name.split('(')[0]
    const targetDate = parse(copy, 'yy.MM.dd', new Date());
    const remainingDays = differenceInDays(targetDate, today);
    return remainingDays
  }

  const openEvalute =() => {
    if (formmatDate(route.params.evaluatePeriod) > 0) {
      Alert.alert('아직 심사 기간이 아닙니다.')
    } else if (formmatDate(route.params.evaluateUntil) < 0 ) {
      Alert.alert('심사 기간이 마감되었습니다.')
    } else if (formmatDate(route.params.evaluatePeriod) <= 0 && formmatDate(route.params.evaluateUntil) >= 0){
      evaluateToggleModal();
    } else return
  };

  // 심사하기 모달
  const [isEvaluateModalVisible, setEvaluateModalVisible] = useState(false);
  const evaluateToggleModal = () => {
    if (!isEvaluateModalVisible) {
      Alert.alert('심사평 유의사항', '객관적이고 진솔하게 심사해주세요. 심사평은 익명으로 작성되며, 한번으로 제한합니다. 욕설과 비방은 삼가해주시기 바랍니다.', [
        { text: '취소', onPress: () => { return }},
        { text: '심사하기', onPress: () => { setEvaluateModalVisible(!isEvaluateModalVisible); }},
      ])
    } else {
      setEvaluateModalVisible(!isEvaluateModalVisible);
    }
  };

  return (
    <View style={{flex:1}}>
      <ScrollView style={styles.container}>
        {/* title */}
        <View style={styles.contentTitleBox}>
          <TouchableOpacity
            onPress={()=>{
              props.navigation.goBack();
            }}>
            <AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View>
          <View style={styles.postBox}>
            <View style={{width:150, height:200, alignItems:'flex-start', borderRadius:10}}>
                <Image style={{width:'100%', height:'100%', resizeMode:'cover', borderRadius:10}} 
                  source={{ uri: `${MainURL}/images/upload_comptProfile/${route.params.data?.profileImage}`}}/>
            </View>
            
            <View style={{padding:10, alignItems:'center'}}>
              <Typography fontSize={20} marginBottom={5}>{route.params.data?.userName} 님</Typography>
              <View style={{flexDirection:'row'}}>
                <Typography color='#1B1B1B'>{route.params.data?.userSchool} </Typography>
                <Typography color='#1B1B1B'>{route.params.data?.userSchNum} </Typography>
                <Typography color='#1B1B1B'>{route.params.data?.userPart}</Typography>
              </View>
            </View>
           
            <Divider height={3} marginVertical={5}/>
          </View>

          <View style={{padding:20}}>
            <Typography marginBottom={10}>참가곡</Typography>
            <Typography>{route.params.data?.title}</Typography>
          </View>
          
          {/* Buttons */}
          <ButtonBox leftFunction={()=>Linking.openURL(route.params.data?.songUri)} leftText='영상보기' 
                     rightFunction={openEvalute} rightText='심사하기'
          />
         
          <View style={{alignItems:"center"}}>
            <Typography marginBottom={5} fontSize={12} color='#8C8C8C'>심사 질 향상을 위해, 일반대학(음악대학 외) 및 비전공자의 심사는</Typography>
            <Typography marginBottom={10} fontSize={12} color='#8C8C8C'>심사 점수에 포함되지 않는다는 점을 양해해주시기 바랍니다.</Typography>
          </View>

          <Divider height={2} marginVertical={10}/>

          <View style={{padding:15}}>
            <Typography marginBottom={10}>각 항목 심사 점수 평균</Typography>
            <View style={{flexDirection:'row', justifyContent:'center', alignItems:"center", marginBottom:10}}>
              <Typography fontSize={14}>동일 학교 학생들 : <Entypo name="pencil" size={14} color="#8C8C8C" /> {sameSchPosts.length}명</Typography>
            </View>
            <View style={{width:'100%', flexDirection:'row', justifyContent:'center', padding: 10, opacity: sameSchPosts.length > 0 ? 1 : 0.5 }}>
              <View style={{width:100, alignItems:'center'}}>
                <Note/>
                <Typography marginBottom={10}>가창력</Typography>
                <Typography>{sameSchPosts.length > 0 ? averageSinging : '0'} / 5</Typography>
              </View>
              <View style={{width:100, alignItems:'center'}}>
                <Note/>
                <Typography marginBottom={10}>음악성</Typography>
                <Typography marginBottom={10}>{sameSchPosts.length > 0 ? averageExpress : '0'} / 5</Typography>
              </View>
              <View style={{width:100, alignItems:'center'}}>
                <Note/>
                <Typography marginBottom={10}>가사전달</Typography>
                <Typography>{sameSchPosts.length > 0 ? averageLyrics : 0} / 5</Typography>
              </View>
            </View>
          </View>

          <View style={{padding:15}}>
            <View style={{flexDirection:'row', justifyContent:'center', alignItems:"center", marginBottom:10}}>
              <Typography fontSize={14}>타학교 학생들 : <Entypo name="pencil" size={14} color="#8C8C8C" /> {otherSchPosts.length}명</Typography>
            </View>
            <View style={{width:'100%', flexDirection:'row', justifyContent:'center', padding: 10, opacity: otherSchPosts.length > 0 ? 1 : 0.5 }}>
              <View style={{width:100, alignItems:'center'}}>
                <Note/>
                <Typography marginBottom={10}>가창력</Typography>
                <Typography>{otherSchPosts.length > 0 ? averageSinging2 : '0'} / 5</Typography>
              </View>
              <View style={{width:100, alignItems:'center'}}>
                <Note/>
                <Typography marginBottom={10}>음악성</Typography>
                <Typography marginBottom={10}>{otherSchPosts.length > 0 ? averageExpress2 : '0'} / 5</Typography>
              </View>
              <View style={{width:100, alignItems:'center'}}>
                <Note/>
                <Typography marginBottom={10}>가사전달</Typography>
                <Typography>{otherSchPosts.length > 0 ? averageLyrics2 : 0} / 5</Typography>
              </View>
            </View>
            
            <View style={{alignItems:"center"}}>
              <Typography marginBottom={5} fontSize={12} color='#8C8C8C'>최종 점수는, (형평성을 위해) 같은 학교 학생들의 점수는 40%</Typography>
              <Typography marginBottom={10} fontSize={12} color='#8C8C8C'>다른 학교 학생들의 점수는 60%로 채점합니다.</Typography>
            </View>
          </View>
          
          <Divider height={2} marginVertical={10}/>

          <View style={{marginBottom:30, padding:15}}>
            <View style={{flexDirection:'row', alignItems:"center", marginBottom:10}}>
              <Typography>한줄 심사평 : <Entypo name="pencil" size={14} color="#8C8C8C" /> {commentPosts.length}명</Typography>
            </View>
            {
              commentPosts.length > 0
              ?
              commentPosts.map((item: any, index:any)=>{
                  return (
                    item.evaluateText !== ''
                    ?
                    <View style={{marginVertical:10, width:'90%', flexDirection:'row'}} key={index}>
                      <View style={{opacity:0.5, marginRight:10}}>
                        <Note/>
                      </View>
                      <Typography>{item.evaluateText}</Typography>
                    </View>
                    :
                    null
                  )
                })
              :
              <View style={{alignItems:'center'}}>
                <View style={{width: 54, height: 64, marginBottom:10}}>
                  <Image source={require('../images/Concours/notecross.png')} 
                    style={{width:'100%', height:'100%', resizeMode: "cover", overflow: 'hidden'}}/>
                </View>
                <Typography color='#8C8C8C'>아직 한줄 심사평이 없습니다.</Typography>
                <Typography color='#8C8C8C'>영상을 보신 후에, 심사참여와</Typography>
                <Typography color='#8C8C8C'>솔직한 한줄 심사평을 부탁드려요:)</Typography>
              </View>
            }
          </View>
        </View>
      </ScrollView>

      <Modal
        animationType="slide" 
        transparent={true}
        visible={isEvaluateModalVisible}
        onRequestClose={evaluateToggleModal}
      >
        <EvaluateModal 
          evaluateToggleModal={evaluateToggleModal}
          evaluateData={route.params.data?.id}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      </Modal>
      <View style={isEvaluateModalVisible ? styles.modalBackCover :  { display: 'none'}}></View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  contentTitleBox : {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    marginVertical: 15
  },
  postBox :{
    flex: 1,
    alignItems: 'center'
  },
  boxDivider: {
    height: 1,
    backgroundColor: 'black',
    marginVertical: 20
  },
  postContainer: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 5,
    padding: 16,
    justifyContent: 'center',
  },
  modalBackCover : {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#333',
    opacity: 0.8
  },
});


