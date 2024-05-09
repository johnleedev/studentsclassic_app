import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import axios from 'axios';
import MainURL from "../../MainURL";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AsyncGetItem from '../AsyncGetItem';
import { Typography } from '../Components/Typography';
import { Loading } from '../Components/Loading';
import YoutubePlayer from "react-native-youtube-iframe";


export default function VideoMy (props: any) {

  const youtubeWidth = Dimensions.get('window').width;
  const youtubeHeight = youtubeWidth * 5.65 / 10

  useEffect(() => {
    // asyncFetchData();
    // fetchPosts();
  }, []);


  return (
    <View style={{flex:1, backgroundColor:'#fff'}}>
      
      <View style={{flexDirection:'row', alignItems:'center',justifyContent:'center'}}>
        <Typography>준비중입니다.</Typography>
      </View>
      {/* <ScrollView 
        style={styles.container}
      >
        <View style={styles.postBox}>
          {
            posts.length > 0
            ? 
            (
              posts.map((item: any, index:any) => {

                return (
                  <View style={styles.postContainer} key={index}>
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
                      <View style={{flexDirection:'row'}}>
                        <TouchableOpacity
                          style={{marginRight:15}}
                          onPress={()=>{

                          }}
                        >
                          <Feather name="thumbs-up" size={25} color="#DD4A4A"/>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={()=>{
                            
                          }}
                        >
                          <Ionicons name="chatbubble-ellipses-outline" size={25} color="#333" />
                        </TouchableOpacity>
                      </View>
                      <View style={{flexDirection:'row'}}>
                        <Typography fontWeightIdx={1}>{item.year}졸업. </Typography>
                        <Typography fontWeightIdx={1}>{item.school} </Typography>
                        <Typography fontWeightIdx={1}>{item.part}</Typography>
                        <Typography fontWeightIdx={1}>{item.name}</Typography>
                      </View>
                    </View>
                    <View style={{paddingHorizontal:20, marginTop:5, marginBottom:20}}>
                      <Typography fontSize={14} color='#8C8C8C'>좋아요: {item.isLiked}개</Typography>
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
        
      </ScrollView> */}
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


