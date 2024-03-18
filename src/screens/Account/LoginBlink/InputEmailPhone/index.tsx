import React from "react";
import { TextInput, View } from "react-native";
import styles from "./styles";
import { Text } from "@Cypher/component-library";

interface Props {
    label: string;
    text: string | undefined;
    setText(): (text: string | undefined) => void;
    type: 'email-address' | 'phone-pad';
}

export default function InputEmailPhone({ label, text, setText, type }: Props) {
    return (
        <View style={styles.container}>
            <Text subHeader bold style={styles.text}>{label}</Text>
            <TextInput value={text} onChangeText={setText} keyboardType={type}
                returnKeyType="done"
                style={styles.textInput} />
        </View>
    )
}