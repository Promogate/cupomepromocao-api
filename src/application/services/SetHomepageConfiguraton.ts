import { Request, Response } from "express";
import { homepage_best_top_three, homepage_navigation_offer, homepage_thin_banner, top_bar_cta } from "../@types";
import prisma from "../lib/prisma";
import generateID from "../lib/generateID";

export default class SetHomepageConfigurationService {
  async execute(request: Request, response: Response): Promise<Response> {
    try {
      const body = request.body as Input;
      const id = generateID();
      const topThree = JSON.stringify(body.topThree);
      const thinBanner = JSON.stringify(body.thinBanner);
      const navigationOffer = JSON.stringify(body.navigationOffer);
      const topBar = JSON.stringify(body.topBar);
      await prisma.configuration.create({
        data: {
          id: id,
          homepage_best_top_three: topThree,
          homepage_navigation_offer: navigationOffer,
          homepage_thin_banner: thinBanner,
          top_bar_cta: topBar
        }
      })
      return response.json({ message: "Configurações criadas com sucesso" }).status(201);
    } catch (error: any) {
      console.error(error.stack)
      return response.json({ message: error.message }).status(500);
    }
  }
}

type Input = {
  topThree?: homepage_best_top_three[];
  thinBanner?: homepage_thin_banner;
  navigationOffer?: homepage_navigation_offer;
  topBar?: top_bar_cta;
}