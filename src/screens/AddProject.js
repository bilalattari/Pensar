import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {themeColor} from '../Constant/index';
import Input from '../Component/Input';
import DrawImage from '../screens/DrawImage';
import Button from '../Component/Button';
import Text from '../Component/Text';
import MovableView from 'react-native-movable-view';
import ProjectList from '../Component/ProjectListItem';
import {Icon, SearchBar} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const Block = ({children, row, label, value, onChangeText}) => (
  <View style={{flex: 1, flexDirection: row ? 'row' : 'column'}}>
    {children ? (
      children
    ) : (
      <Input onChangeText={onChangeText} value={value} label={label} />
    )}
  </View>
);

const CheckBox = ({label, checked, backgroundColor, handleClick}) => (
  <TouchableOpacity
    onPress={() => handleClick(label, checked)}
    style={{
      flexDirection: 'row',
      marginRight: 20,
      alignItems: 'center',
      marginVertical: 4,
    }}>
    <Icon
      type={'material-community'}
      name={!checked ? 'checkbox-blank-outline' : 'check-box-outline'}
      color={themeColor}
      size={27}
      containerStyle={{marginTop: 2}}
    />
    <Text
      color={themeColor}
      font={20}
      style={{
        paddingHorizontal: 12,
        paddingVertical: 3,
        backgroundColor: backgroundColor ? backgroundColor : null,
      }}
      bold={true}
      text={label}
    />
  </TouchableOpacity>
);

function ProjectReport({navigation}) {
  const [locator, setLocator] = useState('');
  const [activityDate, setAcDate] = useState('');
  const [docket, setDocket] = useState('');
  const [dbyd, setDbyd] = useState('');
  const [job, setJob] = useState('');
  const [po, setPo] = useState('');
  const [client, setClient] = useState('');
  const [clientContact, setClientContact] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [reportType, setReportType] = useState([]);
  const [need, setNeed] = useState([]);
  const [utilityCode, setUtilityCode] = useState('');
  const [loader, setLoader] = useState(false);
  const [images, setImages] = useState([]);
  const [updatedImages, setNewImage] = useState([]);
  const [showDrawComponent, handleDraw] = useState(false);

  const loading = (boolean) => {
    setLoader(boolean);
  };

  useEffect(() => {
    if (navigation.state.params) {
      let data = navigation.state.params.data;
      setLocator(data.locator);
      setAcDate(data.activityDate);
      setDocket(data.docket);
      setDbyd(data.dbyd);
      setJob(data.job);
      setPo(data.po);
      setClient(data.client);
      setClientContact(data.clientContact);
      setPhone(data.phone);
      setEmail(data.email);
      setAddress(data.address);
      setLocation(data.location);
      setDescription(data.description);
      setReportType(data.reportType);
      setNeed(data.need);
      setUtilityCode(data.utilityCode ? data.utilityCode : '');
      setNewImage(data.images ? data.images : []);
    }
  }, []);

  function getImage() {
    ImagePicker.openPicker({mediaType: 'photo', includeBase64: true}).then(
      (images) => {
        setImages([images]);
        console.log(images, 'img');
        handleDraw(true);
      },
    );
  }

  const set_report = (l, v) => {
    if (v) {
      let old_report = [...reportType];
      old_report.splice(old_report.indexOf(l), 1);
      setReportType(old_report);
    } else {
      setReportType((prevArray) => [...prevArray, l]);
    }
  };
  const set_need = (l, v) => {
    if (v) {
      let old_need = [...need];
      old_need.splice(old_need.indexOf(l), 1);
      setNeed(old_need);
    } else {
      setNeed((prevArray) => [...prevArray, l]);
    }
  };
  const upload_images = (images) => {
    return new Promise((resolve, reject) => {
      var uploaded = [];
      for (var i = 0; i < images.length; i++) {
        var n = images[i].path.lastIndexOf('/');
        var name = images[i].path.substring(n + 1);
        let firebaseRef = storage().ref('/').child(`images/${name}`);
        firebaseRef.putFile(images[i].path).then(async (snapshot) => {
          let url = await firebaseRef.getDownloadURL();
          uploaded.push({path: url});
          if (uploaded.length === images.length) {
            resolve(uploaded);
          }
        });
      }
    });
  };

  const save_report = async () => {
    if (
      locator &&
      activityDate &&
      docket &&
      dbyd &&
      job &&
      po &&
      client &&
      clientContact &&
      phone &&
      email &&
      address &&
      location &&
      description &&
      reportType &&
      need &&
      utilityCode &&
      updatedImages.length
    ) {
      let count = Math.random() * 22323200;
      setLoader(true);
      let key = database().ref('/').child(`reports`).push().key;
      if (navigation.state.params) {
        let old_images = updatedImages.filter(
          (data) => data.path.indexOf('firebase') !== -1,
        );
        let new_images = await upload_images(
          updatedImages.filter((data) => data.path.indexOf('file') !== -1),
        );
        let report = {
          locator,
          activityDate,
          docket,
          dbyd,
          job,
          po,
          client,
          clientContact,
          phone,
          email,
          address,
          location,
          description,
          reportType,
          need,
          utilityCode,
          images: old_images.concat(new_images),
          uid: navigation.state.params.data.uid,
          project_number: navigation.state.params.data.project_number,
          status: 'Draft',
          time: navigation.state.params.data.time,
          key: navigation.state.params.data.key,
        };
        database()
          .ref('/')
          .child(`reports/${navigation.state.params.data.key}`)
          .set(report)
          .then(() => {
            setLocator('');
            setAcDate('');
            setDocket('');
            setDbyd('');
            setJob('');
            setPo('');
            setClient('');
            setClientContact('');
            setPhone('');
            setEmail('');
            setAddress('');
            setLocation('');
            setDescription('');
            setReportType([]);
            setNeed([]);
            setUtilityCode('');
            setImages([]);
            setNewImage([]);
            setLoader(false);
            alert('Report save successfully');
            navigation.navigate('Home');
          });
      } else {
        let report = {
          locator,
          activityDate,
          docket,
          dbyd,
          job,
          po,
          client,
          clientContact,
          phone,
          email,
          address,
          location,
          description,
          reportType,
          need,
          utilityCode,
          images: await upload_images(updatedImages),
          uid: auth().currentUser.uid,
          project_number: parseInt(count.toFixed()),
          status: 'Draft',
          time: new Date().toTimeString(),
          key,
        };
        database()
          .ref('/')
          .child(`reports/${key}`)
          .set(report)
          .then(() => {
            setLocator('');
            setAcDate('');
            setDocket('');
            setDbyd('');
            setJob('');
            setPo('');
            setClient('');
            setClientContact('');
            setPhone('');
            setEmail('');
            setAddress('');
            setLocation('');
            setDescription('');
            setReportType([]);
            setNeed([]);
            setUtilityCode('');
            setImages([]);
            setNewImage([]);
            setLoader(false);
            alert('Report save successfully');
          });
      }
    } else {
      alert('Please fill the required feilds!');
    }
  };
  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <View
        style={{
          width: '30%',
          backgroundColor: '#466AA5',
        }}>
        <View style={{paddingLeft: '8%'}}>
          <Image
            source={require('../assets/whiteLogo.png')}
            style={{
              height: 180,
              width: '70%',
              resizeMode: 'contain',
            }}
          />
          <Text
            color={'#fff'}
            style={{marginTop: 12}}
            font={20}
            bold={true}
            text={'Project Name'}
          />
          <Text
            color={'#fff'}
            style={{marginTop: 12}}
            font={20}
            bold={true}
            text={'Project Detail'}
          />
          <Text
            color={'#fff'}
            style={{marginTop: 12}}
            font={20}
            bold={true}
            text={'Add New Page'}
          />
          <Text
            color={'#fff'}
            style={{marginTop: 12}}
            font={20}
            bold={true}
            text={'Complete'}
          />
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text
              color={'#fff'}
              style={{marginTop: 12}}
              font={20}
              bold={true}
              text={'Back'}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{width: '70%', backgroundColor: '#fff'}}>
        <View style={styles.rightContainer}>
          {showDrawComponent ? (
            <DrawImage
              onSave={(uri) => {
                console.log(uri, 'onloadddddddddddddddddddddddddddd');
                updatedImages.push({path: uri});
                handleDraw(false);
                setNewImage(updatedImages);
              }}
              imagePath={images[0].path}
            />
          ) : (
            <ScrollView style={{padding: '5%', marginBottom: 72}}>
              <Text
                color={themeColor}
                font={25}
                bold={true}
                text={'Start A Report'}
              />
              <View style={{marginRight: '12%'}}>
                <Block row={true}>
                  <Block
                    value={locator}
                    onChangeText={(text) => setLocator(text)}
                    label={'Locator'}
                  />
                  <Block
                    value={activityDate}
                    onChangeText={(text) => setAcDate(text)}
                    label={'Activity Date'}
                  />
                </Block>
                <Block row={true}>
                  <Block
                    value={docket}
                    onChangeText={(text) => setDocket(text)}
                    label={'Docket'}
                  />
                  <Block
                    value={dbyd}
                    onChangeText={(text) => setDbyd(text)}
                    label={'DBYD'}
                  />
                </Block>
                <Block row={true}>
                  <Block
                    value={job}
                    onChangeText={(text) => setJob(text)}
                    label={'Job'}
                  />
                  <Block
                    value={po}
                    onChangeText={(text) => setPo(text)}
                    label={'P/O'}
                  />
                </Block>
                <Text
                  color={themeColor}
                  font={25}
                  style={{marginVertical: 15}}
                  bold={true}
                  text={'Who are we sending this to?'}
                />
                <Block row={true}>
                  <Block
                    value={client}
                    onChangeText={(text) => setClient(text)}
                    label={'Client'}
                  />
                  <Block
                    value={clientContact}
                    onChangeText={(text) => setClientContact(text)}
                    label={'Client Contact'}
                  />
                </Block>
                <Block row={true}>
                  <Block
                    value={phone}
                    onChangeText={(text) => setPhone(text)}
                    label={'Phone Number'}
                  />
                  <Block
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    label={'Email'}
                  />
                </Block>

                <Text
                  color={themeColor}
                  font={25}
                  style={{marginVertical: 15}}
                  bold={true}
                  text={'Where are we sending this?'}
                />
                <Block
                  value={address}
                  onChangeText={(text) => setAddress(text)}
                  label={'Address'}
                />
                <Block
                  value={location}
                  onChangeText={(text) => setLocation(text)}
                  label={'Site Specific Location'}
                />
                <Block
                  value={description}
                  onChangeText={(text) => setDescription(text)}
                  label={'Proposed Job Description'}
                />

                <Text
                  color={themeColor}
                  font={25}
                  style={{marginVertical: 15}}
                  bold={true}
                  text={'What type of report?'}
                />

                <View style={styles.checkBoxDiv}>
                  <CheckBox
                    handleClick={set_report}
                    label={'Hard Copy'}
                    checked={reportType.indexOf('Hard Copy') !== -1}
                  />
                  <CheckBox
                    handleClick={set_report}
                    label={'Photo Report'}
                    checked={reportType.indexOf('Photo Report') !== -1}
                  />
                  <CheckBox
                    handleClick={set_report}
                    label={'All Known Services'}
                    checked={reportType.indexOf('All Known Services') !== -1}
                  />
                  <CheckBox
                    handleClick={set_report}
                    label={'Requested By Client'}
                    checked={reportType.indexOf('Requested By Client') !== -1}
                  />
                </View>
              </View>
              <Text
                color={themeColor}
                font={25}
                style={{marginVertical: 15}}
                bold={true}
                text={'What do I need?'}
              />
              <View style={styles.checkBoxDiv}>
                <CheckBox
                  handleClick={set_need}
                  label={'White - Telecommunications (C)'}
                  checked={
                    need.indexOf('White - Telecommunications (C)') !== -1
                  }
                />
                <CheckBox
                  handleClick={set_need}
                  label={'Blue - Water (W)'}
                  backgroundColor={'#82E8FA'}
                  checked={need.indexOf('Blue - Water (W)') !== -1}
                />
                <CheckBox
                  handleClick={set_need}
                  label={'Cream - Sewer (S)'}
                  backgroundColor={'#FFF8D9'}
                  checked={need.indexOf('Cream - Sewer (S)') !== -1}
                />
                <CheckBox
                  handleClick={set_need}
                  label={'Green - Storm Water(SW)'}
                  backgroundColor={'#82FA94'}
                  checked={need.indexOf('Green - Storm Water(SW)') !== -1}
                />
                <CheckBox
                  handleClick={set_need}
                  label={'Orange - Electrical (E)'}
                  backgroundColor={'#FDAC4C'}
                  checked={need.indexOf('Orange - Electrical (E)') !== -1}
                />
                <CheckBox
                  handleClick={set_need}
                  label={'Red - Fire Service (F)'}
                  backgroundColor={'#FF3434'}
                  checked={need.indexOf('Red - Fire Service (F)') !== -1}
                />
                <CheckBox
                  handleClick={set_need}
                  label={'Purple - Recycled Water (RW)'}
                  backgroundColor={'#B56EFC'}
                  checked={need.indexOf('Purple - Recycled Water (RW)') !== -1}
                />
                <CheckBox
                  handleClick={set_need}
                  label={'Pink - Unidentified/ Unknown Services'}
                  backgroundColor={'#FA82F1'}
                  checked={
                    need.indexOf('Pink - Unidentified/ Unknown Services') !== -1
                  }
                />
                <CheckBox
                  handleClick={set_need}
                  label={'Yellow - Gas (G)'}
                  backgroundColor={'#FFEC5C'}
                  checked={need.indexOf('Yellow - Gas (G)') !== -1}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 8,
                }}>
                <Text
                  color={themeColor}
                  font={22}
                  bold={true}
                  text={'Utility Code'}
                />
                <Text
                  color={themeColor}
                  font={22}
                  bold={true}
                  text={'Description of Locate'}
                />
                <Text
                  color={themeColor}
                  font={22}
                  bold={true}
                  text={'Quality of Locate'}
                />
              </View>
              <Block>
                <Input
                  textChange={(text) => setUtilityCode(text)}
                  value={utilityCode}
                  height={200}
                  inputContainerStyle={{
                    borderWidth: 0,
                    borderBottomWidth: 0,
                    width: '99%',
                    alignSelf: 'center',
                    marginLeft: 12,
                  }}
                />
              </Block>

              <Text
                color={themeColor}
                font={25}
                style={{marginVertical: 15}}
                bold={true}
                text={'Services Location Report'}
              />
              <View style={styles.checkBoxDiv}>
                {updatedImages.map((data, index) => (
                  <Image
                    source={{uri: data.path}}
                    style={{
                      height: 172,
                      width: 200,
                      resizeMode: 'contain',
                      marginVertical: 6,
                      marginRight: 6,
                    }}
                  />
                ))}
                <TouchableOpacity
                  style={styles.getImageButton}
                  onPress={getImage}>
                  <Icon
                    type={'font-awesome'}
                    name={'camera'}
                    color={'#bbb'}
                    size={52}
                  />
                </TouchableOpacity>
              </View>
              <Block row={true}>
                <Button
                  loaderColor={'#4B88BC'}
                  onPress={() => save_report()}
                  width={172}
                  title={'Save'}
                  loader={loader}
                  buttonStyle={{
                    backgroundColor: '#fff',
                    borderColor: '#4B88BC',
                    marginVertical: 45,
                    borderWidth: 1,
                    borderRadius: 25,
                    marginRight: 12,
                  }}
                  textStyle={{color: '#4B88BC'}}
                />
                <Button
                  loaderColor={'#4B88BC'}
                  loader={false}
                  width={172}
                  title={'Submit'}
                  gradient={true}
                  buttonStyle={{
                    borderWidth: 1,
                    borderRadius: 25,
                    marginHorizontal: 12,
                    marginVertical: 45,
                  }}
                />
              </Block>
            </ScrollView>
          )}
        </View>
      </View>
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

export default ProjectReport;
