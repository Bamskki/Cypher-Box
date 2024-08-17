import React from "react";
import { Image, ImageBackground, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { Text } from "@Cypher/component-library";
import { ProgressBar5, Tag, Transaction, Yes } from "@Cypher/assets/images";
import { colors } from "@Cypher/style-guide";
import { btc } from "@Cypher/helpers/coinosHelper";

interface Props {
    item: any;
    onPress(id: string): void;
    ids: any;
}
const shortenAddress = (address: string) => {
    // Take the first 6 characters
    const start = address.substring(0, 4);
    // Take the last 6 characters
    const end = address.substring(address.length - 4);
    // Combine with three dots in the middle
    return `${start}...${end}`;
};

const ListView = ({ item, onPress, ids }: Props) => {
    const BTCAmount = btc(item?.value) + " BTC";

    return (
        <ImageBackground source={Transaction} style={styles.main} resizeMode="repeat">
            {ids.includes(`${item.txid}:${item.vout}`) && (<View style={styles.borderview} />)
            }
            <View style={styles.container}>
                <View style={styles.coin}>
                    <View style={styles.tab}>
                        <Image source={ProgressBar5} style={styles.progressbar} />
                    </View>
                    <Text bold>Address: {shortenAddress(item?.address)}</Text>
                </View>
                <View style={styles.size}>
                    <Text bold style={styles.value}>{BTCAmount}</Text>
                    <Text bold>{"Blink Settlement"}</Text>
                </View>
                <View style={styles.label}>
                    <Image source={Tag} style={{}} />
                </View>
                <TouchableOpacity style={styles.select} onPress={() => onPress(`${item.txid}:${item.vout}`)}>
                    <View style={styles.checkbox}>
                        {ids.includes(`${item.txid}:${item.vout}`) &&
                            <Image source={Yes} />
                        }
                    </View>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

export default ListView;
