import React, { useState } from "react";
import { View } from "react-native";
import styles from "./styles";
import { ScreenLayout } from "@Cypher/component-library";
import { CustomKeyboard, GradientInput } from "@Cypher/components";
import { dispatchNavigate } from "@Cypher/helpers";

export default function CreateInvoice() {
    const [isSats, setIsSats] = useState(true);
    const [sats, setSats] = useState('');
    const [usd, setUSD] = useState('');

    const createInvoice = () => {
        dispatchNavigate('CopyInvoice', {
            value: isSats ? `Receive ${sats} sats` : `Receive ${sats} USD`,
            converted: isSats ? `$ ${usd}` : `${usd} sats`,
        });
    }

    return (
        <ScreenLayout disableScroll showToolbar isBackButton title="Receive with Invoice">
            <View style={styles.main}>
            <GradientInput isSats={isSats} sats={sats} setSats={setSats} usd={usd} />
            </View>
            <CustomKeyboard
                title="Create invoice"
                onPress={createInvoice}
                disabled={!sats.length}
                setSATS={setSats}
                setUSD={setUSD}
                setIsSATS={setIsSats}
            />
        </ScreenLayout>
    )
}
