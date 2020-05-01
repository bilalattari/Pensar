/* eslint-disable */

import React, { Component } from 'react';
import { StatusBar, View, Image, TouchableOpacity, Platform } from 'react-native';
import { themeColor, pinkColor } from '../Constant/index';
import { Icon } from 'react-native-elements';
import CustomText from './Text'
export default Header = props => (
  <View style={{
    flexDirection: "row", justifyContent: "space-between",
    marginHorizontal: 12, alignItems: "center", height: 50
  }}>
    <CustomText text={props.heading} bold={true} font={20} style={{ marginVertical: 0 }} />
    <TouchableOpacity style={{ alignItems: "center", height: 50, justifyContent: "center" }}>
      <CustomText text={props.subHeading} color={'#ccc'} font={15} style={{ marginVertical: 0 }} />
    </TouchableOpacity>
  </View>
);
