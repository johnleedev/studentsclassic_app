import React, { Component, useEffect, useState } from 'react'
import Swiper from 'react-native-swiper'
import { StyleSheet, TouchableOpacity, View, Image, Linking } from 'react-native';
import MainURL from '../../MainURL';

function NoticeSlide() {

  return (
    <Swiper 
        showsButtons={true}
        showsPagination={false} 
    >
      <View style={styles.slide}>
        <Image source={{uri: `${MainURL}/images/competition/concours1.jpg`}} style={styles.img}/>
      </View>
      <View style={styles.slide}>
        <Image source={{uri: `${MainURL}/images/competition/concours2.jpg`}} style={styles.img}/>
      </View>
      <View style={styles.slide}>
        <Image source={{uri: `${MainURL}/images/competition/concours3.jpg`}} style={styles.img}/>
      </View>
      <View style={styles.slide}>
        <Image source={{uri: `${MainURL}/images/competition/concours4.jpg`}} style={styles.img}/>
      </View>
      <View style={styles.slide}>
        <Image source={{uri: `${MainURL}/images/competition/concours5.jpg`}} style={styles.img}/>
      </View>
    </Swiper>
  );
}

export default NoticeSlide;

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: 450,
    width: 350
  }
})