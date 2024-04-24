/*
  Warnings:

  - Added the required column `costCenterId` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerInternal` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regional` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[CustomerParameterType] ADD CONSTRAINT [CustomerParameterType_status_df] DEFAULT 1 FOR [status];

-- AlterTable
ALTER TABLE [dbo].[Request] ADD [costCenterId] INT NOT NULL,
[customerInternal] INT NOT NULL,
[regional] INT NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
