import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Linking, ScrollView } from 'react-native';
import MainURL from "../../MainURL";
import axios from 'axios';
import { Typography } from '../Components/Typography';
import AntDesign from 'react-native-vector-icons/AntDesign';

function Schoollist(props : any) {
  
  const fetchPosts = () => {
    axios.get(`${MainURL}/home/schoollist`).then((res) => {
      setSchoollist(res.data);
    });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  interface School {
    id: number;
    img: string;
    link: string;
    name: string;
    subname: string;
  }

  const [schoollist, setSchoollist] = useState<School[]>([]);
  const mySchool = schoollist.find((e) => e.name === props.userSchool);
  
  const [showAllSchools, setShowAllSchools] = useState(false);
  const schoolsToShow = showAllSchools ? schoollist : schoollist.slice(0, 6);
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Typography marginBottom={10}>나의 대학교</Typography>
        {
          props.userSchool === '일반대' &&
          <Typography marginBottom={10}>: 일반 대학교</Typography>
        }
        {
          mySchool && 
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("SchoolDetail", { data: mySchool })
            }}
            style={styles.schoolItem}
          >
            <View style={styles.imgBox}>
              <Image
                style={styles.img}
                source={{ uri: `https://www.studentsclassic.com${mySchool.img}` }}
              />
            </View>
            <View style={styles.textContainer}>
              <Typography>{mySchool.name}</Typography>
              <Typography fontSize={12}>{mySchool.subname}</Typography>
            </View>
          </TouchableOpacity>
        }
      </View>

      <Typography marginBottom={10}>타 대학교 목록</Typography>
      <View style={styles.schoolsRow}>
        {schoolsToShow.map((school: any, index: any) => (
          <TouchableOpacity
            key={school.id}
            onPress={() => {
              props.navigation.navigate("SchoolDetail", { data: school })
            }}
            style={styles.schoolItem}
          >
            <View style={styles.imgBox}>
              <Image
                style={styles.img}
                source={{ uri: `https://www.studentsclassic.com/${school.img}` }}
              />
            </View>
            <View style={styles.textContainer}>
              <Typography>{school.name}</Typography>
              <Typography fontSize={12}>{school.subname}</Typography>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={()=>{
          setShowAllSchools(!showAllSchools);
        }}
        >
          {
            showAllSchools
            ? <View style={{flexDirection:'row', alignItems:'center'}}>
                <Typography color='#333'>닫기 </Typography>
                <AntDesign name="up" size={20} color="#333"/>
              </View>
            : <View style={{flexDirection:'row', alignItems:'center'}}>
                <Typography color='#333'>전체보기 </Typography>
                <AntDesign name="down" size={20} color="#333"/>
              </View>
          }
        
      </TouchableOpacity>     
      
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  schoolsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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
  button: {
    borderWidth:1,
    borderColor: '#8C8C8C',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
});

export default Schoollist;
