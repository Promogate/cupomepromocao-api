import { Request, Response } from "express";
import csv from "csvtojson";
import prisma from "../lib/prisma";
import AwinCouponCSVAdapter from "../adapters/AwinCouponCSVAdapter";

export default class ImportAwinCouponsFromCSVService {
  async execute(request: Request, response: Response): Promise<Response> {
    try {
      const body = request.body;
      const json = await csv().fromString(body);
      const parsedOffers = AwinCouponCSVAdapter.parse(json);
      await prisma.offer.createMany({
        skipDuplicates: true,
        data: parsedOffers
      })
      return response.json({ message: "Coupons Awin adicionados com sucesso"}).status(200);
    } catch (error: any) {
      console.error(error.stack)
      return response.json({ message: error.message }).status(500);
    }
  }
}