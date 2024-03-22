import React, { useContext, useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import Description from "./Description";
import { StackActions, useNavigation } from "@react-navigation/native";
import { isHandset } from "../../../blue_modules/environment";
import { BlueStorageContext } from "../../../blue_modules/storage-context";
import { MiddleImage, TitleImage } from "../../../img";
import { Start, Title } from "@Cypher/assets/images";
import { ScreenLayout } from "@Cypher/component-library";

export default function WelcomeScreen() {
    const { setWalletsInitialized, startAndDecrypt } = useContext(BlueStorageContext);
    const { dispatch } = useNavigation();
    const [isClick, setClick] = useState(false);

    useEffect(() => {
        if (isClick) {
            successfullyAuthenticated();
        }
    }, [isClick, setClick]);

    const successfullyAuthenticated = async () => {
        await startAndDecrypt()
        setWalletsInitialized(true);
        dispatch(StackActions.replace(isHandset ? 'Navigation' : 'DrawerRoot'));
    };

    const startClickHandler = () => {
        console.log('start click');
        setClick(true);
    }

    return (
        <ScreenLayout style={styles.container}>
            <View style={styles.inner}>
                <Image source={Title} style={styles.title}
                    resizeMode="contain" />
                <Image
                    source={require('../../../img/logo.png')}
                    resizeMode={'contain'}
                    style={styles.logoImage}
                />
                <View style={{ alignSelf: 'center' }}>
                    <Description text="A 'sat' is a tiny fraction of a Bitcoin" />
                    <Description text="100M sats equal 1 Bitcoin" />
                    <Description text="There will olny ever be 21M Bitcoin" />
                </View>
                <Image source={MiddleImage} style={styles.middle}
                    resizeMode="contain" />
                <TouchableOpacity onPress={startClickHandler}>
                    <Image source={Start} style={styles.start}
                        resizeMode="contain" />
                </TouchableOpacity>
            </View>
        </ScreenLayout>
    )
}