import React from "react";
import { Image, ImageBackground, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { Text } from "@Cypher/component-library";
import { ProgressBar5, Tag, Transaction, Yes } from "@Cypher/assets/images";
import { colors } from "@Cypher/style-guide";

interface Props {
    item: any;
    onPress(id: number): void;
    ids: any;
}

const ListView = ({ item, onPress, ids }: Props) => {
    return (
        <ImageBackground source={Transaction} style={styles.main} resizeMode="repeat">
            {ids.includes(item?.id) && (<View style={styles.borderview} />)
            }
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
                <TouchableOpacity style={styles.select} onPress={() => onPress(item?.id)}>
                    <View style={styles.checkbox}>
                        {ids.includes(item?.id) &&
                            <Image source={Yes} />
                        }
                    </View>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

export default ListView;
