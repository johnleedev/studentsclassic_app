import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import { SubTitle } from '../Components/SubTitle';
import { Typography } from '../Components/Typography';
import { Divider } from '../Components/Divider';
import { useRoute } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface NewListProps {
  title: string;
  date: string;
  author: string;
  image: string;
}

const NewList: React.FC<NewListProps> = ({ title, date, author, image }) => (
  <View style={styles.newsList}>
    <View style={styles.newsTextBox}>
      <Typography marginBottom={5}>{title}</Typography>
      <Typography fontSize={12} color={'#8C8C8C'}>{date} | {author}</Typography>
    </View>
    <View style={styles.newsImageBox}>
      <Image style={styles.newsImage} source={{uri: image}}/>
    </View>
  </View>
);

export default function NewsList (props : any) {
  
  const route : any = useRoute();
  const newsContents = route.params.data;
  
  const [postListNum, setPostListNum] = useState<number>(7);

  return (
    <View style={styles.container}>
      
      <SubTitle navigation={props.navigation} title='뉴스' enTitle='News'/>
      
      <Divider height={2} />
      
      <View style={styles.section}>
        <ScrollView style={{}}>
        {newsContents.slice(0,postListNum).map((item:any, index:any) => (
            <View key={index}>
            <TouchableOpacity
                onPress={()=>{
                  props.navigation.navigate('NewsDetail', {data : item})
                }}
            >
                <NewList
                title={item.title}
                date={item.date}
                author={item.author}
                image={item.image}
                />
            </TouchableOpacity>
            <Divider height={2}/>
            </View>
        ))}
        {
            newsContents.length > postListNum 
            &&
            <TouchableOpacity
              style={styles.button} 
              onPress={()=>{
                setPostListNum(postListNum + 7)
              }}
            >
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Typography color='#333'>더보기 </Typography>
                <AntDesign name="down" size={20} color="#333"/>
              </View>
            </TouchableOpacity>
          }
        <View style={{marginBottom:50}}></View>
        </ScrollView>
      </View>
      
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
    marginRight: 10
  },
  newsImageBox: {
    width: 80,
    height: 70,
    borderRadius: 5,
    justifyContent:'center',
    alignItems:'center'
  },
  newsImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode:'contain'
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