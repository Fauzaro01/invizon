/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `posts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `achievements` MODIFY `icon` VARCHAR(191) NULL DEFAULT '🏆';

-- AlterTable
-- First add slug column as nullable
ALTER TABLE `posts` ADD COLUMN `slug` VARCHAR(191) NULL;

-- Generate slugs for existing posts from their titles
UPDATE `posts` SET `slug` = LOWER(REPLACE(REPLACE(REPLACE(`title`, ' ', '-'), '.', ''), ',', '')) WHERE `slug` IS NULL;

-- Make slug required and unique
ALTER TABLE `posts` MODIFY `slug` VARCHAR(191) NOT NULL;
CREATE UNIQUE INDEX `posts_slug_key` ON `posts`(`slug`);
