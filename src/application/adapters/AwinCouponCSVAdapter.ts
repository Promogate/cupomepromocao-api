import DateAdapter from "../lib/DateAdapter";
import generateID from "../lib/generateID";

export default class AwinCouponCSVAdapter {
  static parse(input: AwinCoupon[]): Coupon[] {
    const coupons: Coupon[] = [];
    input.forEach(coupon => {
      const id = generateID();
      const usage = Math.floor(Math.random() * 200);
      const expirationDate = DateAdapter.formatStringToDate(coupon.Ends);
      coupons.push({
        id: id,
        usage: usage,
        type: coupon.Type,
        destination_link: coupon["Deeplink Tracking"],
        expiration_date: expirationDate,
        promo_code: coupon.Code,
        provider_id: coupon["Advertiser ID"],
        title: coupon.Title,
        campaign: coupon.Campaign,
        terms: coupon.Terms,
        provider_offer_id: coupon["Promotion ID"]
      })
    });
    return coupons;
  }
}

export type AwinCoupon = {
  "Promotion ID": string;
  "Advertiser": string;
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

export type Coupon = {
  id: string;
  type: string;
  destination_link: string;
  expiration_date: string;
  promo_code: string;
  usage: number;
  title: string;
  provider_id: string;
  campaign: string;
  terms: string;
  provider_offer_id: string;
}