import { Request, Response } from "express";
import { out_intent_offer } from "../@types";
import prisma from "../lib/prisma";
import generateID from "../lib/generateID";
import { removeBrSuffix } from "../lib/removeBRSuffix";

type Input = {
  name: string;
  thumbnail: string;
  thumbnailBackground: string;
  about: string;
  hasCashback?: boolean;
  cashbackAmount?: string;
  cashbackDestinationURL?: string;
  outIntentOffer?: out_intent_offer;
  providerId: string;
}

export default class CreateStoreV2Service {
  async execute(request: Request, response: Response): Promise<Response> {
    try {
      const body = request.body as Input;
      const id = generateID();
      const treatedstoreName = removeBrSuffix(body.name)
      console.log(body);
      const store = await prisma.store.findUnique({ where: { provider_id: body.providerId } });
      if (store) return response.json({ message: "Loja já cadastrada" }).status(422);
      await prisma.store.create({
        data: {
          id: id,
          name: treatedstoreName,
          about: body.about,
          thumbnail: body.thumbnail,
          thumbnail_background: body.thumbnailBackground,
          has_cashback: body.hasCashback,
          cashback_amount: body.cashbackAmount,
          cashback_destination_url: body.cashbackDestinationURL,
          provider_id: body.providerId
        }
      })
      return response.json({ message: "Ok!" }).status(200);
    } catch (error: any) {
      console.error(error.stack)
      return response.json({ message: error.message }).status(500);
    }
  }
}