import React, { useEffect } from "react";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withTiming,
    interpolate,
} from "react-native-reanimated";

import { colors } from "@Cypher/style-guide";
import styles from "./styles";

interface Props {
    delay: number;
    isWhite?: boolean;
}

export default function Ring({ delay, isWhite }: Props) {
    const ring = useSharedValue(0);

    const ringStyle = useAnimatedStyle(() => {
        return {
            opacity: 0.8 - ring.value,
            transform: [
                {
                    scale: interpolate(ring.value, [0, 1], [0, 4]),
                },
            ],
        };
    });
    useEffect(() => {
        ring.value = withDelay(
            delay,
            withRepeat(
                withTiming(1, {
                    duration: 5000,
                }),
                -1,
                false
            )
        );
    }, []);
    return <Animated.View style={[styles.ring, isWhite && {borderColor: colors.white}, ringStyle]} />;
};
