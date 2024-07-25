import React, { useState, useCallback, useMemo } from "react";
import { Image, LayoutAnimation, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "@Cypher/component-library";
import { CoinOs, Key, Settings, Time } from "@Cypher/assets/images";
import { colors } from "@Cypher/style-guide";
import styles from "./styles";

interface Props {
    onChangeSelectedTab(id: number): void;
    selectedTab: number;
}

export default function Tabs({ onChangeSelectedTab, selectedTab }: Props) {
    const tabs = useMemo(() => [
        { id: 0, name: 'Vault', icon: Key },
        { id: 1, name: 'Bars', icon: CoinOs },
        { id: 2, name: 'History', icon: Time },
        { id: 3, name: 'Settings', icon: Settings },
    ], []);


    const tabClickListener = useCallback((id: number) => {
        // setSelectedTab(id);
        onChangeSelectedTab(id);
    }, []);

    const getTabStyle = (id: number) => ({
        backgroundColor: selectedTab === id ? colors.greenNew : colors.primary,
        tintColor: selectedTab === id ? colors.white : colors.gray.text,
        color: selectedTab === id ? colors.greenNew : colors.gray.text,
    });

    return (
        <View style={styles.main}>
            {tabs.map(tab => (
                <View key={tab.id} style={styles.container}>
                    <TouchableOpacity
                        style={[styles.inner, { backgroundColor: getTabStyle(tab.id).backgroundColor }]}
                        onPress={() => tabClickListener(tab.id)}
                        activeOpacity={1}
                    >
                        <Image
                            source={tab.icon}
                            style={[
                                tab.id === 1 ? styles.coinos : tab.id === 0 ? styles.key : styles.icon,
                                { tintColor: getTabStyle(tab.id).tintColor }
                            ]}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                    <Text style={StyleSheet.flatten([styles.text, { color: getTabStyle(tab.id).color }])}>{tab.name}</Text>
                </View>
            ))}
        </View>
    );
}
// import React, { useState } from "react";
// import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
// import styles from "./styles";
// import { Text } from "@Cypher/component-library";
// import { CoinOs, Key, Settings, Time } from "@Cypher/assets/images";
// import { colors } from "@Cypher/style-guide";

// interface Props {
//     onChangeSelectedTab(id: number): void;
// }

// export default function Tabs({ onChangeSelectedTab }: Props) {
//     const tabs = [
//         {
//             id: 0,
//             name: 'Vault',
//             icon: Key,
//         },
//         {
//             id: 1,
//             name: 'Coins',
//             icon: CoinOs,
//         },
//         {
//             id: 2,
//             name: 'History',
//             icon: Time,
//         },
//         {
//             id: 3,
//             name: 'Settings',
//             icon: Settings,
//         },
//     ]
//     const [selectedTab, setSelectedTab] = useState(0);

//     const tabClickListner = (id: number) => {
//         setSelectedTab(id);
//         onChangeSelectedTab(id);
//     }

//     return (
//         <View style={styles.main}>
//             {tabs.map(tab => (
//                 <View style={styles.container}>
//                     <TouchableOpacity style={[styles.inner, { backgroundColor: selectedTab === tab?.id ? colors.greenNew : colors.primary }]}
//                         onPress={() => tabClickListner(tab?.id)}>
//                         <Image source={tab?.icon} style={[tab?.id === 1 ? styles.coinos : tab?.id == 0 ? styles.key : styles.icon, { tintColor: selectedTab === tab?.id ? colors.white : colors.gray.text }]} resizeMode="contain" />
//                     </TouchableOpacity>
//                     <Text style={StyleSheet.flatten([styles.text, { color: selectedTab === tab?.id ? colors.greenNew : colors.gray.text, }])}>{tab?.name}</Text>
//                 </View>
//             ))}
//         </View>
//     )
// }