import React from "react";
import { TextInput, View, ViewStyle } from "react-native";
import styles from "./styles";
import { Text } from "@Cypher/component-library";

interface Props {
    label: string;
    text: string;
    setText: any;
    style?: ViewStyle;
    secureTextEntry?: boolean;
    type?: 'email-address' | 'phone-pad';
}

export default function InputEmailPhone({ label, text, setText, type, style, secureTextEntry=false }: Props) {
    return (
        <View style={[styles.container,style && style]}>
            <Text subHeader bold style={styles.text}>{label}</Text>
            <TextInput value={text} onChangeText={setText} keyboardType={type}
                returnKeyType="done"
                secureTextEntry={secureTextEntry}
                style={styles.textInput} />
        </View>
    )
}