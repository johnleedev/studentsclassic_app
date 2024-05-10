import { Alert, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions, Platform } from 'react-native'
import React, { useState } from 'react'
import { Typography } from '../Components/Typography'
import { Divider } from '../Components/Divider'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ButtonBox } from '../Components/ButtonBox';
import axios from 'axios';
import MainURL from '../../MainURL';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export default function Notes(props:any) {

  const diviceHeight = Dimensions.get('window').height;

  // 스케줄 입력 모달창
  const [isInputModalVisible, setInputModalVisible] = useState(false);
  const [selectDate, setSelectDate] = useState('');
  const [reformedDate, setRefromedDate] = useState('');
  const inputToggleModal = (date:any) => {
    setSelectDate(date);
    const copy = date.split('-');
    const reformDateCopy = `${copy[0]}년 ${copy[1]}월 ${copy[2]}일`
    setRefromedDate(reformDateCopy);
    setInputModalVisible(!isInputModalVisible);
  };

  const [input, setInput] = useState('');
  
  // 스케줄 입력 함수
  const contentInput = async () => {
    axios
      .post(`${MainURL}/lessonnote/contentinput`, {
        userAccount : props.userAccount,
        date : selectDate,
        content : input
      })
      .then((res) => {
        if (res.data === true) {
          props.setRefresh(!props.refresh);
          Alert.alert('입력되었습니다.')
          setInputModalVisible(!isInputModalVisible);
        } else {
          Alert.alert(res.data)
        }
      })
      .catch(() => {
        console.log('실패함')
      })
  };


  return (
    <View style={styles.container}>

      <View style={{paddingHorizontal:20, width:'100%', flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}}>
        <Typography fontSize={12} color='#8C8C8C'>각 항목을 누르시면, 입력과 수정이 가능합니다.</Typography>
      </View>

      <ScrollView style={styles.section}>

        <View style={{flexDirection:'row', marginBottom:10}}>
          <View style={{width:'30%', justifyContent:'center', alignItems:'center'}}>
            <Typography>날짜</Typography>
          </View>
          <View style={{width:'70%', justifyContent:'center', alignItems:'center', paddingLeft:5}}>
            <Typography>내용</Typography>
          </View>
        </View>

        <Divider height={2}/>
        
        { 
          props.isResdataFalse
          ? 
          <View style={{height:200, alignItems:'center', justifyContent:'center'}}>
            <Typography marginBottom={10}>현재 입력된 기록이 없습니다.</Typography>
            <Typography>먼저 레슨 일정에서 일정을 입력해주세요.</Typography>
          </View>  
          :
          props.notes.map((item:any, index:any)=>{

            const copy = item.date.split('-');
            const reformYearCopy = `${copy[0]}년`
            const reformDateCopy = `${copy[1]}월 ${copy[2]}일`

            return (
              <View key={index}>
                <View style={{flexDirection:'row', minHeight:100}}>
                  <View style={{width:'30%', justifyContent:'center', alignItems:'center'}}>
                    <Typography>{reformYearCopy}</Typography>
                    <Typography>{reformDateCopy}</Typography>
                    <View style={{position:'absolute'}}>
                      <Image style={{opacity:0.3, width:90, height:60}} source={require('../images/mentoring/orangetitle.png')}/>
                    </View>
                  </View>
                  <TouchableOpacity style={{width:'70%', justifyContent:'center', paddingLeft:5}}
                    onPress={()=>{
                      inputToggleModal(item.date);
                      setInput(item.note);
                    }}
                  >
                    {
                      item.note === null || item.note === ''
                      ?
                      <View style={{alignItems:'center', justifyContent:'center'}}>
                        <AntDesign name='pluscircleo' color='#8C8C8C' size={20}/>
                      </View>
                      :
                      <Typography>{item.note}</Typography>
                    }
                  </TouchableOpacity>
                </View>
                <Divider height={2}/>
              </View>
            )
          })
        }
        <View style={{height:150}}></View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isInputModalVisible}
        onRequestClose={()=>{setInputModalVisible(!isInputModalVisible);}}
      >
        <View style={{marginTop: Platform.OS === 'android' ? null : getStatusBarHeight()}}>
          <View style={{ minHeight:300, borderRadius: 20, backgroundColor: 'white', 
                        padding: 20}}>
            
            <Typography marginBottom={10} fontWeightIdx={1}>레슨 일정 입력</Typography>
            <TouchableOpacity style={{position:'absolute', top:5, right:10, padding:15}}
              onPress={()=>{setInputModalVisible(!isInputModalVisible);}}
              > 
                <AntDesign name='close' size={20} color='#000'/>
            </TouchableOpacity>
            <Divider height={3} marginVertical={10}/>

            <ScrollView>  
              <View style={styles.infoBox}>
                <Typography>날짜: </Typography>
                <TextInput
                  onFocus={()=>{Alert.alert('변경하시려면, 달력에서 날짜를 선택해주세요.')}}
                  style={styles.input}
                  placeholder="날짜"
                  value={reformedDate}
                /> 
              </View>
              <View style={styles.infoBox}>
                <Typography>내용: </Typography>
                <TextInput
                  style={[styles.input, { minHeight: 250, textAlignVertical: 'top',}]}
                  placeholder="레슨 중 중요 사항을 기록해보세요"
                  value={input}
                  onChangeText={setInput}
                  multiline
                />
              </View>
              <View style={{height:100, justifyContent:'flex-end'}}>
                <ButtonBox leftText='취소' leftFunction={()=>{setInputModalVisible(!isInputModalVisible);}} rightText='입력' rightFunction={contentInput} />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <View style={ isInputModalVisible ? styles.modalBackCover :  { display: 'none'}}></View>
    </View>
  )


}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  section : {
    padding: 20,
  },
  android: {
    backgroundColor: '#000',
  },
  ios : {
    backgroundColor: '#000',
    paddingTop: getStatusBarHeight()
  },
  modalBackCover : {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#333',
    opacity: 0.8
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    width:'85%',
    height: 40,
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
    color: '#333',
  }
})