BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[StudyFinancialResult] ADD [totalArrears] BIGINT,
[totalCurrentBalance] BIGINT,
[totalMonthlyPayment] BIGINT,
[totalQuota] BIGINT;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
