import { request, Request, response, Response } from "express";
import prisma from "../lib/prisma";

export default class GetOffersByTypeService {
  async execute(request: Request, response: Response): Promise<Response> {
    try {
      const query = request.query as { type: string };
      const offers = await prisma.offer.findMany({
        where: {
          type: query.type
        },
        include: {
          store: true
        }
      });
      return response.json({ offers }).status(200);
    } catch (error: any) {
      console.error(error);
      return response.json({ message: error.message }).status(500);
    }
  }
}