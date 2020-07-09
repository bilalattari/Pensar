import React, {useState} from 'react';
import {
  Alert,
  Modal,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
} from 'react-native';
import CustomText from './Text';

export default function DeleteModal(props) {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="none"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <CustomText
              color="#000"
              font={32}
              text={'Are you sure to delete?'}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '70%',
                marginTop: 20,
              }}>
              <TouchableOpacity
                onPress={() => props.cancel()}
                activeOpacity={0.7}
                style={[styles.btn, {width: '40%', backgroundColor: '#ccc'}]}>
                <CustomText color="#fff" font={18} text={'Cancel'} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.confirm()}
                activeOpacity={0.7}
                style={[styles.btn, {width: '40%'}]}>
                <CustomText color="#fff" font={18} text={'Confirm'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '40%',
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: '25%',
  },
  btn: {
    backgroundColor: '#6698fd',
    width: '90%',
    height: 55,
    marginTop: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
