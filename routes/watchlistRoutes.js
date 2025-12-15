import { Prisma } from "@prisma/client";


import express from 'express';
import { getUserWatchlist, addToWatchlist, removeFromWatchlist } from "../controllers/watchlistController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const watchlistRoutes = express.Router();

watchlistRoutes.use(authenticateToken);

watchlistRoutes.post('/',  addToWatchlist);

watchlistRoutes.delete('/:id',  removeFromWatchlist);

watchlistRoutes.get('/', getUserWatchlist);

export default watchlistRoutes;