import { Minus, Plus, Strike } from '@Cypher/assets/images'
import { Text } from '@Cypher/component-library'
import React, { useState } from 'react'
import { Image, View } from 'react-native'
import BlackBGView from '../BlackBGView'
import CustomProgressBar from '../CustomProgressBar'
import GradientView from '../GradientView'
import LinearBorderView from './LinearBorderView'
import styles from './styles'
import { formatStrikeNumber } from '@Cypher/helpers'

interface Props {
    showLogo?: boolean;
    isShowButtons?: boolean;
    plusClick?(): void;
    minusClick?(): void;
    sellClick?(): void;
    buyClick?(): void;
    btcValue?: string;
    fiatBalance?: string;
}

function StrikeView({ showLogo = false, isShowButtons = false,
    plusClick,
    minusClick,
    sellClick,
    buyClick,
    btcValue = '$80,000 /BTC',
    fiatBalance = '$3000',
}: Props) {

    const [dollarStrikeText, setDollarStrikeText] = useState(1000000)
    console.log('dollarStrikeText: ', dollarStrikeText, formatStrikeNumber(dollarStrikeText))

    const addClickHandler = () => {
        setDollarStrikeText(dollarStrikeText + 100000)
    }

    const subClickHandler = () => {
        if (dollarStrikeText !== 0)
            setDollarStrikeText(dollarStrikeText - 100000)
    }


    return (
        <View style={styles.container}>
            <View style={styles.rowContainer}>
                <LinearBorderView>
                    <View style={styles.strikeRow}>
                        <View style={styles.sideContainer}>
                            <View style={styles.fiatBalanceBox}>
                                <Text h2 bold>Fiat Balance</Text>
                                <Text h2 bold>{fiatBalance}</Text>
                            </View>
                            <GradientView
                                style={styles.sellBuyButton}
                                linearGradientStyle={styles.sellBuyGradient}
                                topShadowStyle={styles.topShadow}
                                bottomShadowStyle={styles.bottomShadow}
                                linearGradientStyleMain={styles.linearGradientStyleMain}
                                onPress={sellClick}
                            >
                                <Text h3 bold center>SELL</Text>
                            </GradientView>
                        </View>

                        <View style={styles.sideContainer}>
                            <BlackBGView linearFirstStyle={styles.fiatBalanceBox2}
                                linearSecondStyle={styles.fiatBalanceBox3}>
                                {/* <Image source={ProgressBar} resizeMode='contain' style={styles.progressBarImage} /> */}
                                <CustomProgressBar value={dollarStrikeText} />
                                <Text h3 bold >{`${formatStrikeNumber(dollarStrikeText)} sats`}</Text>
                                <Text h4 semibold>$2000</Text>
                            </BlackBGView>
                            <GradientView
                                style={styles.sellBuyButton}
                                linearGradientStyle={styles.sellBuyGradient}
                                topShadowStyle={styles.topShadow}
                                bottomShadowStyle={styles.bottomShadow}
                                linearGradientStyleMain={styles.linearGradientStyleMain}
                                onPress={buyClick}
                            >
                                <Text h3 bold center>BUY</Text>
                            </GradientView>
                        </View>
                    </View>
                </LinearBorderView>
                <View>
                    <GradientView
                        style={styles.sellBuyButton2}
                        linearGradientStyle={styles.sellBuyGradient2}
                        topShadowStyle={styles.topShadow2}
                        bottomShadowStyle={styles.bottomShadow2}
                        linearGradientStyleMain={styles.linearGradientStyleMain2}
                        onPress={addClickHandler}
                    >
                        <Image source={Plus} resizeMode='contain' />
                    </GradientView>
                    <GradientView
                        style={[styles.sellBuyButton2, { marginTop: 5 }]}
                        linearGradientStyle={styles.sellBuyGradient2}
                        topShadowStyle={styles.topShadow2}
                        bottomShadowStyle={styles.bottomShadow2}
                        linearGradientStyleMain={styles.linearGradientStyleMain2}
                        onPress={subClickHandler}
                    >
                        <Image source={Minus} resizeMode='contain' />
                    </GradientView>
                </View>
            </View>
            {isShowButtons &&
                <View style={styles.bottomButtonsContainer}>
                    <GradientView
                        style={styles.sellBuyButton3}
                        linearGradientStyle={styles.sellBuyGradient3}
                        topShadowStyle={styles.topShadow3}
                        bottomShadowStyle={styles.bottomShadow3}
                        linearGradientStyleMain={styles.linearGradientStyleMain3}
                    >
                        <Text h3 bold center>Deposit-Withdraw fiat</Text>
                    </GradientView>
                    <GradientView
                        style={styles.sellBuyButton4}
                        linearGradientStyle={styles.sellBuyGradient4}
                        topShadowStyle={styles.topShadow4}
                        bottomShadowStyle={styles.bottomShadow4}
                        linearGradientStyleMain={styles.linearGradientStyleMain4}
                    >
                        <Text h3 bold center>Logout</Text>
                    </GradientView>
                </View>
            }
            <BlackBGView linearFirstStyle={styles.bitcoinPriceContainer}>
                <Text bold style={styles.bitcoinPriceText}>{btcValue}</Text>
            </BlackBGView>
            {showLogo &&
                <Image source={Strike} style={styles.strikeLogo} resizeMode='contain' />
            }
        </View>
    )
}

export default StrikeView

