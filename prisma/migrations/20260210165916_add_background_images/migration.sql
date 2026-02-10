-- CreateTable
CREATE TABLE "background_images" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "storagePath" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "mimeType" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "background_images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "background_images_ownerId_idx" ON "background_images"("ownerId");

-- CreateIndex
CREATE INDEX "background_images_ownerId_isActive_idx" ON "background_images"("ownerId", "isActive");

-- AddForeignKey
ALTER TABLE "background_images" ADD CONSTRAINT "background_images_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
