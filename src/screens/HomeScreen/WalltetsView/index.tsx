import { CircularView, CoinosWallet, StrikeDollarWallet, StrikeWallet } from "@Cypher/components";
import useAuthStore from "@Cypher/stores/authStore";
import screenWidth from "@Cypher/style-guide/screenWidth";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Carousel from "react-native-snap-carousel";

interface Props {
    balance: any;
    wallet: any;
    isLoading: boolean;
    matchedRate: any;
    currency: any;
    convertedRate: any;
    refRBSheet: any;
    setReceiveType: any;
    strikeBalance: any;
}

export default function WalletsView({
    balance,
    wallet,
    isLoading,
    matchedRate,
    currency,
    convertedRate,
    refRBSheet,
    setReceiveType,
    strikeBalance,
}: Props) {
    const { allBTCWallets, setWalletTab } = useAuthStore();

    const [indexStrike, setIndexStrike] = useState(0);
    const [wTabs, setWTabs] = useState([]);

    useEffect(() => {
        const tabs: any = [...wTabs];

        if (allBTCWallets && !isLoading) {
            (allBTCWallets as WalletName[]).map(wallet => {
                if (walletTabsMap[wallet]) {
                    tabs.push(walletTabsMap[wallet]);
                    if (walletTabsMap[wallet].key === 'strike') {
                        tabs.push({ key: "divider", component: () => <StrikeDollarWallet currency={currency} matchedRate={matchedRate} /> });
                        tabs.push({ key: "divider", component: () => <CircularView balance={balance} convertedRate={convertedRate} currency={currency} wallet={wallet} matchedRate={matchedRate} refRBSheet={refRBSheet} setReceiveType={setReceiveType} /> });            
                    }
                }
            });

            setWTabs(tabs)
        }
    }, [allBTCWallets, isLoading]);

    type WalletName = keyof typeof walletTabsMap;

    const walletTabsMap = {
        COINOS: { key: 'coinos', component: () => <CoinosWallet balance={balance} convertedRate={convertedRate} currency={currency} isLoading={isLoading} matchedRate={matchedRate} refRBSheet={refRBSheet} setReceiveType={setReceiveType} wallet={wallet}/> },
        STRIKE: { key: 'strike', component: () => <StrikeWallet balance={balance} currency={currency} isLoading={isLoading} matchedRate={matchedRate} refRBSheet={refRBSheet} setReceiveType={setReceiveType} strikeBalance={strikeBalance} /> },
    };


    const renderWalletItem = ({ item }: any) => {
        return (
            <View style={{
                width: screenWidth * 0.905,
            }}>
                {item.component()}
            </View>
        )
    };

    return (
        <Carousel
            data={wTabs}
            renderItem={renderWalletItem}
            firstItem={indexStrike}
            vertical={false}
            sliderWidth={screenWidth}
            itemWidth={screenWidth}
            onSnapToItem={(index) => {
                setIndexStrike(index);
                setWalletTab(index === 1);
            }}
        />
    );
}
