import React from 'react'
import { View, Text, } from 'react-native'

import styles from './styles';
import ColdStorageBalance from '../coldStorage/components/coldStorageBalance';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import GradientText from '../../components/GradientText';
import Notice from '../../svg/Notice';


export default function savingsVault() {
    return (
        <View style={[styles.container, { flex: 1, justifyContent: 'space-between' }]}>
            <ColdStorageBalance showBalance />
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <Notice />
                    <Text style={styles.italicText}>What is a Cold Storage Vault?</Text>
                </View>
                <TouchableOpacity>
                    <LinearGradient start={{ x: 2, y: 2 }} end={{ x: -2, y: -2 }} style={styles.linearGradient} colors={['#21C7FB', '#05344E']}>
                        <View
                            style={[
                                styles.inner,
                                {
                                    backgroundColor: '#1e1e1e',
                                    paddingHorizontal: 15,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                },
                            ]}
                        >

                            <GradientText colors={['#1693ED', '#15A7A7']} style={styles.titleText}>
                                Add New Vault
                            </GradientText>


                        </View>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    )
}

