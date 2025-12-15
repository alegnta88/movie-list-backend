import { Prisma } from "@prisma/client";


import express from 'express';
import { addToWatchlist } from "../controllers/watchlistController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const watchlistRoutes = express.Router();

watchlistRoutes.use(authenticateToken);

watchlistRoutes.post('/',  addToWatchlist);

export default watchlistRoutes;