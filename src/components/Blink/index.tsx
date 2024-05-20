import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

interface Props {
    duration: number;
    repeatCount?: number;
    style?: any;
    children: any;
}

const Blink = ({ duration, repeatCount, style, children } : Props) => {
    const fadeAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animate = () => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(fadeAnimation, {
                        toValue: 0,
                        duration: duration,
                        useNativeDriver: true,
                    }),
                    Animated.timing(fadeAnimation, {
                        toValue: 1,
                        duration: duration,
                        useNativeDriver: true,
                    }),
                ]),
                {
                    iterations: repeatCount,
                }
            ).start();
        };

        animate();

        return () => {
            fadeAnimation.setValue(0); // Reset the animation value on unmount
        };
    }, [duration, repeatCount, fadeAnimation]);

    return (
        <View style={{ ...style }}>
            <Animated.View style={{ opacity: fadeAnimation }}>
                {children}
            </Animated.View>
        </View>
    );
};

export default Blink;