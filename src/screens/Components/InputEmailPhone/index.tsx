import React from "react";
import { TextInput, View, ViewStyle } from "react-native";
import styles from "./styles";
import { Text } from "@Cypher/component-library";

interface Props {
    label: string;
    text: string;
    setText: any;
    style?: ViewStyle;
    type?: 'email-address' | 'phone-pad';
}

export default function InputEmailPhone({ label, text, setText, type, style }: Props) {
    return (
        <View style={[styles.container,style && style]}>
            <Text subHeader bold style={styles.text}>{label}</Text>
            <TextInput value={text} onChangeText={setText} keyboardType={type}
                returnKeyType="done"
                style={styles.textInput} />
        </View>
    )
}