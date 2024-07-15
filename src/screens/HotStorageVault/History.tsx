import React from "react";
import { Text } from "@Cypher/component-library";
import { Image, SectionList, View } from "react-native";
import { GradientView, SavingVault } from "@Cypher/components";
import styles from "./styles";
import { colors, widths } from "@Cypher/style-guide";
import { Copy, InformationNew, QrCode, Share, ShareNew } from "@Cypher/assets/images";
import Items from "./Items";
import Header from "./Header";

export default function History() {
    const transactions = [
        {
            title: '4th March',
            data: [{
                text: 'Sent to Noor@Blink.sv',
                sats: '-65 sats',
                usd: '$0.04',
                type: 'bitcoin',
            },
            {
                text: 'Received to Blink Account',
                sats: '+30k sats',
                usd: '$0.56',
                type: 'lightning',
            }],
        },
        {
            title: '28th February',
            data: [
                {
                    text: 'Sent to Noor@Blink.sv',
                    sats: '-70 sats',
                    usd: '$0.04',
                    type: 'lightning',
                },
                {
                    text: 'Sent to Noor@Blink.sv',
                    sats: '-70 sats',
                    usd: '$0.04',
                },
                {
                    text: 'Sent to Noor@Blink.sv',
                    sats: '-70 sats',
                    usd: '$0.04',
                    type: 'lightning',
                },
                {
                    text: 'Sent to Noor@Blink.sv',
                    sats: '-70 sats',
                    usd: '$0.04',
                    type: 'lightning',
                },
                {
                    text: 'Sent to Noor@Blink.sv',
                    sats: '-70 sats',
                    usd: '$0.04',
                    type: 'lightning',
                },
                {
                    text: 'Sent to Noor@Blink.sv',
                    sats: '-70 sats',
                    usd: '$0.04',
                    type: 'lightning',
                },
            ],
        },
    ];

    const onPressHandler = () => { };

    return (
        <View style={{
            flex: 1, marginTop: 5,
        }}>
            <SectionList
                sections={transactions}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <Items item={item} onPressHandler={onPressHandler} />}
                renderSectionHeader={({ section: { title } }) => <Header title={title} />}
                contentContainerStyle={{
                    borderTopColor: colors.white,
                    borderTopWidth: 1,
                    borderBottomColor: colors.white,
                    borderBottomWidth: 1,
                }}
                style={{
                    flex: 1,
                    marginBottom: 30,
                }}
                invertStickyHeaders
            />

        </View>
    )
}