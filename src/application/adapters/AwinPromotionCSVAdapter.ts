import DateAdapter from "../lib/DateAdapter";
import generateID from "../lib/generateID";

export default class AwinPromotionCSVAdapter {
  static parse(input: AwinOffer[]): Offer[] {
    const offers: Offer[] = [];
    input.forEach(offer => {
      const id = generateID();
      const usage = Math.floor(Math.random() * 200);
      const expirationDate = DateAdapter.formatStringToDate(offer.Ends);
      offers.push({
        id: id,
        usage: usage,
        type: offer.Type,
        destination_link: offer["Deeplink Tracking"],
        expiration_date: expirationDate,
        provider_id: offer["Advertiser ID"],
        title: offer.Title
      })
    });
    return offers;
  }
}

export type AwinOffer = {
  "Promotion ID": string;
  Advertiser: string;
  "Advertiser ID": string;
  Type: string;
  Code: string;
  Description: string;
  Starts: string;
  Ends: string;
  Categories: string;
  Regions: string;
  Terms: string;
  "Deeplink Tracking": string;
  Deeplink: string;
  "Commission Groups": string;
  Commission: string;
  Exclusive: string;
  "Date Added": string;
  Title: string;
  Campaign: string;
}

export type Offer = {
  id: string;
  type: string;
  destination_link: string;
  expiration_date: string;
  usage: number;
  title: string;
  provider_id: string;
}