/*
  Warnings:

  - A unique constraint covering the columns `[candidateId,indexItem]` on the table `CandidateAcademicData` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[candidateId,indexItem]` on the table `CandidateEmploymentData` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
ALTER TABLE [dbo].[CandidateAcademicData] ADD CONSTRAINT [CandidateAcademicData_candidateId_indexItem_key] UNIQUE NONCLUSTERED ([candidateId], [indexItem]);

-- CreateIndex
ALTER TABLE [dbo].[CandidateEmploymentData] ADD CONSTRAINT [CandidateEmploymentData_candidateId_indexItem_key] UNIQUE NONCLUSTERED ([candidateId], [indexItem]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
