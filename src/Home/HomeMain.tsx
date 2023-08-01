import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, TextInput, TouchableOpacity, ScrollView, Alert, Linking } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import AppText from '../../AppText';
import Schoollist from './Schoollist';
import MainURL from '../MainURL';
import {checkNotifications} from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';

function HomeMain(props : any) {

  return (
    <View style={styles.container}>
      <View style={styles.topmenu}>
        <TouchableOpacity 
          hitSlop={{ top: 15, bottom: 15 }}
          onPress={() => {}}>
          <Image style={styles.mainlogo} source={require('../../assets/images/mainicon.png')}/>
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="검색!"
          onChangeText={()=>{}}
        />
        <TouchableOpacity 
          hitSlop={{ top: 15, bottom: 15 }}
          onPress={() => {
            props.navigation.navigate("알림");
          }}>
          <FontAwesome name="bell-o" size={24} color="black" style={{width: 30, marginRight: 5}}/>
        </TouchableOpacity>
        <TouchableOpacity 
          hitSlop={{ top: 15, bottom: 15 }}
          onPress={() => {
            props.navigation.navigate("Navi_MyPage", {screen:"Navi_MyPage"});
          }}>
          <Ionicons name="person-outline" size={24} color="black" style={{width: 30, marginRight: 5}}/>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{width: '100%'}}>
        <View style={styles.container}>

          <View style={[contents.box, contents.titlebox]}>
            <AppText style={contents.title}>성악하는 대학생들</AppText>
            <AppText style={contents.title2}>University Students of Classic vocal</AppText>
          </View>

          <View style={[contents.box, contents.schoollistbox]}>
            <AppText style={contents.schooltitle}>학교찾기</AppText>
            <Schoollist></Schoollist>
          </View>

          <View style={[contents.box, contents.imgbox]}>
            <TouchableOpacity 
              onPress={() => {
                props.navigation.navigate("Navi_Competition", {screen:"Navi_Competition"});
              }}
              style={{flex:1, width: '100%'}}>
              <Image source={{uri: `${MainURL}/images/competition/competition.jpg`}} style={contents.img}/>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View> 
   );
}
export default HomeMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  topmenu: {
    width: '100%',
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingLeft: 10,
    paddingRight: 10,
  },
  mainlogo: {
    width: 35,
    height: 35,
  },
  searchInput: {
    flex: 1,
    height: 30,
    margin: 12,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5
  }
});

const contents = StyleSheet.create({
  box: {
    width: '95%',
    backgroundColor: '#faf7f2',
    borderRadius : 10,
    marginVertical : 10,
    shadowColor: "#eaeaea",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  titlebox: {
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 35,
    height: 60
  },
  title2: {
    fontSize: 18,
    letterSpacing: -0.3
  },
  imgbox: {
    height: 500,
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    flex: 1,
    width: '100%',
    resizeMode: "cover",
    overflow: 'hidden',
    borderRadius : 10
  },
  schoollistbox: {
    height: 200,
    backgroundColor: 'white'
  },
  schooltitle: {
    backgroundColor: '#faf7f2',
    width: 100,
    height: 30,
    textAlign: 'center',
    fontSize: 18,
    letterSpacing: -0.3,
    marginTop: 15,
    marginLeft: 20,
    borderRadius: 5,
    paddingVertical: 4
  }

});

