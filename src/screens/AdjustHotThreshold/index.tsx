import React, { useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { Button, ScreenLayout, Text } from "@Cypher/component-library";
import { dispatchNavigate } from "@Cypher/helpers";
import { Icon } from 'react-native-elements';
import { colors } from "@Cypher/style-guide";
import { ProgressBar1, ProgressBar2, ProgressBar3, ProgressBar4, ProgressBar5 } from "@Cypher/assets/images";
import { ProgressBar } from "@Cypher/components";

export default function AdjustHotThreshold() {

    const [coinSlot, setCoinSlot] = useState(1);
    const [open, setOpen] = useState(false);

    const homeClickHandler = () => { }

    const handleDropDownOpen = () => {
        setOpen(true);
    }

    return (
        <ScreenLayout showToolbar disableScroll>
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.innerView}>
                        <Text bold subHeader style={styles.title}>Hot Storage Threshold</Text>
                        <View style={styles.tabs}>
                            <ProgressBar image={ProgressBar1} />
                            <ProgressBar image={ProgressBar2} />
                            <ProgressBar image={ProgressBar3} />
                            <ProgressBar image={ProgressBar4} />
                            <ProgressBar image={ProgressBar5} />
                        </View>
                        <Text h4 style={styles.desc}>
                            This threshold prompts reminder to transfer your coins from your hot Savings Vault to your Cold Storage Vault after accumulating a certain number of coins.{'\n\n'}By storing a measured number coins in your hot wallet up to this limit, you allow yourself to securely hold bitcoin that can easily be liquidated and moved back to your Lightning Account for quick spending, striking a balance between efficiency and security.{'\n\n'}Exceeding this threshold increases the risk associated with prolonged exposure of your funds to online threats since the keys to your Savings Vault are not isolated from the internet like the keys to your Cold Storage Vault.{'\n\n'}Conversely, decreasing the threshold enhances security by reducing the time your coins remain in a hot vault, but it will result in more frequent cold storage rounds and fewer coins (UTXOs) moved to your cold vault. As you consider adjusting the threshold, it's essential to weigh the trade-offs between convenience and security, ensuring that your decision aligns with your risk tolerance and operational preferences.
                        </Text>
                    </View>
                </ScrollView>
                <Text h3 bold style={styles.coinslot}>Select Hot Storage Threshold:</Text>
                <View style={styles.coinslotView}>
                    <TouchableOpacity style={styles.dropdown} onPress={handleDropDownOpen}>
                        <Icon name="chevron-down" type="font-awesome" color={colors.primary} size={15} />
                        <Text bold h2 style={styles.textCoinSlot}>{coinSlot}</Text>
                    </TouchableOpacity>
                    <Text h3 bold style={styles.coinslot}>Coins slots</Text>
                    {open &&
                        <ScrollView style={styles.dropdownScroll}>
                            <View>
                                <Text bold h2 style={styles.textCoinSlot} onPress={() => { setCoinSlot(1); setOpen(false); }}>1</Text>
                                <Text bold h2 style={styles.textCoinSlot} onPress={() => { setCoinSlot(2); setOpen(false); }}>2</Text>
                                <Text bold h2 style={styles.textCoinSlot} onPress={() => { setCoinSlot(3); setOpen(false); }}>3</Text>
                                <Text bold h2 style={styles.textCoinSlot} onPress={() => { setCoinSlot(4); setOpen(false); }}>4</Text>
                                <Text bold h2 style={styles.textCoinSlot} onPress={() => { setCoinSlot(5); setOpen(false); }}>5</Text>
                            </View>
                        </ScrollView>
                    }
                </View>
                <Text h3 center style={styles.warn}>You can store coins beyond this number!</Text>
                <Button text="Adjust Threshold" onPress={homeClickHandler} style={styles.button} textStyle={styles.btnText} />
            </View>
        </ScreenLayout>
    )
}
