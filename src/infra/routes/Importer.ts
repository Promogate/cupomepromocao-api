import bodyParser from "body-parser";
import { Router } from "express";
import ImportAwinPromotionsFromCSVService from "../../application/services/ImportAwinPromotionsFromCSVService";
import ImportAwinCouponsFromCSVService from "../../application/services/ImportAwinCouponsFromCSVService";
import ImportAwinStoresFromCSVService from "../../application/services/ImportAwinStoresFromCSVService";

const documentsRouter = Router()
const importAwinPromotionsFromCSVService = new ImportAwinPromotionsFromCSVService();
const importAwinCouponsFromCSVService = new ImportAwinCouponsFromCSVService();
const importAwinStroresFromCSVSerice = new ImportAwinStoresFromCSVService()

documentsRouter.post("/awin/promotions/import_from_csv", bodyParser.text({ type: "text/csv", limit: "50mb" }), importAwinPromotionsFromCSVService.execute);
documentsRouter.post("/awin/coupons/import_from_csv", bodyParser.text({ type: "text/csv", limit: "50mb" }), importAwinCouponsFromCSVService.execute);
documentsRouter.post("/awin/stores/import_from_csv", bodyParser.text({ type: "text/csv", limit: "50mb" }), importAwinStroresFromCSVSerice.execute);

export default documentsRouter;