import React, { Component, useEffect, useState } from 'react'
import Swiper from 'react-native-swiper'
// import Swiper from 'react-native-swiper-flatlist';
import { StyleSheet, TouchableOpacity, View, Image, Linking } from 'react-native';
import AppText from '../../AppText';
import MainURL from '../../MainURL';
import axios from 'axios';

function Schoollist() {

  const [schoollist, setSchoollist] = useState<any>([]);

  const fetchPosts = () => {
    axios.get(`${MainURL}/schoollist`).then((res) => {
      let copy: Array<object> = [...res.data];
      setSchoollist(copy);
    });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Swiper 
        showsButtons={true}
        showsPagination={false} 
        autoplay={true}
        loop={true}
      >
      {
        schoollist.map((a:String, i:any)=>{
          return (
            <View style={styles.slide} key={schoollist[i].id}>
              <TouchableOpacity 
                onPress={() => {Linking.openURL(`${schoollist[i].link}`);}}
                style={styles.touchbox}
              >
              <View style={styles.imgbox}>
                <Image 
                  style={styles.img} 
                  source={{uri: `${MainURL}/images/schoollist/logo${i+1}.png`}}
                />
              </View>
              <View style={styles.textbox}>
                <AppText style={{ fontSize: 18 }}>{schoollist[i].name}</AppText>
                <AppText>{schoollist[i].subname}</AppText>
                <AppText style={styles.schooltitle}>홈페이지</AppText>
              </View>
              
              </TouchableOpacity>
            </View>
          )
        })
      }
  </Swiper>
  );
}

export default Schoollist;

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchbox: {
    flexDirection: 'row',
    width: 260,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgbox: {
    flex: 1,
    width: 130,
    height: 100,
    alignItems: 'flex-end',
    paddingRight: 20,
  },
  img: {
    width: 100,
    height: 100
  },
  textbox: {
    flex: 1,
    width: 130,
    height: 100,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  schooltitle: {
    backgroundColor: '#faf7f2',
    width: 100,
    height: 30,
    textAlign: 'center',
    marginTop: 5,
    letterSpacing: -0.3,
    borderRadius: 5,
    paddingVertical: 4
  }
})