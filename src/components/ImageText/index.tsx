import { Text } from "@Cypher/component-library";
import React, { ReactNode } from "react";
import { Image, ImageSourcePropType, ImageStyle, StyleSheet, TextStyle, TouchableOpacity } from "react-native";

interface Props {
    source: ImageSourcePropType | ReactNode;
    text: string;
    onPress?(): void;
    imageStyle?: ImageStyle;
    textStyle?: TextStyle;
    isTextAfter?: boolean;
}

export default function ImageText({ text, source, onPress, imageStyle, textStyle, isTextAfter = false }: Props) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container} disabled={!onPress}>
            {isTextAfter ?
                <>
                    <Text bold h2 style={StyleSheet.flatten([styles.textEnd, textStyle && textStyle])}>{text}</Text>
                    {(typeof source == 'number') ?
                        <Image source={source} style={[styles.image, imageStyle && imageStyle]} />
                        :
                        source
                    }
                </>
                :
                <>
                    <Image source={source} style={[styles.image, imageStyle && imageStyle]} />
                    <Text bold h2 style={StyleSheet.flatten([styles.text, textStyle && textStyle])}>{text}</Text>
                </>
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: '100%',
    },
    image: {
        width: 30,
        height: 30,
    },
    text: {
        marginStart: 10,
    },
    textEnd: {
        marginEnd: 10,
    }
})