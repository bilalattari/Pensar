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
import Svg, { Line, Text as TextSVG } from 'react-native-svg';
import { themeColor } from '../Constant/index';
import Input from '../Component/Input';
import Button from '../Component/Button';
import DeleteModal from '../Component/DeleteModal';
import Text from '../Component/Text';
import MovableView from 'react-native-movable-view';
import ImagePicker from 'react-native-image-picker';
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';
import ViewShot from 'react-native-view-shot';
import ModalView from '../Component/Modal';
import Gestures from 'react-native-easy-gestures';
import Icon from 'react-native-vector-icons/Fontisto';

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
    cancel: true,
  },
};
class DrawImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      linePaths: [],
      loader: false,
      image: {},
      showButtons: true,
      showImage: [],
      text: '',
      showText: [],
      showRoundText: [],
      showNormalText: [],
      focused: false,
      blur: false,
      redoArr: [],
      strokeColor: '#fff',
      modal: true,
      deleteModal: false,
      delItem: {},
      rightLeft: false,
      topBottom: false,
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
    this.setState({ linePaths: arr });
  };
  undo = () => {
    let { linePaths, redoArr } = this.state;
    let redoUpdate = redoArr;
    let linePathsUpdate = linePaths;
    let pop = linePathsUpdate.pop();
    redoUpdate.push(pop);
    this.setState({ linePaths: linePathsUpdate, redoArr: redoUpdate });
  };

  redo = () => {
    let { linePaths, redoArr } = this.state;
    if (redoArr.length > 0) {
      let redoUpdate = redoArr;
      let linePathsUpdate = linePaths;
      let pop = redoUpdate.pop();
      linePathsUpdate.push(pop);
      this.setState({ linePaths: linePathsUpdate, redoArr: redoUpdate });
    }
  };

  handleStrokeColor = (color) => {
    this.setState({ strokeColor: color });
  };
  onImageLoad = () => {
    this.setState({ showButtons: false }, () => {
      this._viewShot.capture().then((uri) => {
        console.log('do something with ', uri);
        this.props.onSave(uri);
      });
    });
  };

  getImage = () => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const image = { uri: response.uri };
        this.state.showImage.push({ image, hide: false });
        this.setState({ showImage: this.state.showImage });
      }
    });
  };
  // const canv?as = useRef(null);
  render() {
    console.log('ttt=>', this.state.showRoundText);
    let { imagePath, onSave, navigation } = this.props;
    let colors = [
      { text: 'C', backgroundColor: '#fff' },
      { text: 'W', backgroundColor: '#82E8FA' },
      { text: 'S', backgroundColor: '#FFF8D9' },
      { text: 'SW', backgroundColor: '#82FA94' },
      { text: 'E', backgroundColor: '#FDAC4C' },
      { text: 'F', backgroundColor: '#f93737' },
      { text: 'RW', backgroundColor: '#B56EFC' },
      { text: 'P', backgroundColor: '#ED90F0' },
    ];
    let settingsImg = [
      // { name: 'text-normal', image: require('../assets/normal-text.png') },
      { name: 'text_round', image: require('../assets/text_round.png') },
      { name: 'text', image: require('../assets/text.png') },
      { name: 'image', image: require('../assets/image.png') },
      { name: 'vertical', image: require('../assets/vertical.png') },
      { name: 'horizontal', image: require('../assets/horizontal.png') },
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
      showNormalText,
    } = this.state;
    return (
      <ViewShot
        ref={(e) => (this._viewShot = e)}
        style={{ flex: 1, height: '100%', width: '100%' }}>
        <ImageBackground
          source={{ uri: imagePath }}
          style={{
            flex: 1,
            height: '100%',
            width: '100%',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
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
              anchor: { x: 0, y: 1 },
              position: { x: 100, y: 200 },
              coordinate: 'Absolute',
              alignment: 'Center',
              lineHeightMultiple: 1.2,
            }}
          />
          {showButtons && (
            <View style={styles.topBottomView}>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  onPress={() => this.props.hideDraw()}
                  style={styles.undeRedoButton}>
                  <Image
                    source={require('../assets/218_Arrow_Arrows_Back-512.png')}
                    style={{ height: 20, width: 20 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.undo}
                  style={styles.undeRedoButton}>
                  <Image
                    source={require('../assets/Path91.png')}
                    style={{ height: 20, width: 20 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.redo}
                  style={styles.undeRedoButton}>
                  <Image
                    source={require('../assets/circular-arrow.png')}
                    style={{ height: 20, width: 20 }}
                  />
                </TouchableOpacity>
              </View>
              <Button
                borderRadius={100}
                title={'Save'}
                onPress={() => this.onImageLoad()}
                backgroundColor={'#fff'}
                width={172}
                textStyle={{ color: '#000' }}
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
              top: -30,
              zIndex: 1,
            }}>
            <Svg>
              {linePaths.map((coordinates) => {
                let left = +coordinates.x2 - 12;
                let top = +coordinates.y2 - 15;
                return (
                  <>
                    <Line
                      x1={coordinates.x1}
                      y1={coordinates.y1}
                      x2={coordinates.x2}
                      y2={coordinates.y2}
                      stroke={coordinates.strokeColor}
                      strokeWidth="6"
                      strokeDasharray={'80,40'}
                    />
                  
                    {coordinates.rightLeft ?
                      (

                        <Icon
                          style={{
                            left: left,
                            top: top,
                            position: 'absolute',
                          }}
                          name={
                            +coordinates.x2 > +coordinates.x1
                              ? 'caret-right'
                              : 'caret-left'
                          }
                          size={30}
                          color={coordinates.strokeColor}
                        />
                      ) : null}
                    {coordinates.topBottom ? (
                      <Icon
                        style={{
                          position: 'absolute',
                          left: +coordinates.x2 - 15,
                          top: +coordinates.y2 - 15,
                        }}
                        name={
                          +coordinates.y2 > +coordinates.y1
                            ? 'caret-down'
                            : 'caret-up'
                        }
                        size={30}
                        color={coordinates.strokeColor}
                      />
                    ) : null}
                  </>
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
                // zIndex: 1200,
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
                  x2: this.state.topBottom ? splitted[0] : splitted1[0],
                  y2: this.state.rightLeft ? splitted[1] : splitted1[1],
                  strokeColor: strokeColor,
                  showBtn: false,
                  rightLeft: this.state.rightLeft,
                  topBottom: this.state.topBottom,
                };
                linePaths.push(obj);
                // setlinePaths(linePaths);
                this.handleLinePath(linePaths);
                this._canvas.clear();
                // canvas.current.clear();
              }}
              // onPathsChange={(paths) => { }}
              strokeColor={strokeColor}
              strokeWidth={6}
            />
          </View>
          {/* <View style={{flex: 1,backgroundColor: "red",zIndex: 1200}}> */}
          {showText.map((v, i) => {
            return (
              !v.hide && (
                <Gestures
                  style={{
                    zIndex: 1200,
                    width: 120,
                    position: 'absolute',
                    marginTop: 80,
                    marginLeft: 5,
                  }}
                  key={i}>
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
                    placeholderTextColor={'#ccc'}
                    multiline={true}
                    onFocus={() => {
                      showText[i].focused = true;
                      this.setState({ showText: showText });
                    }}
                    style={[
                      {
                        color: '#000',
                        width: '100%',
                        zIndex: 1,
                        fontSize: 20,
                        backgroundColor: '#fff',
                        borderColor: v.color,
                        borderWidth: 2,
                      },
                    ]}
                    onBlur={() => {
                      showText[i].focused = false;
                      this.setState({ showText: showText });
                    }}
                  />
                  {showButtons && (
                    <TouchableOpacity
                      onLongPress={() => {
                        this.setState({
                          deleteModal: true,
                          delItem: { i, v, item: "text" },
                        })
                      }}
                      style={styles.dragIcon}>
                      <Icon name="arrow-move" size={18} color="#000" />
                    </TouchableOpacity>
                  )}
                </Gestures>
              )
            );
          })}
          {showNormalText.map((v, i) => {
            return (
              !v.hide && (
                <Gestures
                  style={{
                    zIndex: 1200,
                    maxWidth: 100,
                    position: 'absolute',
                    marginTop: 80,
                    marginLeft: 5,
                  }}
                  key={i}>
                  <TextInput
                    placeholder={'Enter text'}
                    value={v.value}
                    blurOnSubmit={true}
                    onChangeText={(text) => {
                      showNormalText[i].value = text;
                      this.setState({
                        showNormalText: showNormalText,
                      });
                    }}
                    placeholderTextColor={'#ccc'}
                    multiline={true}
                    onFocus={() => {
                      showNormalText[i].focused = true;
                      this.setState({ showNormalText: showNormalText });
                    }}
                    style={[
                      {
                        color: v.color,
                        width: '100%',
                        zIndex: 1,
                        fontSize: 20,
                        backgroundColor: 'transparent',
                        borderColor: v.color,
                        borderWidth: 2,
                      },
                      !v.focused
                        ? {
                          borderWidth: 0,
                        }
                        : null,
                    ]}
                    onBlur={() => {
                      showNormalText[i].focused = false;
                      this.setState({ showNormalText: showNormalText });
                    }}
                  />
                  {showButtons && (
                    <TouchableOpacity
                      onLongPress={() => {
                        this.setState({
                          deleteModal: true,
                          delItem: { i, v, item: "text-normal" },
                        })
                      }}
                      style={styles.dragIcon}>
                      <Icon name="arrow-move" size={18} color="#000" />
                    </TouchableOpacity>
                  )}
                </Gestures>
              )
            );
          })}
          {showImage.map((v, i) => {
            return (
              !v.hide && (
                <Gestures key={i} style={{ zIndex: 1200, width: 200 }}>
                  <TouchableOpacity
                    onLongPress={() => {
                      showImage[i].hide = true;
                      this.setState({
                        showImage: showImage,
                      });
                      console.log(showImage);
                    }}
                    activeOpacity={0.8}>
                    <Image
                      source={{ uri: v.image.uri }}
                      style={{
                        height: 200,
                        width: 200,
                        resizeMode: 'contain',
                        zIndex: 1200,
                      }}
                    />
                  </TouchableOpacity>
                </Gestures>
              )
            );
          })}
          {showRoundText.map((v, i) => {
            return (
              !v.hide && (
                <MovableView
                  onDragEnd={(e) => console.log(e)}
                  style={{
                    zIndex: 1200,
                    minWidth: 50,
                    maxWidth: 80,
                    minHeight: 50,
                    maxHeight: 80,
                    backgroundColor: v.color,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 100,
                    position: 'absolute',
                    marginTop: 80,
                    marginLeft: 10,
                  }}
                  key={i}>
                  <TextInput
                    blurOnSubmit={true}
                    value={v.value}
                    multiline={true}
                    maxLength={4}
                    onChangeText={(text) => {
                      this.state.showRoundText[i].value = text;
                      this.setState({
                        showRoundText: showRoundText,
                      });
                    }}
                    style={[
                      {
                        color: '#000',
                        fontSize: 14,
                        width: '100%',
                        fontWeight: 'bold',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                      },
                    ]}
                    onBlur={() => this.setState({ focused: false })}
                  />
                  {showButtons && (
                    <TouchableOpacity
                      onLongPress={() => {
                        this.setState({
                          deleteModal: true,
                          delItem: { i, v, item: "text_round" },
                        });
                      }}
                      activeOpacity={0.8}
                      style={[styles.dragIcon, { right: -10, top: 30 }]}>
                      <Icon name="arrow-move" size={18} color="#000" />
                    </TouchableOpacity>
                  )}
                </MovableView>
              )
            );
          })}
          {this.state.deleteModal && (
            <DeleteModal
              cancel={() => this.setState({ deleteModal: false, delIndex: 0 })}
              confirm={() => {
                if (this.state.delItem.item === "text-normal") {
                  showNormalText.splice(this.state.delItem.i, 1, {
                    value: this.state.delItem.v.value,
                    color: this.state.delItem.v.strokeColor,
                    hide: true,
                  });
                  this.setState({
                    showNormalText: showNormalText,
                    deleteModal: false,
                    delIndex: 0,
                  });
                } else if (this.state.delItem.item === "text_round") {
                  showRoundText.splice(this.state.delItem.i, 1, {
                    value: this.state.delItem.v.value,
                    color: this.state.delItem.v.strokeColor,
                    hide: true,
                  });
                  this.setState({
                    showRoundText: showRoundText,
                    deleteModal: false,
                    delIndex: 0,
                  });
                } else {
                  showText.splice(this.state.delItem.i, 1, {
                    value: this.state.delItem.v.value,
                    color: this.state.delItem.v.strokeColor,
                    hide: true,
                  });
                  this.setState({
                    showText: showText,
                    deleteModal: false,
                    delIndex: 0,
                  });
                }
              }}
            />
          )}
          {showButtons && (
            <View style={styles.topBottomView}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                  padding: 6,
                  borderRadius: 25,
                  paddingHorizontal: 16,
                }}>
                {colors.map((title) => (
                  this.props.need.findIndex(item => item.indexOf(`(${title.text})`) !== -1) !== -1 ?
                    <TouchableOpacity
                      onPress={() =>
                        this.handleStrokeColor(title.backgroundColor)
                      }
                      style={[
                        styles.undeRedoButton,
                        { marginRight: 4, backgroundColor: title.backgroundColor },
                      ]}>
                      <Text text={title.text} color={themeColor} />
                    </TouchableOpacity>
                    :
                    null
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
                        showText.push({
                          value: '',
                          color: strokeColor,
                          focused: false,
                          hide: false
                        });
                        this.setState({ showText: showText });
                      } else if (img.name === 'image') {
                        this.getImage();
                      } else if (img.name === 'text_round') {
                        showRoundText.push({
                          value: '',
                          color: strokeColor,
                          hide: false,
                        });
                        this.setState({ showRoundText: showRoundText });
                      } else if (img.name === 'vertical') {
                        this.setState({
                          topBottom: !this.state.topBottom,
                          rightLeft: false,
                        });
                      } else if (img.name === 'horizontal') {
                        this.setState({
                          rightLeft: !this.state.rightLeft,
                          topBottom: false,
                        });
                      } else if (img.name === 'text-normal') {
                        showNormalText.push({
                          value: '',
                          color: strokeColor,
                          hide: false,
                        });
                        this.setState({ showNormalText: showNormalText });
                      }
                    }}
                    style={[styles.undeRedoButton, { marginRight: 10 }]}>
                    <Image
                      source={img.image}
                      style={{
                        height: img.name === 'text_round' ? 22 : 20,
                        resizeMode: 'contain',
                      }}
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
  checkBoxDiv: { flexDirection: 'row', flexWrap: 'wrap', marginVertical: 6 },
  flex: { flex: 1 },
  rightContainer: { flex: 1 },
  lineBox: {
    backgroundColor: '#fff',
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dragIcon: {
    backgroundColor: '#fff',
    width: 25,
    height: 25,
    borderRadius: 50,
    justifyContent: 'center',
    position: 'absolute',
    right: -10,
    top: 15,
    zIndex: 1,
    alignItems: 'center',
    borderWidth: 0.5,
  },
});

export default DrawImage;
