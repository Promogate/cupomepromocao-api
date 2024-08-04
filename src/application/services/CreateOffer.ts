import { Request, Response } from "express";
import { offer_main_message } from "../@types";
import prisma from "../lib/prisma";
import generateID from "../lib/generateID";
import dayjs from "dayjs";
import DateAdapter from "../lib/DateAdapter";

type Input = {
  type: string;
  title: string;
  usage: number;
  destinationLink: string;
  expirationDate: string;
  providerId: string;
  promoCode?: string;
  offerMainMessage?: offer_main_message;
  isSponsored?: boolean;
  isCashback?: boolean;
  isSpecial?: boolean;
  isExclusive?: boolean;
  cashbackAmount?: number;
}

export default class CreateOfferService {
  async execute(request: Request, response: Response): Promise<Response> {
    try {
      const body = request.body as Input;
      const id = generateID();
      const offerMainMessage = body.offerMainMessage ? JSON.stringify(body.offerMainMessage) : "";
      const expirationDate = DateAdapter.formatStringToDate(body.expirationDate);
      await prisma.offer.create({
        data: {
          id: id,
          type: body.type,
          destination_link: body.destinationLink,
          expiration_date: expirationDate,
          title: body.title,
          usage: body.usage,
          cashback_amount: body.cashbackAmount,
          is_cashback: body.isCashback,
          is_exclusive: body.isExclusive,
          is_special: body.isSpecial,
          is_sponsored: body.isSpecial,
          offer_main_message: offerMainMessage,
          promo_code: body.promoCode,
          provider_id: body.providerId
        }
      });
      return response.json({ message: "Oferta adicionada com sucesso" }).status(200);
    } catch (error: any) {
      console.error(error.stack)
      return response.json({ message: error.message }).status(500);
    }
  }
}