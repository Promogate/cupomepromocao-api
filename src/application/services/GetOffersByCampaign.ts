import { Request, Response } from "express";
import prisma from "../lib/prisma";

export default class GetOffersByCampaignService {
  async execute(request: Request, response: Response): Promise<Response> {
    try {
      let data: Array<any> = [];
      const query = request.query as { campaigns: string };
      const campaigns: string[] = query.campaigns.split(",");
      const promises = campaigns.map(async (campaign) => {
        const offers = await prisma.offer.findMany({
          where: {
            cep_campaign: {
              hasSome: [campaign]
            }
          },
          include: {
            store: true
          }
        });
        data.push(...offers);
      });
      await Promise.all(promises);
      return response.status(200).json({ offers: data });
    } catch (error: any) {
      console.error(error.stack);
      return response.status(500).json({ message: error.message });
    }
  }
}
