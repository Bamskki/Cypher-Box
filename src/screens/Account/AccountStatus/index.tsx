import React, { } from "react";
import { Image, View } from "react-native";
import styles from "./styles";
import { BlinkText } from "@Cypher/assets/images";
import { GradientButton, GradientCard, GradientText } from "@Cypher/components";
import { useNavigation } from "@react-navigation/native";
import { ScreenLayout, Text } from "@Cypher/component-library";

export default function AccountStatus() {
    const { navigate } = useNavigation();

    const nextClickHandler = () => {
        navigate('HomeScreen', {
            isLogin_: true
        });
    }

    return (
        <ScreenLayout disableScroll progress={2}>
            <View style={styles.container}>
                <View style={styles.innerView}>
                    <GradientText>Checking Account Created!</GradientText>

                    <GradientCard style={styles.linearGradient} disabled>
                        <View style={styles.view}>
                            <Text h3 bold style={styles.title}>Checking Account</Text>
                            <Image source={BlinkText} style={styles.image} resizeMode="contain" />
                        </View>
                        <View style={styles.showLine} />
                    </GradientCard>
                    <Text h4 style={styles.description}>Your Cecking Account has been created. The interactive bar display helps you in visualizing your Checking Account's balance, indicating a threshold above which storing bitcoin in a bank carries increased counter-party risk.{`\n\n`}
                        You can deposit money beyond the threshold, but remember, you are technically not the owner of it; you are relying on a third-party custodian. Cypher Bank will enable you to become the sole owner of your money once you hit this threshold (set to 2M sats by default but you can adjust it in the settings).</Text>
                </View>
                <GradientButton title="Home" onPress={nextClickHandler} />
            </View>
        </ScreenLayout>
    )
}
