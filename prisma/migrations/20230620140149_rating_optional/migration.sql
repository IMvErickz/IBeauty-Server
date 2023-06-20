-- AlterTable
ALTER TABLE "Products" ALTER COLUMN "Rating" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Provider" ALTER COLUMN "Rating" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Service" ALTER COLUMN "Rating" DROP NOT NULL;
