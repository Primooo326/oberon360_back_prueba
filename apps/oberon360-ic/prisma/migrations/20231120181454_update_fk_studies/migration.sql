/*
  Warnings:

  - Added the required column `LeadAnalystId` to the `Studies` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Studies] DROP CONSTRAINT [Studies_AnalystAssignedId_fkey];

-- AlterTable
ALTER TABLE [dbo].[Studies] ALTER COLUMN [AnalystAssignedId] INT NULL;
ALTER TABLE [dbo].[Studies] ADD [LeadAnalystId] INT NOT NULL,
[createdAt] DATETIME2 NOT NULL CONSTRAINT [Studies_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
[updatedAt] DATETIME2 NOT NULL CONSTRAINT [Studies_updatedAt_df] DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE [dbo].[Studies] ADD CONSTRAINT [Studies_LeadAnalystId_fkey] FOREIGN KEY ([LeadAnalystId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
