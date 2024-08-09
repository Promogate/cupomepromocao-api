import { Router } from "express";
import CreateStoreV2Service from "../../application/services/CreateStoreV2";
import FindAllStoresService from "../../application/services/FindAllStores";
import FindStoreByNameV2 from "../../application/services/FindStoreByNameV2";
import FindStoreByProviderIDService from "../../application/services/FindStoreByProviderID";

const storeRoutes = Router();
const createStoreService = new CreateStoreV2Service()
const findAllStoresService = new FindAllStoresService()
const findStoreByName = new FindStoreByNameV2();
const findStoreByProviderID = new FindStoreByProviderIDService()

storeRoutes.post("/create", createStoreService.execute);
storeRoutes.get("/find_all", findAllStoresService.execute);
storeRoutes.get("/find_by_name", findStoreByName.execute);
storeRoutes.get("/find_by_id/:id", findStoreByProviderID.execute);
0
export default storeRoutes;