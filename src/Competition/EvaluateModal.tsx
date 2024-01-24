import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Linking } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Typography } from '../Components/Typography';
import { Divider } from '../Components/Divider';
import axios from 'axios';
import MainURL from "../../MainURL";
import AsyncGetItem from '../AsyncGetItem'
import { ButtonBox } from '../Components/ButtonBox';

export default function EvaluateModal(props: any) {

  const [evaluateText, setEvaluateText] = useState('');

  const [evaluateSinging, setEvaluateSinging] = useState([false, false, false, false, false]);
  const [scoreSinging, setScoreSinging] = useState(0);
  const starSinging = (index:any) => {
    let star = [...evaluateSinging];
    for (let i = 0; i < 5; i++) {
      star[i] = i <= index ? true : false;
    }
    setEvaluateSinging(star);
  };

  const [evaluateExpress, setEvaluateExpress] = useState([false, false, false, false, false]);
  const [scoreExpress, setScoreExpress] = useState(0);
  const starExpress = (index:any) => {
    let star = [...evaluateExpress];
    for (let i = 0; i < 5; i++) {
      star[i] = i <= index ? true : false;
    }
    setEvaluateExpress(star);
  };

  const [evaluateLyrics, setEvaluateLyrics] = useState([false, false, false, false, false]);
  const [scoreLyrics, setScoreLyrics] = useState(0);
  const starLyrics = (index:any) => {
    let star = [...evaluateLyrics];
    for (let i = 0; i < 5; i++) {
      star[i] = i <= index ? true : false;
    }
    setEvaluateLyrics(star);
  };

  // AsyncGetData
  const [asyncGetData, setAsyncGetData] = useState<any>({});
  const asyncFetchData = async () => {
    try {
      const data = await AsyncGetItem();
      setAsyncGetData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    asyncFetchData();
  }, []);

  const addEvaluate = () => {
    if (scoreSinging !== 0 && scoreExpress !== 0 && scoreLyrics !== 0) {
      axios
        .post(`${MainURL}/competition/evaluate`, {
          post_id: props.evaluateData,
          userAccount: asyncGetData.userAccount,
          userSchool : asyncGetData.userSchool,
          userPart :  asyncGetData.userPart,
          scoreSinging : scoreSinging,
          scoreExpress : scoreExpress,
          scoreLyrics : scoreLyrics,
          evaluateText : evaluateText,
        })
        .then((res) => {
          if(res.data === true) {
            Alert.alert('심사평이 입력되었습니다.');
            props.setRefresh(!props.refresh);
            props.evaluateToggleModal();
          } else if (res.data === '이미있음') {
            Alert.alert('이미 심사평을 입력하셨습니다.');
            props.setRefresh(!props.refresh);
            props.evaluateToggleModal();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      Alert.alert('심사평을 모두 작성해주세요');
    }
  };

  const [textInputAddView, setTextInputAddView] = useState<boolean>(false);

  return (
    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
      <View style={{ width:'100%', backgroundColor:'#fff', padding:20,
                      borderRadius:10, justifyContent:'center'}}>
        <Typography fontSize={20}>심사하기</Typography>
        <View style={{marginVertical:10}}>
          <Typography fontSize={11} color='#8C8C8C'>심사평은 한번만 작성할 수 있으며, 수정이나 삭제가 불가능하오니,</Typography>
          <Typography fontSize={11} color='#8C8C8C'>이점 유의하여 작성해주시기 바랍니다. (심사평은 익명으로 작성됩니다)</Typography>
        </View>

        <View style={{alignItems:'center', marginVertical:10}}>
          <View style={{flexDirection:'row'}}>
            <Typography><Typography color='#F15F5F'>*</Typography> 가창력  </Typography>
            <Typography color={scoreSinging === 0 ? '#BDBDBD' : '#333'}>{scoreSinging}점</Typography>
          </View>
          <View style={{flexDirection:'row'}}>
          {evaluateSinging.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.evaluateButton}
              onPress={()=>{
                starSinging(index);
                setScoreSinging(index+1);
              }}
            >
              { item ? <AntDesign name='star' size={30} color='#FFDC23'/> : <AntDesign name='staro' size={30} color='#BDBDBD'/> }
            </TouchableOpacity>
          ))}
          </View>
        </View>

        <Divider height={2}/>

        <View style={{alignItems:'center', marginVertical:10}}>
          <View style={{flexDirection:'row'}}>
            <Typography><Typography color='#F15F5F'>*</Typography> 음악성  </Typography>
            <Typography color={scoreExpress === 0 ? '#BDBDBD' : '#333'}>{scoreExpress}점</Typography>
          </View>
          <View style={{flexDirection:'row'}}>
          {evaluateExpress.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.evaluateButton}
              onPress={()=>{
                starExpress(index);
                setScoreExpress(index+1);
              }}
            >
              { item ? <AntDesign name='star' size={30} color='#FFDC23'/> : <AntDesign name='staro' size={30} color='#BDBDBD'/> }
            </TouchableOpacity>
          ))}
          </View>
        </View>

        <Divider height={2}/>

        <View style={{alignItems:'center', marginVertical:10}}>
          <View style={{flexDirection:'row'}}>
            <Typography><Typography color='#F15F5F'>*</Typography> 가사전달  </Typography>
            <Typography color={scoreLyrics === 0 ? '#BDBDBD' : '#333'}>{scoreLyrics}점</Typography>
          </View>
          <View style={{flexDirection:'row'}}>
          {evaluateLyrics.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.evaluateButton}
              onPress={()=>{
                starLyrics(index);
                setScoreLyrics(index+1);
              }}
            >
              { item ? <AntDesign name='star' size={30} color='#FFDC23'/> : <AntDesign name='staro' size={30} color='#BDBDBD'/> }
            </TouchableOpacity>
          ))}
          </View>
        </View>

        <Divider height={2}/>
        
        <View style={{alignItems:'center', marginVertical:10}}>
          <Typography marginBottom={10}>한줄평 <Typography fontSize={10} color='#8C8C8C'>(선택)</Typography></Typography>
          <TextInput
            style={[styles.addCommentInput]}
            placeholder="한줄 심사평을 입력하세요"
            placeholderTextColor="gray"
            value={evaluateText}
            onChangeText={setEvaluateText}
            onFocus={()=>{
              setTextInputAddView(true)
            }}
            onEndEditing={()=>{
              setTextInputAddView(false)
            }}
          />
        </View>

        <ButtonBox leftFunction={props.evaluateToggleModal} leftText='취소' rightFunction={addEvaluate} rightText='작성 완료'
                  marginTop={10}
        />

        {
          textInputAddView 
          ? <View style={{height:400}}></View>
          : null
        }
  
      </View>
    </View>
  );
}




const styles = StyleSheet.create({
 
  evaluateButton : {
    width: 40,
    height: 40,
    marginHorizontal:1,
    alignItems:'center',
    justifyContent:'center'
  },
  addCommentInput: {
    width:300,
    height: 'auto',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: 'black',
  },
  bottomButton:{
    width: 200, 
    height: 35, 
    borderRadius:10,
    alignItems:'center', 
    justifyContent:'center', 
    backgroundColor:'#333'
  }

});

