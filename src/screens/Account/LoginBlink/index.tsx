import React, { useState } from "react";
import { View } from "react-native";
import styles from "./styles";
import { GradientButton, GradientText } from "@Cypher/components";
import { useNavigation } from "@react-navigation/native";
import InputEmailPhone from "./InputEmailPhone";
import { ScreenLayout, Text } from "@Cypher/component-library";
import { dispatchNavigate } from "@Cypher/helpers";

export default function LoginBlink() {
    const [email, setEmail] = useState<string | null>(null);
    const [phone, setPhone] = useState<string | null>(null);
    const { navigate } = useNavigation();

    const nextClickHandler = () => {
        dispatchNavigate('LoginBlinkPhone');
    }

    return (
        <ScreenLayout disableScroll showToolbar progress={1}>
            <View style={styles.container}>
                <View style={styles.innerView}>
                    <GradientText>Login to Blink</GradientText>
                    <Text h2 bold style={styles.title}>Were you able to register at Blink?</Text>
                    <Text h4 style={styles.title}>If you did, you should login with you phone number or email. If not, Try again. Currently you cannot use Cypher Box without Blink, but in the future we will offer more options. Stay tuned!</Text>
                    <InputEmailPhone label={`Phone \nNumber`} setText={setPhone} text={phone} type="phone-pad" />
                    <View style={styles.view}>
                        <View style={styles.line} />
                        <Text bold style={styles.or}>OR</Text>
                        <View style={styles.line} />
                    </View>
                    <InputEmailPhone label="E-mail" setText={setEmail} text={email} type="email-address" />
                </View>
                <GradientButton title="Home" onPress={nextClickHandler} />
            </View>
        </ScreenLayout>
    )
}
