BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[OperationalLists] (
    [id] INT NOT NULL IDENTITY(1,1),
    [listName] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000) NOT NULL,
    [order] INT NOT NULL CONSTRAINT [OperationalLists_order_df] DEFAULT 0,
    [status] BIT NOT NULL CONSTRAINT [OperationalLists_status_df] DEFAULT 1,
    CONSTRAINT [OperationalLists_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[OperationalParameters] (
    [id] INT NOT NULL IDENTITY(1,1),
    [listId] INT NOT NULL,
    [value] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [OperationalParameters_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL CONSTRAINT [OperationalParameters_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [status] BIT NOT NULL CONSTRAINT [OperationalParameters_status_df] DEFAULT 1,
    CONSTRAINT [OperationalParameters_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[OperationalParameters] ADD CONSTRAINT [OperationalParameters_listId_fkey] FOREIGN KEY ([listId]) REFERENCES [dbo].[OperationalLists]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
