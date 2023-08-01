import React, { useState, useEffect, useCallback } from 'react';
import { View, TextInput, StyleSheet, Alert, TouchableOpacity, Text, ScrollView } from 'react-native';
import axios from 'axios'
import MainURL from '../MainURL';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from '@react-navigation/native';

function Post(props: any) {

  const route : any = useRoute();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [name, setName] = useState<string>('');
  const [school, setSchool] = useState<string>('');

  useEffect(() => {
    getData();
  }, []);

  const closeDetail = () => {
    props.navigation.goBack();
  };
  
  const getData = useCallback(
    async () => {
      try {
        const name : any = await AsyncStorage.getItem('이름');
        const school : any = await AsyncStorage.getItem('학교');
        setName(name);
        setSchool(school);
      } catch (error) {
        console.log('데이터 가져오기 실패:', error);
      }  
  }, [])

  const createPost = async () => {
    axios.post(`${MainURL}/board/posts`, {
      title: title, content: content, name : name, school : school
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

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>게시글 쓰기</Text>
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
