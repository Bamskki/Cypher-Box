import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import styles from "./styles";
import { ScreenLayout, Text } from "@Cypher/component-library";
import { Electricity } from "@Cypher/assets/images";
import { dispatchNavigate, dispatchReset } from "@Cypher/helpers";

interface Props {
    route?: any;
}

export default function SendReceiveSuccessScreen({ route }: Props) {
    const { isReceive,value,valueUsd, currency, type } = route?.params;
    const [isReceive_] = useState(isReceive);

    useEffect(() => {
        setTimeout(() => {
            dispatchReset('HomeScreen');
        }, 3000);
    },[]);

    return (
        <ScreenLayout>
            <Text subHeader style={styles.text}>{isReceive_ ? 'Boom!' : 'Zapped!'}</Text>
            <Image style={styles.image} source={Electricity} resizeMode="contain" />
            <Text subHeader style={styles.text}>{`You ${isReceive_ ? 'Received' : 'Sent'}`}</Text>
            <Text subHeader style={styles.text}>{type == 'lightening' ? value : isReceive_ ? `${value} sats` : `${value || 0} sats`}</Text>
            {!isReceive_ && type !== 'lightening' &&
                <Text subHeader style={styles.subtext}>{`${currency} ${valueUsd.toFixed(2)}`}</Text>
            }
        </ScreenLayout>
    )
}