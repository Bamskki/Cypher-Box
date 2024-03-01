import React, { useContext, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import Description from "./Description";
import LinearGradient from "react-native-linear-gradient";
import { StackActions, useNavigation } from "@react-navigation/native";
import { isHandset } from "../../../blue_modules/environment";
import { BlueStorageContext } from "../../../blue_modules/storage-context";

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
        setClick(true);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>CYPHER{'\n'}BANK</Text>
            <View>
                <Description text="A 'sat' is a tiny fraction of a Bitcoin" />
                <Description text="100M sats equal 1 Bitcoin" />
                <Description text="There will olny ever be 21M Bitcoin" />
            </View>
            <View>
                <Text style={styles.bottomtitle}>Good Luck{'\n'}Have fun!</Text>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#f456c8', '#c71c97']} style={styles.linearGradient}>
                    <TouchableOpacity style={styles.linearGradient}
                        onPress={startClickHandler}>
                        <Text style={styles.buttonText}>
                            Start
                        </Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        </View>
    )
}