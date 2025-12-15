import prismaClient from "../config/db.js";

export const getAllMovies = async (req, res) => {
    try {
        const movies = await prismaClient.movie.findMany();
        res.status(200).json({ movies });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch movies' });
    }
};

export const addMovie = async (req, res) => {
    const { title, overview, releaseYear, genre, runtime, posterUrl } = req.body;

    if(!title || !genre) {
        return res.status(400).json({ error: 'these fields are required' });
    }

    try {
    const userId = req.user.userId;
    const newMovie = await prismaClient.movie.create({
    data: {
        title,
        overview,
        releaseYear,
        genre,
        runtime,
        posterUrl,
        user: {
            connect: { id: userId } 
        }
    }
});
        
    res.status(201).json({ message: 'Movie added successfully', movie: newMovie });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add movie' });
    }   
};