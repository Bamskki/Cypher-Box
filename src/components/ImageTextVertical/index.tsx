import { Text } from "@Cypher/component-library";
import { colors } from "@Cypher/style-guide";
import React from "react";
import { Image, ImageStyle, StyleSheet, TextStyle, TouchableOpacity } from "react-native";

interface Props {
    source: any;
    text: string;
    onPress?(): void;
    imageStyle?: ImageStyle;
    textStyle?: TextStyle;
}

export default function ImageTextVertical({ text, source, onPress, imageStyle, textStyle }: Props) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container} disabled={!onPress}>
            <Image source={source} style={[styles.image, imageStyle && imageStyle]} />
            <Text bold h2 style={StyleSheet.flatten([styles.text, textStyle && textStyle])}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 56,
        alignItems: 'center',
        // alignSelf: 'center',
        justifyContent: 'space-around',
        // flex: 1,
        flexDirection: 'row',
        backgroundColor: colors.black.default,
        borderWidth: 2,
        borderColor: colors.gray.light,
        borderRadius: 15,
        paddingHorizontal: 20,
    },
    text: {
        fontSize: 18,
        lineHeight: 26,
        marginStart: 10,
    },
    image: {
        width: 30,
        height: 30,
    }
})