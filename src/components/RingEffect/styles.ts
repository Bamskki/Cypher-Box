import { colors } from "@Cypher/style-guide";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    box: {
        width: 200,
        height: 200,
        backgroundColor: colors.white,
    },
    ring: {
        position: "absolute",
        width: 180,
        height: 180,
        borderRadius: 90,
        borderColor: colors.white,
        borderWidth: 10,
    },
});
