import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import styles from './styles';
import { ScreenLayout, Text, Input, Button } from '@Cypher/component-library';
import { Shadow } from 'react-native-neomorph-shadows';
import { colors } from '@Cypher/style-guide';

const inputs = [
    1, 2, 3, 4, 5, 6, // First column
    7, 8, 9, 10, 11, 12 // Second column
];

interface Props {
    route: any;
}

export default function RecoverSavingVault({ route }: Props) {
    const [secretWords, setSecretWords] = useState<string[]>(Array(inputs.length).fill(''));

    const handleSecretWordChange = (index: number, value: string) => {
        const updatedSecretWords = [...secretWords];
        updatedSecretWords[index] = value;
        setSecretWords(updatedSecretWords);
    };

    return (
        <ScreenLayout title="Coin Withdrawal" showToolbar isBackButton disableScroll>
            <View style={styles.container}>
                <View style={styles.shadowViewBottom}>
                    <Shadow
                        style={StyleSheet.flatten([
                            styles.shadowTop,
                            {
                                shadowColor: colors.greenShadow,
                                paddingStart: 20,
                                paddingEnd: 10,
                            },
                        ])}
                        inner
                        useArt
                    >
                        <View style={styles.bottominner}>
                            <Text h2 bold>
                                Enter Your Seedphrase
                            </Text>
                        </View>
                    </Shadow>
                </View>

                <View style={styles.inputsContainer}>
                    {/* First Column */}
                    <View style={styles.column}>
                        {inputs.slice(0, 6).map((input, index) => (
                            <View key={input} style={styles.inputContainer}>
                                <Text h2 style={styles.labelText}>{input}.</Text>
                                <Input
                                    style={styles.inputStyle}
                                    onChangeText={(value) => handleSecretWordChange(index, value)}
                                    value={secretWords[index]}
                                    textInputStyle={styles.textInputStyle}
                                />
                            </View>
                        ))}
                    </View>

                    {/* Second Column */}
                    <View style={styles.column}>
                        {inputs.slice(6).map((input, index) => (
                            <View key={input} style={styles.inputContainer}>
                                <Text h2 style={styles.labelText}>{input}.</Text>
                                <Input
                                    style={styles.inputStyle}
                                    onChangeText={(value) => handleSecretWordChange(index + 6, value)}
                                    value={secretWords[index + 6]}
                                    textInputStyle={styles.textInputStyle}
                                />
                            </View>
                        ))}
                    </View>
                </View>
                <Button
                    text="Recover"
                    onPress={() => console.log("here")}
                    style={styles.button}
                    textStyle={styles.btnText}
                />

            </View>
        </ScreenLayout>
    );
}
