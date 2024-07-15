import React from "react";
import { View } from "react-native";
import styles from "./styles";
import { Text } from "@Cypher/component-library";

export default function Tips() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Security Tips:</Text>
            <Text h4 style={styles.descption}>
                • Write them the correct order from 1 to 12{'\n'}
                • Do not reveal to anyone{'\n'}
                • Make multiple copies{'\n'}
                • Store in secure locations
            </Text>
        </View>
    )
}
