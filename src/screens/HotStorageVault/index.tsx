import React, { useState, useCallback, useEffect } from "react";
import { Text, ScreenLayout } from "@Cypher/component-library";
import { CustomFlatList, GradientView } from "@Cypher/components";
import styles from "./styles";
import Tabs from "./Tabs";
import Vault from "./Vault";
import History from "./History";
import Settings from "./Settings";
import Capsules from "./Capsules";
import ListView from "./ListView";
import { useRoute } from "@react-navigation/native";



const HotStorageVault = ({ _, route }: any) => {
    const { wallet, matchedRate, to = null } = useRoute().params as { wallet: any, matchedRate: string, to: null | string };
    const [selectedTab, setSelectedTab] = useState(0);
    const [utxo, setUtxo] = useState(null);
    console.log('selectedTab: ', selectedTab)

    useEffect(() => {
        if (to) {
            setSelectedTab(1)
        }
    }, [to])

    const onChangeSelectedTab = useCallback((id: number) => {
        setSelectedTab(id);
    }, []);

    const renderView = useCallback(() => {
        // LayoutAnimation.linear();
        switch (selectedTab) {
            case 0:
                return <Vault wallet={wallet} matchedRate={matchedRate} setSelectedTab={setSelectedTab} />;
            case 1:
                return <Capsules wallet={wallet} matchedRate={matchedRate} to={to} />;
            case 2:
                return <History wallet={wallet} matchedRate={matchedRate} />;
            case 3:
                return <Settings />;
            default:
                return <Vault wallet={wallet} matchedRate={matchedRate} setSelectedTab={setSelectedTab} />;
        }
    }, [selectedTab, wallet, matchedRate, to]);

    return (
        <ScreenLayout
            showToolbar
            title={'Hot Storage Vault'}
            disableScroll
            style={{ paddingBottom: 20 }}
        >
            <Tabs onChangeSelectedTab={onChangeSelectedTab} selectedTab={selectedTab} />
            {renderView()}
        </ScreenLayout>
    );
}

export default HotStorageVault;
