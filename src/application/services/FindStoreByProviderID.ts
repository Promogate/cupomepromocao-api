import { Request, Response } from "express";
import prisma from "../lib/prisma";

export default class FindStoreByProviderIDService {
  async execute(request: Request, response: Response): Promise<Response> {
    try {
      const params = request.params as { id: string };
      const store = await prisma.store.findUnique({ where: { provider_id: params.id }, include: { offers: true } });
      if (!store) return response.json({ message: "Oferta não encontrata" }).status(404);
      return response.json({ store }).status(200);
    } catch (error: any) {
      console.error(error.stack)
      return response.json({ message: error.message }).status(500);
    }
  }
}