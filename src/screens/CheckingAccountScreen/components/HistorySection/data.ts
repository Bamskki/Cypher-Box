interface HistoryItem {
  text: string;
  amount: string;
  amountInDollars: string;
  type: "sent" | "received";
}

interface HistoryDataItem {
  title: string;
  data: HistoryItem[];
}
const sampleHistoryItem: HistoryItem = {
  text: "Sent to Noor@Blink.sv",
  amount: `${Math.random()} sats`,
  amountInDollars: "$0.04",
  type: "sent",
};

const sampleHistoryItemTwo: HistoryItem = {
  text: "Received to Noor@Blink.sv",
  amount: `${Math.random()}`,
  amountInDollars: "$0.04",
  type: "received",
};

const numberOfCopies = 10;

export const HISTORY_DATA: HistoryDataItem[] = Array(numberOfCopies).fill({
  title: `28th, February`,
  data: [sampleHistoryItem, sampleHistoryItemTwo],
});
