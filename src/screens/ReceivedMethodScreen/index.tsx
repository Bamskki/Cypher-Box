import React from "react";
import { Image, StyleSheet, View } from "react-native";
import styles from "./styles";
import { LeftArrow } from "@Cypher/assets/images";
import { GradientCard, GradientCardWithShadow } from "@Cypher/components";
import { ScreenLayout, Text } from "@Cypher/component-library";
import { dispatchNavigate } from "@Cypher/helpers";

export default function ReceivedMethodScreen() {

    const handleCreateInvoice = () => {
        console.log('create invoice click');
        dispatchNavigate('CreateInvoice');
    }

    const getAddressClickHandler = () => {
        console.log('getaddress click');
        dispatchNavigate('GetAddressScreen');
    }

    return (
        <ScreenLayout showToolbar isBackButton>
            <View style={styles.container}>
                <View style={styles.innerView}>
                    <Text subHeader bold>Choose receive method</Text>
                    <GradientCardWithShadow style={StyleSheet.flatten([styles.height,{marginTop: 50}])} linearStyle={styles.height} shadowStyleTop={styles.height} shadowStyleBottom={styles.height} onPress={getAddressClickHandler}>
                        <View style={styles.view}>
                            <View style={{ marginBottom: 20 }}>
                                <Text subHeader bold style={styles.title}>Get Address</Text>
                                <Text h4 bold style={styles.desc}>Bitcoin or Lightning</Text>
                            </View>
                            <Image source={LeftArrow} style={styles.image} resizeMode="contain" />
                        </View>
                    </GradientCardWithShadow>
                    <View style={{ height: 20 }} />
                    <GradientCardWithShadow style={styles.height} linearStyle={styles.height} shadowStyleTop={styles.height} shadowStyleBottom={styles.height} onPress={handleCreateInvoice}>
                        <View style={styles.view}>
                            <View style={{ marginBottom: 0 }}>
                                <Text subHeader bold style={styles.title}>Create Invoice</Text>
                                <Text h4 bold style={styles.desc}>Highly compatible with lightning-enabled exchanges and wallets</Text>
                            </View>
                            <Image source={LeftArrow} style={styles.image} resizeMode="contain" />
                        </View>
                    </GradientCardWithShadow>
                </View>
            </View>
        </ScreenLayout>
    )
}
