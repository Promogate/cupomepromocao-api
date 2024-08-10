import { Router } from "express";
import CreateOfferService from "../../application/services/CreateOffer";
import FindOfferByIDService from "../../application/services/FindOfferByID";
import GetOffersByCampaignService from "../../application/services/GetOffersByCampaign";
import FindOutOfferByIDService from "../../application/services/FindOutOfferByID";
import GetOffersByTypeService from "../../application/services/GetOffersByType";

const offersRoute = Router();
const createOfferService = new CreateOfferService();
const findOfferByIDService = new FindOfferByIDService();
const findOutOfferByIDService = new FindOutOfferByIDService();
const getOffersByCampaignService = new GetOffersByCampaignService();
const getOffersByTypeService = new GetOffersByTypeService();

offersRoute.post("/create", createOfferService.execute);
offersRoute.get("/find_by_id/:offerId", findOfferByIDService.execute);
offersRoute.get("/find_by_type", getOffersByTypeService.execute);
offersRoute.get("/out/find_by_id/:offerId", findOutOfferByIDService.execute);
offersRoute.get("/campaign/get_offers", getOffersByCampaignService.execute);

export default offersRoute;