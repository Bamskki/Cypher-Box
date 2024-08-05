import { Text } from "@Cypher/component-library";
import React from "react";
import { StyleSheet, TextStyle, View, ViewStyle } from "react-native";

interface Props {
    keytext: string;
    text?: string;
    textStyle?: TextStyle;
    style?: ViewStyle
}

export default function TextView({ keytext, text, textStyle, style }: Props) {
    return (
        <View style={[styles.container, style]}>
            <Text bold style={{ fontSize: 18 }}>{keytext}</Text>
            <Text italic style={StyleSheet.flatten([styles.text, textStyle && textStyle])}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 30,
        marginStart: 15,
        marginEnd: 10,
    },
    text: {
        flex: 1,
        fontSize: 18,
        marginTop: 3,
    }
})