import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet, Alert, ScrollView, Modal  } from 'react-native';
import { useRoute } from '@react-navigation/native';

import AddCommentModal from './AddCommentModal'
import axios from 'axios';
import MainURL from '../MainURL';

function Detail (props: any) {
  
  const route : any = useRoute();
  const [addCommentVisible, setAddCommentVisible] = useState<any>(false);
  const [comments, setComments] = useState<any[]>([]);
  
  useEffect(() => {
    fetchComments(route.params.data.id)
  }, [addCommentVisible]);

  const fetchComments = async (postId: number) => {
    axios.get(`${MainURL}/board/comments/${postId}`).then((res) => {
      setComments(res.data);
    });
  };

  const closeDetail = () => {
    props.navigation.pop();
  };

  return (
    <ScrollView style={styles.modalContent}>
      <View style={styles.commentBox}>
        <View style={styles.titleContainer}>
          <Text style={styles.postTitle}>{route.params.data?.title}</Text>
          <Text style={styles.postSchool}>{route.params.data?.school}</Text>
          <Text style={styles.postAuthor}>{route.params.data?.name}</Text>
        </View>
        <View style={styles.titleContainer2}>
          <Text style={styles.postViews}>조회 : {route.params.data?.views}</Text>
          <Text style={styles.postCommentCount}>댓글 : {route.params.data?.commentCount}</Text>
        </View>
        <Text style={styles.postContent}>{route.params.data?.content}</Text>
        
      </View>

      {/* Display comments */}
      <View style={styles.commentContainer}>
        <Text style={styles.commentTitle}>댓글</Text>
        {comments ? (
            comments.map((comment: any, index: number) => (
            <View style={styles.commentItem} key={comment.id}>
              <View style={styles.commentHeader}>
                <Text style={styles.commentAuthor}>{comment.school}</Text>
                <Text style={styles.commentAuthor}>{comment.name}</Text>
                <Text style={styles.commentTime}>{comment.created_at}</Text>
                <View style={styles.commentSeparator} />
              </View>
              <View style={styles.commentTextBox}>
                <Text style={styles.commentText}>{comment.content}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text></Text>
        )}
      </View>

      {/* Add comment Modal*/}
      <Modal 
        animationType="slide" 
        transparent={false} 
        visible={addCommentVisible}
      >
        <AddCommentModal 
          setAddCommentVisible={setAddCommentVisible}
          selectedPost={route.params.data}
          />
      </Modal>

      <TouchableOpacity style={styles.newPostButton} 
        onPress={()=> setAddCommentVisible(true)}>
        <Text style={styles.newPostButtonText}>댓글달기</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.closeButton} onPress={closeDetail}>
        <Text style={styles.closeButtonText}>닫기</Text>
      </TouchableOpacity>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    padding: 16,
    backgroundColor: '#faf7f2',
  },
  commentBox: {
    marginTop: 30,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#dddddd',
    padding: 16,
    backgroundColor: '#ffffff',
  },
  titleContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  postTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  postSchool: {
    fontSize: 16,
    color: '#555555',
    marginRight: 8,
  },
  postAuthor: {
    fontSize: 16,
    color: '#555555',
  },
  titleContainer2: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  postViews: {
    fontSize: 16,
    color: '#555555',
    marginRight: 15
  },
  postCommentCount: {
    fontSize: 16,
    color: '#555555',
  },
  postContent: {
    fontSize: 16,
    marginTop: 8,
  },
  commentContainer: {
    marginTop: 16,
  },
  commentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333',
  },
  commentItem: {
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    marginBottom: 12,
    padding: 12,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  commentAuthor: {
    fontSize: 16,
    marginRight: 8,
    color: '#333333',
  },
  commentTime: {

  },
  commentSeparator: {
    flex: 1,
    height: 1,
    backgroundColor: '#dddddd',
  },
  commentTextBox : {
    padding: 10,
    backgroundColor: '#faf7f2',
  },
  commentText: {
    fontSize: 16,
    color: '#555555',
  },
  newPostButton: {
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  newPostButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  closeButton: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Detail;
