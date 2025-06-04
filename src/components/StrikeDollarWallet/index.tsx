import { StrikeView } from "@Cypher/components";
import { dispatchNavigate, formatStrikeNumber } from "@Cypher/helpers";
import { btc } from "@Cypher/helpers/coinosHelper";
import useAuthStore from "@Cypher/stores/authStore";
import React, { useState } from "react";
import SimpleToast from "react-native-simple-toast";


interface Props {
    matchedRate: any;
    currency: any;
}

export default function StrikeDollarWallet({
    matchedRate,
    currency,
}: Props) {
    const { isStrikeAuth, strikeUser } = useAuthStore();

    const [dollarStrikeText, setDollarStrikeText] = useState(1000000)
    console.log('dollarStrikeText: ', dollarStrikeText, formatStrikeNumber(dollarStrikeText))

    const addClickHandler = () => {
        setDollarStrikeText(dollarStrikeText + 100000)
    }

    const subClickHandler = () => {
        if (dollarStrikeText !== 0)
            setDollarStrikeText(dollarStrikeText - 100000)
    }

    const buyClickHandler = () => {
        const amt = Number(dollarStrikeText * matchedRate * btc(1))
        if (Number(strikeUser?.[1]?.available) < amt) {
            SimpleToast.show('Amount is exceeded', SimpleToast.SHORT);
            return
        }
        dispatchNavigate('SendScreen', { currency, matchedRate, fiatAmount: amt });
    }

    const sellClickHandler = () => {
        const amt = Number(dollarStrikeText * matchedRate * btc(1))
        if (Number(strikeUser?.[1]?.available) < amt) {
            SimpleToast.show('Amount is exceeded', SimpleToast.SHORT);
            return
        }
        dispatchNavigate('SendScreen', { currency, matchedRate, fiatAmount: amt });
    }

    return (
        isStrikeAuth && <StrikeView plusClick={addClickHandler} minusClick={subClickHandler} sellClick={sellClickHandler} buyClick={buyClickHandler} />
    )
}
