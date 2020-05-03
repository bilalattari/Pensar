import React, { Component } from 'react'
import { Input, Icon } from 'react-native-elements'
import { themeColor } from '../Constant'

export default CustomInput = (props) =>
  <Input
    containerStyle={[{
      width: '100%', marginLeft: -8,
      marginVertical: 6,
    }, props.containerStyle]}
    inputContainerStyle={[{
      borderWidth: 0, borderBottomWidth: 0,
      width: "90%",
    }
      , props.inputContainerStyle]}
    inputStyle={{ fontSize: 16, borderColor: '#D1D1D1', borderWidth: 0.5, paddingLeft: 12 }}
    keyboardType={props.keyboardType ? props.keyboardType : 'default'}
    placeholder={props.placeholder}
    placeholderTextColor={'#bbb'}
    labelStyle={{ color: themeColor, paddingBottom: 8 }}
    value={props.value}

    multiline={props.multiline}
    secureTextEntry={props.secureTextEntry}
    onChangeText={(text) => props.textChange ? props.textChange(text) : null}
    errorStyle={{ color: 'red' }}

    leftIcon={
      props.icon ?
        <Icon
          name={props.icon}
          size={16}
          type={'font-awesome'}
          color='#909291'
        /> : null
    }
    leftIconContainerStyle={{ padding: 0 }}
    {...props}
  />

