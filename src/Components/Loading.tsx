import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';



export const Loading:React.FC<{
  backgroundColor?: string,
}> = (props)=>{
  
  return (
    <View style={[styles.container, styles.horizontal, 
      {backgroundColor: props.backgroundColor ?? '#fff'}]}>
      <ActivityIndicator size="small" color="#333" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'center',
    padding: 10,
  },
});
 