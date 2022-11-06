import { Router } from "express";
import { moviesController } from "./controller";

export const moviesRouter = Router();

moviesRouter.get("/", moviesController.getMovies);
moviesRouter.get("/search", moviesController.searchMovies);
moviesRouter.get("/publish", moviesController.getMoviesAndPublishToQueue);
moviesRouter.get("/:movieIdentifier", moviesController.getMovie);