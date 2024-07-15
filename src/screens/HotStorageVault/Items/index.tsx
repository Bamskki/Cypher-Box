import React from "react"
import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { Shadow } from "react-native-neomorph-shadows"
import styles from "./styles"
import { Text } from "@Cypher/component-library";
import { Bitcoin, Socked } from "@Cypher/assets/images";

interface Props {
    item: any;
    onPressHandler(item: any): void;
}

export default function Items({ item, onPressHandler }: Props) {
    return <TouchableOpacity style={styles.shadowView} onPress={() => onPressHandler(item)}>
        <Shadow
            style={styles.shadowTop}
            inner
            useArt
        >
            <View style={styles.inner}>
                <View style={styles.main}>
                    <View style={styles.imageView}>
                        {item?.type === 'bitcoin' ?
                            <Image source={Bitcoin} />
                            :
                            <Image source={Socked} style={styles.image} />
                        }
                    </View>
                    <Text bold h4 style={styles.des}>{item?.text}</Text>
                    <Text h3 style={{ color: item?.sats?.includes('+') ? '#4FBF67' : '#FF7A68' }}>{item?.sats}</Text>
                </View>
                <Text style={StyleSheet.flatten([styles.text, { color: item?.sats?.includes('+') ? '#4FBF67' : '#FF7A68' }])}>{item?.usd}</Text>
                <Shadow
                    inner
                    useArt
                    style={styles.shadowBottom}
                />
            </View>
        </Shadow>
    </TouchableOpacity>
}
