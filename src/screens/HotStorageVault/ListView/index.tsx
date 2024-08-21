import React from "react";
import { Image, ImageBackground, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { Text } from "@Cypher/component-library";
import { ProgressBar5, Tag, Transaction, Yes } from "@Cypher/assets/images";
import { colors } from "@Cypher/style-guide";
import { btc } from "@Cypher/helpers/coinosHelper";

interface Props {
    wallet: any;
    item: any;
    onPress(id: string): void;
    handleChoose(item: any): void;
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

const ListView = ({ wallet, item, onPress, handleChoose, ids }: Props) => {
    const BTCAmount = btc(item?.value) + " BTC";
    const { memo } = wallet.getUTXOMetadata(item.txid, item.vout);

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
                    {memo && memo !== "" &&
                        <Text bold>{memo}</Text>
                    }
                </View>
                <TouchableOpacity style={styles.label} onPress={() => handleChoose(item)}>
                    <Image source={Tag} style={{}} />
                </TouchableOpacity>
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
