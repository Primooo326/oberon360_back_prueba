/*
  Warnings:

  - A unique constraint covering the columns `[requestId]` on the table `Studies` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
ALTER TABLE [dbo].[Studies] ADD CONSTRAINT [Studies_requestId_key] UNIQUE NONCLUSTERED ([requestId]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
