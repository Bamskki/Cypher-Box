import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "@Cypher/component-library";
import { Icon } from "react-native-elements";
import { colors } from "@Cypher/style-guide";
import { DropdownProps } from "@Cypher/constants/types/componentTypes";
import LinearGradient from "react-native-linear-gradient";

const CommonBtn = ({
  startColor = "#FFFFFF",
  endColor = "#B6B6B6",
  height = 50,
  width = 150,
  marginLeft,
  marginTop,
  borderRadius = 15,
  isDropdown = true,
  style,
  title,
  fontSize = 12,
  fontStyle,
  subContainerBgColor,
}: DropdownProps) => {
  const buttonStyles = StyleSheet.flatten([
    style,
    {
      ...(height && { height: height }),
      ...(width && { width: width }),
      ...(marginLeft && { marginLeft: marginLeft }),
      ...(marginTop && { marginTop: marginTop }),
    },
  ]);

  const textStyle = StyleSheet.flatten([
    {
      ...(fontSize && { fontSize: fontSize }),
    },
  ]);

  const subContainerStyle = StyleSheet.flatten([
    {
      ...styles.background,
      ...(subContainerBgColor && { backgroundColor: subContainerBgColor }),
    },
  ]);

  const dropDownArrow = () => {
    return (
      <View>
        <TouchableOpacity onPress={() => {}} disabled={false}>
          <Icon name="angle-up" type="font-awesome" color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} disabled={false}>
          <Icon name="angle-down" type="font-awesome" color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <LinearGradient
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 1 }}
      style={{ height: height, borderRadius: borderRadius, ...buttonStyles }}
      colors={[startColor, endColor]}
    >
      <View style={subContainerStyle}>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => {}}>
          <Text bold center italic={fontStyle == "italic"} style={textStyle}>
            {title}
          </Text>
        </TouchableOpacity>
        {isDropdown && dropDownArrow()}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.gray.dark,
    margin: 2,
    borderRadius: 15,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
export default React.memo(CommonBtn);
