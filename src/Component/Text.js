/* eslint-disable */

import React, { Component } from 'react';
import {  Text } from 'react-native';
export default CustomText = props => (
    <Text style={[{
        fontSize: props.font ? props.font : 18 ,textAlign : props.align ? props.align : "left",
        fontWeight: props.bold ? "bold" : 'normal', marginVertical: props.marginVertical ? props.marginVertical :  2,
        color: props.color ? props.color : '#fff', marginLeft: props.marginLeft ? props.marginLeft : 0,
    }, props.style ]} numberOfLines = {props.numberOfLines  ? props.numberOfLines  : null }>{props.text}</Text>
);
