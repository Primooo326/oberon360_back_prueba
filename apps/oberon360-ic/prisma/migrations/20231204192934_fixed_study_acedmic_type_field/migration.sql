/*
  Warnings:

  - You are about to alter the column `SourceOfInquiry` on the `StudyReferencingAcademicData` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(1000)` to `Int`.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[StudyReferencingAcademicData] ALTER COLUMN [SourceOfInquiry] INT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
