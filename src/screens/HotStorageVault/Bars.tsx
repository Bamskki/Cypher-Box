import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Input, Text } from "@Cypher/component-library";
import { ActivityIndicator, Animated, Dimensions, FlatList, ImageBackground, ScrollView, StyleSheet, View } from "react-native";
import SimpleToast from "react-native-simple-toast";
import styles from "./styles";
import { GradientCard, GradientView } from "@Cypher/components";
import ListView from "./ListView";
// import BackgroundSvg from '../../assets/svg/transaction.svg';
// import Bitcoin from '../../assets/svg/bitcoin.svg';
import { colors, heights, widths } from "@Cypher/style-guide";
import debounce from "../../../blue_modules/debounce";
import { BlueStorageContext } from "../../../blue_modules/storage-context";
import screenHeight from "@Cypher/style-guide/screenHeight";
import { btc as btcHandle } from "@Cypher/helpers/coinosHelper";
import { dispatchNavigate } from "@Cypher/helpers";
// import { Bitcoin, Transaction, TransactionN } from "@Cypher/assets/svg";

export default function Bars({wallet, matchedRate}: any) {
    const [ids, setIds] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log("🚀 ~ Bars ~ ids:", ids)
    const [btc, setBtc] = useState('0.00');
    const utxo = wallet.getUtxo(true).sort((a, b) => a.height - b.height || a.txid.localeCompare(b.txid) || a.vout - b.vout);
  
    const [frozen, setFrozen] = useState(
        utxo.filter(out => wallet.getUTXOMetadata(out.txid, out.vout).frozen).map(({ txid, vout }) => `${txid}:${vout}`),
    );
    const { wallets, saveToDisk, sleep } = useContext(BlueStorageContext);

    const debouncedSaveFronen = useRef(
        debounce(async frzn => {
            utxo.forEach(({ txid, vout }) => {
                wallet.setUTXOMetadata(txid, vout, { frozen: frzn.includes(`${txid}:${vout}`) });
            });
            await saveToDisk();
        }, 500),
    );

    useEffect(() => {
        debouncedSaveFronen.current(frozen);
    }, [frozen]);
    
    useEffect(() => {
        (async () => {
            try {
                await Promise.race([wallet.fetchUtxo(), sleep(10000)]);
            } catch (e) {
                console.log('coincontrol wallet.fetchUtxo() failed'); // either sleep expired or fetchUtxo threw an exception
            }
            const freshUtxo = wallet.getUtxo(true);
            setFrozen(freshUtxo.filter(out => wallet.getUTXOMetadata(out.txid, out.vout).frozen).map(({ txid, vout }) => `${txid}:${vout}`));
            setLoading(false);
        })();
    }, [wallet, setLoading, sleep]);
    // const offset = useRef(new Animated.Value(0)).current;
    // console.log("🚀 ~ Coins ~ offset:", offset);

    const addressClickHandler = () => { }

    const { total, inUSD } = useMemo(() => {
        let total = 0;
        ids.forEach(id => {
            const result = utxo?.find(obj => `${obj.txid}:${obj.vout}` === id)?.value;
            if (result) total += result;
        });
        const currency = btcHandle(1);
        const inUSD = Number(total) * Number(matchedRate) * currency;
        const BTCAmount = btcHandle(total);
    
        // const inUSD = total * 63749.40;
        return { total: BTCAmount, inUSD };
    }, [ids, utxo]);

    const onPressClickHandler = (id_: string) => {
        console.log("🚀 ~ onPressClickHandler ~ id:", id_)
        const isExist = ids.includes(id_);
        let newIds = [];
        if (isExist) {
            newIds = ids.filter(id => id != id_);
        } else {
            newIds = [...ids, id_];
        }
        setIds(newIds);
    }

    const handleSendBars = () => {
        if(ids.length > 0){
            const usd = inUSD.toFixed(4);
            dispatchNavigate('EditAmount', {wallet, utxo, ids, inUSD: inUSD.toFixed(4), total, matchedRate});
        } else {
            SimpleToast.show("Please select Bar to Send", SimpleToast.SHORT)
        }
    };
    
    return (
        <View style={styles.flex}>
            <Text bold style={styles.desc}>Tap on your coins to label them. Select multiple coins and batch them together to optimize fees for future transactions:</Text>
            <View style={styles.titleStyle}>
                <Text bold style={styles.coin}>Bars</Text>
                <Text bold style={styles.size}>Size</Text>
                <Text bold style={styles.label}>Label</Text>
                <Text bold style={styles.select}>Select</Text>
            </View>
            <View style={styles.border} />
            {loading ?
                <ActivityIndicator style={{ marginTop: 10, marginBottom: 20 }} color={colors.white} />
            :
                <FlatList
                    data={utxo}
                    keyExtractor={(_, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <View style={{ height: screenHeight / 3.2, justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                            <Text white h3 bold>This wallet does not have any coins at the moment.</Text>
                        </View>
                    )}
                    renderItem={({item, index}) => <ListView item={item} onPress={onPressClickHandler} ids={ids} />}
                />
            }
            {/* <ScrollView>
                {data.map((data_, index) => <ListView item={data_} onPress={onPressClickHandler} ids={ids} />)}
            </ScrollView> */}
            <View style={styles.bottomViewNew}>
                <Text h2 center>Size of selected bars and coins:</Text>
                <View style={styles.priceView}>
                    <Input
                        onChange={setBtc}
                        value={`${total} BTC`}
                        keyboardType="number-pad"
                        editable={false}
                        textInpuetStyle={StyleSheet.flatten([styles.input, { borderColor: btc?.length > 0 ? colors.green : colors.gray.default }])}
                    />
                    <Text h2 bold numberOfLines={1} style={{ marginStart: 10, width: 100, }}>~$ {inUSD.toFixed(4)}</Text>
                </View>
                <Text bold center style={styles.tips}>Tip: Selecting dust coins will increase network fees</Text>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <GradientView
                        onPress={handleSendBars}
                        style={styles.linearGradientStyle}
                        linearGradientStyle={styles.mainShadowStyle}
                        topShadowStyle={styles.outerShadowStyle}
                        bottomShadowStyle={styles.innerShadowStyle}
                        linearGradientStyleMain={styles.linearGradientStyleMain}
                    >
                        <Text h3 center>Send Bars</Text>
                    </GradientView>
                    <GradientView
                        onPress={addressClickHandler}
                        topShadowStyle={styles.outerShadowStyle}
                        bottomShadowStyle={styles.innerShadowStyle}
                        style={[styles.linearGradientStyle, { marginStart: 25 }]}
                        linearGradientStyle={styles.mainShadowStyle}
                        linearGradientStyleMain={styles.linearGradientStyleMain}
                    >
                        <Text h3 center>Move to Cold Vault</Text>
                    </GradientView>
                </View>
            </View>
        </View>
    )
}