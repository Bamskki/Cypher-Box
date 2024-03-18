import React from "react";
import { Image, View } from "react-native";
import styles from "./styles";
import { LeftArrow } from "@Cypher/assets/images";
import { GradientCard } from "@Cypher/components";
import { ScreenLayout, Text } from "@Cypher/component-library";
import { dispatchNavigate } from "@Cypher/helpers";

export default function ReceivedMethodScreen() {

    const handleCreateInvoice = () => {
        dispatchNavigate('CreateInvoice');
    }

    const getAddressClickHandler = () => {
        dispatchNavigate('GetAddressScreen');
    }

    return (
        <ScreenLayout showToolbar isBackButton>
            <View style={styles.container}>
                <View style={styles.innerView}>
                    <Text subHeader bold>Choose receive method</Text>
                    <View style={{ height: 50 }} />
                    <GradientCard onPress={getAddressClickHandler}>
                        <View style={styles.view}>
                            <View style={{ marginBottom: 20 }}>
                                <Text subHeader bold style={styles.title}>Get Address</Text>
                                <Text h4 bold style={styles.desc}>Bitcoin or Lightning</Text>
                            </View>
                            <Image source={LeftArrow} style={styles.image} resizeMode="contain" />
                        </View>
                    </GradientCard>
                    <View style={{ height: 20 }} />
                    <GradientCard onPress={handleCreateInvoice}>
                        <View style={styles.view}>
                            <View style={{ marginBottom: 0 }}>
                                <Text subHeader bold style={styles.title}>Create Invoice</Text>
                                <Text h4 bold style={styles.desc}>Highly compatible with lightning-enabled exchanges and wallets</Text>
                            </View>
                            <Image source={LeftArrow} style={styles.image} resizeMode="contain" />
                        </View>
                    </GradientCard>
                </View>
            </View>
        </ScreenLayout>
    )
}
