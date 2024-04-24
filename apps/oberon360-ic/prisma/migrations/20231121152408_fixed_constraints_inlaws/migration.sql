BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[CandidateSpouseAndInlawData] ALTER COLUMN [motherInLawAge] INT NULL;
ALTER TABLE [dbo].[CandidateSpouseAndInlawData] ALTER COLUMN [motherInLawAddress] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[CandidateSpouseAndInlawData] ALTER COLUMN [motherInLawYearsOfAcquaintances] INT NULL;
ALTER TABLE [dbo].[CandidateSpouseAndInlawData] ALTER COLUMN [motherInLawProfession] INT NULL;
ALTER TABLE [dbo].[CandidateSpouseAndInlawData] ALTER COLUMN [fatherInLawAge] INT NULL;
ALTER TABLE [dbo].[CandidateSpouseAndInlawData] ALTER COLUMN [fatherInLawAddress] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[CandidateSpouseAndInlawData] ALTER COLUMN [fatherInLawYearsOfAcquaintances] INT NULL;
ALTER TABLE [dbo].[CandidateSpouseAndInlawData] ALTER COLUMN [fatherInLawProfession] INT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
