BEGIN TRY

BEGIN TRAN;

-- AddForeignKey
ALTER TABLE [dbo].[Request] ADD CONSTRAINT [Request_regional_fkey] FOREIGN KEY ([regional]) REFERENCES [dbo].[CustomerParameters]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Request] ADD CONSTRAINT [Request_costCenterId_fkey] FOREIGN KEY ([costCenterId]) REFERENCES [dbo].[CustomerParameters]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Request] ADD CONSTRAINT [Request_customerInternal_fkey] FOREIGN KEY ([customerInternal]) REFERENCES [dbo].[CustomerParameters]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
