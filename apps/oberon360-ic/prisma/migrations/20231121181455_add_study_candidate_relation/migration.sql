/*
  Warnings:

  - A unique constraint covering the columns `[requestId,candidateId,serviceId]` on the table `Studies` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `candidateId` to the `Studies` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[Studies] DROP CONSTRAINT [Studies_requestId_serviceId_key];

-- AlterTable
ALTER TABLE [dbo].[Studies] ADD [candidateId] INT NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[Studies] ADD CONSTRAINT [Studies_requestId_candidateId_serviceId_key] UNIQUE NONCLUSTERED ([requestId], [candidateId], [serviceId]);

-- AddForeignKey
ALTER TABLE [dbo].[Studies] ADD CONSTRAINT [Studies_candidateId_fkey] FOREIGN KEY ([candidateId]) REFERENCES [dbo].[Candidate]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
