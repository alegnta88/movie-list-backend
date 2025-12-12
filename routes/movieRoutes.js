import express from 'express';
import { getAllMovies, addMovie} from '../controllers/movieController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const movieRoutes = express.Router();

movieRoutes.get('/', getAllMovies);
movieRoutes.post('/add', authenticateToken, addMovie);

export default movieRoutes;