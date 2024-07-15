import React from "react";
import { Image, ImageBackground, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { Text } from "@Cypher/component-library";
import { ProgressBar5, Tag, Transaction } from "@Cypher/assets/images";

interface Props {
    item: any;
    onPress(): void;
}

const ListView = ({ item, onPress }: Props) => {
    return (
        <ImageBackground source={Transaction} style={styles.main} resizeMode="repeat">
            <View style={styles.container}>
                <View style={styles.coin}>
                    <View style={styles.tab}>
                        <Image source={ProgressBar5} style={styles.progressbar} />
                    </View>
                    <Text bold>Address: {item?.address}</Text>
                </View>
                <View style={styles.size}>
                    <Text bold style={styles.value}>{item?.value}</Text>
                    <Text bold>{item?.type2}</Text>
                </View>
                <View style={styles.label}>
                    <Image source={Tag} style={{}} />
                </View>
                <View style={styles.select}>
                    <TouchableOpacity style={styles.checkbox} onPress={onPress} />
                </View>
            </View>
        </ImageBackground>
    );
};

export default ListView;
