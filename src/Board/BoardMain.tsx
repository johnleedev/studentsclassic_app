import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import MainURL from '../../MainURL';
import { Feather, Ionicons, FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

function BoardMain(props: any) {

  const [posts, setPosts] = useState<any>([]);
  const [refresh, setRefresh] = useState<any>(false);
  
  useEffect(() => {
    fetchPosts();
  }, [refresh]);

  const fetchPosts = () => {
    axios.get(`${MainURL}/board/posts`).then((res) => {
      let copy: any = [...res.data];
      copy.reverse();
      setPosts(copy);
    });
  };

  const openPostDetails = async (post: any) => {
    axios.post(`${MainURL}/board/posts/${post.id}`).then(()=>{
        setRefresh(!refresh);
        props.navigation.navigate('Detail', { data: post });
      }).catch((error)=>{
        console.error(error);
      })
  };

  const goToPostScreen = () => {
    props.navigation.navigate('Post')
  };

  return (
    <View style={styles.container}>
    <ScrollView style={styles.container}>
      <View>
      <Text style={styles.title}>커뮤니티</Text>
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
            <View style={styles.postFooter}>
              <Text style={styles.commentCount}>
                <Ionicons name="chatbubble-ellipses-outline" size={15} color="black" /> {post.commentCount ? post.commentCount : '0' }
              </Text>
              <Text style={styles.viewCount}>
                <Ionicons name="md-eye-outline" size={15} color="black" /> {post.views}
              </Text>
            </View>
          </TouchableOpacity>
        ))
      ) : ( <Text></Text> )}
      </View>
      </ScrollView>
      <TouchableOpacity style={styles.newPostButton} onPress={goToPostScreen}>
        <Text style={styles.newPostButtonText}>
          <FontAwesome name="pencil-square-o" size={24} color="white" />
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#faf7f2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
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
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  newPostButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  }

});

export default BoardMain;
