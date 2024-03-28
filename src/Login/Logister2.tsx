import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, Image, Platform, Modal, ScrollView, KeyboardAvoidingView } from 'react-native';
import { getStatusBarHeight } from "react-native-status-bar-height";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import MainURL from "../../MainURL";
import AsyncSetItem from '../AsyncSetItem'
import { Typography } from '../Components/Typography';
import { Divider } from '../Components/Divider';

function Logister2 (props : any) {

  const [isSchoolModalVisible, setSchoolModalVisible] = useState(false);
  const schoolToggleModal = () => {
    setSchoolModalVisible(!isSchoolModalVisible);
  };

  const [isSchNumModalVisible, setSchNumModalVisible] = useState(false);
  const schNumToggleModal = () => {
    setSchNumModalVisible(!isSchNumModalVisible);
  };
  
  const [isPartModalVisible, setPartModalVisible] = useState(false);
  const partToggleModal = () => {
    setPartModalVisible(!isPartModalVisible);
  };


  const routeDataSet = () => {
    if(props.route.params === null || props.route.params === undefined) {
      return
    } else {
      const routeData = props.route.params.data;
      setRouteData(routeData);
      setRefreshToken(routeData.refreshToken);
      setUserAccount(routeData.email);
      setUserURL(routeData.userURL);
      {
        routeData.name && setUserName(routeData.name);
      }
    }
  }

  useEffect(()=>{
    routeDataSet();
  }, [])

  const [routeData, setRouteData] = useState({});
  const [refreshToken, setRefreshToken] = useState('');
  const [userAccount, setUserAccount] = useState('');
  const [userName, setUserName] = useState('');
  const [userSchool, setUserSchool] = useState('');
  const [userSchNum, setUserSchNum] = useState('');
  const [userPart, setUserPart] = useState('');
  const [userURL, setUserURL] = useState('');
  
  const highschools = ["강원예고", "경기예고", "경남예고", "경북예고", "계원예고", "고양예고", "광주예고", "김천예고", 
                        "대전예고", "덕원예고", "부산예고", "브니엘예고", "서울예고", "선화예고", "세종예고", "안양예고",
                        "울산예고", "인천예고", "전남예고", "전주예고", "충남예고", "충북예고", "포항예고" ]

  const univercitys = ["가천대", "경북대", "경희대", "계명대", "국민대", "군산대", "단국대", "대구가톨릭대", "목원대", 
                      "서울대", "서울사이버대", "성신여대", "수원대", "숙명여대", "연세대", "영남대", "이화여대", "장신대",
                      "전북대", "전주대", "제주대", "중앙대", "추계예대", "충남대", "한세대", "한양대", "한예종"]

  const publicSchool = ["일반고", "일반대"]

  const sch_num = ["25", "24", "23", "22", "21", "20", "19", "18", "17", "16", "15", "14", "13", 
          "12", "11", "10", "09", "08", "07", "06", "05", "04", "03", "02", "01", "00", "99+", "청소년"]

  const part = ["Sop.", "Mez.", "Ten.", "Bar.", "Bass.", "비전공"]


  // 회원가입하기 함수
  const handleSignup = () => {

    const userData = {
      ...routeData,
      userSchool: userSchool,
      userSchNum: userSchNum,
      userPart: userPart,
    }
     
    axios
      .post(`${MainURL}/login/logisterdo`, {
        userData : userData
      })
      .then((res) => {
        if (res.data === userAccount) {
          Alert.alert('회원가입이 완료되었습니다!');
          AsyncSetItem(refreshToken, userAccount, userName, userSchool, userSchNum, userPart, userURL);
          props.navigation.navigate('Result');
        } else {
          Alert.alert('다시 시도해 주세요.');
        }
      })
      .catch(() => {
        console.log('실패함');
      });
  };

  const alertSignup = () => { 
    Alert.alert('중요 공지', '성악과학생들은, 효율적인 어플 운영을 위해 회원님들의 정확한 프로필을 필요로 합니다. 가입된 정보가 사실과 다를 경우, 어플 사용에 제한이 있을 수 있습니다.', [
      { text: '가입 취소', onPress: () => { return }},
      { text: '확인', onPress: () => handleSignup() }
    ]);
  }
  
  const alertPageOut = () => { 
    Alert.alert('작성한 모든 내용이 지워집니다.', '나가시겠습니까?', [
      { text: '취소', onPress: () => { return }},
      { text: '나가기', onPress: () => handlePageOut() }
    ]);
  }

  const handlePageOut = () => {
    setUserAccount('');
    setUserName('');
    setUserSchool('');
    setUserSchNum('');
    setUserPart('');
    props.navigation.navigate("Login");
  };

  // Logister 페이지로 전환
  const handleLogister = () => {
    userSchool && userSchNum && userPart 
    ? alertSignup() 
    : Alert.alert('모든 항목을 선택해주세요')
  };

  // 학교선택 모달창 ------------------------------------------------------------------------
  const [currentTab, setCurrentTab] = useState(1);

  interface SelectMenuProps {
    tabNum : number;
    title: string;
  }
  const SelectMenu: React.FC<SelectMenuProps> = ({ tabNum, title}) => {
    return (
      <TouchableOpacity
       style={{width:70, alignItems:'center', paddingTop:10}}
       onPress={() => setCurrentTab(tabNum)}
     >
       <Typography fontWeightIdx={1} fontSize={14} color={currentTab === tabNum ? '#333' : '#8B8B8B'}>{title}</Typography>
       {
         currentTab === tabNum
         ? <View style={{width:60, height:2, backgroundColor:'#333', marginTop:10}}></View>
         : <View style={{width:60, height:2, backgroundColor:'#fff', marginTop:10}}></View>
       }
     </TouchableOpacity>
    )    
  };

  interface SchoolBoxProps {
    item : string[];
  }

  const SchoolsBox : React.FC<SchoolBoxProps> = ({item}) => (
    <View style={{flexDirection: 'row', justifyContent: 'center', flexWrap:'wrap', marginBottom:20}}>
      {
        item.map((item:any, index:any)=>{
          return(
            <TouchableOpacity 
              key={index} 
              onPress={()=>{
                setUserSchool(item);
                schoolToggleModal();
              }} 
              style={{width: '32%', height: 50, borderWidth:1, borderColor: '#EAEAEA'}}
              >
                <View style={{width:'100%', height:'100%', alignItems:'center', justifyContent:'center',backgroundColor: '#fff'}}>
                  <Typography color='#000' fontSize={13}>{item}</Typography>
                </View>
            </TouchableOpacity> 
          )
        })
      }
    </View>
  )

  return (
    <View style={Platform.OS === 'android' ? styles.android : styles.ios}>
      <View style={{flex:1, backgroundColor:'#fff'}}>

        <View style={{padding:20, alignItems: 'center', marginTop: 10, justifyContent: 'center'}}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={()=>{
              props.navigation.goBack();
            }}
            >
            <EvilIcons name="arrow-left" size={30} color="black" />
          </TouchableOpacity>
          <Typography>회원가입</Typography>
        </View>

        <Divider/>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 50}
          style={{flex:1}}
        >
        <ScrollView style={styles.container}>
       
          <View style={{marginBottom: 20}}>
            <View style={{flexDirection:'row'}}>
              <View style={{width:40, height:50, alignItems: 'center', marginBottom:10}}>
                <Image source={require('../images/login/note2_2.png')} style={{width:12, height:20}}/>
                <Typography fontSize={24} fontWeightIdx={1} color='#ccc'>01</Typography>  
              </View>
              <View style={{marginHorizontal:10}}>
                <View style={{width:40, height:33}}></View>
                <View style={{width:40, height:2, backgroundColor: '#ccc'}}></View>
              </View>
              <View style={{width:40, height:50, alignItems: 'center'}}>
                <Image source={require('../images/login/note2_1.png')} style={{width:12, height:20}}/>
                <Typography fontSize={24} fontWeightIdx={1}>02</Typography>  
              </View>
            </View>
            <Typography fontSize={22} fontWeightIdx={1}>
              마지막으로 재학중인{'\n'}
              학교와 학번, 파트를 알려주세요.
            </Typography>
          </View>
          
          <View>
            {/* 학교선택 */}
            
            <TouchableOpacity
              onPress={schoolToggleModal}
              style={{height:70}}
            >
              <View style={{flexDirection:'row', width: '90%', alignItems:'center'}}>
                <Typography color='#8C8C8C' fontWeightIdx={1}>학교 <Typography color='#E94A4A'>*</Typography></Typography>
                <View style={[styles.input, {width: '88%'}]}>
                  <Typography fontSize={14} color='#333'>
                    {userSchool === '' ? '재학 중인 학교를 선택해 주세요' : userSchool}
                  </Typography>
                </View>
                <AntDesign name="down" size={12} color="black"/> 
              </View>
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={true}
              visible={isSchoolModalVisible}
              onRequestClose={schoolToggleModal}
            >
              <View style={{ width: '100%', height:'80%', position: 'absolute', bottom:0, borderRadius: 20, backgroundColor: 'white', 
                            padding: 20}}>

                
                <Typography marginBottom={10} fontWeightIdx={1}>학교선택</Typography>
                <Divider height={3} marginVertical={5}/>

                
                <View style={{width:'100%', flexDirection: 'row', alignItems: 'flex-start', paddingLeft:10,
                      borderBottomWidth:1, borderBottomColor:"#EFEFEF", marginBottom:20}}>
                  <SelectMenu tabNum={1} title='음악대학'/>
                  <SelectMenu tabNum={2} title='예술고'/>
                  <SelectMenu tabNum={3} title='일반'/>
                </View>
                <ScrollView>
                { currentTab === 1 && <SchoolsBox item={univercitys}/> } 
                { currentTab === 2 && <SchoolsBox item={highschools}/> } 
                { currentTab === 3 && <SchoolsBox item={publicSchool}/> } 
                </ScrollView>             
              </View>
            </Modal>

            {/* 학번 선택 */}
            <TouchableOpacity
                onPress={schNumToggleModal}
                style={{height:70}}
              >
              <View style={{flexDirection:'row', width: '90%', alignItems:'center'}}>
                <Typography color='#8C8C8C' fontWeightIdx={1}>학번 <Typography color='#E94A4A'>*</Typography></Typography>
                <View style={[styles.input, {width: '88%'}]}>
                  <Typography fontSize={14} color='#333'>
                    {userSchNum === '' ? '학번을 선택해 주세요' : userSchNum}
                  </Typography>
                </View>
                <AntDesign name="down" size={12} color="black"/> 
              </View>
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={true}
              visible={isSchNumModalVisible}
              onRequestClose={schNumToggleModal}
            >
              <View style={{ width: '100%', position: 'absolute', bottom:0, borderRadius: 20, backgroundColor: 'white', 
                            padding: 20}}>
                  <Typography marginBottom={10} fontWeightIdx={1}>학번선택</Typography>
                  <View style={{flexDirection: 'row', justifyContent: 'center', flexWrap:'wrap', }}>
                  {
                    sch_num.map((item, index)=>{
                      return(
                        <TouchableOpacity 
                          key={index}   
                          onPress={()=>{
                            setUserSchNum(item);
                            schNumToggleModal();
                          }} 
                          style={{width: '32%', height: 50, borderWidth:1, borderColor: '#EAEAEA'}}
                          >
                            <View style={{width:'100%', height:'100%', alignItems:'center', justifyContent:'center',
                              backgroundColor: item === '청소년' ? '#EAEAEA' : '#fff'}}>
                              <Typography color='#000' fontSize={13}>{item}</Typography>
                            </View>
                        </TouchableOpacity> 
                      )
                    })
                  }
                  </View>
              </View>
            </Modal>

            {/* 파트 선택  */}
            <TouchableOpacity
                onPress={partToggleModal}
                style={{height:70}}
              >
              <View style={{flexDirection:'row', width: '90%', alignItems:'center', marginBottom:10}}>
                <Typography color='#8C8C8C' fontWeightIdx={1}>파트 <Typography color='#E94A4A'>*</Typography></Typography>
                <View style={[styles.input, {width: '88%'}]}>
                  <Typography fontSize={14} color='#333'>
                    {userPart === '' ? '파트를 선택해 주세요' : userPart}
                  </Typography>
                </View>
                <AntDesign name="down" size={12} color="black"/> 
              </View>
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={true}
              visible={isPartModalVisible}
              onRequestClose={partToggleModal}
            >
              <View style={{ width: '100%', position: 'absolute', bottom:0, borderRadius: 20, backgroundColor: 'white', 
                            padding: 20}}>
                  <Typography marginBottom={10} fontWeightIdx={1}>파트선택</Typography>
                  <View style={{flexDirection: 'row', justifyContent: 'center', flexWrap:'wrap', }}>
                  {
                    part.map((item, index)=>{
                      return(
                        <TouchableOpacity 
                          key={index}   
                          onPress={()=>{
                            setUserPart(item);
                            partToggleModal();
                          }} 
                          style={{width: '32%', height: 50, borderWidth:1, borderColor: '#EAEAEA'}}
                          >
                            <View style={{width:'100%', height:'100%', alignItems:'center', justifyContent:'center',
                                      backgroundColor: item === '비전공' ? '#EAEAEA' : '#fff'}}>
                              <Typography  color='#333' fontSize={13}>{item}</Typography>
                            </View>
                        </TouchableOpacity> 
                      )
                    })
                  }
                  </View>
              </View>
            </Modal>

          </View>
          
        </ScrollView>
        </KeyboardAvoidingView>

         {/* 하단 버튼 */}
         <View style={{padding:20, marginBottom:5}}>
            <TouchableOpacity 
              onPress={handleLogister}
              style={
                userSchool && userSchNum && userPart ? [styles.nextBtnBox, { backgroundColor: 'black'}] 
                : [styles.nextBtnBox, { backgroundColor: 'gray'}]
              }
              >
              <Text style={styles.nextBtnText}>가입완료</Text>
            </TouchableOpacity>

            <View style={styles.linksContainer}>
              <TouchableOpacity onPress={alertPageOut}>
                <Text style={styles.linkButton}>나가기</Text>
              </TouchableOpacity>
            </View>
          </View>

      </View>

      <View style={ isSchoolModalVisible ? styles.modalBackCover :  { display: 'none'}}></View>
      <View style={ isSchNumModalVisible ? styles.modalBackCover :  { display: 'none'}}></View>
      <View style={ isPartModalVisible ? styles.modalBackCover :  { display: 'none'}}></View>

    </View>
  );
};



const styles = StyleSheet.create({
  android: {
    flex: 1,
    backgroundColor: '#333',
  },
  ios : {
    flex: 1,
    backgroundColor: '#333',
    paddingTop: getStatusBarHeight(),
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24
 },
 backButton: {
  position:'absolute',
  top: 20,
  left: 20,
  width: 30,
  height: 30,
},
  inputContainer: {
    width: '80%',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#DFDFDF',
    justifyContent: 'center',
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
    color: '#333'
  },  
  message: {
    marginBottom: 10,
  },
  success: {
    color: '#47C83E',
  },
  error: {
    color: '#F15F5F',
  },
  errorText: {
    color: '#F15F5F',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linksContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkButton: {
    color: '#333',
    textDecorationLine: 'underline',
  },
  nextBtnBox: {
    borderRadius: 16,
    width: '100%',
    marginBottom: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center'
  },
  nextBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalBackCover : {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#333',
    opacity: 0.8
  },
});

export default Logister2;
