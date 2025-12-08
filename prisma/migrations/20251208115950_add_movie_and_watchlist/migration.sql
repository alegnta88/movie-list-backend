-- CreateTable
CREATE TABLE "movie_watchlist" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "movieId" TEXT NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "watched" BOOLEAN NOT NULL DEFAULT false,
    "rating" INTEGER,
    "notes" TEXT,

    CONSTRAINT "movie_watchlist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "movie_watchlist_userId_idx" ON "movie_watchlist"("userId");

-- CreateIndex
CREATE INDEX "movie_watchlist_movieId_idx" ON "movie_watchlist"("movieId");

-- CreateIndex
CREATE UNIQUE INDEX "movie_watchlist_userId_movieId_key" ON "movie_watchlist"("userId", "movieId");

-- AddForeignKey
ALTER TABLE "movie_watchlist" ADD CONSTRAINT "movie_watchlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movie_watchlist" ADD CONSTRAINT "movie_watchlist_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
