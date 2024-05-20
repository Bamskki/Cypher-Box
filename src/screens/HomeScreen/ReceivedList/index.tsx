import { Text } from "@Cypher/component-library"
import { GradientCard } from "@Cypher/components"
import React, { useState } from "react"
import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import styles from "./styles"
import { Bitcoin, LiquidBitCoin, Socked } from "@Cypher/assets/images"
import { colors } from "@Cypher/style-guide"
import { Icon } from 'react-native-elements';
import { dispatchNavigate } from "@Cypher/helpers";

interface Props {
    refRBSheet: any;
}

export default function ReceivedList({ refRBSheet }: Props) {
    const [data, setData] = useState([
        {
            id: 1,
            name: 'Bitcoin-Lightning Address',
            type: 0,
            description: 'Bam@coinos.io',
            navigation: {},
        },
        {
            id: 2,
            name: 'Bitcoin-Lightning invoice',
            type: 0,
            description: 'Receive from wallets and exchanges that support the Lightning Network',
            navigation: {
                screen: 'CreateInvoice',
            }
        },
        {
            id: 3,
            name: 'Liquid Federation address',
            type: 1,
            description: 'Receive from wallets and exchanges that support the Liquid Federation',
            navigation: {},
        },
        {
            id: 4,
            name: 'Bitcoin Network Address',
            type: 2,
            description: 'To deposit sizable amounts of bitcoin from the main network',
            navigation: {
                screen: 'QrScreen',
                params: {
                    isBitcoinQr: true,
                }
            },
        },
    ]);

    const onPress = (item: any) => { 
        refRBSheet?.current?.close();
        setTimeout(() => {
            dispatchNavigate(item?.navigation?.screen, item?.navigation?.params);
        }, 150);
    }

    return <>
        <LinearGradient
            start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}
            colors={['#FF65D4', '#D617A1']}
            style={styles.line} /><View style={styles.shadow10}>
            <View style={styles.row2}>
                <TouchableOpacity onPress={() => refRBSheet?.current?.close()} style={styles.closeView}>
                    <Icon name="close" size={22} type="iosicons" color={colors.white} />
                </TouchableOpacity>
                <Text h2 bold style={styles.bottomtext}>Receive</Text>
            </View>
            <View style={styles.list}>
                {data?.map((item) => (
                    <GradientCard colors_={['#B6B6B6', '#FFFFFF']}
                        style={styles.main}
                        linearStyle={styles.height2}
                        onPress={() => onPress(item)}>
                        <View style={styles.background}>
                            <View style={styles.view3}>
                                <View style={styles.subview}>
                                    <Text subHeader bold style={styles.title2}>{item?.name}</Text>
                                    <Text h4 bold style={StyleSheet.flatten([styles.desc, {
                                        fontSize: item?.id == 1 ? 20 : 14,
                                        lineHeight: item?.id == 1 ? 28 : 14,
                                        marginTop: item?.id == 1 ? 0 : 5,
                                    }])}>{item?.description}</Text>
                                </View>
                                <View style={styles.image3}>
                                    <Image source={item?.type == 0 ? Socked : item?.type == 1 ? LiquidBitCoin : Bitcoin} style={item?.type == 0 ? styles.image2 : styles.image3} resizeMode="contain" />
                                </View>
                            </View>
                        </View>
                    </GradientCard>
                ))}
            </View>
        </View>
    </>
}