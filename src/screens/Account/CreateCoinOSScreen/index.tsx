import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import styles from "./styles";
import { GradientButton, GradientText } from "@Cypher/components";
import { useNavigation } from "@react-navigation/native";
import { InputEmailPhone } from "@Cypher/screens/Components";
import { Button, ScreenLayout, Text } from "@Cypher/component-library";
import { dispatchNavigate } from "@Cypher/helpers";

export default function CreateCoinOSScreen() {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const loginClickHandler = () => {
        console.log('login click');
        dispatchNavigate('LoginCoinOSScreen');
    }

    const createClickHandler = () => {
        console.log('create account click');
        dispatchNavigate('AccountStatus');
    }

    return (
        <ScreenLayout disableScroll showToolbar progress={1}>
            <View style={styles.container}>
                <View style={styles.innerView}>
                    <GradientText>Create Coinos Account</GradientText>
                    <InputEmailPhone label={`E-mail`} setText={setPhone} text={phone} type="email-address" style={{ marginTop: 50 }} />
                    <InputEmailPhone label="Password" setText={setEmail} text={email} />
                    <Button style={StyleSheet.flatten(styles.button)} textStyle={styles.text} text="Create Account" onPress={createClickHandler} />
                </View>
                <Text style={styles.create}>Already have an an account with Coinos?</Text>
                <GradientButton title="Login" onPress={loginClickHandler} />
            </View>
        </ScreenLayout>
    )
}
