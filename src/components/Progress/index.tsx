import { colors } from "@Cypher/style-guide";
import React from "react";
import { View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import styles from "./styles";

interface Props {
    current: number;
    color?: string[];
}

export default function Progress({ current = 0, color }: Props) {
    const data = [1, 2, 3];
    return (
        <View style={styles.container}>
            {data.map((i, index) => {
                return (
                    <>
                        <LinearGradient
                            key={index}
                            style={styles.linear}
                            start={{ x: 1, y: 0 }}
                            end={{ x: 0, y: 0 }}
                            colors={current >= index ? color ? color : [colors.pink.default, colors.pink.light] : [colors.black.light, colors.black.light]} />
                        {index !== 2 &&
                            <View style={{
                                width: 80, height: 1,
                                backgroundColor: (current - 1) >= index ? color ? (color[0] || colors.green) : colors.pink.default : colors.black.light,
                                // left: -2
                            }} />
                        }
                    </>
                )
            })}
        </View>
    )
}