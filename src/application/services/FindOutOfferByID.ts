import { Request, Response } from "express";
import prisma from "../lib/prisma";

export default class FindOutOfferByIDService {
  async execute(request: Request, response: Response): Promise<Response> {
    try {
      const params = request.params as { offerId: string };
      const id = Number(params.offerId);
      const offer = await prisma.offer.findUnique({ where: { id: id } });
      if (!offer) return response.json({ message: "Oferta não encontrata" }).status(404);
      await prisma.offer.update({
        where: { id: id },
        data: { usage: offer.usage += 1 }
      })
      return response.json({ offer }).status(200);
    } catch (error: any) {
      console.error(error.stack)
      return response.json({ message: error.message }).status(500);
    }
  }
}