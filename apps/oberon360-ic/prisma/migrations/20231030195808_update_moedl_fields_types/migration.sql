BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[CandidateAcademicData] ADD [updatedDate] DATETIME2;

-- AlterTable
ALTER TABLE [dbo].[CandidateBasicData] ALTER COLUMN [identificationNumber] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[CandidateBasicData] ALTER COLUMN [militaryPassbookNumber] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[CandidateBasicData] ALTER COLUMN [phone] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[CandidateBasicData] ALTER COLUMN [cellPhone] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[CandidateBasicData] ADD [updatedDate] DATETIME2;

-- AlterTable
ALTER TABLE [dbo].[CandidateEmploymentData] ALTER COLUMN [bossPhone] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[CandidateEmploymentData] ADD [updatedDate] DATETIME2;

-- AlterTable
ALTER TABLE [dbo].[CandidateHousingData] ADD [updatedDate] DATETIME2;

-- AlterTable
ALTER TABLE [dbo].[CandidateParentsData] ALTER COLUMN [motherPhone] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[CandidateParentsData] ALTER COLUMN [motherCellPhone] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[CandidateParentsData] ALTER COLUMN [fatherPhone] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[CandidateParentsData] ALTER COLUMN [fatherCellPhone] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[CandidateParentsData] ADD [updatedDate] DATETIME2;

-- AlterTable
ALTER TABLE [dbo].[CandidatePeopleWithLiveData] ALTER COLUMN [phone] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[CandidatePeopleWithLiveData] ADD [updatedDate] DATETIME2;

-- AlterTable
ALTER TABLE [dbo].[CandidateReferencesData] ALTER COLUMN [phoneNumber] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[CandidateReferencesData] ADD [updatedDate] DATETIME2;

-- AlterTable
ALTER TABLE [dbo].[CandidateSiblingsData] ALTER COLUMN [phone] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[CandidateSiblingsData] ADD [updatedDate] DATETIME2;

-- AlterTable
ALTER TABLE [dbo].[CandidateSpouseAndInlawData] ALTER COLUMN [identificationNumber] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[CandidateSpouseAndInlawData] ALTER COLUMN [phoneNumber] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[CandidateSpouseAndInlawData] ALTER COLUMN [cellPhoneNumber] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[CandidateSpouseAndInlawData] ADD [updatedDate] DATETIME2;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
