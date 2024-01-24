import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl, TouchableOpacity, LayoutAnimation, Platform, UIManager, Alert } from 'react-native';
import { Divider } from '../Components/Divider';
import { Title } from '../Components/Title';
import Concours from './Concours/Concours';
import Concert from './Concert/Concert';
import { Typography } from '../Components/Typography';
import Entypo from 'react-native-vector-icons/Entypo';
import Column from './Column/Column';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

function InfoMain(props : any) {

  // 스크롤뷰 리프레쉬
  const [refresh, setRefresh] = useState<boolean>(false);
  const onRefresh = React.useCallback(() => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 500);
  }, []);

  // 커스텀 탭 버튼
  const [currentTab, setCurrentTab] = useState(1);
 
  interface SelectMenuProps {
    tabNum : number;
    title: string;
  }
  
  const SelectMenu: React.FC<SelectMenuProps> = ({ tabNum, title}) => {
    LayoutAnimation.easeInEaseOut();
    return (
      <TouchableOpacity
        style={{width:100, padding: 10, alignItems:'center'}}
        onPress={() => setCurrentTab(tabNum)}
      >
        <Typography fontSize={14} color={currentTab === tabNum ? '#E5625D' : '#8B8B8B'}>{title}</Typography>
        {
          currentTab === tabNum
          ? <View style={{width:70, height:2, backgroundColor:'#E5625D', marginTop:10}}></View>
          : <View style={{width:70, height:2, backgroundColor:'#fff', marginTop:10}}></View>
        }
      </TouchableOpacity>
    )    
  };

  const alertPost = () => { 
    Alert.alert('글쓰기 주의사항', '불건전하거나 불법적인 내용 작성시, 서비스 사용에 제한이 있을 수 있습니다.', [
      { text: '취소', onPress: () => { return }},
      { text: '확인&글쓰기', onPress: () => 
        currentTab === 1 
        ?
        props.navigation.navigate("Navi_Info", { screen: "ConcertPost"})
        :
        props.navigation.navigate("Navi_Info", { screen: "ConcoursPost"})
      }
    ]);
  }

  return (
    <View style={styles.container}>
      <Title title='성악정보' enTitle='information' />

      <View style={{paddingHorizontal:10, flexDirection: 'row', alignItems: 'center'}}>
        <SelectMenu tabNum={1} title='연주회정보'/>
        <SelectMenu tabNum={2} title='콩쿨정보'/>
        {/* <SelectMenu tabNum={3} title='칼럼'/> */}
      </View>
      <Divider height={2} marginVertical={5}/>

      <ScrollView 
        style={{flex:1}}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
      >
        {currentTab === 1 && <Concert navigation={props.navigation}/>}
        {currentTab === 2 && <Concours navigation={props.navigation}/>}
        {currentTab === 3 && <Column navigation={props.navigation}/>}
      </ScrollView>

      <TouchableOpacity 
        style={styles.newPostButton} 
        onPress={alertPost}
      >
        <Entypo name="plus" size={25} color="#fff"/>
      </TouchableOpacity>
    </View> 
   );
}
export default InfoMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    padding:20
  },
  searchInput: {
    flex: 1,
    height: 30,
    margin: 12,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5
  },
  noticeBox : {
    height: 270,
    paddingVertical: 20,
  },
  slide: {
    alignItems: 'center',
  },
  img: {
    height: 210,
    width: 320,
    resizeMode:'contain',
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
  button: {
    borderWidth:1,
    borderColor: '#8C8C8C',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
});