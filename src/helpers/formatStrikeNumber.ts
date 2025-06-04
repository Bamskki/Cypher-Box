function formatStrikeNumber(num: number) {
    const millions = num / 1000000;
    return `${millions.toFixed(1)}M`;
}

export default formatStrikeNumber;