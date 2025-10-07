import { Router } from "express";
import { healthCheck } from "../controllers/healthCheck.controller";

const healthRoute = Router()

healthRoute.get("/", healthCheck)

export {healthRoute}