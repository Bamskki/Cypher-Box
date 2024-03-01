import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, NativeModules, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
// import Description from "./Description";
import LinearGradient from "react-native-linear-gradient";
import { StackActions, useNavigation } from "@react-navigation/native";
import { isHandset } from "../../../blue_modules/environment";
import { BlueStorageContext } from "../../../blue_modules/storage-context";
import { Image } from "react-native";
import { navigate } from "../../../NavigationService";

const { SplashScreen } = NativeModules;

export default function SplashScreen_() {
    const { setWalletsInitialized, startAndDecrypt } = useContext(BlueStorageContext);
    const { dispatch } = useNavigation();

    useEffect(() => {
        SplashScreen?.dismissSplashScreen();
        successfullyAuthenticated()
    }, []);

    const successfullyAuthenticated = async () => {
        if (await startAndDecrypt()) {
            navigate('WelcomeScreen')
            // setWalletsInitialized(true);
            // dispatch(StackActions.replace(isHandset ? 'Navigation' : 'DrawerRoot'));
        } else {
            navigate('WelcomeScreen')
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../../img/logo.png')} style={styles.logoImage} resizeMode="contain" />
        </View>
    )
}