import React from "react";
import { Image, View } from "react-native";
import styles from "./styles";
import { Bank } from "@Cypher/assets/images";
import { GradientButton, GradientText, HeaderBackButton, Progress, Screen } from "@Cypher/components";
import { colors } from "@Cypher/style-guide";
import { useNavigation } from "@react-navigation/native";
import { ScreenLayout, Text } from "@Cypher/component-library";

export default function CheckAccount() {
    const { navigate } = useNavigation();

    const nextClickHandler = () => {
        navigate('InfoBlink');
    }

    return (
        <ScreenLayout disableScroll showToolbar progress={0}>
            <View style={styles.container}>
                <View style={styles.innerView}>
                    <GradientText>Checking Account</GradientText>
                    <Text h4 style={styles.descption}>To use Bitcoin efficiently, you need to create a Checking Account at a reliable bitcoin bank. This entity will help you send and receive payments globally, instantaneously, with ~zero fees. You can also use it to accumulate a measured amount of bitcoin, say 2M sats or $1000.</Text>


                    <Text h4 style={styles.alertText}>Be careful: <Text h4 style={{ color: colors.white }}>while bitcoin banks and custodians offer user friendly financial services, it's wise to exercise caution with the amount of money you entrust to them. As your balance increases, exploring safer storage methods becomes crucial. Cypher Bank will notify you and provide guidance on securing your wealth independently, without the reliance on any third party custodian.</Text></Text>

                </View>
                <Image source={Bank} style={styles.image} resizeMode="contain" />
                <GradientButton title="Next" onPress={nextClickHandler}/>
            </View>
        </ScreenLayout>
    )
}
