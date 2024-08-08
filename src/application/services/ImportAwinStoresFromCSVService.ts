import { Request, Response } from "express";
import csv from "csvtojson";
import prisma from "../lib/prisma";
import AwinStoresCSVAdapter from "../adapters/AwinStoresCSVAdapter";

export default class ImportAwinStoresFromCSVService {
  async execute(request: Request, response: Response): Promise<Response> {
    try {
      const body = request.body;
      const json = await csv().fromString(body);
      console.log(json)
      const parsedStores = AwinStoresCSVAdapter.parse(json);
      await prisma.store.createMany({
        skipDuplicates: true,
        data: parsedStores
      })
      return response.json({ message: "Lojas atualizadas com sucesso!" }).status(200);
    } catch (error: any) {
      console.error(error.stack)
      return response.json({ message: error.message }).status(500);
    }
  }
}