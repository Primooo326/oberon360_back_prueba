BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[CandidateProcessStatus] (
    [id] INT NOT NULL IDENTITY(1,1),
    [candidateId] INT NOT NULL,
    [basicData] NVARCHAR(1000),
    [academicAndEmploymentData] NVARCHAR(1000),
    [parentsAndSiblingsData] NVARCHAR(1000),
    [spouseAndInLawsData] NVARCHAR(1000),
    [peopleWithLivesData] NVARCHAR(1000),
    [personalReferencesData] NVARCHAR(1000),
    [RICDate] DATETIME2,
    CONSTRAINT [CandidateProcessStatus_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[CandidateProcessStatus] ADD CONSTRAINT [CandidateProcessStatus_candidateId_fkey] FOREIGN KEY ([candidateId]) REFERENCES [dbo].[Candidate]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
