/* eslint-disable */

import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, AsyncStorage} from 'react-native';
function SplashScreen({navigation}) {
  // Set an initializing state whilst Firebase connects

  useEffect(() => {
    const getUser = async () => {
      try {
        let user = await AsyncStorage.getItem('user');
        console.log('user', user);
        if (user !== null) {
          navigation.navigate('Home');
        } else {
          navigation.navigate('Login');
        }
      } catch (error) {
        // Error retrieving data
      }
    };
    getUser();
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={{
          height: 180,
          width: '60%',
          resizeMode: 'contain',
          marginBottom: 63,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;
