import express from "express";

const app = express();

app.get("/test", (request, response) => {
  return response.status(200).json({  message: "ok!" })
});

app.listen(8080, () => console.log("Working!"));