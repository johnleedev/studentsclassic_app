import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Linking, ScrollView } from 'react-native';
import MainURL from "../../MainURL";
import axios from 'axios';
import { Typography } from '../Components/Typography';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useRoute } from '@react-navigation/native';
import { SubTitle } from '../Components/SubTitle';
import { Title } from '../Components/Title';
import { Divider } from '../Components/Divider';

export default function SchoolDetail (props : any) {

  interface User {
    userSchool: number;
    carrerInputs: []
  }
  
  const route : any = useRoute();
  const school = route.params.data;
  const [userlist, setUserlist] = useState<User[]>([]);

  const fetchPosts = () => {
    axios.get(`${MainURL}/home/getusers/${school.name}`).then((res) => {
      setUserlist(res.data);
    });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <View style={{flex:1, backgroundColor:'#fff'}}>
      <SubTitle title='학교별 정보' enTitle='School Info.' navigation={props.navigation}/>
      <View style={{flexDirection:'row', justifyContent:'center', paddingHorizontal:20}}>
        <View style={styles.schoolItem}>
          <View style={styles.imgBox}>
            <Image
              style={styles.img}
              source={{ uri: `https://www.studentsclassic.com${school.img}` }}
            />
          </View>
          <View style={styles.textContainer}>
            <Typography>{school.name}</Typography>
            <Typography fontSize={12}>{school.subname}</Typography>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.schoolItem, {marginLeft:10, justifyContent:'center'}]}
          onPress={()=>{
            Linking.openURL(school.link);
          }}
        >
          <Typography fontSize={14}>학교 홈페이지 바로가기</Typography>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <View style={{margin:10}}>
            <Typography>{`* 이용중인 ${school.name} 학생들`}</Typography>
            <Divider height={1} marginVertical={10}/>
            { 
              userlist?.length > 0
              ?
              userlist.map((item:any, index:any)=>{
                return(
                  // <TouchableOpacity
                  //   key={index}
                  //   onPress={()=>{
                  //     const carrerInputsCopy = item.carrerInputs === 'undefined' ? 'undefined' : JSON.parse(item.carrerInputs);
                  //     const videoLinksCopy = item.videoLinks === 'undefined' ? 'undefined' : JSON.parse(item.videoLinks);
                  //     const imageNamesCopy = item.imageNames === 'undefined' ? 'undefined' : JSON.parse(item.imageNames);
                  //     const reformData = {
                  //       ...item,
                  //       carrerInputs : carrerInputsCopy,
                  //       videoLinks : videoLinksCopy,
                  //       imageNames : imageNamesCopy
                  //     }
                  //     props.navigation.navigate('SchoolPersonal', {data : reformData})
                  //   }}
                  // >
                    <View key={index} style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', height:40}}>
                      <View style={{flexDirection:'row'}}>
                        <Typography>{item.userName} </Typography>
                        <Typography>{item.userSchNum}학번 </Typography>
                        <Typography>{item.userPart}</Typography>
                      </View>
                      {/* <AntDesign name="right" size={16} color="black"/> */}
                    </View>
                  // </TouchableOpacity>
                )
              })
              :
              <View>
                <Typography>회원으로 등록된 학생이 없습니다.</Typography>
              </View>
            }
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff'
  },
  section :{
    padding:20
  },
  schoolItem: {
    width: '48%',
    height: 50,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 0.3,
    elevation: 2,
    marginBottom: 15,
    padding: 5,
  },
  imgBox: {
    width: 35,
    marginRight: 10
  },
  img: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
  },
});


