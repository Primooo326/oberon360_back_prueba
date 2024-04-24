/*
  Warnings:

  - You are about to alter the column `sourceOfInquiry` on the `StudyReferencingEmploymentData` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(1000)` to `Int`.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[StudyReferencingEmploymentData] ALTER COLUMN [sourceOfInquiry] INT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
