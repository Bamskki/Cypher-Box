import React from "react";
import { Text, View } from "react-native";
import styles from "./styles";

interface Props {
    text: string;
}

export default function Description({ text }: Props) {
    return (
        <View style={styles.view}>
            <View style={styles.circle} />
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}