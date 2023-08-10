import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';
import axios from 'axios';
import MainURL from '../../MainURL';
import NoticeSlide from './NoticeSlide';

function CompetitionMain (props : any) {
  const [posts, setPosts] = useState<any>([]);
  const [refresh, setRefresh] = useState<any>(false);
  
  useEffect(() => {
    fetchPosts();
  }, [refresh]);

  const fetchPosts = () => {
    axios.get(`${MainURL}/competition/posts`).then((res) => {
      let copy: any = [...res.data];
      copy.reverse();
      setPosts(copy);
    });
  };

  const openPostDetails = async (post: any) => {
    axios.post(`${MainURL}/competition/posts/${post.id}`);
    try {
      // await props.navigation.navigate('Detail', { data:post });
    } catch (error) {
      console.error(error);
    }
  };

  const goToPostScreen = () => {
    props.navigation.navigate('Post');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>우리끼리콩쿨</Text>
      <View style={styles.notice}>
        <NoticeSlide></NoticeSlide>
      </View>
      {posts ? (
        posts.map((post: any) => (
          <TouchableOpacity
            style={styles.postContainer}
            key={post.id}
            onPress={() => openPostDetails(post)}
          >
            <View style={styles.titleBox}>
              <Text style={styles.postTitle}>{post.title}</Text>
              <View style={styles.postAuthor}>
                <Text style={styles.schoolText}>{post.school}</Text>
                <Text style={styles.authorText}>{post.name}</Text>
              </View>
            </View>
            <Text style={styles.postContent} numberOfLines={2}>{post.content}</Text>
            <View style={styles.postFooter}>
              <Text style={styles.commentCount}>댓글: {post.commentCount ? post.commentCount : '0' }</Text>
              <Text style={styles.viewCount}>조회: {post.views}</Text>
            </View>
          </TouchableOpacity>
        ))
      ) : ( <Text></Text> )}
      <TouchableOpacity style={styles.newPostButton} onPress={goToPostScreen}>
        <Text style={styles.newPostButtonText}>새 게시물 작성</Text>
      </TouchableOpacity>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#faf7f2',
  },
  notice: {
    height: 450,
    marginVertical: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'center',
  },
  postContainer: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#dddddd',
    padding: 16,
    justifyContent: 'center',
  },
  titleBox: {

  },
  postTitle: {
    marginBottom: 8,
    fontSize: 20,
    fontWeight: 'bold',
  },
  postAuthor: {
    fontSize: 16,
    marginBottom: 4,
    color: '#555555',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  schoolText: {
    marginRight: 10,
  },
  authorText: {

  },
  postContent: {
    fontSize: 18,
    marginBottom: 16,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  commentCount: {
    fontSize: 16,
    color: '#555555',
  },
  viewCount: {
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
  }

});

export default CompetitionMain;
