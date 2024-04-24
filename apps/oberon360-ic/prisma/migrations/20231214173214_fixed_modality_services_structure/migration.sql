/*
  Warnings:

  - You are about to drop the column `EventTypeId` on the `Programmes` table. All the data in the column will be lost.
  - You are about to drop the column `modality` on the `Programmes` table. All the data in the column will be lost.
  - You are about to drop the `EventTypes` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[candidateId,studyId]` on the table `Programmes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `serviceId` to the `Programmes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studyId` to the `Programmes` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Programmes] DROP CONSTRAINT [Programmes_EventTypeId_fkey];

-- DropIndex
ALTER TABLE [dbo].[Programmes] DROP CONSTRAINT [Programmes_candidateId_EventTypeId_key];

-- AlterTable
ALTER TABLE [dbo].[Programmes] DROP COLUMN [EventTypeId],
[modality];
ALTER TABLE [dbo].[Programmes] ADD [serviceId] INT NOT NULL,
[studyId] INT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[StudyTypesFromServices] ADD [canBeTakenVirtual] BIT NOT NULL CONSTRAINT [StudyTypesFromServices_canBeTakenVirtual_df] DEFAULT 0;

-- DropTable
DROP TABLE [dbo].[EventTypes];

-- CreateIndex
ALTER TABLE [dbo].[Programmes] ADD CONSTRAINT [Programmes_candidateId_studyId_key] UNIQUE NONCLUSTERED ([candidateId], [studyId]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
