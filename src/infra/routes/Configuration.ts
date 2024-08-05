import { Router } from "express";
import GetHomepageConfiguration from "../../application/services/GetHomepageConfiguration";
import SetHomepageConfigurationService from "../../application/services/SetHomepageConfiguraton";
import UpdateHomepageConfigurationService from "../../application/services/UpdateHomepageConfiguraton";

const configurationRoutes = Router();
const getHomepageConfiguration = new GetHomepageConfiguration()
const setHomepageConfigurationService = new SetHomepageConfigurationService();
const updateHomepageConfigurationService = new UpdateHomepageConfigurationService();

configurationRoutes.get("/homepage_data", getHomepageConfiguration.execute);
configurationRoutes.post("/homepage_data", setHomepageConfigurationService.execute);
configurationRoutes.put("/homepage_data", updateHomepageConfigurationService.execute);

export default configurationRoutes;