BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[StudyReferencingEmploymentResult] (
    [id] INT NOT NULL IDENTITY(1,1),
    [studyId] INT NOT NULL,
    [concept] NVARCHAR(1000) NOT NULL,
    [remarks] NVARCHAR(1000),
    CONSTRAINT [StudyReferencingEmploymentResult_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[StudyReferencingEmploymentResult] ADD CONSTRAINT [StudyReferencingEmploymentResult_studyId_fkey] FOREIGN KEY ([studyId]) REFERENCES [dbo].[Studies]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
