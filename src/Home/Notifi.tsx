
import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Platform, Linking, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import messaging from '@react-native-firebase/messaging';
import {checkNotifications, requestNotifications} from 'react-native-permissions';

export default function Notifi(props : any) {

  // 알림설정 체크 후 firebase notification 토큰받기
  checkNotifications().then(({status, settings}) => {
    if (status === 'denied' || status === 'blocked'){
      Alert.alert('알림', '알림 권한을 허용해주세요', [
        {text: 'Cancel', onPress: () => props.navigation.navigate("HomeMain") },
        {text: 'OK', onPress: () => Linking.openSettings()}
      ]);
    } else if (status === 'granted') {
      const token = messaging().getToken();
      console.log(Platform.OS, token);
    } else {
      console.log('firebase권한이 없습니다');
      return 
    }
  })
    
  const notifications = [
    {
      id: '1',
      title: '새로운 메시지',
      body: '안녕하세요! 새로운 메시지가 도착했습니다.',
      timestamp: '2023-07-14 10:30:00',
    },
    {
      id: '2',
      title: '이벤트 알림',
      body: '이번 주말에 이벤트가 있습니다. 참여해주세요!',
      timestamp: '2023-07-13 15:45:00',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>푸시 알림 리스트</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <Text style={styles.notificationText}>{item.title}</Text>
            <Text style={styles.notificationText}>{item.body}</Text>
            <Text style={styles.notificationText}>{item.timestamp}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  notificationItem: {
    marginBottom: 10,
  },
  notificationText: {
    fontSize: 16,
  },
});
