/* eslint-disable */

import React, {Component} from 'react';
import {Button, Icon} from 'react-native-elements';
import {TouchableOpacity, ActivityIndicator} from 'react-native';
import {themeColor, pinkColor} from '../Constant/index';
import LinearGradient from 'react-native-linear-gradient';
import Text from './Text';
export default CustomButton = (props) =>
  props.gradient ? (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={['#2D5796', '#4B88BC', '#6CB8E4']}
      style={[
        {
          height: props.height ? props.height : 50,
          width: props.width ? props.width : '85%',
          borderRadius: 12,
          alignSelf: 'center',
          backgroundColor: themeColor,
          justifyContent: 'center',
          alignItems: 'center',
        },
        props.buttonStyle,
      ]}>
      <TouchableOpacity
        disabled={props.loader}
        // style={[{
        //   height: props.height ? props.height : 50, width: props.width ? props.width : '85%',
        //   borderRadius: 12, alignSelf: 'center', backgroundColor: themeColor,
        //   justifyContent: "center", alignItems: "center"
        // }, props.buttonStyle]}
        {...props}>
        {props.loader ? (
          <ActivityIndicator
            color={props.loaderColor ? props.loaderColor : '#fff'}
            size={'large'}
          />
        ) : (
          <Text text={props.title} bold={true} style={{letterSpacing: 1}} />
        )}
      </TouchableOpacity>
    </LinearGradient>
  ) : (
    <TouchableOpacity
      disabled={props.loader}
      style={[
        {
          height: props.height ? props.height : 50,
          width: props.width ? props.width : '85%',
          borderRadius: 12,
          alignSelf: 'center',
          backgroundColor: props.backgroundColor
            ? props.backgroundColor
            : themeColor,
          justifyContent: 'center',
          alignItems: 'center',
        },
        props.buttonStyle,
      ]}
      {...props}>
      {props.loader ? (
        <ActivityIndicator
          color={props.loaderColor ? props.loaderColor : '#fff'}
          size={'large'}
        />
      ) : (
        <Text text={props.title} bold={true} style={props.textStyle} />
      )}
    </TouchableOpacity>
  );
