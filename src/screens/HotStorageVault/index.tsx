import React, { useState, useCallback } from "react";
import { Text, ScreenLayout } from "@Cypher/component-library";
import { CustomFlatList, GradientView } from "@Cypher/components";
import styles from "./styles";
import Tabs from "./Tabs";
import Vault from "./Vautl";
import History from "./History";
import Settings from "./Settings";
import Bars from "./Bars";
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
    const [selectedTab, setSelectedTab] = useState(0);
    const { wallet, matchedRate } = useRoute().params as { wallet: any, matchedRate: string };
    const [utxo, setUtxo] = useState(null);

    const onChangeSelectedTab = useCallback((id: number) => {
        setSelectedTab(id);
    }, []);

    const renderView = useCallback(() => {
        // LayoutAnimation.linear();
        switch (selectedTab) {
            case 0:
                return <Vault wallet={wallet} matchedRate={matchedRate} />;
            case 1:
                return <Bars />;
            case 2:
                return <History wallet={wallet} matchedRate={matchedRate} />;
            case 3:
                return <Settings />;
            default:
                return <Vault wallet={wallet} matchedRate={matchedRate} />;
        }
    }, [selectedTab, wallet, matchedRate]);

    return (
        <ScreenLayout 
            showToolbar 
            title={'Hot Storage Vault'} 
            disableScroll
            style={{paddingBottom: 20}}
        >
            <Tabs onChangeSelectedTab={onChangeSelectedTab} selectedTab={selectedTab} />
            {renderView()}
        </ScreenLayout>
    );
}

export default HotStorageVault;
