import React from "react";
import { View } from "react-native";
import styles from "./styles";
import { Text } from "@Cypher/component-library";

interface Props {
    text: string;
}

export default function Description({ text }: Props) {
    return (
        <View style={styles.view}>
            <View style={styles.circle} />
            <Text h4 style={styles.text}>{text}</Text>
        </View>
    )
}