import DateAdapter from "../lib/DateAdapter";
import generateID from "../lib/generateID";
import { removeBrSuffix } from "../lib/removeBRSuffix";

export default class AwinStoresCSVAdapter {
  static parse(input: AwinStore[]): Store[] {
    const stores: Store[] = [];
    input.forEach(store => {
      const name = removeBrSuffix(store.programmeName);
      const id = generateID();
      stores.push({
        id: id,
        about: store.descriptionShort,
        name: name,
        thumbnail: store.logoUrl,
        thumbnail_background: "",
        provider_id: store.advertiserId
      })
    });
    return stores;
  }
}

export type AwinStore = {
  advertiserId: string;
  programmeName: string;
  conversionRate: string;
  approvalRate: string;
  epc: string;
  launchDate: string;
  paymentStatus: string;
  paymentRiskLevel: string;
  awinIndex: string;
  feedEnabled: string;
  productReporting: string;
  commissionMin: string;
  commissionMax: string;
  leadMin: string;
  leadMax: string;
  cookieLength: string;
  parentSectors: string;
  subSectors: string;
  primarySector: string;
  averagePaymentTime: string;
  primaryRegion: string;
  descriptionShort: string;
  logoUrl: string;
  displayUrl: string;
}

export type Store = {
  id: string;
  name: string;
  about: string;
  thumbnail: string;
  thumbnail_background: string;
  provider_id: string;
}