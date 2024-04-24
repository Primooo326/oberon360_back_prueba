/*
  Warnings:

  - A unique constraint covering the columns `[studyId]` on the table `StudyVisitDomiciliaryRemarks` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
ALTER TABLE [dbo].[StudyVisitDomiciliaryRemarks] ADD CONSTRAINT [StudyVisitDomiciliaryRemarks_studyId_key] UNIQUE NONCLUSTERED ([studyId]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
