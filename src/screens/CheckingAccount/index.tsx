import React, { useState } from "react";
import { Image, ScrollView, SectionList, StyleSheet, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { Icon } from 'react-native-elements';
import { ScreenLayout, Text } from "@Cypher/component-library";
import { GradientCard, GradientTab, GradientText } from "@Cypher/components";
import { CoinOS, Information, Line, Time } from "@Cypher/assets/images";
import { colors } from "@Cypher/style-guide";
import Items from "./Items";
import Header from "./Header";
import { dispatchNavigate } from "@Cypher/helpers";
import Modal from "react-native-modal";

interface Transaction {
    date: string;
    sender: string;
    recipient: string;
    amount: number;
    fiatAmount: number;
}

export default function CheckAccount() {
    const [isTab, setIsTab] = useState(true);
    const [value, setValue] = useState(2);
    const [isError, setIsError] = useState(false);
    const [isErrorReserve, setIsErrorReserve] = useState(false);
    const [reserveAmt, setReserveAmt] = useState(100);
    const transactions = [
        {
            title: '4th March',
            data: [{
                text: 'Sent to Noor@Blink.sv',
                sats: '-65 sats',
                usd: '$0.04',
                type: 'bitcoin',
            },
            {
                text: 'Received to Blink Account',
                sats: '+30k sats',
                usd: '$0.56',
                type: 'lightning',
            }],
        },
        {
            title: '28th February',
            data: [
                {
                    text: 'Sent to Noor@Blink.sv',
                    sats: '-70 sats',
                    usd: '$0.04',
                    type: 'lightning',
                },
                {
                    text: 'Sent to Noor@Blink.sv',
                    sats: '-70 sats',
                    usd: '$0.04',
                },
                {
                    text: 'Sent to Noor@Blink.sv',
                    sats: '-70 sats',
                    usd: '$0.04',
                    type: 'lightning',
                },
                {
                    text: 'Sent to Noor@Blink.sv',
                    sats: '-70 sats',
                    usd: '$0.04',
                    type: 'lightning',
                },
                {
                    text: 'Sent to Noor@Blink.sv',
                    sats: '-70 sats',
                    usd: '$0.04',
                    type: 'lightning',
                },
                {
                    text: 'Sent to Noor@Blink.sv',
                    sats: '-70 sats',
                    usd: '$0.04',
                    type: 'lightning',
                },
            ],
        },
    ];
    const data = [{
        sats: '1M sats',
        usd: '~$500',
    },
    {
        sats: '2M sats',
        usd: '~$1000',
    },
    {
        sats: '3M sats',
        usd: '~$1500',
    },
    {
        sats: '4M sats',
        usd: '~$2000',
    },
    {
        sats: '5M sats',
        usd: '~$2500',
    },
    {
        sats: '6M sats',
        usd: '~$3000',
    },
    {
        sats: '7M sats',
        usd: '~$3500',
    },]

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const onPressHandler = (item: any) => {
        dispatchNavigate('Invoice', {
            item: item,
        });
    }

    const decreaseClickHandler = () => {
        setValue(prev => prev > 1 ? prev - 1 : prev);
    }

    const increaseClickHandler = () => {
        setValue(prev => prev < 7 ? prev + 1 : prev);
    }

    const decreaseClickHandler_ = () => {
        setReserveAmt(prev => prev > 10 ? prev - 10 : prev);
    }

    const increaseClickHandler_ = () => {
        setReserveAmt(prev => prev < 1000 ? prev + 10 : prev);
    }

    const selectClickHandler = (index: number) => {
        setValue(index + 1);
        setModalVisible(false);
    }

    const customizeClickHandler = (index: number) => {
        // WithdrawThreshold   
        dispatchNavigate('WithdrawThreshold', {
            title: index == 0 ? 'Withdraw Threshold' : 'Reserve Amount',
            titleBtn: index == 0 ? 'Set Threshold' : 'Set Reserve Amount',
            onSelect: onSelect,
            index,
        });
    }

    const onSelect = (value: number, index: number) => {
        if (index == 0) {
            if (value < 10000 || value > 300000) {
                setIsError(true);
            } else {
                setIsError(false);
                setValue(value / 10000);
            }
        }else{
            if (value < 10000 || value > 300000) {
                setIsErrorReserve(true);
            } else {
                setIsErrorReserve(false);
                setReserveAmt(value / 10000);
            }
        }
    }

    return (
        <ScreenLayout disableScroll showToolbar isBackButton>
            <View style={styles.container}>
                <View style={[styles.innerView, { borderBottomColor: isTab ? '#333333' : colors.primary }]}>
                    <Text subHeader bold>Checking Account</Text>
                    <GradientTab isTextAfter firstTabImg={Time} secondTabImg={
                        <View style={[styles.lineView, !isTab && { borderColor: colors.white }]}>
                            <Image source={Line} style={[styles.line, !isTab && { tintColor: colors.white }]} resizeMode="contain" />
                        </View>
                    } tab1="History" tab2="Threshold" isSats={isTab} setIsSats={setIsTab}
                        imageStyle={{ width: 30, height: 26 }}
                        color_={['#454545', '#3636368C']} />
                </View>
                {isTab ?
                    <View style={styles.container}>
                        <View style={styles.container}>
                            <SectionList
                                sections={transactions}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => <Items item={item} onPressHandler={onPressHandler} />}
                                renderSectionHeader={({ section: { title } }) => <Header title={title} />}
                                invertStickyHeaders
                            />
                        </View>
                        <View style={styles.bottomView}>
                            <Image source={CoinOS} />
                        </View>
                    </View>
                    :
                    <View style={styles.main}>
                        <Text h2 semibold>Withdraw Threshold</Text>
                        <Text>
                            You can adjust the threshold at which a message will be displayed to remind you to withdraw and materialize the money accumulated on your Checking Account and move it into self-custody.
                        </Text>
                        <Text>
                            Be aware that adjusting this threshold involves balancing Bitcoin network fees against counter-party risk.<Text>fsds</Text></Text>
                        <GradientText style={{ fontSize: 14 }}>Learn more</GradientText>
                        <View style={styles.priceView}>
                            <GradientCard disabled
                                colors_={isError ? [colors.yellow2, colors.yellow2] : ['#FFFFFF', '#B6B6B6']}
                                style={styles.linearGradientStroke} linearStyle={styles.linearGradient}>
                                <View style={styles.background}>
                                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                                        <Text bold style={{ fontSize: 18 }}>{`${value}.0 M`}</Text>
                                    </TouchableOpacity>
                                    <View style={styles.straightLine} />
                                    <View>
                                        <TouchableOpacity onPress={decreaseClickHandler}>
                                            <Icon name="angle-up" type="font-awesome" color="#FFFFFF" />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={increaseClickHandler}>
                                            <Icon name="angle-down" type="font-awesome" color="#FFFFFF" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </GradientCard>
                            <Text style={styles.text}>Sats</Text>
                        </View>
                        <Modal isVisible={isModalVisible}>
                            <View>
                                <GradientCard disabled
                                    style={styles.modal} linearStyle={styles.linearGradient2}>
                                    <ScrollView style={styles.background2}>
                                        {data.map((data, index) => {
                                            return (
                                                <TouchableOpacity style={[styles.row, index % 2 == 0 && { backgroundColor: colors.primary }]}
                                                    onPress={() => selectClickHandler(index)}>
                                                    <Text bold style={{ fontSize: 18 }}>{data?.sats}</Text>
                                                    <Text style={{ fontSize: 18, marginStart: 30 }}>{data?.usd}</Text>
                                                </TouchableOpacity>
                                            )
                                        })}
                                    </ScrollView>
                                </GradientCard>
                            </View>
                        </Modal>
                        <Text center style={styles.usd}>$0001</Text>
                        <TouchableOpacity onPress={() => customizeClickHandler(0)}>
                            <GradientText style={styles.gradientText}>Customize</GradientText>
                        </TouchableOpacity>
                        <Text h3 center>Estimated withdraw fee: 0.2%</Text>
                        <View style={styles.reserve}>
                            <Text h2 semibold>Reserve Amount</Text>
                            <Image source={Information} style={styles.image} />
                        </View>
                        <View style={styles.priceView}>
                            <GradientCard disabled
                                colors_={isErrorReserve ? [colors.yellow2, colors.yellow2] : ['#FFFFFF', '#B6B6B6']}
                                style={StyleSheet.flatten([styles.linearGradientStroke, { height: 60, width: '60%' }])} linearStyle={StyleSheet.flatten([styles.linearGradient, { height: 60 }])}>
                                <View style={[styles.background, {
                                    // alignItems: 'center',
                                    justifyContent: 'flex-end',
                                    paddingEnd: 30,
                                }]}>
                                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                                        <Text bold style={{ fontSize: 18 }}>{`${reserveAmt} k`}</Text>
                                    </TouchableOpacity>
                                    <View style={styles.straightLine} />
                                    <View>
                                        <TouchableOpacity onPress={decreaseClickHandler_}>
                                            <Icon name="angle-up" type="font-awesome" color="#FFFFFF" />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={increaseClickHandler_}>
                                            <Icon name="angle-down" type="font-awesome" color="#FFFFFF" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </GradientCard>
                            <Text style={styles.text}>Sats</Text>
                        </View>
                        <Text center style={styles.usd}>$0001</Text>
                        <TouchableOpacity onPress={() => customizeClickHandler(1)}>
                            <GradientText style={styles.gradientText}>Customize</GradientText>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </ScreenLayout>
    )
}