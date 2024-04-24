/*
  Warnings:

  - You are about to drop the column `housingAtatus` on the `StudyVisitDomiciliarySecondaryHousingData` table. All the data in the column will be lost.
  - You are about to drop the column `livingArea` on the `StudyVisitDomiciliarySecondaryHousingData` table. All the data in the column will be lost.
  - You are about to drop the column `stratum` on the `StudyVisitDomiciliarySecondaryHousingData` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `StudyVisitDomiciliarySecondaryHousingData` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[StudyVisitDomiciliarySecondaryHousingData] DROP COLUMN [housingAtatus],
[livingArea],
[stratum],
[type];
ALTER TABLE [dbo].[StudyVisitDomiciliarySecondaryHousingData] ADD [housingStatus] NVARCHAR(1000);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
