BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[CustomerLogos] (
    [id] INT NOT NULL IDENTITY(1,1),
    [customerId] INT NOT NULL,
    [imagePathName] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [CustomerLogos_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [CustomerLogos_customerId_key] UNIQUE NONCLUSTERED ([customerId])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
