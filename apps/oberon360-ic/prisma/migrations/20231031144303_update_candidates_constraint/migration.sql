/*
  Warnings:

  - A unique constraint covering the columns `[username,email]` on the table `Candidate` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[Candidate] DROP CONSTRAINT [Candidate_email_key];

-- DropIndex
ALTER TABLE [dbo].[Candidate] DROP CONSTRAINT [Candidate_username_key];

-- CreateIndex
ALTER TABLE [dbo].[Candidate] ADD CONSTRAINT [Candidate_username_email_key] UNIQUE NONCLUSTERED ([username], [email]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
