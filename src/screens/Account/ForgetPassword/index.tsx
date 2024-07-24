import React, { useState } from "react";
import { View } from "react-native";
import SimpleToast from "react-native-simple-toast";
import styles from "./styles";
import { GradientButton, GradientCard, GradientText } from "@Cypher/components";
import { Input, ScreenLayout, Text } from "@Cypher/component-library";
import { colors } from "@Cypher/style-guide";
import { forgetPassword, getMe, updateUserName } from "@Cypher/api/coinOSApis";
import useAuthStore from "@Cypher/stores/authStore";
import { dispatchNavigate } from "@Cypher/helpers";
import { emailRegex } from "@Cypher/helpers/regex";

export default function ForgetPassword({navigation, route}: any) {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const validateEmail = (email: string) => {
        return emailRegex.test(email);
    }

    const nextClickHandler = async () => {
        setIsLoading(true);
        if (email == "") {
            SimpleToast.show("Please enter your username", SimpleToast.SHORT);
            setIsLoading(false);
            return;
        } else if (!validateEmail(email)) {
            SimpleToast.show('Please enter a valid email address.', SimpleToast.SHORT);
            setIsLoading(false);
            return;
        } 

        try {
            const response: any = await forgetPassword(email);
            console.log("User Changed successful:", response);
            if (response && response?.startsWith('{')) {
                //SimpleToast.show("Verification Email Sent.", SimpleToast.SHORT);    
                setIsClicked(true)
                // dispatchNavigate('AccountStatus');    
            } else {
                SimpleToast.show(response, SimpleToast.SHORT);
            }
        } catch (error: any) {
            console.error("Error Username user:", error?.message);
            SimpleToast.show(error?.message, SimpleToast.SHORT);
        } finally {
            setIsLoading(false);
        }
    };
    
    console.log('isClicked: ', isClicked)
    return (
        <ScreenLayout disableScroll showToolbar>
            <View style={styles.container}>
                <View style={styles.innerView}>
                    <GradientText>Password Reset</GradientText>
                    <View style={styles.space} />
                    {isClicked ?
                        <Text bold center style={{ fontSize: 18, lineHeight: 30 }}>A password reset link will be sent to your email if we have it on file.</Text>
                    :
                        <GradientCard style={{width: '100%'}} colors_={email ? [colors.pink.extralight, colors.pink.default] : [colors.gray.thin, colors.gray.thin2]}>
                            <Input onChange={setEmail}
                                value={email}
                                style={styles.textInput}
                                // keyboardType="email-address"
                                label="Email"
                            />
                        </GradientCard>
                    }
                    <View style={styles.extra} />
                </View>
                <GradientButton title={isClicked ? "Continue" : "Submit"} disabled={!email.length || isLoading} onPress={() => isClicked ? navigation.goBack() : nextClickHandler()} />
            </View>
        </ScreenLayout>
    )
}
