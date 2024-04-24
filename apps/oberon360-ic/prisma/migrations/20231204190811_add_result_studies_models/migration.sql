BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[StudyReferencingAcademicResult] (
    [id] INT NOT NULL IDENTITY(1,1),
    [studyId] INT NOT NULL,
    [concept] NVARCHAR(1000) NOT NULL,
    [remarks] NVARCHAR(1000),
    CONSTRAINT [StudyReferencingAcademicResult_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [StudyReferencingAcademicResult_studyId_key] UNIQUE NONCLUSTERED ([studyId])
);

-- CreateTable
CREATE TABLE [dbo].[StudyReferencingReferencesResult] (
    [id] INT NOT NULL IDENTITY(1,1),
    [studyId] INT NOT NULL,
    [concept] NVARCHAR(1000) NOT NULL,
    [remarks] NVARCHAR(1000),
    CONSTRAINT [StudyReferencingReferencesResult_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [StudyReferencingReferencesResult_studyId_key] UNIQUE NONCLUSTERED ([studyId])
);

-- AddForeignKey
ALTER TABLE [dbo].[StudyReferencingAcademicResult] ADD CONSTRAINT [StudyReferencingAcademicResult_studyId_fkey] FOREIGN KEY ([studyId]) REFERENCES [dbo].[Studies]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[StudyReferencingReferencesResult] ADD CONSTRAINT [StudyReferencingReferencesResult_studyId_fkey] FOREIGN KEY ([studyId]) REFERENCES [dbo].[Studies]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
