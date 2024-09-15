import { Request, Response } from "express";
import csv from "csvtojson";
import AwinPromotionCSVAdapter from "../adapters/AwinPromotionCSVAdapter";
import prisma from "../lib/prisma";

export default class ImportAwinPromotionsFromCSVService {
  async execute(request: Request, response: Response): Promise<Response> {
    try {
      const body = request.body;
      const query = request.query as { delimiter: string; }
      const delimiter: Record<string, string> = {
        comma: ",",
        semi: ";"
      }
      const json = await csv({ delimiter: delimiter[query.delimiter] }).fromString(body);
      const parsedOffers = AwinPromotionCSVAdapter.parse(json);
      const promises = parsedOffers.map(async (offer) => {
        try {
          await prisma.offer.create({
            data: {
              title: offer.title,
              destination_link: offer.destination_link,
              expiration_date: offer.expiration_date,
              type: offer.type,
              usage: offer.usage
            },
          })
        } catch (error: any) {
          console.log(error);
        }
      })
      await Promise.all(promises);
      return response.json({ message: "Promoções sincronizadas" }).status(200);
    } catch (error: any) {
      console.error(error)
      return response.json({ message: error.message }).status(500);
    }
  }
}