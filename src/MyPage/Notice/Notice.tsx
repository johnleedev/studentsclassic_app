import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import axios from 'axios';
import MainURL from '../../../MainURL';

const Stack = createNativeStackNavigator();

const Item = ({ title, content, date, navigation } :any) => (
  <TouchableOpacity
    style={styles.item}
    onPress={() => navigation.navigate('NoticeDetail', { title, content })}
  >
    <View style={styles.itemIconContainer}>
      <Feather name="info" size={24} color="gray" />
    </View>
    <View style={styles.itemContent}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>{date}</Text>
    </View>
  </TouchableOpacity>
);

const NoticeDetailScreen = ({ route, navigation } : any) => {
  const { title, content } = route.params;
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.noticeContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="x" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content}>{content}</Text>
      </View>
    </SafeAreaView>
  );
};

const Notice = () => {

  const [data, setDate] = useState<any>([]);

  const NoticeListScreen = ({ navigation }:any) => {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Item
              title={item.title}
              content={item.content}
              date={item.date}
              navigation={navigation}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    );
  };

  const getNotice = () => {
    axios
    .get(`${MainURL}/notice/noticelist`)
    .then((res) => {
      let copy: any = [...res.data];
      copy.reverse();
      setDate(copy);
    })
    .catch((error) => {
      console.error(error);
    });
  };

  useEffect(() => {
    getNotice();
  }, []);

  return (
    
      <Stack.Navigator initialRouteName="NoticeList">
        <Stack.Screen
          name="NoticeList"
          component={NoticeListScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NoticeDetail"
          component={NoticeDetailScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 16,
    marginVertical: 1,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  itemIconContainer: {
    marginRight: 16,
  },
  itemContent: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 4,
  },
  content: {
    fontSize: 16,
    color: 'gray',
    marginTop: 8,
  },
  noticeContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  
});

export default Notice;
