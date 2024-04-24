BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[StudyTypes] ADD [needsProgramming] BIT NOT NULL CONSTRAINT [StudyTypes_needsProgramming_df] DEFAULT 0;

-- CreateTable
CREATE TABLE [dbo].[StudyVisitDomiciliaryFamilyData] (
    [id] INT NOT NULL IDENTITY(1,1),
    CONSTRAINT [StudyVisitDomiciliaryFamilyData_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[StudyVisitDomiciliaryRemarks] (
    [id] INT NOT NULL IDENTITY(1,1),
    [familyDataRemarks] NVARCHAR(1000),
    [secondaryFamilyDataRemarks] NVARCHAR(1000),
    [housingDataRemarks] NVARCHAR(1000),
    [employmentDataRemarks] NVARCHAR(1000),
    [academicDataRemarks] NVARCHAR(1000),
    [economicalDataRemarks] NVARCHAR(1000),
    CONSTRAINT [StudyVisitDomiciliaryRemarks_pkey] PRIMARY KEY CLUSTERED ([id])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
