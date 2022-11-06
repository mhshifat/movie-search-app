import express from "express";
import cors from "cors";
import routes from "../api"

export default function initExpress() {
  const app = express();

  // Global Moddlewares
  app.use([
    cors({
      origin: "*"
    })
  ])
  // Routes
  app.use(routes());

  return app; 
}