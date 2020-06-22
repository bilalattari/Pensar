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
import Svg, {Line} from 'react-native-svg';
import {themeColor} from '../Constant/index';
import Input from '../Component/Input';
import Button from '../Component/Button';
import Text from '../Component/Text';
import MovableView from 'react-native-movable-view';
import ImagePicker from 'react-native-image-crop-picker';
import {SketchCanvas} from '@terrylinla/react-native-sketch-canvas';
import ViewShot from 'react-native-view-shot';
import ModalView from '../Component/Modal';
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
      showText: [],
      showRoundText: [],
      focused: true,
      blur: false,
      redoArr: [],
      strokeColor: '#fff',
      modal: true,
    };
  }
  // function DrawImage({ navigation, onSave, imagePath }) {
  //   const [loader, setLoader] = useState(false);
  //   const [linePaths, setlinePaths] = useState([]);
  //   const [images, setImages] = useState([]);
  //   const loading = (boolean) => {
  //     setLoader(boolean);
  //   };

  handleLinePath = (arr) => {
    this.setState({linePaths: arr});
  };
  undo = () => {
    let {linePaths, redoArr} = this.state;
    let redoUpdate = redoArr;
    let linePathsUpdate = linePaths;
    let pop = linePathsUpdate.pop();
    redoUpdate.push(pop);
    this.setState({linePaths: linePathsUpdate, redoArr: redoUpdate});
  };

  redo = () => {
    let {linePaths, redoArr} = this.state;
    if (redoArr.length > 0) {
      let redoUpdate = redoArr;
      let linePathsUpdate = linePaths;
      let pop = redoUpdate.pop();
      linePathsUpdate.push(pop);
      this.setState({linePaths: linePathsUpdate, redoArr: redoUpdate});
    }
  };

  handleStrokeColor = (color) => {
    this.setState({strokeColor: color});
  };
  onImageLoad = () => {
    this.setState({showButtons: false}, () => {
      this._viewShot.capture().then((uri) => {
        console.log('do something with ', uri);
        this.props.onSave(uri);
      });
    });
  };

  getImage = () => {
    if (!this.state.showImage) {
      ImagePicker.openPicker({mediaType: 'photo', cropping: true}).then(
        (image) => {
          this.setState({image, showImage: true});
        },
      );
    } else {
      this.setState({showImage: false});
    }
  };
  // const canv?as = useRef(null);
  render() {
    console.log('ttt=>', this.state.showRoundText);
    let {imagePath, onSave, navigation} = this.props;
    let colors = [
      {text: 'C', backgroundColor: '#fff'},
      {text: 'W', backgroundColor: '#82E8FA'},
      {text: 'S', backgroundColor: '#FFF8D9'},
      {text: 'G', backgroundColor: '#82FA94'},
      {text: 'E', backgroundColor: '#FDAC4C'},
      {text: 'RW', backgroundColor: '#B56EFC'},
    ];
    let settingsImg = [
      {name: 'text_round', image: require('../assets/text_round.png')},
      {name: 'text', image: require('../assets/text.png')},
      {name: 'image', image: require('../assets/image.png')},
      {name: 'vertical', image: require('../assets/vertical.png')},
      {name: 'horizontal', image: require('../assets/horizontal.png')},
    ];
    let {
      linePaths,
      image,
      strokeColor,
      showText,
      focused,
      blur,
      text,
      showImage,
      showButtons,
      showRoundText,
    } = this.state;
    console.log(image, 'ghous');
    return (
      <ViewShot
        ref={(e) => (this._viewShot = e)}
        style={{flex: 1, height: '100%', width: '100%'}}>
        <ImageBackground
          source={{uri: imagePath}}
          style={{flex: 1, height: '100%', width: '100%'}}>
          <SketchCanvas
            // ref={canvas}
            style={{
              flex: 1,
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              top: 0,
              zIndex: 1,
            }}
            ref={(e) => (this._canvas = e)}
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
                strokeColor: strokeColor,
              };

              linePaths.push(obj);
              this.handleLinePath(linePaths);
              this._canvas.clear();
            }}
            // onPathsChange={(paths) => { }}
            strokeColor={strokeColor}
            strokeWidth={7}
            canvasText={{
              text: 'TEXT',
              font: '',
              fontSize: 20,
              fontColor: 'red',
              overlay: 'TextOnSketch',
              anchor: {x: 0, y: 1},
              position: {x: 100, y: 200},
              coordinate: 'Absolute',
              alignment: 'Center',
              lineHeightMultiple: 1.2,
            }}
          />
          {showButtons && (
            <View style={styles.topBottomView}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={this.undo}
                  style={styles.undeRedoButton}>
                  <Image
                    source={require('../assets/Path91.png')}
                    style={{height: 20, width: 20}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.redo}
                  style={styles.undeRedoButton}>
                  <Image
                    source={require('../assets/circular-arrow.png')}
                    style={{height: 20, width: 20}}
                  />
                </TouchableOpacity>
              </View>
              <Button
                borderRadius={100}
                title={'Save'}
                onPress={() => this.onImageLoad()}
                backgroundColor={'#fff'}
                width={172}
                textStyle={{color: '#000'}}
              />
            </View>
          )}
          <View
            style={{
              flex: 1,
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              top: 0,
              zIndex: 1,
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
              ref={(e) => (this._canvas = e)}
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
                  strokeColor: strokeColor,
                  showBtn: false,
                };
                linePaths.push(obj);
                // setlinePaths(linePaths);
                this.handleLinePath(linePaths);
                this._canvas.clear();
                // canvas.current.clear();
              }}
              // onPathsChange={(paths) => { }}
              strokeColor={strokeColor}
              strokeWidth={7}
            />
          </View>
          <View style={{flex: 1}}>
            {showText.map((v, i) => {
              return (
                <MovableView key={i}>
                  <TextInput
                    placeholder={'Enter text'}
                    value={v.value}
                    blurOnSubmit={true}
                    onChangeText={(text) => {
                      showText[i].value = text;
                      this.setState({
                        showText: showText,
                      });
                    }}
                    multiline={true}
                    onFocus={() => this.setState({focused: true})}
                    onBlur={() => this.setState({blur: true})}
                    style={[
                      {
                        color: strokeColor,
                        padding: 12,
                        width: 150,
                        zIndex: 1200,
                        fontSize: 18,
                      },
                      focused
                        ? {
                            borderColor: '#bbb',
                            borderWidth: 2,
                          }
                        : null,
                      blur
                        ? {
                            borderWidth: 0,
                          }
                        : null,
                    ]}
                    onBlur={() => this.setState({focused: false})}
                  />
                </MovableView>
              );
            })}
            {showImage && (
              <MovableView>
                <Image
                  source={{uri: image.path}}
                  style={{
                    height: 80,
                    width: 80,
                    resizeMode: 'contain',
                    zIndex: 1200,
                  }}
                />
              </MovableView>
            )}
          </View>
          <View style={{flex: 1}}>
            {showRoundText.map((v, i) => {
              return (
                <MovableView key={i}>
                  <TextInput
                    blurOnSubmit={true}
                    value={v.value}
                    multiline={true}
                    onChangeText={(text) => {
                      this.state.showRoundText[i].value = text;
                      this.setState({
                        showRoundText: showRoundText,
                      });
                    }}
                    onFocus={() => this.setState({focused: true})}
                    onBlur={() => this.setState({blur: true})}
                    style={[
                      {
                        color: '#000',
                        width: 40,
                        height: 40,
                        borderRadius: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1200,
                        fontSize: 14,
                        fontWeight: 'bold',
                        backgroundColor: v.color,
                      },
                      focused
                        ? {
                            borderColor: '#bbb',
                            borderWidth: 2,
                          }
                        : null,
                    ]}
                    onBlur={() => this.setState({focused: false})}
                  />
                </MovableView>
              );
            })}
          </View>
          {showButtons && (
            <View style={[styles.topBottomView]}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                  padding: 6,
                  borderRadius: 25,
                  paddingHorizontal: 16,
                }}>
                {colors.map((title) => (
                  <TouchableOpacity
                    onPress={() =>
                      this.handleStrokeColor(title.backgroundColor)
                    }
                    style={[
                      styles.undeRedoButton,
                      {marginRight: 4, backgroundColor: title.backgroundColor},
                    ]}>
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
                        showText.push({value: '', color: strokeColor});
                        this.setState({showText: showText});
                      } else if (img.name === 'image') {
                        this.getImage();
                      } else if (img.name === 'text_round') {
                        showRoundText.push({value: '', color: strokeColor});
                        this.setState({showRoundText: showRoundText});
                      }
                    }}
                    style={[styles.undeRedoButton, {marginRight: 10}]}>
                    <Image
                      source={img.image}
                      style={{height: 20, resizeMode: 'contain'}}
                    />
                  </TouchableOpacity>
                ))}
              </View>
              {!this.state.modal && <ModalView />}
            </View>
          )}
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
  checkBoxDiv: {flexDirection: 'row', flexWrap: 'wrap', marginVertical: 6},
  flex: {flex: 1},
  rightContainer: {flex: 1},
  lineBox: {
    backgroundColor: '#fff',
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DrawImage;
