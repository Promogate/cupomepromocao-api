import { Router } from "express";
import CreateOfferService from "../../application/services/CreateOffer";
import FindOfferByIDService from "../../application/services/FindOfferByID";
import GetOffersByCampaignService from "../../application/services/GetOffersByCampaign";
import FindOutOfferByIDService from "../../application/services/FindOutOfferByID";
import GetOffersByTypeService from "../../application/services/GetOffersByType";
import CreateOfferServiceV2 from "../../application/services/v2/CreateOffer";
import FindOffersService from "../../application/services/v2/FindOffers";

const offersRoute = Router();
const createOfferService = new CreateOfferService();
const createOfferServiceV2 = new CreateOfferServiceV2();
const findOffers = new FindOffersService();
const findOfferByIDService = new FindOfferByIDService();
const findOutOfferByIDService = new FindOutOfferByIDService();
const getOffersByCampaignService = new GetOffersByCampaignService();
const getOffersByTypeService = new GetOffersByTypeService();

offersRoute.post("/create", createOfferService.execute);
offersRoute.post("/v2/create", createOfferServiceV2.execute);
offersRoute.get("/v2/find_offers", findOffers.execute);
offersRoute.get("/find_by_id/:offerId", findOfferByIDService.execute);
offersRoute.get("/find_by_type", getOffersByTypeService.execute);
offersRoute.get("/out/find_by_id/:offerId", findOutOfferByIDService.execute);
offersRoute.get("/campaign/get_offers", getOffersByCampaignService.execute);

export default offersRoute;