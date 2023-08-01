import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import MainURL from '../MainURL';
import AsyncStorage from "@react-native-async-storage/async-storage";

function AddCommentModal(props : any) {
  const [commentText, setCommentText] = useState('');
  const [name, setName] = useState<string>('');
  const [school, setSchool] = useState<string>('');

  useEffect(() => {
    getData();
  }, []);

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

  const addComment = () => {
    const postId = props.selectedPost.id;
    const time = new Date().toISOString();
    if (props.name || props.school) {
      axios
        .post(`${MainURL}/board/comments`, { postId, commentText, school: props.school, name: props.name, time })
        .then((res) => {
          Alert.alert('입력되었습니다.');
          setCommentText('');
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      Alert.alert('로그인이 필요합니다.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.addCommentContainer]}>
        <View style={styles.addTitleBox}>
          <Text style={styles.addTitleText}>댓글 달기</Text>
          <View style={styles.addTitleTextbox}>
            <Text style={styles.addTitleText2}>{school}</Text>
            <Text style={styles.addTitleText2}>{name}</Text>
          </View>
        </View>
        <TextInput
          style={[styles.addCommentInput]}
          placeholder="댓글을 입력하세요"
          placeholderTextColor="gray"
          value={commentText}
          onChangeText={setCommentText}
          multiline
        />
        <TouchableOpacity
          style={styles.addCommentButton}
          onPress={() => {
            addComment();
            props.setAddCommentVisible(false);
          }}
        >
          <Text style={styles.addCommentButtonText}>작성하기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => {
            props.setAddCommentVisible(false);
          }}
        >
          <Text style={styles.closeButtonText}>닫기</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    paddingTop: 50
  },
  addCommentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 12,
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
  addCommentInput: {
    minHeight: 100,
    height: 'auto',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
    fontSize: 16,
    color: 'black',
    marginBottom: 10,
  },
  addCommentButton: {
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  addCommentButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  closeButton: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddCommentModal;
