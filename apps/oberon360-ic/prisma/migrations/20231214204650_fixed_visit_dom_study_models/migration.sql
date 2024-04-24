/*
  Warnings:

  - A unique constraint covering the columns `[studyId]` on the table `StudyVisitDomiciliaryFamilyData` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `studyId` to the `StudyVisitDomiciliaryFamilyData` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[StudyVisitDomiciliaryFamilyData] ADD [charge] INT,
[fullNames] NVARCHAR(1000),
[phone] NVARCHAR(1000),
[relationShip] INT,
[studyId] INT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[StudyVisitDomiciliaryRemarks] ADD [referencingRemarks] NVARCHAR(1000);

-- CreateTable
CREATE TABLE [dbo].[StudyVisitDomiciliarySecondaryFamilyData] (
    [id] INT NOT NULL IDENTITY(1,1),
    [studyId] INT NOT NULL,
    [fullNamesPartner] NVARCHAR(1000),
    [age] INT,
    [identificationNumber] NVARCHAR(1000),
    [birthDepartment] INT,
    [address] NVARCHAR(1000),
    [birthTown] INT,
    [profession] INT,
    [yearsOfAcquaintances] INT,
    [phone] NVARCHAR(1000),
    [cellPhone] NVARCHAR(1000),
    [loadDate] DATETIME2 NOT NULL CONSTRAINT [StudyVisitDomiciliarySecondaryFamilyData_loadDate_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [StudyVisitDomiciliarySecondaryFamilyData_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [StudyVisitDomiciliarySecondaryFamilyData_studyId_key] UNIQUE NONCLUSTERED ([studyId])
);

-- CreateTable
CREATE TABLE [dbo].[StudyVisitDomiciliarySecondaryFamilyChildsData] (
    [id] INT NOT NULL IDENTITY(1,1),
    [studyId] INT NOT NULL,
    [fullNames] NVARCHAR(1000),
    [identificationNumber] NVARCHAR(1000),
    [birthDate] DATETIME2,
    [birthDepartment] INT,
    [birthTown] INT,
    [livesWith] BIT,
    [age] INT,
    [phone] NVARCHAR(1000),
    [cellPhone] NVARCHAR(1000),
    [profession] INT,
    [loadDate] DATETIME2 NOT NULL CONSTRAINT [StudyVisitDomiciliarySecondaryFamilyChildsData_loadDate_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [StudyVisitDomiciliarySecondaryFamilyChildsData_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [StudyVisitDomiciliarySecondaryFamilyChildsData_studyId_key] UNIQUE NONCLUSTERED ([studyId])
);

-- CreateTable
CREATE TABLE [dbo].[StudyVisitDomiciliarySecondaryHousingData] (
    [id] INT NOT NULL IDENTITY(1,1),
    [studyId] INT NOT NULL,
    [type] NVARCHAR(1000),
    [livingArea] NVARCHAR(1000),
    [housingAtatus] NVARCHAR(1000),
    [accessRoads] INT,
    [externalPresentation] NVARCHAR(1000),
    [internalPresentation] NVARCHAR(1000),
    [numberFamiliesLivingIn] NVARCHAR(1000),
    [totalPersonsInTheDwelling] NVARCHAR(1000),
    [stratum] NVARCHAR(1000),
    [environmentOfTheSector] INT,
    [descriptionOfTheHouse] NVARCHAR(1000),
    [vulnerabilityOfTheSector] NVARCHAR(1000),
    [publicServicesAndDomiciliaryServices] NVARCHAR(1000),
    [loadDate] DATETIME2 NOT NULL CONSTRAINT [StudyVisitDomiciliarySecondaryHousingData_loadDate_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [StudyVisitDomiciliarySecondaryHousingData_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [StudyVisitDomiciliarySecondaryHousingData_studyId_key] UNIQUE NONCLUSTERED ([studyId])
);

-- CreateTable
CREATE TABLE [dbo].[StudyVisitDomiciliarySecondaryHousingNeighborsData] (
    [id] INT NOT NULL IDENTITY(1,1),
    [studyId] INT NOT NULL,
    [fullNames] NVARCHAR(1000),
    [address] NVARCHAR(1000),
    [phone] NVARCHAR(1000),
    [relationship] INT,
    [loadDate] DATETIME2 NOT NULL CONSTRAINT [StudyVisitDomiciliarySecondaryHousingNeighborsData_loadDate_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [StudyVisitDomiciliarySecondaryHousingNeighborsData_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[StudyVisitDomiciliarySecondaryHousingPropertyData] (
    [id] INT NOT NULL IDENTITY(1,1),
    [studyId] INT NOT NULL,
    [ownsAssets] BIT,
    [hasBusinessInterests] BIT,
    CONSTRAINT [StudyVisitDomiciliarySecondaryHousingPropertyData_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [StudyVisitDomiciliarySecondaryHousingPropertyData_studyId_key] UNIQUE NONCLUSTERED ([studyId])
);

-- CreateTable
CREATE TABLE [dbo].[StudyVisitDomiciliarySecondaryHousingPropertyItems] (
    [id] INT NOT NULL IDENTITY(1,1),
    [studyDataId] INT NOT NULL,
    [name] NVARCHAR(1000),
    [quantity] INT,
    [description] NVARCHAR(1000),
    [loadDate] DATETIME2 NOT NULL CONSTRAINT [StudyVisitDomiciliarySecondaryHousingPropertyItems_loadDate_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [StudyVisitDomiciliarySecondaryHousingPropertyItems_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[StudyVisitDomiciliarySecondaryEconomicIncomeData] (
    [id] INT NOT NULL IDENTITY(1,1),
    [studyId] INT NOT NULL,
    [monthlyIncome] BIGINT,
    [incomeConcept] NVARCHAR(1000),
    [monthlyExpenses] BIGINT,
    [expenseConcept] NVARCHAR(1000),
    [numberOfContributors] INT,
    [loadDate] DATETIME2 NOT NULL CONSTRAINT [StudyVisitDomiciliarySecondaryEconomicIncomeData_loadDate_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [StudyVisitDomiciliarySecondaryEconomicIncomeData_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [StudyVisitDomiciliarySecondaryEconomicIncomeData_studyId_key] UNIQUE NONCLUSTERED ([studyId])
);

-- CreateTable
CREATE TABLE [dbo].[StudyVisitDomiciliarySecondaryConcept] (
    [id] INT NOT NULL IDENTITY(1,1),
    [studyId] INT NOT NULL,
    [descriptionPhotographicRecord] NVARCHAR(1000),
    [conceptOfVisit] NVARCHAR(1000),
    [loadDate] DATETIME2 NOT NULL CONSTRAINT [StudyVisitDomiciliarySecondaryConcept_loadDate_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [StudyVisitDomiciliarySecondaryConcept_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [StudyVisitDomiciliarySecondaryConcept_studyId_key] UNIQUE NONCLUSTERED ([studyId])
);

-- CreateIndex
ALTER TABLE [dbo].[StudyVisitDomiciliaryFamilyData] ADD CONSTRAINT [StudyVisitDomiciliaryFamilyData_studyId_key] UNIQUE NONCLUSTERED ([studyId]);

-- AddForeignKey
ALTER TABLE [dbo].[StudyVisitDomiciliaryFamilyData] ADD CONSTRAINT [StudyVisitDomiciliaryFamilyData_studyId_fkey] FOREIGN KEY ([studyId]) REFERENCES [dbo].[Studies]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[StudyVisitDomiciliarySecondaryFamilyData] ADD CONSTRAINT [StudyVisitDomiciliarySecondaryFamilyData_studyId_fkey] FOREIGN KEY ([studyId]) REFERENCES [dbo].[Studies]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[StudyVisitDomiciliarySecondaryFamilyChildsData] ADD CONSTRAINT [StudyVisitDomiciliarySecondaryFamilyChildsData_studyId_fkey] FOREIGN KEY ([studyId]) REFERENCES [dbo].[Studies]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[StudyVisitDomiciliarySecondaryHousingData] ADD CONSTRAINT [StudyVisitDomiciliarySecondaryHousingData_studyId_fkey] FOREIGN KEY ([studyId]) REFERENCES [dbo].[Studies]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[StudyVisitDomiciliarySecondaryHousingNeighborsData] ADD CONSTRAINT [StudyVisitDomiciliarySecondaryHousingNeighborsData_studyId_fkey] FOREIGN KEY ([studyId]) REFERENCES [dbo].[Studies]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[StudyVisitDomiciliarySecondaryHousingPropertyData] ADD CONSTRAINT [StudyVisitDomiciliarySecondaryHousingPropertyData_studyId_fkey] FOREIGN KEY ([studyId]) REFERENCES [dbo].[Studies]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[StudyVisitDomiciliarySecondaryHousingPropertyItems] ADD CONSTRAINT [StudyVisitDomiciliarySecondaryHousingPropertyItems_studyDataId_fkey] FOREIGN KEY ([studyDataId]) REFERENCES [dbo].[StudyVisitDomiciliarySecondaryHousingPropertyData]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[StudyVisitDomiciliarySecondaryEconomicIncomeData] ADD CONSTRAINT [StudyVisitDomiciliarySecondaryEconomicIncomeData_studyId_fkey] FOREIGN KEY ([studyId]) REFERENCES [dbo].[Studies]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[StudyVisitDomiciliarySecondaryConcept] ADD CONSTRAINT [StudyVisitDomiciliarySecondaryConcept_studyId_fkey] FOREIGN KEY ([studyId]) REFERENCES [dbo].[Studies]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
