/* eslint-disable */

import React, {Component} from 'react';
import {Icon} from 'react-native-elements';
import {
  TouchableOpacity,
  ActivityIndicator,
  View,
  StyleSheet,
} from 'react-native';
import {themeColor, pinkColor} from '../Constant/index';
import LinearGradient from 'react-native-linear-gradient';
import Text from './Text';
import Button from './Button';
export default ProjectListHeader = () => {
  return (
    <View
      style={{
        minHeight: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#D1D1D1',
        flexDirection: 'row',
      }}>
      <View style={styles.box}>
        <Text text={'Business'} bold={true} font={15} color={'#707070'} />
        <Icon
          type={'font-awesome'}
          name={'caret-down'}
          color={'#707070'}
          size={15}
          containerStyle={{marginLeft: 6, marginBottom: 2}}
        />
      </View>
      <View style={[styles.box, {flex: 1.3}]}>
        <Text text={'Project Number'} bold={true} font={15} color={'#707070'} />
        <Icon
          type={'font-awesome'}
          name={'caret-down'}
          color={'#707070'}
          size={15}
          containerStyle={{marginLeft: 6, marginBottom: 2}}
        />
      </View>
      <View style={[styles.box, {flex: 1.6}]}>
        <Text
          text={'Status/Modified'}
          bold={true}
          font={15}
          color={'#707070'}
        />
        <Icon
          type={'font-awesome'}
          name={'caret-down'}
          color={'#707070'}
          size={16}
          containerStyle={{marginLeft: 6, marginBottom: 2}}
        />
      </View>
      <View style={[styles.box]}></View>
    </View>
  );
};
const styles = StyleSheet.create({
  box: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});
