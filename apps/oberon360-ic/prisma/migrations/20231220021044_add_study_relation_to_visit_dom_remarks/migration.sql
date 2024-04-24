/*
  Warnings:

  - Added the required column `studyId` to the `StudyVisitDomiciliaryRemarks` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[StudyVisitDomiciliaryRemarks] ADD [studyId] INT NOT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[StudyVisitDomiciliaryRemarks] ADD CONSTRAINT [StudyVisitDomiciliaryRemarks_studyId_fkey] FOREIGN KEY ([studyId]) REFERENCES [dbo].[Studies]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
