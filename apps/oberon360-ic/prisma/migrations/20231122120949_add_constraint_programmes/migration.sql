/*
  Warnings:

  - A unique constraint covering the columns `[candidateId,EventTypeId]` on the table `Programmes` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
ALTER TABLE [dbo].[Programmes] ADD CONSTRAINT [Programmes_candidateId_EventTypeId_key] UNIQUE NONCLUSTERED ([candidateId], [EventTypeId]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
