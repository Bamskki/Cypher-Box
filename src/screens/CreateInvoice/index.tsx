import React, { useEffect, useState } from "react";
import { TextInput, View } from "react-native";
import styles from "./styles";
import { Button, ScreenLayout, Text } from "@Cypher/component-library";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SimpleToast from "react-native-simple-toast";
import { createInvoice } from "../../../api/coinOSApis";
import { colors } from "@Cypher/style-guide";

export default function CreateInvoice({navigation, route} : any) {
    const [amount, setAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleCreateInvoice = async () => {
        setIsLoading(true);
        if(!amount) {
            SimpleToast.show('Please enter an amount', SimpleToast.SHORT);
            setIsLoading(false);
            return;
        }
        try {
            const response = await createInvoice({
                amount: Number(amount),
                type: 'lightning',
            });
            navigation.navigate('CreatedInvoice', {invoice: response})

            console.log('response: ', response)
        } catch (error) {
            console.error('Error creating invoice:', error);
            SimpleToast.show('Failed to create invoice. Please try again.', SimpleToast.SHORT);
        } finally {
            setIsLoading(false);
        }
    };

    const createInvoiceClickHandler = () => {
        console.log('create invoice click');
    }

    return (
        <ScreenLayout showToolbar isBackButton title="Receive with Invoice" >
            <View style={styles.priceView}>
                <Text h3 style={styles.text}>Amount</Text>
                <TextInput placeholder="0" placeholderTextColor={colors.silver} style={styles.amount} value={amount} onChangeText={setAmount} />
                <Text h3 style={styles.text}>sats</Text>
            </View>
            {/* <Text subHeader style={styles.inDollar}>$0.00</Text> */}
            <Button 
                loading={isLoading}
                disabled={isLoading}
                loaderColor={colors.black.default} 
                style={styles.button} 
                textStyle={styles.buttonText} 
                text="Create invoice" 
                onPress={handleCreateInvoice} 
            />
        </ScreenLayout>
    )
}