import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import { Typography } from '../Components/Typography';
import { Divider } from '../Components/Divider';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MainImageURL from "../../MainImageURL";
import Loading from '../Components/Loading';

export default function KeysDetail (props : any) {

  const propsData = props.route.params.data;
  const [isViewMeaning, setIsViewMeaning] = useState(Array(9).fill(false));
  
  const handleIsViewMeaning = (index:number, boolean: boolean ) => {
    const copy = [...isViewMeaning];
    copy[index] = boolean;
    setIsViewMeaning(copy);
  }

  return (
    
    propsData === undefined || propsData === null
    ?  (
    <View style={{flex:1, width:'100%', height:'100%'}}>
      <Loading /> 
    </View>
    ) : (
    <View style={styles.container}>
      <View style={{ padding: 15, flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingRight:20}}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            props.navigation.goBack();
          }}>
          <AntDesign name="left" size={20} color="black" />
        </TouchableOpacity>
        <Typography >{propsData.keyName}</Typography>
      </View>

      <Divider />
      <ScrollView>
      <View style={[styles.section, {flexDirection:'row', justifyContent:'center'}]}>
        <View style={{width:'50%'}}>
          <View style={{height:'60%', alignItems:'center', justifyContent:'center'}}>
            <Typography fontSize={20} fontWeightIdx={1} marginBottom={10}>{propsData.keyName}</Typography>
            { isViewMeaning[8] 
              ? <Image source={{uri: `${MainImageURL}/images/studymusickeys/${propsData.id}.png`}} style={{width:150, height:90, resizeMode:'cover', borderRadius:10}}/>
              : <TouchableOpacity
                  style={{width:130,height:50, borderWidth:1, borderRadius:10, borderColor:'#BDBDBD', alignItems:'center', justifyContent:'center'}}
                  onPress={()=>{handleIsViewMeaning(8, !isViewMeaning[8])}}
                >
                  <Typography>조표 보기</Typography>
                </TouchableOpacity>
            }
          </View>
          <View style={{height:'40%', alignItems:'center', justifyContent:'center'}}>
            <View style={{flexDirection:'row'}}>
              <Image
                source={require("../images/study/orangemiddle.png")}
                style={{width:10, height:20, resizeMode:'cover', opacity:0.5, marginRight:5, marginBottom:10}}>
              </Image>
              <Typography>나란한조</Typography>
            </View>
            <TouchableOpacity 
              style={{width:130,height:50, borderWidth:1, borderRadius:10, borderColor:'#BDBDBD', alignItems:'center', justifyContent:'center'}}
              onPress={()=>{handleIsViewMeaning(7, !isViewMeaning[7])}}
            >
              {
                isViewMeaning[7] 
                ? <Typography >{propsData.parallel}</Typography>
                : <Typography color='#8C8C8C'>보기</Typography>
              }
            </TouchableOpacity>
          </View>
          
        </View>
        <View style={{width:'50%'}}>

          {
            [propsData.tonic, propsData.second, propsData.third, propsData.fourth, propsData.fifth, propsData.sixth, propsData.seventh]
            .map((item:any, index:any)=>{
              return (
                <View style={styles.box} key={index}>
                  <Image
                    source={require("../images/study/orangemiddle.png")}
                    style={{width:10, height:20, resizeMode:'cover', opacity:0.5}}>
                  </Image>
                  <Typography>{index+1}도</Typography>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={{width:100,height:50, borderWidth:1, borderRadius:10, borderColor:'#BDBDBD', alignItems:'center', justifyContent:'center'}}
                    onPress={()=>{handleIsViewMeaning(index, !isViewMeaning[index])}}
                  >
                    {
                      isViewMeaning[index] 
                      ? <Typography >{item}</Typography>
                      : <Typography color='#8C8C8C'>보기</Typography>
                    }
                    
                  </TouchableOpacity>
                </View>
              )
            })
          }
        </View>
        
      </View>
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
  box: {
    height:70,
    borderBottomWidth:1,
    borderBottomColor:"#BDBDBD",
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'space-between',
    paddingLeft:10
  }
  
  
});

