import { config } from "dotenv";
import express from "express";

config();
const PORT = process.env.PORT;
const app = express();

app.get("/test", (request, response) => {
  return response.status(200).json({ message: "ok!" })
});

app.listen(PORT, () => console.log("Working on port: " + PORT));