import React from "react";
import { View } from "react-native";
import styles from "./styles";
import { Button, ScreenLayout, Text } from "@Cypher/component-library";
import { dispatchNavigate } from "@Cypher/helpers";
import { colors } from "@Cypher/style-guide";

export default function CheckingAccountIntro() {

    const nextClickHandler = () => {
        console.log('next click');
        dispatchNavigate('CheckingAccountLogin');
    }

  
    return (
        <ScreenLayout showToolbar progress={0} color={[colors.pink.light, colors.pink.light]}>
            <View style={styles.container}>
                <View style={styles.innerView}>
                    <Text style={styles.title}>Checking Account</Text>
                    <Text h4 style={styles.descption}>To use Bitcoin efficiently, you need to create a Checking Account at a reliable lightning custodian. This entity will help you send and receive payments globally, instantaneously, with ~zero fees. You can also use it to accumulate a measured amount of bitcoin, say 2M sats or $1500.
                      {'\n\n'}
                      Be careful: while bitcoin custodians and exchanges offer user friendly financial services, it's wise to exercise caution with the amount of money you entrust to them. As your balance increases, Cypher Box will notify you and provide instructions on how to secure your wealth independently, without the reliance on any third party custodian.
                    </Text>
                </View>
                <Button text="Next" onPress={nextClickHandler} style={styles.button} textStyle={styles.btnText} />
            </View>
        </ScreenLayout>
    )
}
