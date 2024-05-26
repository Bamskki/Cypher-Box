import React, { useState } from "react";
import { View } from "react-native";
import SimpleToast from "react-native-simple-toast";
import styles from "./styles";
import { GradientButton, GradientCard, GradientText } from "@Cypher/components";
import { Input, ScreenLayout } from "@Cypher/component-library";
import { colors } from "@Cypher/style-guide";
import { updateUserName } from "@Cypher/api/coinOSApis";
import useAuthStore from "@Cypher/stores/authStore";
import { dispatchNavigate } from "@Cypher/helpers";

export default function ChangeUsername({navigation}: any) {
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { setUser } = useAuthStore();

    const nextClickHandler = async () => {
        setIsLoading(true);
        if (username == "") {
            SimpleToast.show("Please enter your username", SimpleToast.SHORT);
            setIsLoading(false);
            return;
        }
    
        try {
            const response: any = await updateUserName(username);
            console.log("User Changed successful:", response);
            if (response && response !== 'Username taken') {
                setUser(username);
                SimpleToast.show("Username Changed Successfully", SimpleToast.SHORT);
                dispatchNavigate('AccountStatus');
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
    
    return (
        <ScreenLayout disableScroll showToolbar progress={1}>
            <View style={styles.container}>
                <View style={styles.innerView}>
                    <GradientText>Change Username</GradientText>
                    <View style={styles.space} />
                    <GradientCard style={{width: '100%'}} colors_={username ? [colors.pink.extralight, colors.pink.default] : [colors.gray.thin, colors.gray.thin2]}>
                        <Input onChange={setUsername}
                            value={username}
                            style={styles.textInput}
                            // keyboardType="email-address"
                            label="Username"
                        />
                    </GradientCard>
                    <View style={styles.extra} />
                </View>
                <GradientButton title="Change Username" disabled={!username.length || isLoading} onPress={nextClickHandler} />
            </View>
        </ScreenLayout>
    )
}
