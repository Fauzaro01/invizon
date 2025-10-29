/*
  Warnings:

  - You are about to drop the column `userId` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `teachers` table. All the data in the column will be lost.
  - Added the required column `name` to the `teachers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `students` DROP FOREIGN KEY `students_userId_fkey`;

-- DropForeignKey
ALTER TABLE `teachers` DROP FOREIGN KEY `teachers_userId_fkey`;

-- DropIndex
DROP INDEX `students_userId_key` ON `students`;

-- DropIndex
DROP INDEX `teachers_userId_key` ON `teachers`;

-- AlterTable
ALTER TABLE `achievements` MODIFY `icon` VARCHAR(191) NULL DEFAULT '🏆';

-- AlterTable
ALTER TABLE `students` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `teachers` DROP COLUMN `userId`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'Class Leader Teacher';
