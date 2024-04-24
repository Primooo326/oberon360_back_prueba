/*
  Warnings:

  - A unique constraint covering the columns `[customerId,customerParameterTypeId,internalCode]` on the table `CustomerParameters` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `CustomerParameterType` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customerId` to the `CustomerParameters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `internalCode` to the `CustomerParameters` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[CustomerParameters] ADD CONSTRAINT [CustomerParameters_status_df] DEFAULT 1 FOR [status];
ALTER TABLE [dbo].[CustomerParameters] ADD [customerId] INT NOT NULL,
[internalCode] NVARCHAR(1000) NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[CustomerParameters] ADD CONSTRAINT [CustomerParameters_customerId_customerParameterTypeId_internalCode_key] UNIQUE NONCLUSTERED ([customerId], [customerParameterTypeId], [internalCode]);

-- CreateIndex
ALTER TABLE [dbo].[CustomerParameterType] ADD CONSTRAINT [CustomerParameterType_name_key] UNIQUE NONCLUSTERED ([name]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
