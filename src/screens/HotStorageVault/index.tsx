import React, { useState, useCallback } from "react";
import { ScreenLayout } from "@Cypher/component-library";
import styles from "./styles";
import Tabs from "./Tabs";
import Vault from "./Vautl";
import History from "./History";
import Settings from "./Settings";
import Bars from "./Bars";

const HotStorageVault = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const onChangeSelectedTab = useCallback((id: number) => {
        setSelectedTab(id);
    }, []);

    const renderView = useCallback(() => {
        // LayoutAnimation.linear();
        switch (selectedTab) {
            case 0:
                return <Vault />;
            case 1:
                return <Bars />;
            case 2:
                return <History />;
            case 3:
                return <Settings />;
            default:
                return <Vault />;
        }
    }, [selectedTab]);

    return (
        <ScreenLayout showToolbar title={'Hot Storage Vault'} disableScroll>
            <Tabs onChangeSelectedTab={onChangeSelectedTab} selectedTab={selectedTab} />
            {renderView()}
        </ScreenLayout>
    );
}

export default HotStorageVault;
