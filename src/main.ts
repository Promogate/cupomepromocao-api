import { config } from "dotenv";
import express from "express";
import "express-async-errors";
import cors from "cors";
import errorHandler from "./application/middlewares/ErrorHandler";
import offersRoute from "./infra/routes/Offers";
import importerRouter from "./infra/routes/Importer";
import bodyParser from "body-parser";

config();
const PORT = process.env.PORT;
const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: [
    "https://cupomepromocao.com.br",
    "https://www.cupomepromocao.com.br",
    process.env.MODE === "development" && "http://localhost:3000"
  ]
}))

app.use("/offers", offersRoute);
app.use("/importer", importerRouter);

app.use(errorHandler);
app.listen(PORT, () => console.log("Working on port: " + PORT));