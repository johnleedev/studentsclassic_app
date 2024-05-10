import { Alert, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {Calendar, LocaleConfig, Agenda} from 'react-native-calendars';
import React, { useEffect, useState } from 'react'
import { differenceInDays, parse, format } from 'date-fns';
import { Typography } from '../Components/Typography';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Divider } from '../Components/Divider';
import { ButtonBox } from '../Components/ButtonBox';
import axios from 'axios';
import MainURL from '../../MainURL';
import { Loading } from '../Components/Loading';
import SelectDropdown from 'react-native-select-dropdown'

LocaleConfig.locales['fr'] = {
  monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일 '],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: "오늘"
};
LocaleConfig.defaultLocale = 'fr';

export default function Schedule(props:any) {

  const formattedDate = format(new Date(), "yyyy-MM-dd");
  const next = props.notes.filter((e:any)=> differenceInDays(formattedDate, e.date) < 0 );
  const last = props.notes.filter((e:any)=> differenceInDays(formattedDate, e.date) >= 0 );

  // 날짜 함수
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );

  const markedDates = props.notes.reduce((acc:any, current:any) => {
    const formattedDate = format(new Date(current.date), 'yyyy-MM-dd');
    acc[formattedDate] = {marked: true};
    return acc;
  }, {});

  const markedSelectedDates = {
    ...markedDates,
    [selectedDate]: {
      selected: true,
      marked: markedDates[selectedDate]?.marked,
    }
  }

  // 스케줄 입력 모달창
  const [isInputModalVisible, setInputModalVisible] = useState(false);
  const [reformedDate, setRefromedDate] = useState('');
  const inputToggleModal = () => {
    const copy = selectedDate.split('-');
    const reformDateCopy = `${copy[0]}년 ${copy[1]}월 ${copy[2]}일`
    setRefromedDate(reformDateCopy);
    setInputModalVisible(!isInputModalVisible);
  };
  
  // 스케줄 시간 선택
  const [timeSelect, setTimeSelect] = useState('PM');
  const [times, setTimes] = useState('1시');
  const optionsTimeSelect = ["PM", "AM"];
  const optionsTimes = ["1시", "1시30분", "2시", "2시30분", "3시", "3시30분", "4시", "4시30분", "5시", "5시30분", "6시", "6시30분", 
                        "7시", "7시30분", "8시", "8시30분", "9시", "9시30분", "10시", "10시30분", "11시", "11시30분", "12시", "12시30분"];

  // 스케줄 입력 함수
  const changeInput = async () => {
    axios
      .post(`${MainURL}/lessonnote/dateinput`, {
        userAccount : props.userAccount,
        date : selectedDate,
        time : `${timeSelect} ${times}`
      })
      .then((res) => {
        if (res.data === true) {
          props.setRefresh(!props.refresh);
          Alert.alert('입력되었습니다.');
          inputToggleModal();
        } else {
          Alert.alert(res.data)
        }
      })
      .catch(() => {
        console.log('실패함')
      })
  };


  // 스케줄 삭제 함수
  const changeDelete = async (date:string) => {
    axios
      .post(`${MainURL}/lessonnote/datedelete`, {
        userAccount : props.userAccount,
        date : date
      })
      .then((res) => {
        if (res.data === true) {
          Alert.alert('삭제되었습니다.');
          props.setRefresh(!props.refresh);
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
      
      <ScrollView>

        <View style={{width: '100%', height: 360, alignItems: 'center'}}>
          <Calendar
            style={{
              width: 350,
              height: 350,
            }}
            current={''}
            theme={{
              backgroundColor: '#fff',
              calendarBackground: '#fff',
              textSectionTitleColor: '#1B1B1B', // 요일 줄 색상
              selectedDayBackgroundColor: '#E8726E', // 선택 날짜 배경 색상
              selectedDayTextColor: '#fff', // 선택 날짜 텍스트 색상
              todayTextColor: 'red', // 오늘 날짜 색상
              dayTextColor: 'black', // 나머지 날짜 색상
              textDisabledColor: 'gray' // 지난달 날짜 색상
            }}
            onDayPress={(day: any) => {
              setSelectedDate(day.dateString);
            }}
            markedDates={markedSelectedDates}
          />
        </View>

        <View style={{width: '100%', minHeight: 250, alignItems: 'center'}}>
          {
          props.isResdataFalse
          ? 
          <View style={{flexDirection:'row'}}>
            <Typography>현재 입력된 일정이 없습니다.</Typography>
          </View>  
          :
          <>
            {
              props.notes.length === 0
              ?
              <Loading />
              :
              <View style={{padding:20}}>
                <>
                {
                  next.length > 0 &&
                  <View style={{flexDirection:'row'}}>
                    <View style={{width:'30%', marginBottom:20}}>
                      <View style={{position:'absolute'}}>
                        <Image style={{opacity:0.3}} source={require('../images/mentoring/orangetitle.png')} />
                      </View>
                      <View style={{marginLeft:5}}>
                        <Typography fontWeightIdx={0}>다음레슨</Typography>
                      </View>
                    </View>
                    <View style={{width:'70%'}}>
                    {
                      next.slice(0,2).map((item:any, index:any)=>{

                        const copy = item.date.split('-');
                        const reformDateCopy = `${copy[1]}월 ${copy[2]}일`
                        
                        return( 
                          <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:20}} key={index}>
                            <View style={{width:'50%', alignItems:'center'}}>
                              <Typography>{reformDateCopy}</Typography>
                            </View>
                            <View style={{width:'30%', alignItems:'center'}}>
                              <Typography>{item.time}</Typography>
                            </View>
                            <TouchableOpacity 
                              style={{width:'20%', alignItems:'center'}}
                              onPress={()=>changeDelete(item.date)}
                            >
                              <AntDesign name='minuscircleo' color='#8C8C8C' size={20}/>
                            </TouchableOpacity>
                          </View>
                        )
                      })
                    }
                    </View>
                  </View>
                }
                </>
                <>
                {
                  last.length > 0 &&
                  <View style={{flexDirection:'row'}}>
                    <View style={{width:'30%', marginBottom:20}}>
                      <View style={{position:'absolute'}}>
                        <Image style={{opacity:0.3}} source={require('../images/mentoring/orangetitle.png')} />
                      </View>
                      <View style={{marginLeft:5}}>
                        <Typography fontWeightIdx={0}>이전레슨</Typography>
                      </View>
                    </View>
                    <View style={{width:'70%'}}>
                    {
                      last.slice(0,2).map((item:any, index:any)=>{

                        const copy = item.date.split('-');
                        const reformDateCopy = `${copy[1]}월 ${copy[2]}일`
                        
                        return( 
                          <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:20}} key={index}>
                            <View style={{width:'50%', alignItems:'center'}}>
                              <Typography>{reformDateCopy}</Typography>
                            </View>
                            <View style={{width:'30%', alignItems:'center'}}>
                              <Typography>{item.time}</Typography>
                            </View>
                            <TouchableOpacity 
                              style={{width:'20%', alignItems:'center'}}
                              onPress={()=>changeDelete(item.date)}
                            >
                              <AntDesign name='minuscircleo' color='#8C8C8C' size={20}/>
                            </TouchableOpacity>
                          </View>
                        )
                      })
                    }
                    </View>
                  </View>
                }
                </>
              </View>
            }
          </>
          } 
        </View>

      </ScrollView>
      <TouchableOpacity style={styles.newPostButton} onPress={inputToggleModal}>
        <Entypo name="plus" size={25} color="#fff"/>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isInputModalVisible}
        onRequestClose={inputToggleModal}
      >
        <View style={{ width: '100%', position: 'absolute', bottom:0, borderRadius: 20, backgroundColor: 'white', 
                      padding: 20}}>
          <Typography marginBottom={10} fontWeightIdx={1}>레슨 일정 입력</Typography>
          <TouchableOpacity style={{position:'absolute', top:5, right:10, padding:15}}
            onPress={inputToggleModal}
            > 
              <AntDesign name='close' size={20} color='#000'/>
          </TouchableOpacity>
          <Divider height={3} marginVertical={10}/>
          
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
            <Typography>시간: </Typography>
            <View style={[styles.input, {flexDirection:'row', justifyContent:'space-between', alignItems:'center', width:'32%', marginRight:5}]}>
              <SelectDropdown
                data={optionsTimeSelect}
                defaultValue={'PM'}
                onSelect={(selectedItem, index) => {
                  setTimeSelect(selectedItem);
                }}
                defaultButtonText={optionsTimeSelect[0]}
                buttonStyle={{width:'90%', height:30, backgroundColor:'#fff'}}
                buttonTextStyle={{fontSize:16}}
                dropdownStyle={{width:100, borderRadius:10}}
                rowStyle={{ width:100, height: 60}}
                rowTextStyle={{fontSize:16}}
              />
              <AntDesign name='down' size={12} color='#8C8C8C' style={{position:'absolute', right:10}}/>
            </View>
            <View style={[styles.input, {flexDirection:'row', justifyContent:'space-between', alignItems:'center', width:'52%'}]}>
              <SelectDropdown
                data={optionsTimes}
                defaultValue={'PM'}
                onSelect={(selectedItem, index) => {
                  setTimes(selectedItem);
                }}
                defaultButtonText={optionsTimes[0]}
                buttonStyle={{width:'90%', height:30, backgroundColor:'#fff'}}
                buttonTextStyle={{fontSize:16}}
                dropdownStyle={{width:150, borderRadius:10}}
                rowStyle={{ width:150, height: 60}}
                rowTextStyle={{fontSize:16}}
              />
              <AntDesign name='down' size={12} color='#8C8C8C' style={{position:'absolute', right:10}}/>
            </View>
          </View>
          


          <View style={{height:100, justifyContent:'flex-end'}}>
            <ButtonBox leftText='취소' leftFunction={inputToggleModal} rightText='입력' rightFunction={changeInput} />
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
  newPostButton: {
    width:50,
    height:50,
    borderRadius: 25,
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#000',
    padding: 12,
    alignItems: 'center',
    justifyContent:'center'
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