import React from "react";
import { Image, ImageSourcePropType, TouchableOpacityProps, View } from "react-native";
import styles from "./styles";

interface Props extends TouchableOpacityProps {
    image: ImageSourcePropType;
}

export default function ProgressBar({ image }: Props) {
    return (
        <View style={styles.tab}>
            <Image source={image} style={styles.progressbar} />
        </View>
    );
}
