import React from 'react';
import {StyleSheet, Text, View,ImageBackground} from "react-native";

export default class Loading extends React.Component{
    render(){
        return (
            <ImageBackground
                source={require("./assets/images/mainsplash.png")}
                style={{width:"100%",height:"100%"}}>
            </ImageBackground>
        );
    }
}