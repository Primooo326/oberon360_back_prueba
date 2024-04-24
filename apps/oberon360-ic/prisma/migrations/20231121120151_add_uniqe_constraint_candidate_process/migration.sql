/*
  Warnings:

  - A unique constraint covering the columns `[candidateId]` on the table `CandidateProcessStatus` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
ALTER TABLE [dbo].[CandidateProcessStatus] ADD CONSTRAINT [CandidateProcessStatus_candidateId_key] UNIQUE NONCLUSTERED ([candidateId]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
