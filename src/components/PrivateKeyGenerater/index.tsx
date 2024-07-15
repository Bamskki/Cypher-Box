import React, { useState } from "react";
import { ActivityIndicator, Image, TouchableOpacity, View } from "react-native"
import styles from "./styles";
import { Text } from "@Cypher/component-library";
import { EyeVisible } from "@Cypher/assets/images";
import { BlurView } from "@react-native-community/blur";

interface Props {
    callNext(): void;
}

export default function PrivateKeyGenerater({ callNext }: Props) {
    const [isView, setIsView] = useState(false);
    const [loading, setLoading] = useState(false);

    const viewClickHandler = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setIsView(true);
            setTimeout(() => {
                callNext();
                setTimeout(() => {
                    setIsView(false);
                }, 2000);
            }, 3000);
        }, 1500);
    }

    const buttons = [
        { id: 1, label: 'future' },
        { id: 7, label: 'exit' },
        { id: 7, label: 'exit' },
        { id: 7, label: 'exit' },
        { id: 7, label: 'exit' },
        { id: 9, label: 'drum' },
        { id: 7, label: 'exit' },
        { id: 5, label: 'disagree' },
        { id: 5, label: 'disagree' },
        { id: 7, label: 'exit' },
        { id: 7, label: 'exit' },
        { id: 7, label: 'exit' },
    ];

    return (
        <View>
            <View style={styles.container}>
                {buttons.map((button, index) => (
                    <TouchableOpacity key={index} style={styles.button}>
                        <Text h4 style={styles.buttonText}>{`${button.id}. ${button.label}`}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            {!isView &&
                <BlurView
                    style={styles.hideView}
                    blurType="dark"
                    blurAmount={8}
                    reducedTransparencyFallbackColor="white"
                >
                    <View style={styles.centerView}>
                        <Text style={styles.title} center>Tap to reveal your seed phrase</Text>
                        <Text style={styles.detail} center>Make sure no one is watching your screen.</Text>
                    </View>
                    <TouchableOpacity style={styles.viewStyle} onPress={viewClickHandler}>
                        <Image source={EyeVisible} />
                        <Text h3 style={styles.viewBtn}>View</Text>
                    </TouchableOpacity>
                    {loading && <ActivityIndicator style={{ position: 'absolute', top: 100, bottom: 0, left: 0, right: 0 }} />}
                </BlurView>
            }
        </View>
    );
}
