import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import styles from "./styles";
import { GradientButton, GradientText } from "@Cypher/components";
import { useNavigation } from "@react-navigation/native";
import SimpleToast from 'react-native-simple-toast';
import { InputEmailPhone } from "@Cypher/screens/Components";
import { Button, ScreenLayout, Text } from "@Cypher/component-library";
import { dispatchNavigate, dispatchReset } from "@Cypher/helpers";
import { registerUser } from "../../../../api/coinOSApis";
import { colors } from "@Cypher/style-guide";
import { emailRegex, passwordRegex, strongPasswordMessage } from "@Cypher/helpers/regex";

export default function CreateCoinOSScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const loginClickHandler = () => {
        console.log('login click');
        dispatchNavigate('LoginCoinOSScreen');
    }

    const createClickHandler = async () => {
        setIsLoading(true);
        if(email == "") {
            SimpleToast.show('Please enter your username', SimpleToast.SHORT);
            setIsLoading(false);
            return;
        } else if(password == ""){
            SimpleToast.show('Please enter your password', SimpleToast.SHORT);
            setIsLoading(false);
            return;
        } 
        // else if (!validateEmail(email)) {
        //     SimpleToast.show('Please enter a valid email address.', SimpleToast.SHORT);
        //     setIsLoading(false);
        //     return;
        // } 
        else if (!validatePassword(password)) {
            SimpleToast.show(strongPasswordMessage, SimpleToast.LONG);
            setIsLoading(false);
            return;
        }

        try {
            const response: any = await registerUser(email, password);
            console.log('User registration successful:', response);
            if(response == "null user") {
                loginClickHandler();                
                setEmail('');
                setPassword('');
            } else {
                SimpleToast.show(response, SimpleToast.SHORT);
            }
        } catch (error: any) {
            console.error('Error registering user:', error?.message);
            SimpleToast.show(error?.message, SimpleToast.SHORT);
        } finally {
            setIsLoading(false);
        }
    }

    const validateEmail = (email: string) => {
        return emailRegex.test(email);
    }

    const validatePassword = (password: string) => {
        return passwordRegex.test(password);
    }



    return (
        <ScreenLayout disableScroll showToolbar progress={1}>
            <View style={styles.container}>
                <View style={styles.innerView}>
                    <GradientText>Create Coinos Account</GradientText>
                    <InputEmailPhone label={`Username`} setText={setEmail} text={email} style={{ marginTop: 50 }} />
                    <InputEmailPhone label="Password" setText={setPassword} text={password} />
                    <Button 
                        style={StyleSheet.flatten(styles.button)} 
                        loading={isLoading} 
                        disabled={isLoading} 
                        loaderColor={colors.black.default} 
                        textStyle={styles.text} 
                        text="Create Account" 
                        onPress={createClickHandler} 
                    />
                </View>
                <Text style={styles.create}>Already have an an account with Coinos?</Text>
                <GradientButton title="Login" onPress={loginClickHandler} />
            </View>
        </ScreenLayout>
    )
}
