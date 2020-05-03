import React, { useState, useEffect } from 'react';
import {
    StyleSheet, View, Image, ScrollView, TouchableOpacity, FlatList
} from 'react-native';
import { themeColor } from '../Constant/index'
import Input from '../Component/Input'
import Button from '../Component/Button'
import Text from '../Component/Text'
import ProjectList from '../Component/ProjectListItem'
import { Icon, SearchBar } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';

const Block = ({ children, row, label }) =>
    <View style={{ flex: 1, flexDirection: row ? 'row' : 'column' }}>
        {
            children ?
                children :
                <Input label={label} />
        }

    </View>

const CheckBox = ({ label, checked, backgroundColor }) =>
    <TouchableOpacity style={{
        flexDirection: 'row', marginRight: 20,
        alignItems: 'center', marginVertical: 4

    }} >
        <Icon type={'material-community'}
            name={checked ? 'checkbox-blank-outline' : 'check-box-outline'}
            color={themeColor}
            size={27}
            containerStyle={{ marginTop: 2 }}
        />
        <Text color={themeColor} font={20}
            style={{
                paddingHorizontal: 12, paddingVertical: 3,
                backgroundColor: backgroundColor ? backgroundColor : null
            }}
            bold={true}
            text={label} />
    </TouchableOpacity>

function ProjectReport({ navigation }) {
    // const [checked, onChangeChecked] = React.useState(false);
    // const [password, onChangePassword] = React.useState('');
    const [loader, setLoader] = useState(false);
    const [images, setImages] = useState([]);
    const loading = (boolean) => {
        setLoader(boolean);
    };


    function getImage() {
        ImagePicker.openPicker({
            multiple: true
        }).then(images => {
            console.log(images);
            setImages(images)
        });

    }
    return (
        <View style={{ flex: 1, flexDirection: "row" }} >
            <View style={{
                width: '30%', backgroundColor: "#466AA5",
            }}>
                <View style={{ paddingLeft: '8%', }}>
                    <Image source={require('../assets/whiteLogo.png')}
                        style={{
                            height: 180, width: '70%',
                            resizeMode: "contain",
                        }} />
                    <Text color={'#fff'} font={22} bold={true} text={'Project Name'} />
                    <Text color={'#fff'} font={22} bold={true} text={'Project Detail'} />
                    <Text color={'#fff'} font={22} bold={true} text={'Add New Page'} />
                    <Text color={'#fff'} font={22} bold={true} text={'Complete'} />
                    <Text color={'#fff'} font={22} bold={true} text={'Back'} />
                </View>
            </View>
            <View style={{ width: '70%', backgroundColor: '#fff' }}>
                <View style={styles.rightContainer}>
                    <ScrollView>
                        <Text color={themeColor} font={25}
                            bold={true} text={'Start A Report'} />
                        <Block row={true}>
                            <Block label={'Locator'} />
                            <Block label={'Activity Date'} />
                        </Block>
                        <Block row={true}>
                            <Block label={'Docket'} />
                            <Block label={'DBYD'} />
                        </Block>
                        <Block row={true}>
                            <Block label={'Job'} />
                            <Block label={'P/O'} />
                        </Block>
                        <Text color={themeColor} font={25}
                            style={{ marginVertical: 15 }}
                            bold={true} text={'Who are we sending this to?'} />
                        <Block row={true}>
                            <Block label={'Client'} />
                            <Block label={'Client Contact'} />
                        </Block>
                        <Block row={true}>
                            <Block label={'Phone Number'} />
                            <Block label={'Email'} />
                        </Block>

                        <Text color={themeColor} font={25}
                            style={{ marginVertical: 15 }}
                            bold={true} text={'Where are we sending this?'} />
                        <Block label={'Address'} />
                        <Block label={'Site Specific Location'} />
                        <Block label={'Proposed Job Description'} />

                        <Text color={themeColor} font={25}
                            style={{ marginVertical: 15 }}
                            bold={true} text={'What type of report?'} />

                        <View style={styles.checkBoxDiv}>
                            <CheckBox label={'Hard Copy'} checked={false} />
                            <CheckBox label={'Photo Report'} checked={false} />
                            <CheckBox label={'All Known Services'} checked={false} />
                            <CheckBox label={'Requested By Client'} checked={false} />
                        </View>

                        <Text color={themeColor} font={25}
                            style={{ marginVertical: 15 }}
                            bold={true} text={'What do I need?'} />

                        <View style={styles.checkBoxDiv}>
                            <CheckBox label={'White - Telecommunications (C)'} checked={false} />
                            <CheckBox label={'Blue - Water (W)'} backgroundColor={'#82E8FA'} checked={false} />
                            <CheckBox label={'Cream - Sewer (S)'} backgroundColor={'#FFF8D9'} checked={false} />
                            <CheckBox label={'Green - Storm Water(SW) '} backgroundColor={'#82FA94'} checked={false} />
                            <CheckBox label={'Orange - Electrical (E) '} backgroundColor={'#FDAC4C'} checked={false} />
                            <CheckBox label={'Red - Fire Service (F) '} backgroundColor={'#FF3434'} checked={false} />
                            <CheckBox label={'Purple - Recycled Water (RW) '} backgroundColor={'#B56EFC'} checked={false} />
                            <CheckBox label={'Pink - Unidentified/ Unknown Services '} backgroundColor={'#FA82F1'} checked={false} />
                            <CheckBox label={'Yellow - Gas (G)'} backgroundColor={'#FFEC5C'} checked={false} />
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8 }}>
                            <Text color={themeColor} font={22} bold={true} text={'Utility Code'} />
                            <Text color={themeColor} font={22} bold={true} text={'Description of Locate'} />
                            <Text color={themeColor} font={22} bold={true} text={'Quality of Locate'} />
                        </View>
                        <Block>
                            <Input
                                height={200}
                                inputContainerStyle={{
                                    borderWidth: 0, borderBottomWidth: 0,
                                    width: "99%", alignSelf: 'center', marginLeft: 12
                                }}
                            />
                        </Block>

                        <Text color={themeColor} font={25}
                            style={{ marginVertical: 15 }}
                            bold={true} text={'Services Location Report'} />
                        <View style={styles.checkBoxDiv}>
                            {
                                images.map((data, index) => <Image source={{ uri: data.path }}
                                    style={{
                                        height: 172, width: 200, resizeMode: 'contain',
                                        marginVertical: 6, marginRight: 6
                                    }} />)
                            }
                            <TouchableOpacity style={styles.getImageButton} onPress={getImage} >
                                <Icon type={"font-awesome"} name={'camera'} color={'#bbb'} size={52} />
                            </TouchableOpacity>
                        </View>

                        <Block row={true}>
                            <Button width={172} title={'Save'}
                                buttonStyle={{
                                    backgroundColor: "#fff", borderColor: '#4B88BC', marginTop: 12, marginVertical: 41,
                                    borderWidth: 1, borderRadius: 25, marginRight: 12
                                }}
                                textStyle={{ color: '#4B88BC' }} />
                            <Button width={172} title={'Submit'}
                                gradient={true}
                                buttonStyle={{
                                    borderWidth: 1, borderRadius: 25, marginHorizontal: 12, marginTop: 12, marginVertical: 41,
                                }} />
                        </Block>
                    </ScrollView>
                </View>
            </View>

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    getImageButton: {
        height: 172, width: 200, justifyContent: "center", alignItems: 'center',
        borderWidth: 1, borderColor: '#bbb'
    },
    checkBoxDiv: { flexDirection: 'row', flexWrap: "wrap", marginVertical: 6 },
    flex: { flex: 1 },
    rightContainer: { padding: '5%', flex: 1 },
})

export default ProjectReport