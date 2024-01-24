import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import CurrentComptSwiper from './CurrentComptSwiper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Typography } from '../Components/Typography';
import axios from 'axios';
import MainURL from "../../MainURL";
import LastComptHomeScreen from './LastComptHomeScreen';
import { Divider } from '../Components/Divider';
import { Title } from '../Components/Title';
import { ButtonBox } from '../Components/ButtonBox';
import { differenceInDays, parse, format } from 'date-fns';

interface ConcoursNoticeProps {
  title: string;
  content: string;
  subNotice? : string;
}

const ConcoursNotice : React.FC<ConcoursNoticeProps> = ({ title, content, subNotice }) => (
  <View style={{marginVertical:5}}> 
    <View style={{flexDirection: 'row', marginLeft:10}}>
      <View style={{width:'22%'}}>
        <Typography>{title}</Typography>
      </View>
      <View style={{width:2, height:15, backgroundColor:'#BDBDBD'}}></View>
      <View style={{width:'70%', marginLeft:15}}>
        {
          title === '상금' ? <Typography marginBottom={5} color='#FF0000'>{content}</Typography> : <Typography marginBottom={5}>{content}</Typography>
        }
        { subNotice ? <Typography fontSize={12} color='#8C8C8C'>{subNotice}</Typography> : null }
      </View>
    </View>
  </View>
);

interface ConcoursFaqProps {
  content: string;
}

const ConcoursFAQ : React.FC<ConcoursFaqProps> = ({ content }) => (
  <Typography color='#333' fontWeight='normal' fontSize={14} marginBottom={5}>{content}</Typography>
);



function CompetitionMain (props : any) {

  const [posts, setposts] = useState<any>([]);

  const fetchPosts = () => {
    axios.get(`${MainURL}/competition/getcurrent`).then((res) => {
      let copy: any = [...res.data];
      setposts(copy[0]);
    });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const formmatDate = (name : string) => {
    const today = new Date();
    const copy = name.split('(')[0]
    const targetDate = parse(copy, 'yy.MM.dd', new Date());
    const remainingDays = differenceInDays(targetDate, today);
    return remainingDays
  }

  const openPartition =() => {
    if (formmatDate(posts.acceptPeriod) > 0) {
      Alert.alert('아직 참가 신청 기간이 아닙니다.')
    } else if (formmatDate(posts.acceptUntil) < 0 ) {
      Alert.alert('참가 신청 기간이 마감되었습니다.')
    } else if (formmatDate(posts.acceptPeriod) <= 0 && formmatDate(posts.acceptUntil) >= 0){
      props.navigation.navigate('CompetitionPost', { id : posts.id, title : posts.title });
    } else return
  };

  const openEntryList =() => {
    props.navigation.navigate('CompetitionEntry', { 
      id : posts.id, title : posts.title, evaluatePeriod : posts.evaluatePeriod, evaluateUntil : posts.evaluateUntil
    });
  };

  const [viewHowIn, setViewHowIn] = useState<boolean>(false);
  const [viewEvaluate, setViewEvaluate] = useState<boolean>(false);
  const [viewWinner, setViewWinner] = useState<boolean>(false);
  
   return (
    <View style={{flex:1}}>

      <ScrollView style={styles.container}>
        {/* title */}
        
        <Title title='우리끼리 온라인 콩쿨' enTitle='Online ConCours' paddingHorizontal={20} paddingVertical={10}/>
        
        <Divider height={2}/>

        <View style={styles.section}>
          <View style={{marginVertical:10, width:'100%'}}>
            <Typography marginBottom={5} color='#D41D1D'>NOW!</Typography>
            <View style={{width:'70%', height:30, marginBottom:5}}>
              <View style={{backgroundColor:'#fff', width:'100%', height:'50%'}}></View>
              <View style={{backgroundColor:'#E7AA0E', width:'100%', height:'50%', opacity:0.3}}></View>
              <View style={{position:'absolute'}}>
                <Typography marginBottom={10} fontSize={20}>{posts.title}</Typography>
              </View>
            </View>
            <Typography fontSize={12}><Text style={{fontWeight:'bold'}}>우리끼리 경연</Text>하고, 우리끼리 심사하는 온라인 콩쿨!</Typography>
          </View>

          {/* CurrentCompetition */}
          <View style={{height: 450}}>
            <CurrentComptSwiper/>     
          </View>

          <View style={{width:'100%', marginTop:20}}>
            <ConcoursNotice title='참가곡' content={posts.songForm} subNotice='최근 6개월 이내에 찍은 영상'/>
            <ConcoursNotice title='참가비' content='무료'/>
            <ConcoursNotice title='상금' content={posts.prizeMoney} subNotice='상금 지급 인증 예정'/>
            <ConcoursNotice title='신청기간' content={`${posts.acceptPeriod} 부터`} subNotice={`${posts.acceptUntil} 까지`}/>
            <ConcoursNotice title='심사기간' content={`${posts.evaluatePeriod} 부터`} subNotice={`${posts.evaluateUntil} 까지`}/>
            <ConcoursNotice title='참가대상' content={`${posts.qualification}`} subNotice='음악대학 성악전공 대학생 중'/>
            <ConcoursNotice title='심사자격' content={`음악대학 성악전공 학생 회원`}/>
            <ConcoursNotice title='결과발표' content={`${posts.finalAnnounce} 까지`}/>
          </View>
        </View>

        {/* post button */}
        <View  style={styles.section}>
          <ButtonBox leftFunction={openEntryList} leftText='심사 & 참가자보기' rightFunction={openPartition} rightText='참가신청하기'/>
        </View>
        
        <Divider height={5}/>

        {/* FAQ */}
        <View style={styles.section}>
          <Title title='우리끼리 콩쿨 FAQ' enTitle='FAQ'/>
          <View style={{flexDirection:'row', justifyContent:'space-between', padding: 10, alignItems:'center'}}>
            <Typography>콩쿨 참여 방법</Typography>
            <TouchableOpacity
              style={{padding:5}}
              onPress={()=>{setViewHowIn(!viewHowIn)}}
            >
              { viewHowIn ? <AntDesign name='minus' size={20} color='#000'/> : <AntDesign name='plus' size={20} color='#000'/>}
            </TouchableOpacity>
          </View>
          <Divider height={2} marginVertical={5}/>
          {
            viewHowIn ?
            <View style={{padding:10}}>
              <ConcoursFAQ content='1. 주제에 맞는 곡을 노래하는 영상을 촬영합니다.' />
              <ConcoursFAQ content='2. 유투브 계정에 영상을 업로드 합니다.' />
              <ConcoursFAQ content='3. 참여하기 버튼을 누르고 양식에 맞게 글을 작성 합니다.' />
              <Divider height={2} marginVertical={5}/>
            </View>
            : null
          }

          <View style={{flexDirection:'row', justifyContent:'space-between', padding: 10, alignItems:'center'}}>
            <Typography>콩쿨 심사 방법</Typography>
            <TouchableOpacity
              style={{padding:5}}
              onPress={()=>{setViewEvaluate(!viewEvaluate)}}
            >
              { viewEvaluate ? <AntDesign name='minus' size={20} color='#000'/> : <AntDesign name='plus' size={20} color='#000'/>}
            </TouchableOpacity>
          </View>
          <Divider height={2} marginVertical={5}/>
          {
            viewEvaluate ?
            <View style={{padding:10}}>
              <ConcoursFAQ content='1. 심사는 등록된 회원 누구나 참여할 수 있습니다.' />
              <ConcoursFAQ content='2. 참가자들의 영상을 본 후에, 심사하게 싶은 게시글에 심사하기 버튼을 누르고, 각 항목에 점수를 체크해주시면 됩니다.' />
              <ConcoursFAQ content='3. 최종 점수는, (형평성을 위해) 같은 학교 학생들의 점수는 40%, 다른 학교 학생들의 점수는 60%로 채점합니다.' />
              <ConcoursFAQ content='4. 심사의 질 향상을 위해, 일반대학(음악대학외) 및 비전공자의 심사는, 점수에 포함되지 않습니다.' />
              <ConcoursFAQ content='6. 최종적으로 가장 많은 점수를 받은 사람이 우승하게 됩니다.' />
              <ConcoursFAQ content='7. 심사 결과는 신청기간 종료 시점부터 일주일 이내에 발표됩니다.' />
              <Divider height={2} marginVertical={5}/>
            </View>
            : null
          }

          <View style={{flexDirection:'row', justifyContent:'space-between', padding: 10, alignItems:'center'}}>
            <Typography>우승상금 지급 안내</Typography>
            <TouchableOpacity
              style={{padding:5}}
              onPress={()=>{setViewWinner(!viewWinner)}}
            >
              { viewWinner ? <AntDesign name='minus' size={20} color='#000'/> : <AntDesign name='plus' size={20} color='#000'/>}
            </TouchableOpacity>
          </View>
          <Divider height={2} marginVertical={5}/>
          {
            viewWinner ?
            <View style={{padding:10}}>
              <ConcoursFAQ content='우승자 발표가 난 후, 우승자는 학교와 학년을 인증하셔야 합니다.' />
              <ConcoursFAQ content='인증이 완료되면 우승 상급이 지급되고, 상금 지급 인증 사진이 업로드 됩니다.' />
              <Divider height={2} marginVertical={5}/>
            </View>
            : null
          }
        </View>


        <View style={[styles.section, {alignItems:'center', justifyContent:'center'}]}>
          <View style={{alignItems:'center', justifyContent:'center', marginBottom:10}}>
            <View style={{width: 30, height: 30, marginBottom:10}}>
              <Image source={require('../images/Concours/💡.png')} 
                style={{width:'100%', height:'100%', resizeMode: "cover", overflow: 'hidden'}}/>
            </View>
            <ConcoursFAQ content='콩쿨 참여를 통해, 많은 분들의' />
            <ConcoursFAQ content='열정과 재능을 공유해주셔서 감사드립니다.' />
            <ConcoursFAQ content='앞으로 콩쿨 방식도, 우리만의 방법으로 개선하려고 합니다.' />
            <ConcoursFAQ content='아이디어가 있으시면, 운영 제안 게시판에 말씀해주세요.' />
          </View>
        </View>

        <Divider height={5} marginVertical={10}/>

        {/* 이전 콩쿨 */}
        <LastComptHomeScreen navigation={props.navigation}/>
        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
});

export default CompetitionMain;
