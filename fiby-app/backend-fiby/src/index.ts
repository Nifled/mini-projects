import express, { NextFunction, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { getRoutes } from "./routes/index.js";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

startServer();

function startServer({ port = process.env.PORT } = {}) {
  const app = express();

  app.use(cors());

  // routes will go within '/api'
  app.use("/api", getRoutes());

  // generic error handler just in case errors are missed by middleware
  app.use(errorMiddleware);

  app.listen(port, () => {
    console.log(`Server runnning and listening on port ${port}`);
  });
}

// in case any unhandled error pops up
function errorMiddleware(error: Error, req, res: Response, next: NextFunction) {
  if (res.headersSent) {
    next(error);
  } else {
    console.error(error);
    res.status(500);
    res.json({
      message: error.message,
      // we only add a `stack` property in non-production environments
      ...(process.env.NODE_ENV === "production"
        ? null
        : { stack: error.stack }),
    });
  }
}
