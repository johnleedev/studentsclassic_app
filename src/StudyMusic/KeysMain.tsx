import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,  Image, ScrollView } from 'react-native';
import { Typography } from '../Components/Typography';
import { Divider } from '../Components/Divider';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import MainURL from "../../MainURL";
import Loading from '../Components/Loading';
import SelectDropdown from 'react-native-select-dropdown'

interface KeysProps {
  id: number;
  keyName: string;
  keyNameEn: string;
  tonic : string;
  second : string;
  third : string;
  fourth : string;
  fifth : string;
  sixth : string;
  seventh : string;
  parallel : string;
}

export default function KeysMain (props : any) {

  const [keysList, setKeysList] = useState<KeysProps[]>([]);
  const [isResdataFalse, setIsResdataFalse] = useState<boolean>(false);
  
  const fetchPosts = () => {
    axios.get(`${MainURL}/study/getmusickeyall`)
    .then((res) => {
      if(res.data) {
        setIsResdataFalse(false);
        let data: any = [...res.data];
        setKeysList(data);
      } else {
        setIsResdataFalse(true);
      }
    });
  };

  useEffect(() => {
    fetchPosts();
  }, []);


  return (
    keysList.length === 0 && !isResdataFalse
    ?  (
    <View style={{flex:1, width:'100%', height:'100%'}}>
      <Loading /> 
    </View>
    ) : (
    <View style={styles.container}>
      
      <ScrollView >
      <View style={{paddingHorizontal:20, flexDirection:'row', flexWrap:'wrap', justifyContent:'space-between'}}>
        {
          keysList.map((item:any, index:any)=>{
            return (
              <TouchableOpacity 
                key={index}
                style={styles.select}
                onPress={()=>{
                  props.navigation.navigate('KeysDetail', { data: item })
                }}
              >
                <View style={styles.selectText}>
                  <Typography fontSize={18} fontWeightIdx={1} marginBottom={3}>{item.keyName}</Typography> 
                  <Typography fontSize={12}>{item.keyNameEn}</Typography>
                </View>
              </TouchableOpacity>
            )
          })
        }
      </View>
      <View style={{height:50}}></View>
      </ScrollView>
      
    </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    padding: 20
  },
  backButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  select: {
    width:'48%', 
    height:60,
    paddingVertical:10,
    paddingHorizontal:20,
    borderWidth:1, 
    borderColor:'#BDBDBD', 
    borderRadius:10, 
    flexDirection:'row',
    alignItems:'center', 
    justifyContent:'center',
    marginVertical:10,
  },
  selectText : {
    alignItems:'center', 
  }
  
});

