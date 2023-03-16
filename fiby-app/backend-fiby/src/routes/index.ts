import express from "express";
import { getMathRoutes } from "./math.js";

export function getRoutes() {
  // create a router for all the routes of our app
  const router = express.Router();

  // additional routes
  router.use("", getMathRoutes());

  return router;
}
