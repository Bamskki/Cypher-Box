import React, { useState, useCallback, useMemo } from "react";
import { LayoutAnimation, View } from "react-native";
import { Text, ScreenLayout } from "@Cypher/component-library";
import { CustomFlatList, GradientView } from "@Cypher/components";
import styles from "./styles";
import Tabs from "./Tabs";
import Vault from "./Vautl";
import History from "./History";
import Settings from "./Settings";
import ListView from "./ListView";
import { useRoute } from "@react-navigation/native";

const initialData = [
    { id: 1, address: '3dbf...0ae3', type: 0, type2: 'Blink Settlement', value: '0.02 BTC' },
    { id: 2, address: '3dbf...0ae3', type: 1, type2: 'Blink Settlement', value: '0.02 BTC' },
    { id: 3, address: '3dbf...0ae3', type: 2, type2: 'Blink Settlement', value: '0.02 BTC' },
    { id: 4, address: '3dbf...0ae3', type: 3, type2: 'Blink Settlement', value: '0.02 BTC' },
    { id: 5, address: '3dbf...0ae3', type: 0, type2: 'Blink Settlement', value: '0.02 BTC' },
    { id: 6, address: '3dbf...0ae3', type: 1, type2: 'Blink Settlement', value: '0.02 BTC' },
    { id: 7, address: '3dbf...0ae3', type: 2, type2: 'Blink Settlement', value: '0.02 BTC' },
    { id: 8, address: '3dbf...0ae3', type: 3, type2: 'Blink Settlement', value: '0.02 BTC' },
];

const HotStorageVault = () => {
    const [data, setData] = useState(initialData);
    const [selectedTab, setSelectedTab] = useState(0);
    const { wallet, matchedRate } = useRoute().params as { wallet: any, matchedRate: string };

    const onChangeSelectedTab = useCallback((id: number) => {
        setSelectedTab(id);
    }, []);

    const addressClickHandler = useCallback(() => { }, []);

    const HeaderComponent = useMemo(() => (
        <View>
            <Tabs onChangeSelectedTab={onChangeSelectedTab} selectedTab={selectedTab} />
            <Text bold style={styles.desc}>Tap on your coins to label them. Select multiple coins and batch them together to optimize fees for future transactions:</Text>
        </View>
    ), []);

    const StickyElementComponent = useMemo(() => (
        <View>
            <View style={styles.tabs} />
            <View style={styles.titleStyle}>
                <Text bold style={styles.coin}>Coins</Text>
                <Text bold style={styles.size}>Size</Text>
                <Text bold style={styles.label}>Label</Text>
                <Text bold style={styles.select}>Select</Text>
            </View>
            <View style={styles.line} />
        </View>
    ), []);

    const renderItem = useCallback(({ item, index }: any) => (
        index !== (data.length - 1) ? (
            <ListView item={item} onPress={() => { }} />
        ) : (
            <View style={styles.bottomview}>
                <View style={styles.linebottom} />
                <View style={styles.base}>
                    <GradientView
                        onPress={addressClickHandler}
                        style={styles.linearGradientStyle}
                        linearGradientStyle={styles.mainShadowStyle}
                        topShadowStyle={styles.outerShadowStyle}
                        bottomShadowStyle={styles.innerShadowStyle}
                        linearGradientStyleMain={styles.linearGradientStyleMain}
                    >
                        <Text h3 center>Select All</Text>
                    </GradientView>
                    <GradientView
                        onPress={addressClickHandler}
                        topShadowStyle={styles.outerShadowStyle}
                        bottomShadowStyle={styles.innerShadowStyle}
                        style={[styles.linearGradientStyle, { marginStart: 25 }]}
                        linearGradientStyle={styles.mainShadowStyle}
                        linearGradientStyleMain={styles.linearGradientStyleMain}
                    >
                        <Text h3 center>Send Coins</Text>
                    </GradientView>
                </View>
            </View>
        )
    ), [data, addressClickHandler]);

    const renderView = useCallback(() => {
        LayoutAnimation.linear();
        console.log("🚀 ~ renderView ~ selectedTab:", selectedTab)
        switch (selectedTab) {
            case 0:
                return <Vault wallet={wallet} matchedRate={matchedRate} />;
            case 1:
                return (
                    <CustomFlatList
                        data={data}
                        style={styles.container}
                        renderItem={renderItem}
                        HeaderComponent={HeaderComponent}
                        StickyElementComponent={StickyElementComponent}
                        TopListElementComponent={<View />}
                    />
                );
            case 2:
                return <History />;
            case 3:
                return <Settings />;
            default:
                return <Vault wallet={wallet} matchedRate={matchedRate} />;
        }
    }, [selectedTab, data, renderItem, HeaderComponent, StickyElementComponent, wallet, matchedRate]);

    return (
        <ScreenLayout showToolbar title={'Hot Storage Vault'} disableScroll>
            {selectedTab !== 1 &&
                <Tabs onChangeSelectedTab={onChangeSelectedTab} selectedTab={selectedTab} />
            }
            {renderView()}
        </ScreenLayout>
    );
}

export default HotStorageVault;







// import React, { useState, useCallback, useMemo } from "react";
// import { View } from "react-native";
// import { Text, ScreenLayout } from "@Cypher/component-library";
// import { CustomFlatList, GradientView } from "@Cypher/components";
// import styles from "./styles";
// import Tabs from "./Tabs";
// import Vault from "./Vautl";
// import History from "./History";
// import Settings from "./Settings";
// import ListView from "./ListView";

// const initialData = [
//     { id: 1, address: '3dbf...0ae3', type: 0, type2: 'Blink Settlement', value: '0.02 BTC' },
//     { id: 2, address: '3dbf...0ae3', type: 1, type2: 'Blink Settlement', value: '0.02 BTC' },
//     { id: 3, address: '3dbf...0ae3', type: 2, type2: 'Blink Settlement', value: '0.02 BTC' },
//     { id: 4, address: '3dbf...0ae3', type: 3, type2: 'Blink Settlement', value: '0.02 BTC' },
//     { id: 5, address: '3dbf...0ae3', type: 0, type2: 'Blink Settlement', value: '0.02 BTC' },
//     { id: 6, address: '3dbf...0ae3', type: 1, type2: 'Blink Settlement', value: '0.02 BTC' },
//     { id: 7, address: '3dbf...0ae3', type: 2, type2: 'Blink Settlement', value: '0.02 BTC' },
//     { id: 8, address: '3dbf...0ae3', type: 3, type2: 'Blink Settlement', value: '0.02 BTC' },
// ];

// const HotStorageVault = () => {
//     const [data, setData] = useState(initialData);
//     const [selectedTab, setSelectedTab] = useState(0);

//     const onChangeSelectedTab = useCallback((id: number) => {
//         setSelectedTab(id);
//     }, []);

//     const addressClickHandler = useCallback(() => { }, []);

//     const HeaderComponent = useMemo(() => (
//         <View>
//             <Tabs onChangeSelectedTab={onChangeSelectedTab} selectedTab={selectedTab} />
//             <Text bold style={styles.desc}>Tap on your coins to label them. Select multiple coins and batch them together to optimize fees for future transactions:</Text>
//         </View>
//     ), [onChangeSelectedTab]);

//     const StickyElementComponent = useMemo(() => (
//         <View>
//             <View style={styles.tabs} />
//             <View style={styles.titleStyle}>
//                 <Text bold style={styles.coin}>Coins</Text>
//                 <Text bold style={styles.size}>Size</Text>
//                 <Text bold style={styles.label}>Label</Text>
//                 <Text bold style={styles.select}>Select</Text>
//             </View>
//             <View style={styles.line} />
//         </View>
//     ), []);

//     const renderItem = useCallback(({ item, index }: any) => (
//         index !== (data.length - 1) ? (
//             <ListView item={item} onPress={() => { }} />
//         ) : (
//             <View style={styles.bottomview}>
//                 <View style={styles.linebottom} />
//                 <View style={styles.base}>
//                     <GradientView
//                         onPress={addressClickHandler}
//                         style={styles.linearGradientStyle}
//                         linearGradientStyle={styles.mainShadowStyle}
//                         topShadowStyle={styles.outerShadowStyle}
//                         bottomShadowStyle={styles.innerShadowStyle}
//                         linearGradientStyleMain={styles.linearGradientStyleMain}
//                     >
//                         <Text h3 center>Select All</Text>
//                     </GradientView>
//                     <GradientView
//                         onPress={addressClickHandler}
//                         topShadowStyle={styles.outerShadowStyle}
//                         bottomShadowStyle={styles.innerShadowStyle}
//                         style={[styles.linearGradientStyle, { marginStart: 25 }]}
//                         linearGradientStyle={styles.mainShadowStyle}
//                         linearGradientStyleMain={styles.linearGradientStyleMain}
//                     >
//                         <Text h3 center>Send Coins</Text>
//                     </GradientView>
//                 </View>
//             </View>
//         )
//     ), [data, addressClickHandler]);

//     const renderView = useCallback(() => {
//         switch (selectedTab) {
//             case 0:
//                 return <><Tabs onChangeSelectedTab={onChangeSelectedTab} selectedTab={selectedTab} /><Vault /></>;
//             case 1:
//                 return (
//                     <CustomFlatList
//                         data={data}
//                         style={styles.container}
//                         renderItem={renderItem}
//                         HeaderComponent={HeaderComponent}
//                         StickyElementComponent={StickyElementComponent}
//                         TopListElementComponent={<View />}
//                     />
//                 );
//             case 2:
//                 return <><Tabs onChangeSelectedTab={onChangeSelectedTab} selectedTab={selectedTab} /><History /></>;
//             case 3:
//                 return <><Tabs onChangeSelectedTab={onChangeSelectedTab} selectedTab={selectedTab} /><Settings /></>;
//             default:
//                 return <><Tabs onChangeSelectedTab={onChangeSelectedTab} selectedTab={selectedTab} /><Vault /></>;
//         }
//     }, [selectedTab, data, onChangeSelectedTab, renderItem, HeaderComponent, StickyElementComponent]);

//     return (
//         <ScreenLayout showToolbar title={'Hot Storage Vault'} disableScroll>
//             {renderView()}
//         </ScreenLayout>
//     );
// }

// export default HotStorageVault;
