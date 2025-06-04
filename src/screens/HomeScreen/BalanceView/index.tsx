import { Text } from "@Cypher/component-library";
import { dispatchNavigate } from "@Cypher/helpers";
import useAuthStore from "@Cypher/stores/authStore";
import { colors, shadow, widths } from "@Cypher/style-guide";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Shadow } from "react-native-neomorph-shadows";
import styles from "../styles";
import { GradientView } from "@Cypher/components";

interface Props {
    balance: any
    convertedRate: any
}

export default function BalanceView({ balance, convertedRate }: Props) {
    const { allBTCWallets } = useAuthStore();
    console.log("🚀 ~ BalanceView ~ allBTCWallets:", allBTCWallets)

    return (
    // <TouchableOpacity style={{
    //     shadowOffset: { width: 8, height: 8 },
    //     shadowRadius: 18,
    //     shadowOpacity: 0.8,
    //     // shadowColor: '#040404',
    //     shadowColor: '#FFF',
    //     elevation: 24,
    //     borderRadius: 25,
    //     width: widths - 80,
    //     height: 128,
    //     marginTop: 16,
    //     borderColor: "transparent",
    //     backgroundColor: colors.primary,
    // }} disabled={true}>

        <View style={[styles.innerContainer]}>
            <Shadow
                style={StyleSheet.flatten([styles.shadowTopBottom2])}
                inner
                useArt
            >
                <Text subHeader bold style={styles.price}>
                    {balance}
                </Text>
                <Text bold style={styles.priceusd} >
                    {convertedRate}
                </Text>
                {/* {(allBTCWallets.length > 0 && allBTCWallets.length < 2) &&
                    <TouchableOpacity onPress={() => dispatchNavigate('CheckingAccountIntro')} style={{ zIndex: 100, alignSelf: 'flex-end', borderRadius: 10, borderWidth: 1, borderColor: colors.pink.light }}>
                        <Text h4 style={styles.descption}>Add Account</Text>
                    </TouchableOpacity>
                } */}
                <Shadow
                    inner
                    useArt
                    style={StyleSheet.flatten([styles.shadowBottomBottom])}
                />
            </Shadow>
        </View>
    // </TouchableOpacity>
    )
    // return <View style={styles.shadowView}>
    //     <Shadow
    //         style={styles.shadowTop}
    //         inner
    //         useArt
    //     >
    //         <Text subHeader bold style={styles.price}>
    //             {balance}
    //         </Text>
    //         <Text bold style={styles.priceusd} >
    //             {convertedRate}
    //         </Text>
    //         {(allBTCWallets.length > 0 && allBTCWallets.length < 2) &&
    //             <TouchableOpacity onPress={() => dispatchNavigate('CheckingAccountIntro')} style={{ zIndex: 100, alignSelf: 'flex-end', borderRadius: 10, borderWidth: 1, borderColor: colors.pink.light }}>
    //                 <Text h4 style={styles.descption}>Add Account</Text>
    //             </TouchableOpacity>
    //         }
    //         <Shadow
    //             inner
    //             useArt
    //             style={styles.shadowBottom}
    //         />
    //     </Shadow>
    // </View>
}