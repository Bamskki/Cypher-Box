import { P1, P10, P2, P3, P4, P5, P6, P7, P8, P9 } from '@Cypher/assets/images';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

interface Props {
    value: number;
}

export default function CustomProgressBar({ value }: Props) {
console.log("🚀 ~ CustomProgressBar ~ value:", value)

    const image = value <= 100000 ? P1 :
    value <= 200000 ? P2 :
    value <= 300000 ? P3 :
    value <= 400000 ? P4 :
    value <= 500000 ? P5 :
    value <= 600000 ? P6 :
    value <= 700000 ? P7 :
    value <= 800000 ? P8 :
    value <= 900000 ? P9 : P10

    return (
        <View style={{
            // backgroundColor:'red',
            // height:12,
            paddingTop: 2
        }}>
            <Image source={image} style={styles.image} resizeMode='stretch'/>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 65,
        height: 17,
    },
});
