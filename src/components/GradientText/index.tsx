import React from "react";
import { Text } from "@Cypher/component-library";
import MaskedView from "@react-native-masked-view/masked-view";
import LinearGradient from "react-native-linear-gradient";
import { colors } from "@Cypher/style-guide";
import styles from "./styles";

const GradientText = (props: any) => {
    return (
        <MaskedView maskElement={<Text {...props} style={styles.text} />}>
            <LinearGradient
                colors={[colors.pink.light, colors.pink.default]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}>
                <Text {...props} style={[styles.title, props.style,]} />
            </LinearGradient>
        </MaskedView>
    );
};

export default GradientText;
