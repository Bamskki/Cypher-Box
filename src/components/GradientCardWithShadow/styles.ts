import { colors, widths } from "@Cypher/style-guide";
import { StyleSheet, ViewStyle } from "react-native";

interface Style {
    container: ViewStyle;
    linearGradient: ViewStyle;
    // shadow: ViewStyle;
    shadow: any;
    view: ViewStyle;
    innerShadow: any;
}

export default StyleSheet.create<Style>({
    container: {
        flex: 1,
        padding: 20,
        paddingBottom: 65,
    },
    linearGradient: {
        borderRadius: 25,
        height: 150,
        justifyContent: 'space-between',
        // padding: 3,
    },
    // shadow:{
    //     shadowColor: colors.black.default,
    //     // shadowOffset: { width: 5, height: 10 },
    //     shadowOffset: { width: 0, height: 4 },
    //     shadowOpacity: 0.4,
    //     shadowRadius: 4,
    //     elevation: 8,
    //     borderColor: "transparent", // Required to show shadows on Android for some reason !?!?
    // },
    shadow: {
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.56,
        shadowColor: "#27272C",
        shadowRadius: 2,
        borderRadius: 25,
        width: widths - 40,
        height: 150,
        justifyContent: 'center',
    },
    view: {
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowColor: colors.black.default,
        shadowRadius: 4,
        elevation: 8,
        borderRadius: 25,
        width: widths - 40,
        height: 150,
        justifyContent: 'center',
    },
    innerShadow: {
        shadowOffset: { width: -2, height: -2 },
        shadowOpacity: 0.64,
        shadowColor: "#040404",
        shadowRadius: 2,
        borderRadius: 25,
        width: widths - 40,
        height: 150,
        justifyContent: 'center',
        position: 'absolute',
        // shadowOffset: { width: -(((widths / 2) - 70) / 20), height: -8 },
        // shadowOpacity: 0.4,
        // shadowColor: "rgba(39, 39, 44, 56)",
        // shadowRadius: 8,
        // borderRadius: 25,
        // width: widths-40,
        // height: 150,
        // justifyContent:'center',
        // position: 'absolute',
    },
})
