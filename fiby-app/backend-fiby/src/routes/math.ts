import express, { Request, Response } from "express";
import { fibonacci } from "../utils.js";

export function getMathRoutes() {
  const router = express.Router();

  router.get("/fibonacci/:n", getFibonacci);

  return router;
}

async function getFibonacci(req: Request<{ n: string }>, res: Response) {
  const { n } = req.params;

  const number = Number(n);

  // TODO: validate number?

  res.send({
    result: fibonacci(number),
  });
}
