import React, { useState } from "react";
import { View } from "react-native";
import styles from "./styles";
import { GradientButton, GradientCard, GradientText } from "@Cypher/components";
import { Input, ScreenLayout } from "@Cypher/component-library";
import { dispatchNavigate } from "@Cypher/helpers";
import { colors } from "@Cypher/style-guide";

export default function LoginCoinOSScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const nextClickHandler = () => {
        console.log('login click');
        dispatchNavigate('HomeScreen', {
            isLogin_: true
        });
    }

    return (
        <ScreenLayout disableScroll showToolbar>
            <View style={styles.container}>
                <View style={styles.innerView}>
                    <GradientText>Login to Coinos</GradientText>
                    <View style={styles.space} />
                    <GradientCard style={{width: '100%'}} colors_={email ? [colors.pink.extralight, colors.pink.default] : [colors.gray.thin, colors.gray.thin2]}>
                        <Input onChange={setEmail}
                            value={email}
                            style={styles.textInput}
                            keyboardType="email-address"
                            label="Email"
                        />
                    </GradientCard>
                    <View style={styles.extra} />
                    <GradientCard style={{ width: '100%' }} colors_={password ? [colors.pink.extralight, colors.pink.default] : [colors.gray.thin, colors.gray.thin2]}>
                        <Input onChange={setPassword}
                            value={password}
                            style={styles.textInput}
                            secureTextEntry
                            maxLength={15}
                            label="Password"
                        />
                    </GradientCard>
                </View>
                <GradientButton title="Login" onPress={nextClickHandler} />
            </View>
        </ScreenLayout>
    )
}
