import React from 'react';
import { Animated, FlatListProps, View } from 'react-native';
import { useCustomFlatListHook } from './useCustomFlatListHook';

type CustomFlatListProps<T> = Omit<FlatListProps<T>, 'ListHeaderComponent'> & {
    /**
     * An element that is above all
     *
     * Hides when scrolling
     */
    HeaderComponent?: JSX.Element;
    /**
     * An element that is above the list but lower than {@link Props.HeaderComponent HeaderComponent} and has the property sticky
     *
     * When scrolling is fixed on top
     */
    StickyElementComponent: JSX.Element;
    /**
     * An element that is higher than the list but lower than {@link Props.HeaderComponent HeaderComponent} and {@link Props.StickyElementComponent StickyElementComponent}
     *
     * Hides when scrolling
     */
    TopListElementComponent: JSX.Element;
};

/**
 *
 */
function CustomFlatList<T>({
    style,
    ...props
}: CustomFlatListProps<T>): React.ReactElement {
    const [
        scrollY,
        styles,
        onLayoutHeaderElement,
        onLayoutTopListElement,
        onLayoutStickyElement,
    ] = useCustomFlatListHook();

    return (
        <View style={style} >
            <Animated.View // <-- Sticky Component
                style={styles.stickyElement}
                onLayout={onLayoutStickyElement} >
                {props.StickyElementComponent}
            </Animated.View>

            < Animated.View // <-- Top of List Component
                style={styles.topElement}
                onLayout={onLayoutTopListElement} >
                {props.TopListElementComponent}
            </Animated.View>

            < Animated.FlatList<any>
                {...props}
                ListHeaderComponent={
                    // <-- Header Component
                    <Animated.View onLayout={onLayoutHeaderElement} >
                        {props.HeaderComponent}
                    </Animated.View>
                }
                ListHeaderComponentStyle={
                    [
                        props.ListHeaderComponentStyle,
                        styles.header,
                    ]}
                onScroll={
                    Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        {
                            useNativeDriver: true,
                        }
                    )
                }
            />
        </View>
    );
}

export default CustomFlatList;
