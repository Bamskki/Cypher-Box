import React from "react";
import { Modal, ScrollView, StyleSheet, View } from "react-native";
import { Text } from "@Cypher/component-library";
import { colors, widths } from "@Cypher/style-guide";
import GradientIndicator from "../GradientIndicator";
import GradientView from "../GradientView";

interface CapsulesModalProps {
  modalVisible: boolean;
  capsules: any[];
  onSelectCapsule: (index: number) => void;
  topupClickHandler: (isAnyCapsuleSelected: boolean) => void;
}

const CapsulesModal = ({
  modalVisible,
  capsules,
  onSelectCapsule,
  topupClickHandler,
}: CapsulesModalProps) => {
  const isAnyCapsuleSelected = capsules.some((capsule) => capsule.isSelected);
  return (
    <Modal visible={modalVisible} transparent={true}>
      <View
        style={[
          {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <View
          style={{
            width: widths - 60,
            height: 150,
          }}
        >
          <View
            style={{
              backgroundColor: colors.white,
              borderTopStartRadius: 12,
              borderTopRightRadius: 12,
              height: 27,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: colors.black.default }}>
              Select the Bitcoin Capsules from which you want to spend
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#222020",
              borderWidth: 2,
              borderBottomLeftRadius: 12,
              borderBottomRightRadius: 12,
              borderLeftColor: colors.white,
              borderRightColor: colors.white,
              borderBottomColor: colors.white,
              height: 150,
            }}
          >
            <ScrollView style={{ flex: 0.65 }}>
              <View style={{ paddingBottom: 10 }}>
                <View
                  style={{
                    flexWrap: "wrap",
                    flexDirection: "row",
                    paddingHorizontal: 25,
                    justifyContent: "space-between",
                  }}
                >
                  {capsules.map((item: any, index: number) => (
                    <>
                      <GradientIndicator
                        containerWidth={70}
                        containerHeight={26}
                        subContainerWidth={56}
                        subContainerHeight={12}
                        containerBorderColor={colors.gray.line2}
                        subContainerBorderColor={colors.white}
                        subContainerPadding={0}
                        containerMarginRight={10}
                        item={item}
                        onSelectCapsule={() => onSelectCapsule(index)}
                      />
                    </>
                  ))}
                </View>
              </View>
            </ScrollView>
            <View
              style={{
                borderBottomColor: colors.gray.line2,
                borderBottomWidth: 1,
                marginTop: 2,
              }}
            />
            <View
              style={{
                flex: 0.35,
                width: "100%",
                flexDirection: "row",
                paddingHorizontal: 12,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  width: 110,
                  borderColor: colors.gray.line2,
                  borderWidth: 2,
                  height: 26,
                  borderRadius: 13,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 14 }} center white>
                  ~ $1000
                </Text>
              </View>
              <Text h4 center>
                ~ $1000
              </Text>
              <GradientView
                onPress={() => topupClickHandler(isAnyCapsuleSelected)}
                topShadowStyle={styles.outerShadowStyle2}
                bottomShadowStyle={styles.innerShadowStyle2}
                style={[
                  styles.linearGradientStyle,
                  {
                    width: 85,
                    borderColor: isAnyCapsuleSelected
                      ? colors.gray.line2
                      : colors.gray.line2,
                  },
                ]}
                btnBorder={
                  isAnyCapsuleSelected ? colors.green : colors.gray.line2
                }
                linearGradientStyle={styles.mainShadowStyle}
                linearGradientStyleMain={{
                  borderRadius: 14,
                  height: 26,
                  justifyContent: "center",
                  aligmItems: "center",
                  width: 85,
                }}
                isShadow={false}
              >
                <Text h4 center>
                  Top-up
                </Text>
              </GradientView>
            </View>
          </View>
        </View>
      </View>
    </Modal>
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
  outerShadowStyle2: {
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 2,
    shadowColor: colors.greenShadow,
    borderRadius: 14,
    width: 85,
    height: 26,
    justifyContent: "center",
  },
  innerShadowStyle2: {
    shadowOffset: { width: -2, height: -2 },
    shadowRadius: 2,
    shadowOpacity: 0.64,
    shadowColor: colors.greenShadowLight,
    borderRadius: 14,
    width: 85,
    height: 26,
    justifyContent: "center",
    position: "absolute",
  },
  mainShadowStyle: {
    shadowColor: "#27272C",
    shadowOffset: { width: -8, height: -8 },
    shadowOpacity: 0.48,
    shadowRadius: 12,
    elevation: 8,
  },
  linearGradientStyle: {
    shadowColor: "#040404",
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 0.8,
    shadowRadius: 16,
    elevation: 8,
  },
});
export default React.memo(CapsulesModal);
