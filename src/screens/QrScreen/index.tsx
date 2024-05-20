import React from "react";
import { Image, View } from "react-native";
import styles from "./styles";
import { CoinOS, Copy, QrCode, Share, Share2 } from "@Cypher/assets/images";
import { ScreenLayout, Text } from "@Cypher/component-library";
import { dispatchNavigate } from "@Cypher/helpers";
import ImageText from "@Cypher/components/ImageText";
import { GradientCard, ImageTextVertical } from "@Cypher/components";

interface Props {
    route: any;
}

export default function QrScreen({ route }: Props) {
    return (
        <ScreenLayout showToolbar title='Receive to Bitcoin Address'>
            <View style={styles.container}>
                <View style={styles.innerView}>
                    {/* <Text h3 style={styles.maintitle}>Top-up your Coinos Checking Account{`\n`} using this Bitcoin Network address:</Text> */}
                    <Image source={CoinOS} style={styles.logo} resizeMode="contain" />
                    <Image source={QrCode} resizeMode="contain" style={styles.image} />
                    <Text semibold style={styles.code}>bc1qt3......wmsn6u</Text>
                    <View style={styles.imageView2}>
                        <ImageTextVertical text="Copy" source={Copy} />
                        <ImageTextVertical text="Share" source={Share2} />
                    </View>
                    {/* <View style={styles.imageView}>
                        <ImageText text="Copy" source={Copy}/>
                        <ImageText text="Share" source={Share}/>
                    </View>
                    <GradientCard style={{ height: 50,marginTop: 20 }} linearStyle={{ height: 50 }}>
                        <View style={styles.background}>
                            <Text subHeader bold>bc1qt3......wmsn6u</Text>
                        </View>
                    </GradientCard> */}
                    <Text h3 style={styles.title}>Bitcoin Network transactions may take hours, or in rare case, days to confirm depending on how much fees the sender paid and how fast your bitcoin banking provider, Coinos, will credit your account.</Text>
                </View>
            </View>
        </ScreenLayout>
    )
}
