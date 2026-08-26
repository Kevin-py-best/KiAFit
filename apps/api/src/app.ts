import cors from "cors";
import express, { type ErrorRequestHandler } from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import { pinoHttp } from "pino-http";

import type { HealthResponse } from "@kiafit/contracts";

import { env } from "./config/env.js";

export function createApp() {
  const app = express();

  app.disable("x-powered-by");
  app.use(pinoHttp());
  app.use(helmet());
  app.use(
    cors({
      origin: env.WEB_ORIGIN,
      credentials: true
    })
  );
  app.use(express.json({ limit: "100kb" }));

  app.get("/api/health", (_request, response) => {
    const body: HealthResponse = {
      status: "ok",
      service: "kiafit-api",
      timestamp: new Date().toISOString(),
      focus: ["participation", "ippt-improvement"]
    };

    response.json(body);
  });

  app.use(
    "/api",
    rateLimit({
      windowMs: 60_000,
      limit: 120,
      standardHeaders: "draft-8",
      legacyHeaders: false
    })
  );

  app.use("/api", (_request, response) => {
    response.status(404).json({
      code: "NOT_FOUND",
      message: "The requested KiaFIT API route does not exist."
    });
  });

  const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
    response.status(500).json({
      code: "INTERNAL_ERROR",
      message:
        env.NODE_ENV === "production"
          ? "KiaFIT could not complete the request."
          : error instanceof Error
            ? error.message
            : "Unknown error"
    });
  };

  app.use(errorHandler);

  return app;
}
