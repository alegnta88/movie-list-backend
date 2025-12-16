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

export const removeFromWatchlist = async (req, res) => {

    try {

        const watchlist = await prisma.movieWatchlist.findUnique({
            where: { id: req.params.id }
        });

        if (!watchlist) {
            return res.status(404).json({ error: 'Watchlist entry not found' });
        }

        if (watchlist.userId !== req.user.userId) {
            return res.status(403).json({ error: 'Unauthorized to delete this entry' });
        }

        const deletedEntry = await prisma.movieWatchlist.delete({
            where: { id: req.params.id }
        });

        res.status(200).json({ message: 'Movie removed from watchlist', deletedEntry });
    }
    catch (error) {
        console.error('Error removing from watchlist:', error);
        res.status(500).json({ error: 'Failed to remove movie from watchlist' });
    }
};

export const getUserWatchlist = async (req, res) => {
    const userId = req.user.userId;

    try {
        const watchlist = await prisma.movieWatchlist.findMany({
            where: { userId: userId },
        });

        res.status(200).json({ watchlist });
    } catch (error) {
        console.error('Error fetching watchlist:', error);
        res.status(500).json({ error: 'Failed to fetch watchlist' });
    }
};
