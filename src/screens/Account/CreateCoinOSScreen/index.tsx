import React, { useRef, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import styles from "./styles";
import { GradientButton, GradientCard, GradientText } from "@Cypher/components";
import { useNavigation } from "@react-navigation/native";
import { InputEmailPhone } from "@Cypher/screens/Components";
import { Button, Input, ScreenLayout, Text } from "@Cypher/component-library";
import { dispatchNavigate } from "@Cypher/helpers";
import { colors } from "@Cypher/style-guide";

export default function CreateCoinOSScreen() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const passwordRef = useRef<TextInput>(null);
    const emailRef = useRef<TextInput>(null);

    const loginClickHandler = () => {
        console.log('login click');
        dispatchNavigate('AccountStatus');
    }

    const createClickHandler = () => {
        console.log('create account click');
        dispatchNavigate('AccountStatus');
    }

    return (
        <ScreenLayout disableScroll showToolbar progress={1}>
            <View style={styles.container}>
                {/* <View style={styles.innerView}>
                    <GradientText>Create Coinos Account</GradientText>
                    <InputEmailPhone label={`E-mail`} setText={setPhone} text={phone} type="email-address" style={{ marginTop: 50 }} />
                    <InputEmailPhone label="Password" setText={setEmail} text={email} />
                    <Button style={StyleSheet.flatten(styles.button)} textStyle={styles.text} text="Create Account" onPress={createClickHandler} />
                </View>
                <Text style={styles.create}>Already have an an account with Coinos?</Text> */}
                <View style={styles.innerView}>
                    <GradientText>Login to Coinos</GradientText>
                    <View style={styles.space} />
                    <GradientCard style={styles.gradient} colors_={username ? [colors.pink.extralight, colors.pink.default] : [colors.gray.thin, colors.gray.thin2]}>
                        <Input onChange={setUsername}
                            value={username}
                            style={styles.textInput}
                            returnKeyType="next"
                            onSubmitEditing={() => emailRef?.current?.focus() }
                            label="Username"
                        />
                    </GradientCard>
                    <View style={styles.extra} />
                    <GradientCard style={styles.gradient} colors_={email ? [colors.pink.extralight, colors.pink.default] : [colors.gray.thin, colors.gray.thin2]}>
                        <Input onChange={setEmail}
                            ref={emailRef}
                            value={email}
                            style={styles.textInput}
                            returnKeyType="next"
                            onSubmitEditing={() => passwordRef?.current?.focus() }
                            keyboardType="email-address"
                            label="Email"
                        />
                    </GradientCard>
                    <View style={styles.extra} />
                    <GradientCard style={styles.gradient} colors_={password ? [colors.pink.extralight, colors.pink.default] : [colors.gray.thin, colors.gray.thin2]}>
                        <Input onChange={setPassword}
                            ref={passwordRef}
                            value={password}
                            style={styles.textInput}
                            secureTextEntry
                            maxLength={15}
                            label="Password"
                        />
                    </GradientCard>
                </View>
                <GradientButton title="Create Account" onPress={loginClickHandler} disabled={!email.length || !password.length}/>
            </View>
        </ScreenLayout>
    )
}
