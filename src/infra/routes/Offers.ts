import { Router } from "express";
import CreateOfferService from "../../application/services/CreateOffer";
import FindOfferByIDService from "../../application/services/FindOfferByID";

const offersRoute = Router();
const createOfferService = new CreateOfferService();
const findOfferByIDService = new FindOfferByIDService();

offersRoute.post("/create", createOfferService.execute);
offersRoute.get("/find_by_id/:offerId", findOfferByIDService.execute);

export default offersRoute;