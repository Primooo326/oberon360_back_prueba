BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[StudyReferencingEmploymentData] (
    [id] INT NOT NULL IDENTITY(1,1),
    [candidateDataId] INT NOT NULL,
    [performanceEvaluation] NVARCHAR(1000),
    [informationProvidedBy] NVARCHAR(1000),
    [position] INT,
    [reasonForRetirement] NVARCHAR(1000),
    [sourceOfInquiry] NVARCHAR(1000),
    [remarks] NVARCHAR(1000),
    [loadDate] DATETIME2 NOT NULL CONSTRAINT [StudyReferencingEmploymentData_loadDate_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [StudyReferencingEmploymentData_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [StudyReferencingEmploymentData_candidateDataId_key] UNIQUE NONCLUSTERED ([candidateDataId])
);

-- CreateTable
CREATE TABLE [dbo].[StudyReferencingEmploymentWorkInactivityData] (
    [id] INT NOT NULL IDENTITY(1,1),
    [studyEmploymentDataId] INT NOT NULL,
    [periodFrom] DATETIME2,
    [periodTo] DATETIME2,
    [occupancy] NVARCHAR(1000),
    [loadDate] DATETIME2 NOT NULL CONSTRAINT [StudyReferencingEmploymentWorkInactivityData_loadDate_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [StudyReferencingEmploymentWorkInactivityData_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[StudyReferencingAcademicData] (
    [id] INT NOT NULL IDENTITY(1,1),
    [candidateDataId] INT NOT NULL,
    [phone] NVARCHAR(1000),
    [folioOrRegistration] NVARCHAR(1000),
    [informationProvidedBy] NVARCHAR(1000),
    [position] INT,
    [SourceOfInquiry] NVARCHAR(1000),
    [remarks] NVARCHAR(1000),
    [loadDate] DATETIME2 NOT NULL CONSTRAINT [StudyReferencingAcademicData_loadDate_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [StudyReferencingAcademicData_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [StudyReferencingAcademicData_candidateDataId_key] UNIQUE NONCLUSTERED ([candidateDataId])
);

-- CreateTable
CREATE TABLE [dbo].[StudyReferencingReferencesData] (
    [id] INT NOT NULL IDENTITY(1,1),
    [candidateDataId] INT NOT NULL,
    [ConceptOfTheEvaluated] NVARCHAR(1000),
    [loadDate] DATETIME2 NOT NULL CONSTRAINT [StudyReferencingReferencesData_loadDate_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [StudyReferencingReferencesData_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [StudyReferencingReferencesData_candidateDataId_key] UNIQUE NONCLUSTERED ([candidateDataId])
);

-- AddForeignKey
ALTER TABLE [dbo].[StudyReferencingEmploymentData] ADD CONSTRAINT [StudyReferencingEmploymentData_candidateDataId_fkey] FOREIGN KEY ([candidateDataId]) REFERENCES [dbo].[CandidateEmploymentData]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[StudyReferencingEmploymentWorkInactivityData] ADD CONSTRAINT [StudyReferencingEmploymentWorkInactivityData_studyEmploymentDataId_fkey] FOREIGN KEY ([studyEmploymentDataId]) REFERENCES [dbo].[StudyReferencingEmploymentData]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[StudyReferencingAcademicData] ADD CONSTRAINT [StudyReferencingAcademicData_candidateDataId_fkey] FOREIGN KEY ([candidateDataId]) REFERENCES [dbo].[CandidateAcademicData]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[StudyReferencingReferencesData] ADD CONSTRAINT [StudyReferencingReferencesData_candidateDataId_fkey] FOREIGN KEY ([candidateDataId]) REFERENCES [dbo].[CandidateReferencesData]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
