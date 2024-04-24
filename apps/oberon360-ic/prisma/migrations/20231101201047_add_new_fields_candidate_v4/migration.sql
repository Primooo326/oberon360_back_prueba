/*
  Warnings:

  - Added the required column `address` to the `CandidateHousingData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stratum` to the `CandidateHousingData` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[CandidateHousingData] ADD [address] NVARCHAR(1000) NOT NULL,
[stratum] NVARCHAR(1000) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
