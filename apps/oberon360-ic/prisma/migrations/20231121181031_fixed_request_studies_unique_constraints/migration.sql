/*
  Warnings:

  - A unique constraint covering the columns `[requestId,serviceId]` on the table `Studies` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[Studies] DROP CONSTRAINT [Studies_requestId_key];

-- CreateIndex
ALTER TABLE [dbo].[Studies] ADD CONSTRAINT [Studies_requestId_serviceId_key] UNIQUE NONCLUSTERED ([requestId], [serviceId]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
