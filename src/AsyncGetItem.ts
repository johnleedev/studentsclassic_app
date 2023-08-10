import AsyncStorage from "@react-native-async-storage/async-storage";

// AsyncStorage 데이터 불러오기

const AsyncGetItem = async () => {
  try {
    const userName : string | null = await AsyncStorage.getItem('name');
    const userSchool : string | null = await AsyncStorage.getItem('school');
    const userSchNum : string | null = await AsyncStorage.getItem('schNum');
    const userPart : string | null = await AsyncStorage.getItem('part');
    
    return {
      userName, userSchool, userSchNum, userPart
    }
    
  } catch (error) {
    console.log(error);
  }
};

export default AsyncGetItem;