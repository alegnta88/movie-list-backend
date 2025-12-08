-- CreateEnum
CREATE TYPE "WatchlistStatus" AS ENUM ('PLANNED', 'WATCHING', 'COMPLETED', 'DROPPED');

-- AlterTable
ALTER TABLE "movie_watchlist" ADD COLUMN     "status" "WatchlistStatus" NOT NULL DEFAULT 'PLANNED';
