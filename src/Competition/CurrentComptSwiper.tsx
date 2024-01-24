import React, { useState, useEffect} from 'react';
import Swiper from 'react-native-swiper'
import { StyleSheet, View, Image } from 'react-native';
import axios from 'axios';
import MainURL from "../../MainURL";

function CurrentComptSwiper() {

  return (
    <Swiper 
        showsPagination={true}
    >
      <View style={styles.slide}>
        <Image style={styles.img} source={{uri: `${MainURL}/images/competition/current/notice1.jpg`}} />
      </View>
      <View style={styles.slide}>
        <Image style={styles.img} source={{uri: `${MainURL}/images/competition/current/notice2.jpg`}} />
      </View>
      <View style={styles.slide}>
        <Image style={styles.img} source={{uri: `${MainURL}/images/competition/current/notice3.jpg`}} />
      </View> 
    </Swiper>
  );
}

export default CurrentComptSwiper;

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