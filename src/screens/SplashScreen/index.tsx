import React, { useContext, useRef, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import styles from "./styles";
import { StackActions, useNavigation } from "@react-navigation/native";
import { isHandset } from "../../../blue_modules/environment";
import { BlueStorageContext } from "../../../blue_modules/storage-context";
import BootSplash from 'react-native-bootsplash';
import { heights } from "@Cypher/style-guide";
import { dispatchNavigate } from "@Cypher/helpers";

export default function SplashScreen_() {
    const [isLoading, setIsLoading] = useState(true);
    const opacity = useRef(new Animated.Value(1));
    const translateY = useRef(new Animated.Value(0));

    const { setWalletsInitialized, startAndDecrypt } = useContext(BlueStorageContext);
    const { dispatch } = useNavigation();

    const initialise = async () => {
        BootSplash.hide({ fade: true });

        const useNativeDriver = true;

        // Animate icon up 50 pixels before animating it down off the screen
        Animated.stagger(1000, [
            Animated.spring(translateY.current, {
                useNativeDriver,
                toValue: -50,
                delay: 500,
            }),
            Animated.spring(translateY.current, {
                useNativeDriver,
                toValue: heights,
            }),
        ]).start();
        // Fade screen out
        Animated.timing(opacity.current, {
            useNativeDriver,
            toValue: 0,
            duration: 750,
            delay: 1250,
        }).start(() => {
            successfullyAuthenticated()
        });
    };

    const successfullyAuthenticated = async () => {
        if (await startAndDecrypt()) {
            setWalletsInitialized(true);
            dispatch(StackActions.replace(isHandset ? 'Navigation' : 'DrawerRoot'));
        } else {
            dispatchNavigate('WelcomeScreen')
        }
        setIsLoading(false);
    };

    return (
        <View style={styles.container}>
            {isLoading && (
                <Animated.View
                    style={[
                        StyleSheet.absoluteFill,
                        styles.splash,
                        { opacity: opacity.current },
                    ]}>
                    <Animated.Image
                        source={require('../../../img/logo.png')}
                        fadeDuration={0}
                        onLoadEnd={initialise}
                        resizeMode={'contain'}
                        style={[
                            styles.logoImage,
                            { transform: [{ translateY: translateY.current }] },
                        ]}
                    />
                </Animated.View>
            )}
        </View>
    )
}