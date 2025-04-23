import React from "react";
import { Linking, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { Button, ScreenLayout, Text } from "@Cypher/component-library";
import { dispatchNavigate } from "@Cypher/helpers";
import useAuthStore from "@Cypher/stores/authStore";
import { colors } from "@Cypher/style-guide";
import { authorize } from "react-native-app-auth";

const config = {
    id: 'strike',
    name: 'Strike',
    type: 'oauth',
    issuer: "https://auth.strike.me", // Strike Identity Server URL
    clientId: "cypherbox",
    clientSecret: "SbYmuewpZGS8XDktirso8ficpChSGu7dEaYuMrLx+3k=", // If needed (but avoid hardcoding secrets in client-side code)
    redirectUrl: "cypherbox://oauth/callback", // Must match the redirect URI in your Strike app settings
    scopes: ["offline_access", "partner.balances.read", "partner.currency-exchange-quote.read", "partner.account.profile.read", "profile", "openid", "partner.invoice.read", "partner.invoice.create", "partner.invoice.quote.generate", "partner.invoice.quote.read", "partner.rates.ticker"], // Specify necessary scopes
    //clientAuthMethod: "post",
    //wellKnown: `https://auth.strike.me/.well-known/openid-configuration`,
    // authorization: {
    //     params: {
    //         scope: 'partner.invoice.read offline_access',
    //         response_type: 'code',
    //     }
    // },
    idToken: false,
    checks: ['pkce', 'state'],
    // serviceConfiguration: {
    //   authorizationEndpoint: "https://auth.strike.me/oauth/authorize",
    //   tokenEndpoint: "https://auth.strike.me/oauth/token",
    //   revocationEndpoint: "https://auth.strike.me/oauth/revoke",
    // },
};

export default function CheckingAccountLogin() {
    const {isAuth, isStrikeAuth, allBTCWallets, setStrikeAuth, setStrikeToken, setAllBTCWallets} = useAuthStore();


    const createChekingAccountClickHandler = () => {
        Linking.openURL('https://coinos.io/register')
    };
  
    const createStrikeAccountClickHandler = () => {
        Linking.openURL('https://dashboard.strike.me/signup')
    };

    const handleCoinosLogin = () => {
        dispatchNavigate('LoginCoinOSScreen');
    }

    const handleStrikeLogin = async () => {
        try {
            const result = await authorize(config);
            console.log("Access Token:", result);
            setStrikeToken(result.accessToken);
            setStrikeAuth(true);
            const temp = [...allBTCWallets];
            setAllBTCWallets([...temp, 'STRIKE']);
            dispatchNavigate('CheckingAccountCreated');

            // if (balances && balances?.balances) {
            //   const numericAmount = Number(balances.balances[0].amount.replace(/[^0-9\.]/g, ''));
            //   setMatchedRate(numericAmount);
            // }
        } catch (error) {
            console.error("OAuth error", error);
        }
    };

    return (
        <ScreenLayout showToolbar>
            <View style={styles.container}>
                <View style={styles.innerView}>
                    {!isStrikeAuth &&
                        <>
                            <Text style={styles.title}>Login to Checking Account</Text>
                            <TouchableOpacity onPress={handleStrikeLogin} style={{borderRadius: 10, marginTop: 60, marginBottom: 15, borderWidth: 1, borderColor: colors.pink.light}}>
                                <Text h4 style={styles.descption}>Login to Strike</Text>
                            </TouchableOpacity>
                            <View style={styles.createAccount}>
                                <Text bold style={styles.text}>
                                    Don’t have an account?
                                </Text>
                                <TouchableOpacity onPress={createStrikeAccountClickHandler}>
                                    <Text bold style={styles.login}>
                                        Create on Strike
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    }
                    {!isAuth &&
                        <>
                            <TouchableOpacity onPress={handleCoinosLogin} style={{borderRadius: 10, marginTop: 60, marginBottom: 15, borderWidth: 1, borderColor: colors.pink.light}}>
                                <Text h4 style={styles.descption}>Login to Coinos</Text>
                            </TouchableOpacity>
                            <View style={styles.createAccount}>
                                <Text bold style={styles.text}>
                                    Don’t have an account?
                                </Text>
                                <TouchableOpacity onPress={createChekingAccountClickHandler}>
                                    <Text bold style={styles.login}>
                                        Create on Coinos.io
                                    </Text>
                                </TouchableOpacity>
                            </View>    
                        </>
                    }
                </View>
            </View>
        </ScreenLayout>
    )
}
