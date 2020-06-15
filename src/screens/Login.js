import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import Input from '../Component/Input';
import Button from '../Component/Button';
import Text from '../Component/Text';
import {CheckBox} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
function Login({navigation}) {
  const [email, onChangeEmail] = React.useState('');
  const [checked, onChangeChecked] = React.useState(false);
  const [password, onChangePassword] = React.useState('');
  const [loader, setLoader] = useState(false);

  const loading = (boolean) => {
    setLoader(boolean);
  };
  function checkUncheck() {
    onChangeChecked(!checked);
  }

  const login = () => {
    if (email === 'admin@gmail.com') {
      alert('Incorrect email/password');
    } else {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(async (res) => {
          await AsyncStorage.setItem('user', res.user.uid);
          navigation.navigate('Home');
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };
  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <View
        style={{
          width: '45%',
          backgroundColor: '#fff',
        }}>
        <View
          style={{
            flex: 1,
            paddingLeft: '8%',
            paddingRight: '4%',
          }}>
          {/* <ScrollView> */}
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Image
              source={require('../assets/logo.png')}
              style={{
                height: 180,
                width: '70%',
                resizeMode: 'contain',
              }}
            />
          </View>
          <View style={{flex: 1}}>
            <Text text={'Welcome back.'} color={'#000'} bold={true} font={22} />
            <Input
              label={'Email'}
              placeholder={''}
              onChangeText={(text) => onChangeEmail(text)}
              value={email}
            />
            <Input
              label={'Password'}
              placeholder={''}
              onChangeText={(text) => onChangePassword(text)}
              value={password}
              secureTextEntry={true}
            />
            <Button
              title={'Sign in'}
              height={40}
              gradient={true}
              width={140}
              onPress={() => login()}
              buttonStyle={{
                alignSelf: 'flex-start',
                marginTop: 12,
                borderRadius: 25,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 12,
                marginBottom: 41,
                alignItems: 'center',
              }}>
              <CheckBox
                title="Click Here"
                checked={checked}
                title={'Remember me'}
                textStyle={{color: '#6B6B6B'}}
                onPress={checkUncheck}
                containerStyle={{backgroundColor: '#fff', borderWidth: 0}}
              />
              <TouchableOpacity>
                <Text
                  color={'#D1D1D1'}
                  text={'Forgot password?'}
                  font={14}
                  bold={true}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* </ScrollView> */}
        </View>
      </View>
      <View style={{width: '60%', backgroundColor: 'orange'}}>
        <Image
          source={require('../assets/loginImage.png')}
          style={{
            flex: 1,
            width: '100%',
          }}
        />
      </View>

      {/* <Image
                source={require('../assets/logo.png')}
                style={{
                    height: 200, width: 200, resizeMode: "contain",
                    marginVertical: 36, alignSelf: "center"
                }}
            />
            <Input
                placeholder={"User Email"}
                onChangeText={text => onChangeEmail(text)}
                value={email} />
            <Input
                placeholder={"User Password"}
                onChangeText={text => onChangePassword(text)}
                value={password}
                secureTextEntry={true}
            />
            <Button title={'Login'}
                onPress={onLogin}
                loader={loader}
                buttonStyle={{ marginVertical: 12 }} />
            <TouchableOpacity
                onPress={() => navigation.navigate('Signup')}
            >
                <Text color={'#bbb'}
                    align={'center'}
                    font={16}
                    style={{ textDecorationLine: "underline" }}
                    text={'Create an account!. Signup'} />
            </TouchableOpacity> */}
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

export default Login;
