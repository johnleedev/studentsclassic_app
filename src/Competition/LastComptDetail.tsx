import React, { useState, useEffect} from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity, Linking} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Swiper from 'react-native-swiper'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Typography } from '../Components/Typography';
import MainURL from "../../MainURL";
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { Divider } from '../Components/Divider';

interface ConcoursNoticeProps {
  title: string;
  content: string;
  subNotice? : string;
}

const ConcoursNotice : React.FC<ConcoursNoticeProps> = ({ title, content, subNotice }) => (
  <View style={{marginVertical:5}}> 
    <View style={{flexDirection: 'row'}}>
      <View style={{width:'22%'}}>
        <Typography>{title}</Typography>
      </View>
      <View style={{width:2, height:15, backgroundColor:'#BDBDBD'}}></View>
      <View style={{width:'70%', marginLeft:15}}>
        <Typography marginBottom={5}>{content}</Typography>
        { subNotice ? <Typography fontSize={12} color='#8C8C8C'>{subNotice}</Typography> : null }
      </View>
    </View>
  </View>
);

function LastComptDetail (props: any) {
  
  const route : any = useRoute();
  const routecopy = route.params.data
  const [entry, setEntry] = useState<any>([]);

  const fetchPosts = () => {
    axios.get(`${MainURL}/competition/getentry/${route.params.data.id}`).then((res) => {
      let copy: any = [...res.data];
      setEntry(copy);
    });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderPreview = (content : string) => {
    if (content?.length > 40) {
      return content.substring(0, 40) + '...';
    }
    return content;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{alignItems:'center', marginVertical:15}}>
        <Typography fontSize={18}>{routecopy?.title}</Typography>
        <TouchableOpacity
            style={styles.backButton}
            onPress={()=>{
              props.navigation.goBack();
            }}
            >
            <EvilIcons name="arrow-left" size={30} color="black" />
          </TouchableOpacity>
      </View>
      <Divider height={5}/>
      <View style={styles.contentBox}>
        <View style={{alignItems:'flex-start', width:'100%'}}>
          <Typography marginBottom={10} fontSize={18}>콩쿨 요강</Typography>
          <ConcoursNotice title='참가곡' content={route.params.data?.songForm} subNotice='최근 6개울 이내에 찍은 영상 업로드'/>
          <ConcoursNotice title='상금' content={route.params.data?.prizeMoney} subNotice='상금 지급 인증 예정'/>
          <ConcoursNotice title='신청기간' content={`${route.params.data?.acceptPeriod} 까지`}/>
          <ConcoursNotice title='심사기간' content={`${route.params.data?.evaluatePeriod} 까지`}/>
          <ConcoursNotice title='참가대상' content={`${route.params.data?.qualification}`} subNotice='음악대학 성악전공 대학생 중'/>
          <ConcoursNotice title='심사' content={`현재 등록된 회원 모두`}/>
        </View>
        <View style={styles.ImgSwifeBox}>
         <Swiper 
              showsPagination={true}
          >
            <View style={styles.slide}>
              <Image style={styles.img} source={{uri: `${MainURL}/images/competition/last/compt${routecopy?.id}/${routecopy?.noticeImage1}`}} />
            </View>
            <View style={styles.slide}>
              <Image style={styles.img} source={{uri: `${MainURL}/images/competition/last/compt${routecopy?.id}/${routecopy?.noticeImage2}`}} />
            </View>
            <View style={styles.slide}>  
              <Image style={styles.img} source={{uri: `${MainURL}/images/competition/last/compt${routecopy?.id}/${routecopy?.noticeImage3}`}} />
            </View>
          </Swiper>
        </View>
        <Divider height={2}/> 
      </View>
      <View style={styles.contentBox}>
        <View style={{width:'100%'}}>
          <Typography fontSize={18}>참가자 영상</Typography>
        </View>
        {
          entry.map((content: any, index: any)=>{
            return(
              <View style={styles.videoContainer} key={index}>
                <TouchableOpacity 
                  onPress={()=>{
                    Linking.openURL(content.songUri);
                  }}
                  >
                  <View style={styles.video}>
                    <View style={styles.videoBox}>
                      <View style={{flexDirection: 'row'}}>
                        <Typography >{content.userName} </Typography>
                        <Typography >{content.userSchool}</Typography>
                        <Typography >{content.userSchNum} </Typography>
                        <Typography >{content.userPart}</Typography>
                      </View>
                      <Typography fontSize={14} >{renderPreview(content.title)}</Typography>
                    </View>
                    <AntDesign name="right" size={16} color="black" style={{marginLeft:10}}/>
                  </View>
                </TouchableOpacity>
              </View>
            )
          })
        } 
        <Divider height={2}/> 
      </View>
      <View style={styles.contentBox}>
        <View style={{width:'100%'}}>
          <Typography fontSize={18}>콩쿨 결과</Typography>
        </View>
        <View style={styles.ImgSwifeBox}>
         <Swiper 
              showsPagination={true}
          >
            <View style={styles.slide}>
              <Image style={styles.img} source={{uri: `${MainURL}/images/competition/last/compt${routecopy?.id}/${routecopy?.resultImage1}`}} />
            </View>
            <View style={styles.slide}>
              <Image style={styles.img} source={{uri: `${MainURL}/images/competition/last/compt${routecopy?.id}/${routecopy?.resultImage2}`}} />
            </View>
          </Swiper>
        </View>
        <Divider height={2}/> 
      </View>
      <View style={styles.contentBox}>
        <View style={{width:'100%'}}>
          <Typography fontSize={18}>시상 결과</Typography>
        </View>
        <View style={styles.ImgSwifeBox}>
         <Swiper 
              showsPagination={true}
          >
            <View style={styles.slide}>
              <Image style={styles.img} source={{uri: `${MainURL}/images/competition/last/compt${routecopy?.id}/${routecopy?.winnerImage1}`}} />
            </View>
            <View style={styles.slide}>
              <Image style={styles.img} source={{uri: `${MainURL}/images/competition/last/compt${routecopy?.id}/${routecopy?.winnerImage2}`}} />
            </View>
            <View style={styles.slide}>
              <Image style={styles.img} source={{uri: `${MainURL}/images/competition/last/compt${routecopy?.id}/${routecopy?.winnerImage3}`}} />
            </View>
            <View style={styles.slide}>
              <Image style={styles.img} source={{uri: `${MainURL}/images/competition/last/compt${routecopy?.id}/${routecopy?.winnerImage4}`}} />
            </View>
            <View style={styles.slide}>
              <Image style={styles.img} source={{uri: `${MainURL}/images/competition/last/compt${routecopy?.id}/${routecopy?.winnerImage5}`}} />
            </View>            
          </Swiper>
        </View>
        <Divider height={2}/> 
      </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    position:'absolute',
    top: 0,
    left: 0,
    width: 30,
    height: 30,
  },
  contentBox: {
    padding: 15,
    alignItems:'center'
  },
  title : {
    fontSize: 20,
  },
  ImgSwifeBox: {
    height: 500,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: 420,
    width: 320
  },
  videoContainer: {
    marginTop: 15,
    width: '100%',
  },
  video: {
    height: 60,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-between',
  },
  videoBox:{
    marginBottom: 5,
  },
  videoTitle: {
    fontSize: 14,
    textAlign: 'left',
  }
});

export default LastComptDetail;
