import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Linking } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { Typography } from '../../Components/Typography';
import { Divider } from '../../Components/Divider';
import { useRoute } from '@react-navigation/native';
import MainURL from "../../../MainURL";

interface FavorListContentProps {
  title: string;
  content: string;
}

const ConcoursNotice : React.FC<FavorListContentProps> = ({ title, content }) => (
  <View style={{flexDirection: 'row', marginVertical:10}}>
    <View style={{width:'30%'}}>
      <Typography>{title}</Typography>
    </View>
    <View style={{width:'60%'}}>
      <Typography fontSize={14}>{content}</Typography>
    </View>
  </View>
);

export default function ConcoursDetail (props: any) {

  const route : any = useRoute();
     
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        {/* title */}
        <View style={styles.section}>
          <TouchableOpacity
            style={{marginBottom:10}}
            onPress={()=>{
              props.navigation.goBack();
            }}>
            <EvilIcons name="arrow-left" size={30} color="black" />
          </TouchableOpacity>
          <View style={{flexDirection:'row', justifyContent:'center'}}>
            <Typography fontSize={20}>{route.params.data?.title}</Typography>
          </View>
        </View>
        <Divider height={3} marginVertical={5}/>
        <View style={styles.section}>
          <View style={styles.postBox}>
            <View style={{width:'100%', alignItems:'center'}}>
              <ConcoursNotice title='대회기간' content={`${route.params.data?.concoursPeriodFrom} ~ ${route.params.data?.concoursPeriodUntil}`}/>
              <ConcoursNotice title='접수기간' content={`${route.params.data?.acceptPeriodFrom} ~ ${route.params.data?.acceptPeriodUntil}`}/>
              <ConcoursNotice title='지역' content={route.params.data?.location}/>
              <ConcoursNotice title='대회장소' content={route.params.data?.concoursPlace}/>
              <ConcoursNotice title='주관' content={route.params.data?.superViser}/>
              <View style={{flexDirection: 'row', marginVertical:10}}>
                <View style={{width:'30%'}}>
                  <Typography>문의전화</Typography>
                </View>
                <TouchableOpacity 
                  style={{width:'60%'}}
                  onPress={()=>Linking.openURL(`tel:${route.params.data?.inquiry}`)}
                >
                  <Typography fontSize={14} color='blue'>
                    <Text style={{textDecorationLine:'underline'}}>{route.params.data?.inquiry}</Text>
                  </Typography>
                </TouchableOpacity>
              </View>
              <View style={{flexDirection: 'row', marginVertical:10}}>
                <View style={{width:'30%'}}>
                  <Typography>웹페이지</Typography>
                </View>
                <TouchableOpacity 
                  style={{width:'60%'}}
                  onPress={()=>Linking.openURL(`${route.params.data?.webPage}`)}
                >
                  <Typography fontSize={14} color='blue'>
                    <Text style={{textDecorationLine:'underline'}}>{route.params.data?.webPage}</Text>
                  </Typography>
                </TouchableOpacity>
              </View>
            </View>
            <Divider height={3} marginVertical={5}/>
            <View style={{width:'100%', height:500, justifyContent:'space-between'}}>
                <Image style={{width:'100%', height:'100%', resizeMode:'contain'}} 
                      source={{ uri: `${MainURL}/images/upload_concours/${route.params.data?.imageName1}`}}/>
            </View>
          </View>
        </View>
      </ScrollView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    padding:20
  },
  postBox :{
    flex: 1,
    alignItems: 'center'
  },
  boxDivider: {
    height: 1,
    backgroundColor: 'black',
    marginVertical: 20
  },
  postContainer: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 5,
    padding: 16,
    justifyContent: 'center',
  },
});


