/*
  Warnings:

  - Added the required column `AnalystAssignedId` to the `Studies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `StudyTypes` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[EventTypes] ADD [needModality] BIT NOT NULL CONSTRAINT [EventTypes_needModality_df] DEFAULT 0;

-- AlterTable
ALTER TABLE [dbo].[Studies] ADD [AnalystAssignedId] INT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[StudyTypes] ADD [createdAt] DATETIME2 NOT NULL CONSTRAINT [StudyTypes_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
[description] NVARCHAR(1000) NOT NULL,
[updatedAt] DATETIME2 NOT NULL CONSTRAINT [StudyTypes_updatedAt_df] DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE [dbo].[Studies] ADD CONSTRAINT [Studies_AnalystAssignedId_fkey] FOREIGN KEY ([AnalystAssignedId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
