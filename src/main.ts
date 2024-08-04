import { config } from "dotenv";
import express from "express";
import "express-async-errors";
import storeRoutes from "./infra/routes/Stores";
import errorHandler from "./application/middlewares/ErrorHandler";
import offersRoute from "./infra/routes/Offers";

config();
const PORT = process.env.PORT;
const app = express();
app.use(express.json());

app.use("/stores", storeRoutes);
app.use("/offers", offersRoute);

app.use(errorHandler);
app.listen(PORT, () => console.log("Working on port: " + PORT));