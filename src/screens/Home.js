import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  AsyncStorage,
} from 'react-native';
import {themeColor} from '../Constant/index';
import Input from '../Component/Input';
import Button from '../Component/Button';
import Text from '../Component/Text';
import ProjectList from '../Component/ProjectListItem';
import {CheckBox} from 'react-native-elements';
import {Icon, SearchBar} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import ProjectListHeader from '../Component/ProjectListHeader';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {createFilter} from 'react-native-search-filter';

let projectList = [
  {
    clientName: 'Client',
    projectNumber: '1234567',
    status: 'sent',
    time: '3 hours ago',
  },
  {
    clientName: 'Client',
    projectNumber: '1234567',
    status: 'sent',
    time: '3 hours ago',
  },
  {
    clientName: 'Client',
    projectNumber: '1234567',
    status: 'draft',
    time: '3 hours ago',
  },
  {
    clientName: 'Client',
    projectNumber: '1234567',
    status: 'sent',
    time: '3 hours ago',
  },
  {
    clientName: 'Client',
    projectNumber: '1234567',
    status: 'draft',
    time: '3 hours ago',
  },
  {
    clientName: 'Client',
    projectNumber: '1234567',
    status: 'sent',
    time: '3 hours ago',
  },
  {
    clientName: 'Client',
    projectNumber: '1234567',
    status: 'sent',
    time: '3 hours ago',
  },
];

const KEYS_TO_FILTERS = ['client', 'project_number', 'status'];

function Home({navigation}) {
  const [search, onChangeSearch] = React.useState('');
  const [selected, onSelect] = React.useState(0);
  const [reports, setReports] = React.useState([]);
  // const [checked, onChangeChecked] = React.useState(false);
  // const [password, onChangePassword] = React.useState('');
  const [loader, setLoader] = useState(false);
  const loading = (boolean) => {
    setLoader(boolean);
  };
  useEffect(() => {
    database()
      .ref('/')
      .child('reports')
      .orderByChild('uid')
      .equalTo(auth().currentUser.uid)
      .on('child_added', (data) => {
        setReports((oldArray) => [...oldArray, data.val()]);
      });
  }, []);

  const edit_report = (e, index) => {
    navigation.navigate('ProjectReport', {data: reports[index]});
  };
  const delete_report = (v, i) => {
    database()
      .ref('/')
      .child(`reports/${reports[i].key}`)
      .remove()
      .then(() => {
        let old_reports = [...reports];
        old_reports.splice(i, 1);
        setReports(old_reports);
      });
  };
  const chunkArray = (myArray, chunk_size) => {
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];

    for (index = 0; index < arrayLength; index += chunk_size) {
      let myChunk = myArray.slice(index, index + chunk_size);
      // Do something if you want with the group
      tempArray.push(myChunk);
    }

    return tempArray;
  };
  const filteredReports = reports.filter(createFilter(search, KEYS_TO_FILTERS));
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
          <TouchableOpacity
            style={{marginTop: 8}}
            onPress={() => navigation.navigate('ProjectReport')}>
            <Text
              color={'#fff'}
              font={22}
              bold={true}
              text={'Create New Project'}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{marginTop: 8}}>
            <Text color={'#fff'} font={22} bold={true} text={'Projects'} />
          </TouchableOpacity>
          <TouchableOpacity style={{marginTop: 8}}>
            <Text color={'#fff'} font={22} bold={true} text={'Settings'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              auth()
                .signOut()
                .then(async () => {
                  await AsyncStorage.removeItem('user');
                  navigation.navigate('Login');
                });
            }}
            style={{marginTop: 100}}>
            <Text color={'#fff'} font={22} bold={true} text={'Logout'} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{width: '70%', backgroundColor: '#fff'}}>
        <View style={styles.rightContainer}>
          <View style={styles.topHeader}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                text={'Projects'}
                bold={true}
                font={22}
                color={themeColor}
              />
              <TouchableOpacity
                onPress={() => navigation.navigate('ProjectReport')}
                style={styles.plusButton}>
                <Icon
                  type={'antdesign'}
                  name={'plus'}
                  color={'#fff'}
                  size={16}
                />
              </TouchableOpacity>
            </View>
            <SearchBar
              placeholder="Search"
              lightTheme={true}
              round={true}
              showCancel={false}
              containerStyle={styles.searchContainer}
              inputContainerStyle={{backgroundColor: '#F1F1F1'}}
              onChangeText={(text) => onChangeSearch(text)}
              value={search}
            />
          </View>
          <ProjectListHeader />
          <FlatList
            data={chunkArray(filteredReports, 7)[selected]}
            keyExtractor={({item, index}) => `${index}`}
            renderItem={({item, index}) => (
              <ProjectList
                edit_report={(e) => edit_report(e, index)}
                delete_report={(v) => delete_report(v, index)}
                project={item}
              />
            )}
          />
          <View
            style={{
              justifyContent: 'flex-end',
              flexDirection: 'row',
              height: 70,
              alignItems: 'center',
            }}>
            {chunkArray(filteredReports, 7).map((data, index) => (
              <TouchableOpacity
                key={index}
                style={{paddingHorizontal: 14, marginTop: 6}}
                onPress={() => onSelect(index)}>
                <Text
                  color={selected === index ? themeColor : '#bbb'}
                  text={index + 1}
                  font={16}
                  bold={true}
                />
              </TouchableOpacity>
            ))}
          </View>
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
  rightContainer: {padding: '5%', flex: 1},
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  plusButton: {
    backgroundColor: '#466AA5',
    height: 25,
    width: 25,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  searchContainer: {
    padding: 0,
    backgroundColor: '#fff',
    width: '45%',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
});

export default Home;
