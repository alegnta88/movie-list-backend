import prisma from '../config/db.js';

export const addToWatchlist = async (req, res) => {
    const { movieId, status, rating, notes } = req.body;

    const userId = req.user.userId;
    if (!movieId) {
        return res.status(400).json({ error: 'movieId is required' });
    }

    try {
        const movie = await prisma.movie.findUnique({
            where: { id: movieId }
        });

        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        const existingEntry = await prisma.movieWatchlist.findUnique({
            where: {
                userId_movieId: {
                    userId: userId,
                    movieId: movieId
                }
            }
        });

        if (existingEntry) {
            return res.status(400).json({ error: 'Movie already in watchlist' });
        }

        const watchlistEntry = await prisma.movieWatchlist.create({
            data: {
                user: { connect: { id: userId } },
                movie: { connect: { id: movieId } },
                status,
                rating,
                notes
            }
        });

        res.status(201).json({ message: 'Movie added to watchlist', watchlistEntry });

    } catch (error) {
        console.error('Error adding to watchlist:', error);
        res.status(500).json({ error: 'Failed to add movie to watchlist' });
    }
};