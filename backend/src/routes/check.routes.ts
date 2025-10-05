import { Router } from "express";
import { healthCheck } from "../controllers/healthCheck";

const healthRoute = Router()

healthRoute.get("/", healthCheck)

export {healthRoute}