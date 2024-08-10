import { Request, Response } from "express";
import csv from "csvtojson";
import prisma from "../lib/prisma";
import AwinCouponCSVAdapter from "../adapters/AwinCouponCSVAdapter";

export default class ImportAwinCouponsFromCSVService {
  async execute(request: Request, response: Response): Promise<Response> {
    try {
      const body = request.body;
      const query = request.query as { delimiter: string; }
      const delimiter: Record<string, string> = {
        comma: ",",
        semi: ";"
      }
      const json = await csv({ delimiter: delimiter[query.delimiter] }).fromString(body);
      const parsedCoupons = AwinCouponCSVAdapter.parse(json);
      const promises = parsedCoupons.map(async (coupon) => {
        try {
          const found = await prisma.offer.findFirst({ where: { provider_offer_id: coupon.provider_offer_id } });
          if (found) {
            console.log(`Cupom ${coupon.provider_offer_id} já cadastrada`);
            return;
          }
          await prisma.offer.create({
            data: {
              id: coupon.id,
              title: coupon.title,
              destination_link: coupon.destination_link,
              expiration_date: coupon.expiration_date,
              type: coupon.type,
              usage: coupon.usage,
              promo_code: coupon.promo_code,
              provider_offer_id: coupon.provider_offer_id,
              store: {
                connect: {
                  provider_id: coupon.provider_id
                }
              }
            }
          })
        } catch (error: any) {
          console.log(error);
        }
      })
      await Promise.all(promises);
      return response.json({ message: "Coupons Awin adicionados com sucesso"}).status(200);
    } catch (error: any) {
      console.error(error.stack)
      return response.json({ message: error.message }).status(500);
    }
  }
}