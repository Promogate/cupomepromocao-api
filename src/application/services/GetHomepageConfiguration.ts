import { Request, Response } from "express";
import prisma from "../lib/prisma";

export default class GetHomepageConfiguration {
  async execute(request: Request, response: Response): Promise<Response> {
    try {
      const data = await prisma.configuration.findMany({});
      return response.json(data).status(200);
    } catch (error: any) {
      console.error(error.stack)
      return response.json({ message: error.message }).status(500);
    }
  }
}