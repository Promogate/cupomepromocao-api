import { Request, Response } from "express";
import prisma from "../lib/prisma";

export default class FindOfferByIDService {
  async execute(request: Request, response: Response): Promise<Response> {
    try {
      const params = request.params as { offerId: string };
      const offer = await prisma.offer.findUnique({ where: { id: params.offerId } });
      if (!offer) return response.json({ message: "Oferta não encontrata" }).status(404);
      await prisma.offer.update({
        where: { id: params.offerId },
        data: { usage: offer.usage += 1 }
      })
      return response.json({ offer }).status(200);
    } catch (error: any) {
      console.error(error.stack)
      return response.json({ message: error.message }).status(500);
    }
  }
}