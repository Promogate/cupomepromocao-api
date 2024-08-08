import { Request, Response } from "express";
import csv from "csvtojson";
import prisma from "../lib/prisma";
import AwinStoresCSVAdapter from "../adapters/AwinStoresCSVAdapter";

export default class ImportAwinStoresFromCSVService {
  async execute(request: Request, response: Response): Promise<Response> {
    try {
      const body = request.body;
      const json = await csv({ delimiter: ";" }).fromString(body);
      const parsedStores = AwinStoresCSVAdapter.parse(json);
      const promises = parsedStores.map(async (store) => {
        try {
          const foundStore = await prisma.store.findUnique({ where: { provider_id: store.provider_id } });
          if (foundStore) {
            console.log(`Loja ${foundStore.name} já cadastrada`);
            return;
          }
          await prisma.store.create({
            data : {
              id: store.id,
              name: store.name,
              about:store.about,
              thumbnail: store.thumbnail,
              thumbnail_background: "",
              provider_id: store.provider_id
            }
          })
          console.log(`Nova loja cadastrada: ${store.name}`)
        } catch (error: any) {
          console.error(error.message);
        }
      })
      await Promise.all(promises);
      return response.json({ message: "Lojas atualizadas" }).status(200);
    } catch (error: any) {
      console.error(error.stack)
      return response.json({ message: error.message }).status(500);
    }
  }
}