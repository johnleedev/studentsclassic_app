import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { Typography } from '../Components/Typography';
import axios from 'axios';
import MainURL from "../../MainURL";
import { Divider } from '../Components/Divider';
import EvilIcons from 'react-native-vector-icons/EvilIcons';


export default function LyricsDetail (props : any) {


  const songLyric = props.route.params.data;
  const reform = songLyric.lyrics.split('\n');
  

  return (
    <View style={styles.container}>

      <View style={styles.section}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={()=>{
            props.navigation.goBack()
          }}>
          <EvilIcons name="arrow-left" size={30} color="black" />
        </TouchableOpacity>
        <Typography fontSize={20} marginBottom={10}>{songLyric.songName}</Typography>
        <Typography color='#8B8B8B'>{songLyric.author}</Typography>
        <Divider height={2} marginVertical={10}/>
      </View>

      <ScrollView style={[styles.section]}>
      {
        reform.map((subItem:any, subIndex:any)=>{

          const copy = subItem.replaceAll('\n', ' \n').replaceAll(',', ' ,').replaceAll('!', ' !');
          const result = copy.split(' ');

          return (
            <View key={subIndex}>
              <View style={{flexDirection:'row', marginVertical:5, flexWrap:'wrap'}}>
              {
                result.map((word:any, wordIndex:any)=>{
                  return (
                    <TouchableOpacity
                      key={wordIndex}
                      onPress={()=>{
                        props.navigation.navigate('LyricsWord', {data : word});
                      }}
                    >
                      <Typography fontSize={20} fontWeightIdx={2}>{word}
                        <Text style={{textDecorationLine:'underline'}}> </Text>
                      </Typography>
                    </TouchableOpacity>
                  )
                })
              }
              </View>
            </View>
          )
        })
      }
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
  section : {
    padding: 20
  },
  backButton: {
    width: 40,
    height: 40,
  }
});


