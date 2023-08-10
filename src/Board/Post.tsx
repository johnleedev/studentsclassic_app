import React, { useState, useEffect, useCallback } from 'react';
import { View, TextInput, StyleSheet, Alert, TouchableOpacity, Text, ScrollView } from 'react-native';
import axios from 'axios'
import MainURL from '../../MainURL';
import AsyncGetItem from '../AsyncGetItem'
import { Feather, Ionicons, FontAwesome } from '@expo/vector-icons';

function Post(props: any) {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

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

  const createPost = async () => {
    axios.post(`${MainURL}/board/posts`, {
      title: title, content: content, userName: asyncGetData.userName, userSchool: asyncGetData.userSchool
    })
      .then((res) => {
        if (res.data) {
          Alert.alert('입력되었습니다.');
          closeDetail()
        } else {
          Alert.alert(res.data)
        }
      })
      .catch(() => {
        console.log('실패함')
      })
  };

  const closeDetail = () => {
    props.navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>게시글 쓰기</Text>
      <View style={styles.addTitleBox}>
        <View style={styles.addTitleTextbox}>
          <Text style={styles.addTitleText2}>
            <FontAwesome name="pencil-square-o" size={20} color="black" />
          </Text>
          <Text style={styles.addTitleText2}>{asyncGetData.userSchool}</Text>
          <Text style={styles.addTitleText2}>{asyncGetData.userSchNum}</Text>
          <Text style={styles.addTitleText2}>{asyncGetData.userPart}</Text>
          <Text style={styles.addTitleText2}>{asyncGetData.userName}</Text>
        </View>
        </View>
      <TextInput
        style={[styles.input, styles.titleInput]}
        placeholder="제목"
        value={title}
        onChangeText={setTitle}
        multiline
      />
      <TextInput
        style={[styles.input, styles.contentInput]}
        placeholder="내용"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={createPost}>
          <Text style={styles.buttonText}>작성</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={closeDetail}>
          <Text style={styles.buttonText}>취소</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  addTitleBox: {
    marginBottom: 8,
  },
  addTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  addTitleText2: {
    fontSize: 16,
    marginHorizontal: 3,
  },
  addTitleTextbox: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    fontSize: 16,
    height: 'auto',
  },
  titleInput: {
    minHeight: 40,
  },
  contentInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
});

export default Post;
