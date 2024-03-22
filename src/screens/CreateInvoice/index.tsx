import React from "react";
import { TextInput, View } from "react-native";
import styles from "./styles";
import { Button, ScreenLayout, Text } from "@Cypher/component-library";
import { useNavigation } from "@react-navigation/native";

export default function CreateInvoice() {

    const createInvoiceClickHandler = () => {
        console.log('create invoice click');
    }

    return (
        <ScreenLayout showToolbar isBackButton title="Receive with Invoice" >
            <View style={styles.priceView}>
                <Text h3 style={styles.text}>Amount</Text>
                <TextInput placeholder="0 BTC" style={styles.amount} value="0 BTC" />
            </View>
            <Text subHeader style={styles.inDollar}>$0.00</Text>
            <Button style={styles.button} textStyle={styles.buttonText} text="Create invoice" onPress={createInvoiceClickHandler} />
        </ScreenLayout>
    )
}