import React, { useState } from "react";
import { View } from "react-native";
import styles from "./styles";
import { GradientButton, GradientText } from "@Cypher/components";
import { InputEmailPhone } from "@Cypher/screens/Components";
import { ScreenLayout } from "@Cypher/component-library";
import { dispatchNavigate } from "@Cypher/helpers";

export default function LoginCoinOSScreen() {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const nextClickHandler = () => {
        console.log('login click');
        dispatchNavigate('AccountStatus');
    }

    return (
        <ScreenLayout disableScroll showToolbar progress={1}>
            <View style={styles.container}>
                <View style={styles.innerView}>
                    <GradientText>Login to Coinos</GradientText>
                    <InputEmailPhone label={`E-mail`} setText={setPhone} text={phone} type="email-address" style={{ marginTop: 50 }} />
                    <InputEmailPhone label="Password" setText={setEmail} text={email} />
                </View>
                <GradientButton title="Login" onPress={nextClickHandler} />
            </View>
        </ScreenLayout>
    )
}
