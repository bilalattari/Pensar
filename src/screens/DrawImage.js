import React, {useState, useEffect, useRef} from 'react';
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
import Svg, {
  Circle,
  Ellipse,
  G,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';

import {themeColor} from '../Constant/index';
import Input from '../Component/Input';
import Button from '../Component/Button';
import Text from '../Component/Text';
import MovableView from 'react-native-movable-view';
import ProjectList from '../Component/ProjectListItem';
import {Icon, SearchBar} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import {SketchCanvas} from '@terrylinla/react-native-sketch-canvas';

function DrawImage({navigation, onSave, imagePath}) {
  const [loader, setLoader] = useState(false);
  const [linePaths, setlinePaths] = useState([]);
  const [images, setImages] = useState([]);
  const loading = (boolean) => {
    setLoader(boolean);
  };

  function handleLinePath(arr) {
    setlinePaths(arr);
  }
  const canvas = useRef(null);
  console.log(linePaths, 'linePaths');
  return (
    <ImageBackground
      source={{uri: imagePath}}
      style={{flex: 1, height: '100%', width: '100%'}}>
      <SketchCanvas
        ref={canvas}
        style={{
          flex: 1,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          zIndex: 1200,
        }}
        onStrokeStart={(paths) => {
          console.log(paths, 'start');
        }}
        onStrokeEnd={(paths) => {
          let path = paths.path;
          let firstPath = path.data[0];
          let lastPath = path.data[path.data.length - 1];
          let splitted = firstPath.split(',');
          let splitted1 = lastPath.split(',');
          let obj = {
            x1: splitted[0],
            y1: splitted[1],
            x2: splitted1[0],
            y2: splitted1[1],
          };
          linePaths.push(obj);
          console.log(paths.path, firstPath, lastPath, obj);
          // setlinePaths(linePaths);
          handleLinePath(linePaths);
          canvas.current.clear();
        }}
        onPathsChange={(paths) => {}}
        strokeColor={'red'}
        strokeWidth={7}
      />
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
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
        }}>
        <Svg>
          {linePaths.map((coordinates) => {
            return (
              <Line
                x1={coordinates.x1}
                y1={coordinates.y1}
                x2={coordinates.x2}
                y2={coordinates.y2}
                stroke="black"
                strokeWidth="10"
              />
            );
          })}
        </Svg>
      </View>
      <View
        style={{
          flex: 1,
        }}>
        {/* <MovableView>
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
        </MovableView> */}
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
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#fff',
            padding: 6,
            borderRadius: 25,
            paddingHorizontal: 16,
          }}>
          {['Text', 'Img', 'To', 'Left'].map((title) => (
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
