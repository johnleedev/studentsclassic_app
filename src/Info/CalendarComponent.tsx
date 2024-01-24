import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal, Image } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import AntDesign from 'react-native-vector-icons/AntDesign';

LocaleConfig.locales['fr'] = {
  monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일 '],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: "오늘"
};
LocaleConfig.defaultLocale = 'fr';

const currentDate = new Date;
const year = currentDate.getFullYear(); 
const monthcopy = currentDate.getMonth() + 1; 
const month = monthcopy < 10 ? `0${monthcopy}` : `${monthcopy}`
const day = currentDate.getDate();
const formattedDate = `${year}-${month}-${day}`;

export default function CalendarComponent (props: any) {
  
  const whichCalendar = props.whichCalendar;
  const [selected, setSelected] = useState('');
    
  return (
    <View style={{flex:1, alignItems: 'center', justifyContent:'center'}}>
      <View style={{height:430, backgroundColor:'#fff', borderRadius:10}}>
      
        <View style={{width:'100%', marginLeft: 10}}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={()=>{
              props.calendarToggleModal();
            }}
            >
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{width: '100%', backgroundColor: '#fff', alignItems: 'center', borderRadius: 15}}>
          <Calendar
            style={{
              width: 350,
              height: 350,
            }}
            current={formattedDate}
            theme={{
              backgroundColor: '#fff',
              calendarBackground: '#fff',
              textSectionTitleColor: '#1B1B1B', // 요일 줄 색상
              selectedDayBackgroundColor: '#333', // 선택 날짜 배경 색상
              selectedDayTextColor: '#fff', // 선택 날짜 텍스트 색상
              todayTextColor: 'red', // 오늘 날짜 색상
              dayTextColor: 'black', // 나머지 날짜 색상
              textDisabledColor: 'gray'
            }}
            onDayPress={(day: any) => {
              
              const copy = day.dateString.split('-')
              const newFormattedDate = `${copy[0]}.${copy[1]}.${copy[2]}`
              if (whichCalendar === 'concoursPeriodFrom') {
                props.setConcoursPeriodFrom(newFormattedDate)
              } else if (whichCalendar === 'concoursPeriodUntil') {
                props.setConcoursPeriodUntil(newFormattedDate)
              } else if (whichCalendar === 'acceptPeriodFrom') {
                props.setAcceptPeriodFrom(newFormattedDate)
              } else if (whichCalendar === 'acceptPeriodUntil') {
                props.setAcceptPeriodUntil(newFormattedDate)
              } else if (whichCalendar === 'concertDate') {
                props.setConcertDate(newFormattedDate)
              } else if (whichCalendar === 'recruitDate') {
                props.setRecruitDate(newFormattedDate)
              } 
              props.calendarToggleModal();
            }}
            markedDates={{
              [selected]: {selected: true, disableTouchEvent: true},
            }}
          />
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  calendarBox : {
    width: '47%',
    height : 60,
    justifyContent: 'center',
  },
  calendar: {
    height: 55,
    borderWidth: 1,
    borderColor: '#E3514C',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15
  },
  calendarText : {
    paddingHorizontal: 5,
    justifyContent: 'center'
  },
  bottomButton : {
    width: 250,
    borderRadius: 10,
    height: 50,
    padding: 10, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  backButton: {
    width: 50,
    height: 50,
    marginTop: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
