import { ScreenLayout } from "@Cypher/component-library";
import { Tabs } from "@Cypher/components";
import useAuthStore from "@Cypher/stores/authStore";
import { useRoute } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { View } from "react-native";
import { default as Account, default as Vault } from "./Account";
import History from "./History";
import Settings from "./Settings";
import styles from "./styles";
import Threshold from "./Threshold";

export default function CheckingAccountNew({ navigation, route }: any) {
    const { wallet, matchedRate, to = null } = useRoute().params as { wallet: any, matchedRate: string, to: null | string };
    const [selectedTab, setSelectedTab] = useState(0);
    const { vaultTab } = useAuthStore();

    const onChangeSelectedTab = useCallback((id: number) => {
        setSelectedTab(id);
    }, []);

    const renderView = useCallback(() => {
        // LayoutAnimation.linear();
        switch (selectedTab) {
            case 0:
                return <Account wallet={wallet} matchedRate={matchedRate} setSelectedTab={setSelectedTab} />;
            case 1:
                return <Threshold wallet={wallet} matchedRate={matchedRate} to={to} vaultTab={vaultTab} />;
            case 2:
                return <History wallet={wallet} matchedRate={matchedRate} vaultTab={vaultTab} />;
            case 3:
                return <Settings wallet={wallet} vaultTab={vaultTab} to={to} />;
            default:
                return <Vault wallet={wallet} matchedRate={matchedRate} setSelectedTab={setSelectedTab} />;
        }
    }, [selectedTab, vaultTab, wallet, matchedRate, to]);

    return (
        <ScreenLayout showToolbar disableScroll title={'Checking Account'}>
            <View style={styles.container}>
                <Tabs onChangeSelectedTab={onChangeSelectedTab} selectedTab={selectedTab} vaultTab={vaultTab} />
                {renderView()}
            </View>
        </ScreenLayout>
    )
}
