import { Request, Response } from "express";
import prisma from "../../lib/prisma";
import DateAdapter from "../../lib/DateAdapter";
import dayjs from "dayjs";

type Input = {
  type: string;
  title: string;
  destinationLink: string;
  expirationDate: string;
  offerImage: string;
  promoCode?: string;
  provider: string;
  price: string;
  oldPrice: string;
  discountAmount: string;
  cashbackAmount?: number;
  isSponsored?: boolean;
  isCashback?: boolean;
  isSpecial?: boolean;
  isExclusive?: boolean;
}

export default class CreateOfferServiceV2 {
  async execute(request: Request, response: Response): Promise<Response> {
    try {
      const body = request.body as Input;
      const usage = Math.floor(Math.random() * 100);
      await prisma.offer.create({
        data: {
          type: body.type,
          title: body.title,
          destination_link: body.destinationLink,
          expiration_date: body.expirationDate,
          offer_image: body.offerImage,
          promo_code: body.promoCode,
          provider: body.provider,
          price: body.price,
          old_price: body.oldPrice,
          discount_amount: body.discountAmount,
          cashback_amount: body.cashbackAmount,
          is_cashback: body.isCashback,
          is_exclusive: body.isExclusive,
          is_special: body.isSpecial,
          is_sponsored: body.isSpecial,
          usage: usage
        }
      });
      return response.json({ message: "Oferta adicionada com sucesso" }).status(200);
    } catch (error: any) {
      console.error(error.stack)
      return response.json({ message: error.message }).status(500);
    }
  }
}