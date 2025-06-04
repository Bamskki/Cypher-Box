import { Text } from "@Cypher/component-library";
import { GradientCardWithShadow } from "@Cypher/components";
import React from "react";
import { Image, View } from "react-native";
import styles from "../styles";

interface Props {
    onPress(): void;
}

export default function CreateLightningAccount({ onPress }: Props) {
    // return <View style={{ height: '42%' }}>
    return <View>
        <GradientCardWithShadow
            style={styles.createView}
            onPress={onPress}
        >
            <View style={styles.middle}>
                <Image
                    style={styles.arrow}
                    resizeMode="contain"
                    source={require("../../../../img/arrow-right.png")}
                />
                <View style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                    <Text h2 style={styles.shadow} center>
                        Create Lightning Account
                    </Text>
                </View>
            </View>
        </GradientCardWithShadow>
    </View>
}