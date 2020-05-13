import React, { useState, useEffect, useRef } from 'react';
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
  Line,
} from 'react-native-svg';
import { themeColor } from '../Constant/index';
import Input from '../Component/Input';
import Button from '../Component/Button';
import Text from '../Component/Text';
import MovableView from 'react-native-movable-view';
import ImagePicker from 'react-native-image-crop-picker';
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';
import ViewShot from "react-native-view-shot";

class DrawImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      linePaths: [],
      loader: false,
      image: {},
      showButtons: true,
      showImage: false,
      text: '',
      showText: false,
      focused: true,
      redoArr: [],
      strokeColor: '#fff'
    }
  }
  // function DrawImage({ navigation, onSave, imagePath }) {
  //   const [loader, setLoader] = useState(false);
  //   const [linePaths, setlinePaths] = useState([]);
  //   const [images, setImages] = useState([]);
  //   const loading = (boolean) => {
  //     setLoader(boolean);
  //   };

  handleLinePath = (arr) => {
    this.setState({ linePaths: arr })
  }
  undo = () => {
    let { linePaths, redoArr } = this.state
    let redoUpdate = redoArr
    let linePathsUpdate = linePaths
    let pop = linePathsUpdate.pop()
    redoUpdate.push(pop)
    this.setState({ linePaths: linePathsUpdate, redoArr: redoUpdate })
  }

  redo = () => {
    let { linePaths, redoArr } = this.state
    if (redoArr.length > 0) {
      let redoUpdate = redoArr
      let linePathsUpdate = linePaths
      let pop = redoUpdate.pop()
      linePathsUpdate.push(pop)
      this.setState({ linePaths: linePathsUpdate, redoArr: redoUpdate })
    }
  }

  handleStrokeColor = (color) => {
    this.setState({ strokeColor: color })
  }
  onImageLoad = () => {
    this.setState({ showButtons: false }, () => {
      this._viewShot.capture().then(uri => {
        console.log("do something with ", uri);
        this.props.onSave(uri)
      })
    })
  };

  getImage = () => {
    if (!this.state.showImage) {
      ImagePicker.openPicker({ mediaType: 'photo' }).then((image) => {
        this.setState({ image, showImage: true })
      });
    }
    else {
      this.setState({ showImage: false })
    }
  }
  // const canv?as = useRef(null);
  render() {
    let { imagePath, onSave, navigation } = this.props
    console.log(linePaths, 'linePaths');
    let colors = [
      { text: 'C', backgroundColor: '#fff' },
      { text: 'W', backgroundColor: '#82E8FA' },
      { text: 'S', backgroundColor: '#FFF8D9' },
      { text: 'G', backgroundColor: '#82FA94' },
      { text: 'E', backgroundColor: '#FDAC4C' },
      { text: 'RW', backgroundColor: '#B56EFC' },
    ]
    let settingsImg = [
      { name: "text", image: require('../assets/text.png') },
      { name: "image", image: require('../assets/image.png') },
      { name: "vertical", image: require('../assets/vertical.png') },
      { name: "horizontal", image: require('../assets/horizontal.png') },
    ]
    let { linePaths, image, strokeColor, showText, focused, text, showImage , showButtons } = this.state
    return (
      <ViewShot
        ref={(e) => this._viewShot = e}
        style={{ flex: 1, height: '100%', width: '100%' }}>
        <ImageBackground
          source={{ uri: imagePath }}
          style={{ flex: 1, height: '100%', width: '100%' }}>
          
          {
            showButtons &&
            <View style={styles.topBottomView}>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  onPress={this.undo} style={styles.undeRedoButton}>
                  <Image source={require('../assets/Path91.png')} style={{ height: 20, width: 20 }} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.redo}
                  style={styles.undeRedoButton}>
                  <Image source={require('../assets/circular-arrow.png')}

                    style={{ height: 20, width: 20 }} />
                </TouchableOpacity>
              </View>
              <Button
                title={'Save'}
                onPress={() => this.onImageLoad()}
                backgroundColor={'#fff'}
                width={172}
                textStyle={{ color: '#000' }}
              />
            </View>
          }
         
          <View style={{ flex: 1 , zIndex : 1200 }}>
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
                    stroke={coordinates.strokeColor}
                    strokeWidth="10"
                  />
                );
              })}
            </Svg>
            <SketchCanvas
            // ref={canvas}
            style={{
              flex: 1,
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              top: 0,
              zIndex: 1200,
            }}
            ref={(e) => this._canvas = e}
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
                strokeColor: strokeColor
              };
              linePaths.push(obj);
              // setlinePaths(linePaths);
              this.handleLinePath(linePaths);
              this._canvas.clear()
              // canvas.current.clear();
            }}
            // onPathsChange={(paths) => { }}
            strokeColor={strokeColor}
            strokeWidth={7}
          />
          </View>
       
            {
              !showText &&
              <MovableView >
                <TextInput
                  placeholder={'Enter text '}
                  value={text}
                  blurOnSubmit={true}
                  onChangeText={(text) => this.setState({ text })}
                  multiline={true}
                  onFocus={() => this.setState({ focused: true })}
                  style={[{
                    color: strokeColor,
                    padding: 12,
                    width: 300,
                    fontSize: 18,
                  }, focused ? {
                    borderColor: '#bbb',
                    borderWidth: 2,
                  } : null]}
                  onBlur={() => this.setState({ focused: false })}
                  />
              </MovableView>
            }
            {
              showImage &&
              <MovableView >
                <Image source={{ uri: image.path }}
                  style={{ height: 120, width: 120, resizeMode: "contain", zIndex: 1200 }} />
              </MovableView>
            }
          </View>
          {
            showButtons &&
            <View style={[styles.topBottomView]}>
            <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#fff',
              padding: 6,
                  borderRadius: 25,
                  paddingHorizontal: 16,
                }}>
                {
                  colors.map((title) => (
                    <TouchableOpacity
                      onPress={() => this.handleStrokeColor(title.backgroundColor)}
                      style={[styles.undeRedoButton,
                      { marginRight: 4, backgroundColor: title.backgroundColor }]}>
                      <Text text={title.text} color={themeColor} />
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
                {settingsImg.map((img) => (
                  <TouchableOpacity
                    onPress={() => {
                      if (img.name === 'text') {
                        this.setState({ showText: !showText })
                      }
                      if (img.name === 'image') {
                        this.getImage()
                      }
                    }}
                    style={[styles.undeRedoButton, { marginRight: 2 }]}>
                    <Image source={img.image} style={{ height: 20, resizeMode: "contain" }} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          }
        </ImageBackground>
      </ViewShot>
    );
  }
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
    height: 35,
    width: 35,
    marginRight: 12,
    backgroundColor: '#fff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBottomView: {
    height: 80,
    zIndex: 1200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 21,
  },
  checkBoxDiv: { flexDirection: 'row', flexWrap: 'wrap', marginVertical: 6 },
  flex: { flex: 1 },
  rightContainer: { flex: 1 },
});

export default DrawImage;
