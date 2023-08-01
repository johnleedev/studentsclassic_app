import React from "react";
import {Text} from "react-native";

const AppText = (props : any) => {
  return (
    <Text
      {...props}
      style={{
        ...props.style,
        fontFamily: 'Montserrat-Bold'
      }}>
      {props.children}
    </Text>
  )
}

export default AppText;