import React, { useState } from "react";
import { TextInput, View } from "react-native";
import styles from "./styles";
import { GradientButton } from "@Cypher/components";
import { useNavigation } from "@react-navigation/native";
import { ScreenLayout, Text } from "@Cypher/component-library";

interface Props {
    route: any;
}

export default function VerifyPhone({ route}:Props) {
    const [code, setCode] = useState<string>('');
    const { navigate } = useNavigation();

    const nextClickHandler = () => {
        navigate('AccountStatus');
    }

    return (
        <ScreenLayout disableScroll showToolbar progress={1}>
            <View style={styles.container}>
                <View style={styles.innerView}>
                    <Text h2 semibold style={styles.title}>{`To confirm your phone number, enter code we sent you by SMS on ${route?.params?.phone}`}</Text>
                    <TextInput
                        value={code}
                        onChangeText={setCode}
                        keyboardType='phone-pad'
                        returnKeyType="done"
                        maxLength={6}
                        style={styles.textInput}
                        placeholder="000-000"
                    />
                </View>
                <GradientButton title="Submit" onPress={nextClickHandler} disabled={code.length < 6} />
            </View>
        </ScreenLayout>
    )
}
