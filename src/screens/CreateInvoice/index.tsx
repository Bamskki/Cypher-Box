import React, { useState } from "react";
import { View } from "react-native";
import SimpleToast from "react-native-simple-toast";

import styles from "./styles";
import { ScreenLayout } from "@Cypher/component-library";
import { CustomKeyboard, GradientInput } from "@Cypher/components";
import { dispatchNavigate } from "@Cypher/helpers";
import { createInvoice } from "@Cypher/api/coinOSApis";

export default function CreateInvoice({navigation, route}: any) {
    const {matchedRate, currency} = route.params
    const [isSats, setIsSats] = useState(true);
    const [sats, setSats] = useState('');
    const [usd, setUSD] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // const createInvoice = () => {
    //     dispatchNavigate('CopyInvoice', {
    //         value: isSats ? `Receive ${sats} sats` : `Receive ${sats} USD`,
    //         converted: isSats ? `$ ${usd}` : `${usd} sats`,
    //     });
    // }

    console.log('sats: ', sats);
    console.log('usd: ', usd);
    console.log('isSats: ', isSats)
    const handleCreateInvoice = async () => {
        setIsLoading(true);
        if(!sats) {
            SimpleToast.show('Please enter an amount', SimpleToast.SHORT);
            setIsLoading(false);
            return;
        }
        try {
            const response = await createInvoice({
                amount: isSats ? Number(sats) : Number(usd),
                type: 'lightning',
            });
            dispatchNavigate('CopyInvoice', {
                value: isSats ? `Receive ${sats} sats` : `Receive ${sats} USD`,
                converted: isSats ? `$ ${usd}` : `${usd} sats`,
                hash: response?.hash
            });

            // navigation.navigate('CreatedInvoice', {invoice: response})

            console.log('response: ', response)
        } catch (error) {
            console.error('Error creating invoice:', error);
            SimpleToast.show('Failed to create invoice. Please try again.', SimpleToast.SHORT);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ScreenLayout disableScroll showToolbar isBackButton title="Receive with Invoice">
            <View style={styles.main}>
            <GradientInput isSats={isSats} sats={sats} setSats={setSats} usd={usd} />
            </View>
            <CustomKeyboard
                title="Create invoice"
                onPress={handleCreateInvoice}
                disabled={!sats.length || isLoading}
                setSATS={setSats}
                setUSD={setUSD}
                setIsSATS={setIsSats}
                matchedRate={matchedRate}
                currency={currency}
            />
        </ScreenLayout>
    )
}
