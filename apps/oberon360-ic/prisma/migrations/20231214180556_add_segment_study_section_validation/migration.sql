BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[StudyTypes] ADD [itsAPolygraph] BIT NOT NULL CONSTRAINT [StudyTypes_itsAPolygraph_df] DEFAULT 0,
[itsAVisit] BIT NOT NULL CONSTRAINT [StudyTypes_itsAVisit_df] DEFAULT 0;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
