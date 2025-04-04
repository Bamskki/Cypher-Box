//
//  WalletInformationWidget.swift
//  WalletInformationWidget
//
//  Created by Marcos Rodriguez on 10/29/20.
//  Copyright © 2020 BlueWallet. All rights reserved.
//

import WidgetKit
import SwiftUI

struct WalletInformationWidgetProvider: TimelineProvider {
  typealias Entry = WalletInformationWidgetEntry
  static var lastSuccessfulEntry: WalletInformationWidgetEntry?

  func placeholder(in context: Context) -> WalletInformationWidgetEntry {
    return WalletInformationWidgetEntry.placeholder
  }
  
  func getSnapshot(in context: Context, completion: @escaping (WalletInformationWidgetEntry) -> ()) {
    let entry: WalletInformationWidgetEntry
    if (context.isPreview) {
      entry = WalletInformationWidgetEntry(date: Date(), marketData: MarketData(nextBlock: "26", sats: "9 134", price: "$10,000", rate: 10000), allWalletsBalance: WalletData(balance: 1000000, latestTransactionTime: LatestTransaction(isUnconfirmed: false, epochValue: 1568804029000)))
    } else {
      entry = WalletInformationWidgetEntry(date: Date(), marketData: emptyMarketData)
    }
    completion(entry)
  }
  
  func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
    var entries: [WalletInformationWidgetEntry] = []
    let userPreferredCurrency = WidgetAPI.getUserPreferredCurrency()
    let allwalletsBalance = WalletData(balance: UserDefaultsGroup.getAllWalletsBalance(), latestTransactionTime: UserDefaultsGroup.getAllWalletsLatestTransactionTime())
    
    WidgetAPI.fetchPrice(currency: userPreferredCurrency) { (result, error) in
      let entry: WalletInformationWidgetEntry
      
      if let result = result {
        entry = WalletInformationWidgetEntry(date: Date(), marketData: MarketData(nextBlock: "", sats: "", price: result.formattedRate ?? "!", rate: result.rateDouble), allWalletsBalance: allwalletsBalance)
        WalletInformationWidgetProvider.lastSuccessfulEntry = entry
      } else {
        // Use the last successful entry if available
        if let lastEntry = WalletInformationWidgetProvider.lastSuccessfulEntry {
          entry = lastEntry
        } else {
          // Fallback to a default entry if no successful entry is available
          entry = WalletInformationWidgetEntry.placeholder
        }
      }
      entries.append(entry)
      let timeline = Timeline(entries: entries, policy: .atEnd)
      completion(timeline)
    }
  }
}

struct WalletInformationWidgetEntry: TimelineEntry {
  let date: Date
  let marketData: MarketData
  var allWalletsBalance: WalletData = WalletData(balance: 0)
}

extension WalletInformationWidgetEntry {
  static var placeholder: WalletInformationWidgetEntry {
    WalletInformationWidgetEntry(date: Date(), marketData: MarketData(nextBlock: "26", sats: "9 134", price: "$10,000", rate: 10000), allWalletsBalance: WalletData(balance: 1000000, latestTransactionTime: LatestTransaction(isUnconfirmed: false, epochValue: 1568804029000)))
  }
}

struct WalletInformationWidgetEntryView : View {
  let entry: WalletInformationWidgetEntry
  
  var WalletBalance: some View {
    WalletInformationView(allWalletsBalance: entry.allWalletsBalance, marketData: entry.marketData)
  }
  
  var body: some View {
    VStack(content: {
      WalletBalance
    }).padding().background(Color.widgetBackground)
  }
}

struct WalletInformationWidget: Widget {
  let kind: String = "WalletInformationWidget"
  
  var body: some WidgetConfiguration {
    if #available(iOSApplicationExtension 16.0, *) {
      return StaticConfiguration(kind: kind, provider: WalletInformationWidgetProvider()) { entry in
        WalletInformationWidgetEntryView(entry: entry)
      }
      .configurationDisplayName("Balance")
      .description("View your accumulated balance.").supportedFamilies([.systemSmall])
    } else {
      return StaticConfiguration(kind: kind, provider: WalletInformationWidgetProvider()) { entry in
        WalletInformationWidgetEntryView(entry: entry)
      }
      .configurationDisplayName("Balance")
      .description("View your accumulated balance.").supportedFamilies([.systemSmall])
    }
  }
}

struct WalletInformationWidget_Previews: PreviewProvider {
  static var previews: some View {
    WalletInformationWidgetEntryView(entry: WalletInformationWidgetEntry(date: Date(), marketData: MarketData(nextBlock: "26", sats: "9 134", price: "$10,000", rate: Double(0)), allWalletsBalance: WalletData(balance: 10000, latestTransactionTime: LatestTransaction(isUnconfirmed: false, epochValue: 1568804029000))))
      .previewContext(WidgetPreviewContext(family: .systemSmall))
  }
}
