BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[StudyTypesFromServices] (
    [id] INT NOT NULL IDENTITY(1,1),
    [studyTypeId] INT NOT NULL,
    [serviceId] INT NOT NULL,
    [status] BIT NOT NULL CONSTRAINT [StudyTypesFromServices_status_df] DEFAULT 1,
    CONSTRAINT [StudyTypesFromServices_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[StudyTypesFromServices] ADD CONSTRAINT [StudyTypesFromServices_studyTypeId_fkey] FOREIGN KEY ([studyTypeId]) REFERENCES [dbo].[StudyTypes]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
