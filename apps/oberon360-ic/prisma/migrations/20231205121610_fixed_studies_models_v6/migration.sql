/*
  Warnings:

  - You are about to alter the column `reasonForRetirement` on the `StudyReferencingEmploymentData` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(1000)` to `Int`.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[StudyReferencingEmploymentData] ALTER COLUMN [reasonForRetirement] INT NULL;

-- CreateTable
CREATE TABLE [dbo].[StudyFinancialAccounts] (
    [id] INT NOT NULL IDENTITY(1,1),
    [entity] INT,
    [typeOfAccount] INT,
    [quality] NVARCHAR(1000),
    [status] INT,
    [currentBalance] INT,
    [rating] INT,
    [studyId] INT NOT NULL,
    [loadDate] DATETIME2 NOT NULL CONSTRAINT [StudyFinancialAccounts_loadDate_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [StudyFinancialAccounts_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[StudyFinancialData] (
    [id] INT NOT NULL IDENTITY(1,1),
    [sectorType] INT NOT NULL,
    [entity] INT,
    [product] INT,
    [quota] INT,
    [monthlyPayment] INT,
    [arrears] INT,
    [currentBalance] INT,
    [quality] NVARCHAR(1000),
    [behavior] INT,
    [studyId] INT NOT NULL,
    [loadDate] DATETIME2 NOT NULL CONSTRAINT [StudyFinancialData_loadDate_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [StudyFinancialData_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[StudyFinancialResult] (
    [id] INT NOT NULL IDENTITY(1,1),
    [studyId] INT NOT NULL,
    [concept] NVARCHAR(1000) NOT NULL,
    [remarks] NVARCHAR(1000),
    CONSTRAINT [StudyFinancialResult_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [StudyFinancialResult_studyId_key] UNIQUE NONCLUSTERED ([studyId])
);

-- CreateTable
CREATE TABLE [dbo].[StudyBackgroundCheckFamilyHistoryData] (
    [id] INT NOT NULL IDENTITY(1,1),
    [fullName] NVARCHAR(1000),
    [relationship] INT,
    [remarks] NVARCHAR(1000),
    [studyId] INT NOT NULL,
    [loadDate] DATETIME2 NOT NULL CONSTRAINT [StudyBackgroundCheckFamilyHistoryData_loadDate_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [StudyBackgroundCheckFamilyHistoryData_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[StudyBackgroundCheckData] (
    [id] INT NOT NULL IDENTITY(1,1),
    [generalComptrolleroftheNation] BIT,
    [generalComptrolleroftheNationRemarks] NVARCHAR(1000),
    [judicialRecords] BIT,
    [judicialRecordsRemarks] NVARCHAR(1000),
    [restrictivelistrecords] BIT,
    [restrictivelistrecordsRemarks] NVARCHAR(1000),
    [nationalPolicerecordsDIJIN] BIT,
    [nationalPolicerecordsDIJINRemarks] NVARCHAR(1000),
    [nationalAttorneyGeneralsOffice] BIT,
    [nationalAttorneyGeneralsOfficeRemarks] NVARCHAR(1000),
    [nationalRegistryofCivilStatus] BIT,
    [nationalRegistryofCivilStatusRemarks] NVARCHAR(1000),
    [RUNTTrafficInformation] BIT,
    [RUNTTrafficInformationRemarks] NVARCHAR(1000),
    [SIMITTrafficInformation] BIT,
    [SIMITTrafficInformationRemarks] NVARCHAR(1000),
    [ConsultationOfLAFTLists] BIT,
    [ConsultationOfLAFTListsRemarks] NVARCHAR(1000),
    [OFACListConsultation] BIT,
    [OFACListConsultationRemarks] NVARCHAR(1000),
    [NationalRegistrySystemofCorrectiveMeasuresRNMC] BIT,
    [NationalRegistrySystemofCorrectiveMeasuresRNMCRemarks] NVARCHAR(1000),
    [MilitarySituation] BIT,
    [MilitarySituationRemarks] NVARCHAR(1000),
    [Adverse] BIT,
    [AdverseRemarks] NVARCHAR(1000),
    [SARLAFVerification] BIT,
    [SARLAFVerificationRemarks] NVARCHAR(1000),
    [studyId] INT NOT NULL,
    [loadDate] DATETIME2 NOT NULL CONSTRAINT [StudyBackgroundCheckData_loadDate_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [StudyBackgroundCheckData_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [StudyBackgroundCheckData_studyId_key] UNIQUE NONCLUSTERED ([studyId])
);

-- CreateTable
CREATE TABLE [dbo].[StudyBackgroundCheckResult] (
    [id] INT NOT NULL IDENTITY(1,1),
    [studyId] INT NOT NULL,
    [concept] NVARCHAR(1000) NOT NULL,
    [remarks] NVARCHAR(1000),
    CONSTRAINT [StudyBackgroundCheckResult_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [StudyBackgroundCheckResult_studyId_key] UNIQUE NONCLUSTERED ([studyId])
);

-- AddForeignKey
ALTER TABLE [dbo].[StudyFinancialAccounts] ADD CONSTRAINT [StudyFinancialAccounts_studyId_fkey] FOREIGN KEY ([studyId]) REFERENCES [dbo].[Studies]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[StudyFinancialData] ADD CONSTRAINT [StudyFinancialData_studyId_fkey] FOREIGN KEY ([studyId]) REFERENCES [dbo].[Studies]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[StudyFinancialResult] ADD CONSTRAINT [StudyFinancialResult_studyId_fkey] FOREIGN KEY ([studyId]) REFERENCES [dbo].[Studies]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[StudyBackgroundCheckFamilyHistoryData] ADD CONSTRAINT [StudyBackgroundCheckFamilyHistoryData_studyId_fkey] FOREIGN KEY ([studyId]) REFERENCES [dbo].[Studies]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[StudyBackgroundCheckData] ADD CONSTRAINT [StudyBackgroundCheckData_studyId_fkey] FOREIGN KEY ([studyId]) REFERENCES [dbo].[Studies]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[StudyBackgroundCheckResult] ADD CONSTRAINT [StudyBackgroundCheckResult_studyId_fkey] FOREIGN KEY ([studyId]) REFERENCES [dbo].[Studies]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
