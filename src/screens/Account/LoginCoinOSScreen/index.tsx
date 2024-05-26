import React, { useState } from "react";
import { View } from "react-native";
import SimpleToast from "react-native-simple-toast";
import styles from "./styles";
import { GradientButton, GradientCard, GradientText } from "@Cypher/components";
import { Input, ScreenLayout } from "@Cypher/component-library";
import { dispatchNavigate } from "@Cypher/helpers";
import { colors } from "@Cypher/style-guide";
import { dispatchReset } from "@Cypher/helpers/navigation";
import { loginUser } from "@Cypher/api/coinOSApis";
import useAuthStore from "@Cypher/stores/authStore";

export default function LoginCoinOSScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { setToken, setAuth, setUser } = useAuthStore();


    const nextClickHandler = async () => {
        setIsLoading(true);
        if (email == "") {
            SimpleToast.show("Please enter your username", SimpleToast.SHORT);
            setIsLoading(false);
            return;
        } else if (password == "") {
            SimpleToast.show("Please enter your password", SimpleToast.SHORT);
            setIsLoading(false);
            return;
        }
    
        try {
            const response: any = await loginUser(email, password);
            console.log("User Login successful:", response);
            if (response.token) {
                setAuth(true);
                setToken(response?.token);
                setUser(response?.user);
                dispatchReset("HomeScreen");
            } else {
                SimpleToast.show("Invalid usernmae or password", SimpleToast.SHORT);
            }
    
            // await AsyncStorage.setItem("viewWithdraw", "1");
        } catch (error: any) {
            console.error("Error login user:", error?.message);
            SimpleToast.show(error?.message, SimpleToast.SHORT);
        } finally {
            setIsLoading(false);
        }
    };

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
                            // keyboardType="email-address"
                            label="Username"
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
                <GradientButton title="Login" disabled={!email.length || !password.length || isLoading} onPress={nextClickHandler} />
            </View>
        </ScreenLayout>
    )
}
