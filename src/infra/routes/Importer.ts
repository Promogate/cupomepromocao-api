import bodyParser from "body-parser";
import { Router } from "express";
import ImportAwinPromotionsFromCSVService from "../../application/services/ImportAwinPromotionsFromCSVService";

const documentsRouter = Router()
const importAwinPromotionsFromCSVService = new ImportAwinPromotionsFromCSVService();

documentsRouter.post("/awin/import_from_csv", bodyParser.text({ type: "text/csv" }), importAwinPromotionsFromCSVService.execute);

export default documentsRouter;