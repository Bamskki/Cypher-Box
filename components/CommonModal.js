import React, { useState } from "react";
import PropTypes, { number } from "prop-types";
import {
  StyleSheet,
  Platform,
  useWindowDimensions,
  View,
  Modal,
  TouchableOpacity,
} from "react-native";
import { colors, widths, shadow, heights } from "@Cypher/style-guide";
import { Shadow } from "react-native-neomorph-shadows";
import { BlueSpacing10 } from "../BlueComponents";
import loc from "../loc";
import { useTheme } from "./themes";
import Button from "./Button";
import { Text } from "react-native-elements";

const styles = StyleSheet.create({
  root: {
    justifyContent: "flex-end",
    margin: 0,
  },
  hasDoneButton: {
    padding: 16,
    paddingBottom: 24,
  },
  shadowView: {
    shadowOffset: { width: -8, height: -8 },
    shadowOpacity: 0.48,
    shadowColor: "#27272C",
    shadowRadius: 12,
    elevation: 24,
    borderRadius: 25,
    width: widths - 40,
    height: 128,
    marginTop: 15,
    borderColor: "transparent",
    backgroundColor: colors.gray,
  },
});

const CommonModal = () => {
  return (
    <Modal visible={true} transparent={true}>
      <TouchableOpacity style={styles.shadowView} onPress={() => {}}>
        <Shadow
          style={StyleSheet.flatten([
            styles.shadowTop,
            { shadowColor: colors.pink.shadowTop, padding: 0 },
          ])}
          inner
          useArt
        >
          <View style={styles.view}>
            <Text h2 bold style={styles.check}>
              Checking Account
            </Text>
          </View>
          <Shadow
            inner
            useArt
            style={StyleSheet.flatten([
              styles.shadowBottom,
              { shadowColor: colors.pink.shadowBottom },
            ])}
          />
        </Shadow>
      </TouchableOpacity>
    </Modal>
  );
};

CommonModal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
  positionX: number,
  positionY: number,
  onClose: PropTypes.func,
  doneButton: PropTypes.bool,
};

export default CommonModal;
