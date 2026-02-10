-- CreateTable
CREATE TABLE "custom_fonts" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "storagePath" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "mimeType" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "custom_fonts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "custom_fonts_ownerId_idx" ON "custom_fonts"("ownerId");

-- CreateIndex
CREATE INDEX "custom_fonts_ownerId_isActive_idx" ON "custom_fonts"("ownerId", "isActive");

-- AddForeignKey
ALTER TABLE "custom_fonts" ADD CONSTRAINT "custom_fonts_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
