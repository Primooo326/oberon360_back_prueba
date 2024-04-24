/*
  Warnings:

  - You are about to drop the column `OFACListConsultation` on the `StudyBackgroundCheckData` table. All the data in the column will be lost.
  - You are about to drop the column `OFACListConsultationRemarks` on the `StudyBackgroundCheckData` table. All the data in the column will be lost.
  - You are about to drop the column `SARLAFVerification` on the `StudyBackgroundCheckData` table. All the data in the column will be lost.
  - You are about to drop the column `SARLAFVerificationRemarks` on the `StudyBackgroundCheckData` table. All the data in the column will be lost.
  - You are about to drop the column `judicialRecords` on the `StudyBackgroundCheckData` table. All the data in the column will be lost.
  - You are about to drop the column `judicialRecordsRemarks` on the `StudyBackgroundCheckData` table. All the data in the column will be lost.
  - You are about to drop the column `nationalPolicerecordsDIJIN` on the `StudyBackgroundCheckData` table. All the data in the column will be lost.
  - You are about to drop the column `nationalPolicerecordsDIJINRemarks` on the `StudyBackgroundCheckData` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[StudyBackgroundCheckData] DROP COLUMN [OFACListConsultation],
[OFACListConsultationRemarks],
[SARLAFVerification],
[SARLAFVerificationRemarks],
[judicialRecords],
[judicialRecordsRemarks],
[nationalPolicerecordsDIJIN],
[nationalPolicerecordsDIJINRemarks];
ALTER TABLE [dbo].[StudyBackgroundCheckData] ADD [ConsultationOfPEPSLists] BIT,
[ConsultationOfPEPSListsRemarks] NVARCHAR(1000),
[judicialBranch] BIT,
[judicialBranchRemarks] NVARCHAR(1000),
[nationalPoliceDisqualifications] BIT,
[nationalPoliceDisqualificationsRemarks] NVARCHAR(1000);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
