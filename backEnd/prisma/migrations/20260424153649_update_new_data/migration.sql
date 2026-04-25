/*
  Warnings:

  - You are about to drop the column `assignedTo` on the `Ticket` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TicketUserRole" AS ENUM ('DEV', 'TESTER');

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_assignedTo_fkey";

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "assignedTo";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "TicketUser" (
    "id" SERIAL NOT NULL,
    "ticketId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "role" "TicketUserRole" NOT NULL,
    "isMain" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TicketUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TicketUser_userId_idx" ON "TicketUser"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "TicketUser_ticketId_userId_role_key" ON "TicketUser"("ticketId", "userId", "role");

-- AddForeignKey
ALTER TABLE "TicketUser" ADD CONSTRAINT "TicketUser_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketUser" ADD CONSTRAINT "TicketUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
