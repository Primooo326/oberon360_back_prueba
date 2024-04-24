BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[ParametersGroups] ADD [order] INT NOT NULL CONSTRAINT [ParametersGroups_order_df] DEFAULT 0;

-- CreateTable
CREATE TABLE [dbo].[CandidateFiles] (
    [id] INT NOT NULL IDENTITY(1,1),
    [candidateId] INT NOT NULL,
    [fileIndex] INT,
    [fileType] NVARCHAR(1000) NOT NULL,
    [fileMongoPath] NVARCHAR(1000) NOT NULL,
    [loadDate] DATETIME2 NOT NULL CONSTRAINT [CandidateFiles_loadDate_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [CandidateFiles_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[CandidateFiles] ADD CONSTRAINT [CandidateFiles_candidateId_fkey] FOREIGN KEY ([candidateId]) REFERENCES [dbo].[Candidate]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
