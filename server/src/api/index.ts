import { Router } from "express";
import { API_MODULES } from "./modules"

export default function routes() {
  const router = Router();

  router.get("/", (req, res) => res.json({
    success: true,
    data: "Hello from API Server..."
  }));
  Object.entries(API_MODULES).forEach(([path, requests]) => {
    router.use(`/${path}`, requests)
  });
  router.get("*", (req, res) => res.status(404).json({
    success: false,
    data: `Not found - ${req.originalUrl}`
  }));

  return router; 
}