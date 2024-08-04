import { Request, Response } from "express";
import prisma from "../lib/prisma";

export default class FindStoreByNameV2 {
  async execute(request: Request, response: Response): Promise<Response> {
    try {
      const query = request.query as { name: string };
      const store = await prisma.store.findUnique({ where: { name: query.name } });
      if (!store) return response.json({ message: "Loja não encontrada" }).status(404);
      return response.json({ store }).status(200);
    } catch (error: any) {
      console.error(error.stack)
      return response.json({ message: error.message }).status(500);
    }
  }
}