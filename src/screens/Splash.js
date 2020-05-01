/* eslint-disable */

import React, { useState, useEffect } from 'react';
import {
    StyleSheet, View, Image,
} from 'react-native';
// import auth from '@react-native-firebase/auth';
function SplashScreen({ navigation }) {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Login')
        }, 1000)
    }, []);
    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')}
                style={{
                    height: 180, width: '60%',
                    resizeMode: "contain", marginBottom: 63
                }} />
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
})

export default SplashScreen

