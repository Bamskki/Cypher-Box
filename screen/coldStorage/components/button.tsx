import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const NextButton = ({ btnText, ...rest }) => {
  return (
    <LinearGradient
      colors={["#1693ED", "#15A7A7"]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradient}
    >
      <TouchableOpacity {...rest}>
        <Text style={styles.text}>{btnText}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    borderRadius: 80,
    paddingVertical: 6,
    bottom: 40,
  },
  text: {
    fontFamily: "Archivo",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 28,
    textAlign: "center",
    color: "#FFFFFF",
  },
});

export default NextButton;
