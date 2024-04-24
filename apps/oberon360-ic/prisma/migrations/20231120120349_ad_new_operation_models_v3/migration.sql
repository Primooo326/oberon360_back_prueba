BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[EventTypes] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [EventTypes_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [EventTypes_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Programmes] (
    [id] INT NOT NULL IDENTITY(1,1),
    [candidateId] INT NOT NULL,
    [EventTypeId] INT NOT NULL,
    [dateTimeEvent] DATETIME2 NOT NULL,
    [status] NVARCHAR(1000) NOT NULL,
    [additionalInformation] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Programmes_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [programmedBy] INT NOT NULL,
    CONSTRAINT [Programmes_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[StudyTypes] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [StudyTypes_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Studies] (
    [id] INT NOT NULL IDENTITY(1,1),
    [requestId] INT NOT NULL,
    [status] NVARCHAR(1000) NOT NULL,
    [AdvantageOfProgress] INT NOT NULL,
    CONSTRAINT [Studies_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Programmes] ADD CONSTRAINT [Programmes_candidateId_fkey] FOREIGN KEY ([candidateId]) REFERENCES [dbo].[Candidate]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Programmes] ADD CONSTRAINT [Programmes_EventTypeId_fkey] FOREIGN KEY ([EventTypeId]) REFERENCES [dbo].[EventTypes]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Studies] ADD CONSTRAINT [Studies_requestId_fkey] FOREIGN KEY ([requestId]) REFERENCES [dbo].[Request]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
