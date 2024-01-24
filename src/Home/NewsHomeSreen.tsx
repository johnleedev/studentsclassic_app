import React, { useState, useEffect} from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView, Linking } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Typography } from '../Components/Typography';
import { Divider } from '../Components/Divider';
import axios from 'axios';
import MainURL from "../../MainURL";
import { Title } from '../Components/Title';

const Tab = createMaterialTopTabNavigator();

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

export default function News (props: any) {

  const [newsContents, setNewsContents] = useState<any>([]);

  const fetchPosts = () => {
    axios.get(`${MainURL}/home/getnews`).then((res) => {
      let copy: any = [...res.data];
      copy.reverse();
      setNewsContents(copy);
    });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const [showAllNews, setShowAllNews] = useState(false);
  const newsToShow = showAllNews ? newsContents.slice(0, 10) : newsContents.slice(0, 5);

  return (
    <View style={styles.container}>
      <Title title='클래식 뉴스' enTitle='Classic News'/>

      <View style={{flexDirection:'row', justifyContent:'flex-end', alignItems:'center', padding:10, marginRight:10}}>
        <TouchableOpacity
          onPress={()=>{
            props.navigation.navigate("NewsList", { data: newsContents });
          }}
        >
          <View style={{flexDirection:'row', alignItems:'center', borderBottomWidth:1}}>
            <Typography fontSize={16}>뉴스 게시판 바로가기</Typography>
            <AntDesign name="right" size={15} color="#000" style={{marginLeft:5}}/>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>

      <ScrollView style={{}}>
        {newsToShow.map((item:any, index:any) => (
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
      </ScrollView>
      {
        !showAllNews
        && 
        <TouchableOpacity
          style={styles.button} 
          onPress={()=>{
            setShowAllNews(true);
          }}
        >
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <Typography color='#333'>전체보기 </Typography>
            <AntDesign name="down" size={20} color="#333"/>
          </View>
        </TouchableOpacity>
      }
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