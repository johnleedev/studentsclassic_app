import React from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import { SubTitle } from '../Components/SubTitle';
import { Typography } from '../Components/Typography';
import { Divider } from '../Components/Divider';
import { useRoute } from '@react-navigation/native';


export default function NewsDetail (props : any) {
  
  const route : any = useRoute();
  const newsContents = route.params.data;
  
  console.log(newsContents);

  return (
    <View style={styles.container}>
      
      <SubTitle navigation={props.navigation} title='' enTitle='News'/>
      
      <Divider height={2} />
      
      <ScrollView style={{flex:1}}>
        <View style={styles.section}>
        
        
          <View style={styles.newsTextBox}>
            <Typography marginBottom={10} fontSize={20}>{newsContents.title}</Typography>
            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
              <Typography fontSize={12} color={'#8C8C8C'}>{newsContents.date} | {newsContents.author}</Typography>
              <TouchableOpacity
                style={{padding:5, borderWidth:1, borderColor:'#8C8C8C', borderRadius:3}}
                onPress={()=>Linking.openURL(newsContents.link)}
              >
                <Typography fontSize={12} color={'#8C8C8C'}>기사원문</Typography>
              </TouchableOpacity>
            </View>
          </View>
          
          <Divider height={3} marginVertical={10}/>

          <View style={styles.newsImageBox}>
            <Image style={styles.newsImage} source={{uri: newsContents.image}}/>
          </View>
          
          <View style={styles.newsTextBox}>
            <Typography marginBottom={10} fontWeightIdx={2}>{newsContents.content}</Typography>
          </View>
          
        </View>
      </ScrollView>
    </View> 
   );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
  },
  section: {
    padding :20
  },
  newsList:{
    flexDirection: 'row',
    padding: 10,
  },
  newsTextBox: {
    flex: 1,
    padding:10
  },
  newsImageBox: {
    width: '100%',
    height: 300,
    borderRadius: 5,
    marginVertical:10
  },
  newsImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode:'cover'
  },
  button: {
    borderWidth:1,
    borderColor: '#8C8C8C',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
});


