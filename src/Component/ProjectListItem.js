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
export default ProjectList = ({project}) => {
  return (
    <View
      style={{
        minHeight: 60,
        borderBottomWidth: 1,
        borderBottomColor: '#D1D1D1',
        flexDirection: 'row',
      }}>
      <View style={styles.box}>
        <Text
          text={project.clientName}
          color={themeColor}
          bold={true}
          font={18}
        />
        <Text
          text={'Address line 1 , line 2 , line 2'}
          color={themeColor}
          font={14}
        />
      </View>
      <View style={styles.box}>
        <Text
          text={project.projectNumber}
          color={themeColor}
          font={14}
          bold={true}
        />
      </View>
      <View style={[styles.box, {alignItems: 'center', flex: 1.4}]}>
        <Button
          buttonStyle={{
            backgroundColor: '#fff',
            borderColor: project.status === 'Sent' ? 'green' : 'red',
            borderWidth: 1,
            borderRadius: 25,
          }}
          height={35}
          width={100}
          textStyle={{
            color: project.status === 'Sent' ? 'green' : 'red',
            fontSize: 14,
          }}
          title={project.status}
        />
        <Text text={'3 hours ago'} color={'#707070'} font={14} bold={true} />
      </View>
      <View
        style={[
          styles.box,
          {justifyContent: 'center', alignItems: 'center', flex: 1.6},
        ]}>
        <TouchableOpacity>
          <Icon type={'antdesign'} name={'ellipsis1'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  box: {flex: 1, padding: 8, paddingTop: 12},
});
