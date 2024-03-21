import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Image, Text, Linking } from 'react-native';
import { Typography } from '../Components/Typography';
import MainImageURL from "../../MainImageURL";
import { Divider } from '../Components/Divider';
import { SubTitle } from '../Components/SubTitle';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function NoticeMentoring(props : any) {

  const sort = props.route.params.sort;

  interface NoticeProps {
    width: number;
    title: string;
    content : string;
  }
  
  const TextBox : React.FC<NoticeProps> = ({ width, title, content }) => (
    <View style={styles.section}>
      <View style={{flexDirection:'row', marginBottom:10}}>
        <Image
          source={require("../images/mentoring/orangetitle.png")}
          style={{width:width, height:50, resizeMode:'cover', opacity:0.5, marginRight:5}}>
        </Image>
        <View style={{position:'absolute', bottom:10, left:7}}>
          <Typography fontSize={25} fontWeightIdx={1} marginBottom={5}>{title}</Typography>
        </View>
      </View>
      <View>
        <Typography fontSize={18}><Text style={{lineHeight:30}}>{content}</Text></Typography>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      
      {/* title */}
      <SubTitle title={sort === 'mentor' ? '멘토 안내' : '멘티 안내'} navigation={props.navigation}/>
                
      <Divider height={2} />

      <ScrollView>

        <View style={[styles.section, {alignItems:'center'}]}>
          {
            sort === 'mentor'
            ?
            <Image
              source={require("../images/mentoring/notice1.jpeg")}
              style={{width:330, height:365, resizeMode:'contain', borderRadius:10}}>
            </Image>
            :
            <Image
              source={require("../images/mentoring/notice2.jpeg")}
              style={{width:330, height:365, resizeMode:'contain', borderRadius:10}}>
            </Image>
          }
        </View>
        
        <TextBox width={60} title='대상' content={sort === 'mentor' ? '대학교(성악전공) 졸업 이상 학력 소유자, 현재 유학중인 유학생, 활동중인 연주가' : '현재 고등학교, 대학교 재학중인 학생으로서, 성악 전공을 하는 학생'}/>
        <TextBox width={60} title='목적' content='현재 성악전공 중인 고등학생,대학생과 졸업한 선배와의 1:1 매칭한 후, 멘토링을 통해 멘티의 실력 향상과 정서적 지지 등, 학생으로서의 필요를 보충해 줌으로써, 건강한 성악가로서 함께 성장할 수 있도록 합니다.'/>
        <TextBox width={100} title='활동내용' content='진로 코칭, 유학 관련 코칭, 성악 발성 관련 온라인 레슨 및 상담'/>
        <TextBox width={60} title='기대사항' content={sort === 'mentor' ? '향후 오프라인으로 학생을 직접 만나, 레슨을 하는 선생님으로 만날 수 있음' : '향후 오프라인으로 선생님을 직접 만나, 레슨을 받는 학생으로 만날 수 있음'}/>
        <View style={{height:100}}></View>
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
    padding:20
  },
  
});

