/*
  Warnings:

  - You are about to drop the column `studyEmploymentDataId` on the `StudyReferencingEmploymentWorkInactivityData` table. All the data in the column will be lost.
  - Added the required column `studyId` to the `StudyReferencingEmploymentWorkInactivityData` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[StudyReferencingEmploymentWorkInactivityData] DROP CONSTRAINT [StudyReferencingEmploymentWorkInactivityData_studyEmploymentDataId_fkey];

-- AlterTable
ALTER TABLE [dbo].[StudyReferencingEmploymentWorkInactivityData] DROP COLUMN [studyEmploymentDataId];
ALTER TABLE [dbo].[StudyReferencingEmploymentWorkInactivityData] ADD [studyId] INT NOT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[StudyReferencingEmploymentWorkInactivityData] ADD CONSTRAINT [StudyReferencingEmploymentWorkInactivityData_studyId_fkey] FOREIGN KEY ([studyId]) REFERENCES [dbo].[Studies]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
