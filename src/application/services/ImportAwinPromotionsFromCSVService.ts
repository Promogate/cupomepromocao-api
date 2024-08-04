import { Request, Response } from "express";
import csv from "csvtojson";
import AwinPromotionCSVAdapter from "../adapters/AwinPromotionCSVAdapter";
import prisma from "../lib/prisma";

export default class ImportAwinPromotionsFromCSVService {
  async execute(request: Request, response: Response): Promise<Response> {
    try {
      const body = request.body;
      const json = await csv().fromString(body);
      const parsedOffers = AwinPromotionCSVAdapter.parse(json);
      console.log(parsedOffers);
      await prisma.offer.createMany({
        skipDuplicates: true,
        data: parsedOffers
      })
      return response.json({ message: "CSV sincronizado" }).status(200);
    } catch (error: any) {
      console.error(error.stack)
      return response.json({ message: error.message }).status(500);
    }
  }
}