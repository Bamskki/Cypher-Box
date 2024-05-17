/* eslint-disable react/no-unstable-nested-components */
import React from 'react';

import SavingVaultCoin from './Coins';
import SavingVaultHistory from './History';
import SavingVaultSettings from './Settings';
import savingsVault from './VaultBalance';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import navigationStyle from '../../components/navigationStyle';
import { Animated, View, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SavingsVaultIcon from '../../svg/SavingsVaultIcon';
import BatchesIcon from '../../svg/BatchesIcon';
import HistoryIcon from '../../svg/HistoryIcon';
import SettingsIcon from '../../svg/SettingsIcon';
import GradientText from '../../components/GradientText';

const SavingVaultTab = createMaterialTopTabNavigator();

function CustomTabBar({ state, descriptors, navigation, position, icons }) {
    return (
        <View style={{ flexDirection: 'row' }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                const inputRange = state.routes.map((_, i) => i);
                const opacity = position.interpolate({
                    inputRange,
                    outputRange: inputRange.map(i => (i === index ? 1 : 0)),
                });

                const Icon = icons[index];

                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.customTabBar}
                    >
                        <LinearGradient
                            style={[styles.customTabBarGradient, { opacity: isFocused ? 1 : 0.8 }]} colors={['#1693ED', '#15A7A7']}>
                            <Icon />
                        </LinearGradient>
                        {
                            isFocused ?
                                <GradientText colors={['#1693ED', '#15A7A7']} style={styles.tabLabel}>{label}</GradientText>
                                :
                                <Animated.Text style={styles.tabLabel}>
                                    {label}
                                </Animated.Text>

                        }
                    </TouchableOpacity>
                );
            })}
        </View >
    );
}

const SavingVaultTabs = () => {
    const icons = [SavingsVaultIcon, BatchesIcon, HistoryIcon, SettingsIcon];

    return (
        <SavingVaultTab.Navigator
            tabBar={props => <CustomTabBar {...props} icons={icons} />}
            screenOptions={{
                tabBarAndroidRipple: { borderless: true },
                tabBarStyle: {
                    backgroundColor: '#1e1e1e',
                },
                tabBarIndicatorStyle: {
                    height: 4,
                    backgroundColor: '',
                },
            }}
        >
            <SavingVaultTab.Screen name="Vault" component={savingsVault} />
            <SavingVaultTab.Screen name="Coin" component={SavingVaultCoin} />
            <SavingVaultTab.Screen name="History" component={SavingVaultHistory} />
            <SavingVaultTab.Screen name="Settings" component={SavingVaultSettings} />
        </SavingVaultTab.Navigator>
    );
};

const SavingVaultMenu = () => {
    return (
        <View style={styles.container}>
            <SavingVaultTabs />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 40,
        flex: 1,
        backgroundColor: '#1e1e1e',
    },
    customTabBar: {
        flex: 1,
        marginHorizontal: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    customTabBarGradient: {
        width: 64,
        height: 47,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabLabel: {
        fontFamily: 'Lato',
        fontSize: 12,
        fontWeight: '700',
        lineHeight: 14,
        color: '#FFFFFF',
        marginVertical: 4
    },
});

SavingVaultMenu.navigationOptions = navigationStyle({}, opts => ({
    ...opts,
    headerTitle: 'Savings Vault',
    headerTitleStyle: {
        color: '#F1F1F1',
        fontWeight: '700',
    },
}));

export default SavingVaultMenu;
