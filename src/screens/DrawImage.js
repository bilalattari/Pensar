import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from 'react-native';
import {themeColor} from '../Constant/index';
import Input from '../Component/Input';
import Button from '../Component/Button';
import Text from '../Component/Text';
import MovableView from 'react-native-movable-view';
import ProjectList from '../Component/ProjectListItem';
import {Icon, SearchBar} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';

function DrawImage({navigation, onSave}) {
  // const [checked, onChangeChecked] = React.useState(false);
  // const [password, onChangePassword] = React.useState('');
  const [loader, setLoader] = useState(false);
  const [images, setImages] = useState([]);
  const loading = (boolean) => {
    setLoader(boolean);
  };
  return (
    <ImageBackground
      source={require('../assets/loginImage.png')}
      style={{flex: 1, height: '100%', width: '100%'}}>
      <View style={styles.topBottomView}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.undeRedoButton}>
            <Icon type={'font-awesome'} name={'undo'} color={themeColor} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.undeRedoButton}>
            <Icon type={'font-awesome'} name={'redo'} color={themeColor} />
          </TouchableOpacity>
        </View>
        <Button
          title={'Save'}
          onPress={() => onSave()}
          backgroundColor={'#fff'}
          width={172}
          textStyle={{color: '#000'}}
        />
      </View>

      <View
        style={{
          flex: 1,
        }}>
        <MovableView>
          <View>
            <TextInput
              placeholder={'Enter text '}
              style={{
                color: themeColor,
                padding: 12,
                borderColor: 'red',
                borderWidth: 2,
                width: 300,
                fontSize: 18,
                fontWeight: 'bold',
              }}
            />
          </View>
        </MovableView>
      </View>
      <View style={[styles.topBottomView]}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#fff',
            padding: 6,
            borderRadius: 25,
            paddingHorizontal: 16,
          }}>
          {['C', 'W', 'S', 'G', 'E', 'RW'].map((title) => (
            <TouchableOpacity style={[styles.undeRedoButton, {marginRight: 2}]}>
              <Text text={title} color={themeColor} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  getImageButton: {
    height: 172,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#bbb',
  },
  undeRedoButton: {
    height: 40,
    width: 40,
    marginRight: 12,
    backgroundColor: '#fff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBottomView: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 21,
  },
  checkBoxDiv: {flexDirection: 'row', flexWrap: 'wrap', marginVertical: 6},
  flex: {flex: 1},
  rightContainer: {flex: 1},
});

export default DrawImage;
