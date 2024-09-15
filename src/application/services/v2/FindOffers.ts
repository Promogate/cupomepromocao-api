import { Request, Response } from "express";
import prisma from "../../lib/prisma";

export default class FindOffersService {
  async execute(request: Request, response: Response): Promise<Response> {
    try {
      const offers = await prisma.offer.findMany()
      return response.json(offers).status(200);
    } catch (error: any) {
      console.error(error.stack)
      return response.json({ message: error.message }).status(500);
    }
  }
}