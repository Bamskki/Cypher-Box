import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import navigationStyle from '../../components/navigationStyle';
import GradientText from '../../components/GradientText';
import NextButton from './components/button';
import { useNavigation } from '@react-navigation/native';
import Shield from '../../svg/Shield';

function TermsAndConditionForColdStorage() {
    const { navigate } = useNavigation();
    const navigateToColdStorage = () => {
        navigate('ConnectHardware');
    };

    return (
        <View style={styles.container}>
            <View>
                <GradientText colors={['#1693ED', '#15A7A7']} style={styles.title}>
                    Cold Storage
                </GradientText>
                <Text style={styles.textStyle}>
                    You are about to connect a public key (xpub) and create a Cold Storage Vault. This is an advanced security step.
                </Text>
                <Text style={styles.textStyle}>
                    In this setup, keys for transaction authorization are securely maintained within a hardware device, completely isolated from
                    internet access.Additionally, consolidating your assets into a new Vault optimizes transaction fees by fusing them into a singular
                    coin, thereby reducing future costs.
                </Text>
                <Text style={styles.textStyle}>
                    Make sure you have a backup copy of the private key (12 or 24 words). You need to write them down on a piece of paper, make
                    multiple copies, and consider purchasing a steal plate to increase the durability and resilience of your backups.
                </Text>
                <Shield />
                <NextButton btnText="I understand" onPress={navigateToColdStorage} />
            </View>
        </View>
    );
}

TermsAndConditionForColdStorage.navigationOptions = navigationStyle({}, opts => ({ ...opts, headerTitle: '' }));

export default TermsAndConditionForColdStorage;
