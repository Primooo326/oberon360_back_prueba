BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[ParameterValueType] (
    [id] INT NOT NULL IDENTITY(1,1),
    [type] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [ParameterValueType_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ParametersGroups] (
    [id] INT NOT NULL IDENTITY(1,1),
    [groupName] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000) NOT NULL,
    [isCustomerGroup] BIT NOT NULL CONSTRAINT [ParametersGroups_isCustomerGroup_df] DEFAULT 0,
    [status] BIT NOT NULL CONSTRAINT [ParametersGroups_status_df] DEFAULT 1,
    CONSTRAINT [ParametersGroups_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Parameters] (
    [id] INT NOT NULL IDENTITY(1,1),
    [groupId] INT NOT NULL,
    [value] NVARCHAR(1000) NOT NULL,
    [valueType] INT NOT NULL,
    [fatherParameter] INT,
    [metaCode] NVARCHAR(1000),
    [isParametric] BIT NOT NULL CONSTRAINT [Parameters_isParametric_df] DEFAULT 0,
    [customerId] INT,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Parameters_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL CONSTRAINT [Parameters_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [status] BIT NOT NULL CONSTRAINT [Parameters_status_df] DEFAULT 1,
    CONSTRAINT [Parameters_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[OperationalGroups] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [leader] INT NOT NULL,
    [active] BIT NOT NULL,
    CONSTRAINT [OperationalGroups_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [OperationalGroups_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[OperationalGroupsTeams] (
    [id] INT NOT NULL IDENTITY(1,1),
    [groupId] INT NOT NULL,
    [userId] INT NOT NULL,
    CONSTRAINT [OperationalGroupsTeams_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [OperationalGroupsTeams_groupId_userId_key] UNIQUE NONCLUSTERED ([groupId],[userId])
);

-- CreateTable
CREATE TABLE [dbo].[OperationalGroupsCustomers] (
    [id] INT NOT NULL IDENTITY(1,1),
    [groupId] INT NOT NULL,
    [customerId] INT NOT NULL,
    CONSTRAINT [OperationalGroupsCustomers_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [OperationalGroupsCustomers_groupId_customerId_key] UNIQUE NONCLUSTERED ([groupId],[customerId])
);

-- CreateTable
CREATE TABLE [dbo].[Modules] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000) NOT NULL,
    [status] BIT NOT NULL CONSTRAINT [Modules_status_df] DEFAULT 1,
    CONSTRAINT [Modules_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Modules_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[Roles] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Roles_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL CONSTRAINT [Roles_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [status] BIT NOT NULL CONSTRAINT [Roles_status_df] DEFAULT 1,
    CONSTRAINT [Roles_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Roles_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[Permissions] (
    [id] INT NOT NULL IDENTITY(1,1),
    [moduleId] INT NOT NULL,
    [roleId] INT NOT NULL,
    [status] BIT NOT NULL CONSTRAINT [Permissions_status_df] DEFAULT 1,
    CONSTRAINT [Permissions_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Permissions_moduleId_roleId_key] UNIQUE NONCLUSTERED ([moduleId],[roleId])
);

-- CreateTable
CREATE TABLE [dbo].[CustomerParameterType] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [loadDate] DATETIME2 NOT NULL CONSTRAINT [CustomerParameterType_loadDate_df] DEFAULT CURRENT_TIMESTAMP,
    [status] BIT NOT NULL,
    CONSTRAINT [CustomerParameterType_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[CustomerParameters] (
    [id] INT NOT NULL IDENTITY(1,1),
    [customerParameterTypeId] INT NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [loadDate] DATETIME2 NOT NULL CONSTRAINT [CustomerParameters_loadDate_df] DEFAULT CURRENT_TIMESTAMP,
    [status] BIT NOT NULL,
    CONSTRAINT [CustomerParameters_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [username] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [signFilePath] NVARCHAR(1000) NOT NULL CONSTRAINT [User_signFilePath_df] DEFAULT '',
    [news] NVARCHAR(1000),
    [lastLogin] DATETIME2 NOT NULL CONSTRAINT [User_lastLogin_df] DEFAULT CURRENT_TIMESTAMP,
    [roleId] INT NOT NULL,
    [chargeId] INT NOT NULL,
    [customerId] INT CONSTRAINT [User_customerId_df] DEFAULT 0,
    [isSystemUser] BIT NOT NULL CONSTRAINT [User_isSystemUser_df] DEFAULT 0,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL CONSTRAINT [User_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [status] BIT NOT NULL CONSTRAINT [User_status_df] DEFAULT 1,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email]),
    CONSTRAINT [User_username_key] UNIQUE NONCLUSTERED ([username])
);

-- CreateTable
CREATE TABLE [dbo].[Candidate] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [username] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [charge] NVARCHAR(1000),
    [signedDocument] BIT NOT NULL CONSTRAINT [Candidate_signedDocument_df] DEFAULT 0,
    [lastLogin] DATETIME2 NOT NULL CONSTRAINT [Candidate_lastLogin_df] DEFAULT CURRENT_TIMESTAMP,
    [customerId] INT NOT NULL,
    [status] BIT NOT NULL CONSTRAINT [Candidate_status_df] DEFAULT 1,
    CONSTRAINT [Candidate_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Candidate_email_key] UNIQUE NONCLUSTERED ([email]),
    CONSTRAINT [Candidate_username_key] UNIQUE NONCLUSTERED ([username])
);

-- CreateTable
CREATE TABLE [dbo].[CandidateBasicData] (
    [id] INT NOT NULL IDENTITY(1,1),
    [candidateId] INT NOT NULL,
    [firstLastName] NVARCHAR(1000) NOT NULL,
    [middleLastName] NVARCHAR(1000),
    [firstName] NVARCHAR(1000) NOT NULL,
    [middleName] NVARCHAR(1000),
    [documentType] INT NOT NULL,
    [identificationNumber] BIGINT NOT NULL,
    [documentIssueDate] DATETIME2 NOT NULL,
    [documentIssuePlace] INT NOT NULL,
    [birthDate] DATETIME2 NOT NULL,
    [age] INT NOT NULL,
    [birthCountry] INT NOT NULL,
    [birthDepartment] INT NOT NULL,
    [birthTown] INT NOT NULL,
    [residenceAddress] NVARCHAR(1000) NOT NULL,
    [cityResidence] INT NOT NULL,
    [district] INT NOT NULL,
    [hasMilitaryPassbook] BIT NOT NULL CONSTRAINT [CandidateBasicData_hasMilitaryPassbook_df] DEFAULT 0,
    [militaryPassbookNumber] BIGINT,
    [typeOfPassbook] INT,
    [militaryDistrict] NVARCHAR(1000),
    [phone] BIGINT,
    [cellPhone] BIGINT NOT NULL,
    [maritalStatus] INT NOT NULL,
    [childrenNumber] INT NOT NULL,
    [bodyMarkings] INT NOT NULL,
    [otherBodyMarkings] NVARCHAR(1000),
    [locationBodyMarkings] NVARCHAR(1000),
    [RH] INT NOT NULL,
    [height] NVARCHAR(1000) NOT NULL,
    [financiallyDependentPersons] INT NOT NULL,
    [loadDate] DATETIME2 NOT NULL CONSTRAINT [CandidateBasicData_loadDate_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [CandidateBasicData_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [CandidateBasicData_candidateId_key] UNIQUE NONCLUSTERED ([candidateId])
);

-- CreateTable
CREATE TABLE [dbo].[CandidateAcademicData] (
    [id] INT NOT NULL IDENTITY(1,1),
    [candidateId] INT NOT NULL,
    [indexItem] INT NOT NULL,
    [academycDegree] NVARCHAR(1000) NOT NULL,
    [academyName] INT NOT NULL,
    [dateOfGrade] DATETIME2 NOT NULL,
    [studyType] INT NOT NULL,
    [loadDate] DATETIME2 NOT NULL CONSTRAINT [CandidateAcademicData_loadDate_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [CandidateAcademicData_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[CandidateEmploymentData] (
    [id] INT NOT NULL IDENTITY(1,1),
    [candidateId] INT NOT NULL,
    [indexItem] INT NOT NULL,
    [charge] NVARCHAR(1000) NOT NULL,
    [companyName] NVARCHAR(1000) NOT NULL,
    [dateEntry] DATETIME2 NOT NULL,
    [dateLeaving] DATETIME2 NOT NULL,
    [bossName] NVARCHAR(1000),
    [bossPhone] BIGINT,
    [loadDate] DATETIME2 NOT NULL CONSTRAINT [CandidateEmploymentData_loadDate_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [CandidateEmploymentData_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[CandidateParentsData] (
    [id] INT NOT NULL IDENTITY(1,1),
    [candidateId] INT NOT NULL,
    [motherName] NVARCHAR(1000) NOT NULL,
    [motherAdrress] NVARCHAR(1000),
    [motherAge] INT,
    [motherPhone] BIGINT,
    [motherLives] BIT NOT NULL,
    [motherLivesWith] BIT,
    [motherProfession] INT,
    [motherCellPhone] BIGINT,
    [fatherName] NVARCHAR(1000) NOT NULL,
    [fatherAdrress] NVARCHAR(1000),
    [fatherAge] INT,
    [fatherPhone] BIGINT,
    [fatherLives] BIT NOT NULL,
    [fatherLivesWith] BIT,
    [fatherProfession] INT,
    [fatherCellPhone] BIGINT,
    [loadDate] DATETIME2 NOT NULL CONSTRAINT [CandidateParentsData_loadDate_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [CandidateParentsData_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [CandidateParentsData_candidateId_key] UNIQUE NONCLUSTERED ([candidateId])
);

-- CreateTable
CREATE TABLE [dbo].[CandidateSiblingsData] (
    [id] INT NOT NULL IDENTITY(1,1),
    [candidateId] INT NOT NULL,
    [indexItem] INT NOT NULL,
    [fullName] NVARCHAR(1000) NOT NULL,
    [profession] INT,
    [address] NVARCHAR(1000),
    [phone] BIGINT,
    [loadDate] DATETIME2 NOT NULL CONSTRAINT [CandidateSiblingsData_loadDate_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [CandidateSiblingsData_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [CandidateSiblingsData_candidateId_indexItem_key] UNIQUE NONCLUSTERED ([candidateId],[indexItem])
);

-- CreateTable
CREATE TABLE [dbo].[CandidateSpouseAndInlawData] (
    [id] INT NOT NULL IDENTITY(1,1),
    [candidateId] INT NOT NULL,
    [fullName] NVARCHAR(1000) NOT NULL,
    [identificationNumber] BIGINT NOT NULL,
    [birthDate] DATETIME2 NOT NULL,
    [birthDepartment] INT NOT NULL,
    [birthTown] INT NOT NULL,
    [profession] INT NOT NULL,
    [yearsOfAcquaintances] INT NOT NULL,
    [age] INT NOT NULL,
    [phoneNumber] BIGINT,
    [cellPhoneNumber] BIGINT NOT NULL,
    [motherInLawFullName] NVARCHAR(1000) NOT NULL,
    [motherInLawAge] INT NOT NULL,
    [motherInLawLives] BIT NOT NULL,
    [motherInLawAddress] NVARCHAR(1000) NOT NULL,
    [motherInLawYearsOfAcquaintances] INT NOT NULL,
    [motherInLawProfession] INT NOT NULL,
    [fatherInLawFullName] NVARCHAR(1000) NOT NULL,
    [fatherInLawAge] INT NOT NULL,
    [fatherInLawLives] BIT NOT NULL,
    [fatherInLawAddress] NVARCHAR(1000) NOT NULL,
    [fatherInLawYearsOfAcquaintances] INT NOT NULL,
    [fatherInLawProfession] INT NOT NULL,
    [loadDate] DATETIME2 NOT NULL CONSTRAINT [CandidateSpouseAndInlawData_loadDate_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [CandidateSpouseAndInlawData_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [CandidateSpouseAndInlawData_candidateId_key] UNIQUE NONCLUSTERED ([candidateId])
);

-- CreateTable
CREATE TABLE [dbo].[CandidatePeopleWithLiveData] (
    [id] INT NOT NULL IDENTITY(1,1),
    [candidateId] INT NOT NULL,
    [indexItem] INT NOT NULL,
    [fullName] NVARCHAR(1000) NOT NULL,
    [age] INT NOT NULL,
    [phone] BIGINT,
    [relationship] INT NOT NULL,
    [maritalStatus] INT NOT NULL,
    [profession] NVARCHAR(1000),
    [loadDate] DATETIME2 NOT NULL CONSTRAINT [CandidatePeopleWithLiveData_loadDate_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [CandidatePeopleWithLiveData_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [CandidatePeopleWithLiveData_candidateId_indexItem_key] UNIQUE NONCLUSTERED ([candidateId],[indexItem])
);

-- CreateTable
CREATE TABLE [dbo].[CandidateHousingData] (
    [id] INT NOT NULL IDENTITY(1,1),
    [candidateId] INT NOT NULL,
    [houseType] INT NOT NULL,
    [dateFrom] DATETIME2 NOT NULL,
    [district] INT NOT NULL,
    [ownerName] NVARCHAR(1000) NOT NULL,
    [loadDate] DATETIME2 NOT NULL CONSTRAINT [CandidateHousingData_loadDate_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [CandidateHousingData_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [CandidateHousingData_candidateId_key] UNIQUE NONCLUSTERED ([candidateId])
);

-- CreateTable
CREATE TABLE [dbo].[CandidateReferencesData] (
    [id] INT NOT NULL IDENTITY(1,1),
    [candidateId] INT NOT NULL,
    [indexItem] INT NOT NULL,
    [fullName] NVARCHAR(1000) NOT NULL,
    [relationship] INT NOT NULL,
    [phoneNumber] BIGINT NOT NULL,
    [yearsOfAcquaintances] BIGINT NOT NULL,
    [whereKnowFrom] NVARCHAR(1000) NOT NULL,
    [profession] INT NOT NULL,
    [loadDate] DATETIME2 NOT NULL CONSTRAINT [CandidateReferencesData_loadDate_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [CandidateReferencesData_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [CandidateReferencesData_candidateId_indexItem_key] UNIQUE NONCLUSTERED ([candidateId],[indexItem])
);

-- CreateTable
CREATE TABLE [dbo].[Request] (
    [id] INT NOT NULL IDENTITY(1,1),
    [creationDate] DATETIME2 NOT NULL CONSTRAINT [Request_creationDate_df] DEFAULT CURRENT_TIMESTAMP,
    [submitDate] DATETIME2,
    [cancellationDate] DATETIME2,
    [customerId] INT NOT NULL,
    [billable] BIT NOT NULL CONSTRAINT [Request_billable_df] DEFAULT 0,
    [remarks] NVARCHAR(1000) NOT NULL,
    [loadDate] DATETIME2 NOT NULL CONSTRAINT [Request_loadDate_df] DEFAULT CURRENT_TIMESTAMP,
    [status] NVARCHAR(1000) NOT NULL,
    [isActive] BIT NOT NULL CONSTRAINT [Request_isActive_df] DEFAULT 1,
    [createdBy] INT NOT NULL,
    [updatedBy] INT NOT NULL,
    [cancelledBy] INT,
    CONSTRAINT [Request_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[RequestCandidates] (
    [id] INT NOT NULL IDENTITY(1,1),
    [requestId] INT NOT NULL,
    [candidateId] INT NOT NULL,
    CONSTRAINT [RequestCandidates_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[RequestServices] (
    [id] INT NOT NULL IDENTITY(1,1),
    [requestId] INT NOT NULL,
    [serviceId] NVARCHAR(1000),
    [servicePackage] NVARCHAR(1000),
    CONSTRAINT [RequestServices_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Parameters] ADD CONSTRAINT [Parameters_groupId_fkey] FOREIGN KEY ([groupId]) REFERENCES [dbo].[ParametersGroups]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Parameters] ADD CONSTRAINT [Parameters_valueType_fkey] FOREIGN KEY ([valueType]) REFERENCES [dbo].[ParameterValueType]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[OperationalGroups] ADD CONSTRAINT [OperationalGroups_leader_fkey] FOREIGN KEY ([leader]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[OperationalGroupsTeams] ADD CONSTRAINT [OperationalGroupsTeams_groupId_fkey] FOREIGN KEY ([groupId]) REFERENCES [dbo].[OperationalGroups]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[OperationalGroupsTeams] ADD CONSTRAINT [OperationalGroupsTeams_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[OperationalGroupsCustomers] ADD CONSTRAINT [OperationalGroupsCustomers_groupId_fkey] FOREIGN KEY ([groupId]) REFERENCES [dbo].[OperationalGroups]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Permissions] ADD CONSTRAINT [Permissions_moduleId_fkey] FOREIGN KEY ([moduleId]) REFERENCES [dbo].[Modules]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Permissions] ADD CONSTRAINT [Permissions_roleId_fkey] FOREIGN KEY ([roleId]) REFERENCES [dbo].[Roles]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CustomerParameters] ADD CONSTRAINT [CustomerParameters_customerParameterTypeId_fkey] FOREIGN KEY ([customerParameterTypeId]) REFERENCES [dbo].[CustomerParameterType]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_roleId_fkey] FOREIGN KEY ([roleId]) REFERENCES [dbo].[Roles]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_chargeId_fkey] FOREIGN KEY ([chargeId]) REFERENCES [dbo].[Parameters]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CandidateBasicData] ADD CONSTRAINT [CandidateBasicData_candidateId_fkey] FOREIGN KEY ([candidateId]) REFERENCES [dbo].[Candidate]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CandidateAcademicData] ADD CONSTRAINT [CandidateAcademicData_candidateId_fkey] FOREIGN KEY ([candidateId]) REFERENCES [dbo].[Candidate]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CandidateEmploymentData] ADD CONSTRAINT [CandidateEmploymentData_candidateId_fkey] FOREIGN KEY ([candidateId]) REFERENCES [dbo].[Candidate]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CandidateParentsData] ADD CONSTRAINT [CandidateParentsData_candidateId_fkey] FOREIGN KEY ([candidateId]) REFERENCES [dbo].[Candidate]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CandidateSiblingsData] ADD CONSTRAINT [CandidateSiblingsData_candidateId_fkey] FOREIGN KEY ([candidateId]) REFERENCES [dbo].[Candidate]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CandidateSpouseAndInlawData] ADD CONSTRAINT [CandidateSpouseAndInlawData_candidateId_fkey] FOREIGN KEY ([candidateId]) REFERENCES [dbo].[Candidate]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CandidatePeopleWithLiveData] ADD CONSTRAINT [CandidatePeopleWithLiveData_candidateId_fkey] FOREIGN KEY ([candidateId]) REFERENCES [dbo].[Candidate]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CandidateHousingData] ADD CONSTRAINT [CandidateHousingData_candidateId_fkey] FOREIGN KEY ([candidateId]) REFERENCES [dbo].[Candidate]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CandidateReferencesData] ADD CONSTRAINT [CandidateReferencesData_candidateId_fkey] FOREIGN KEY ([candidateId]) REFERENCES [dbo].[Candidate]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[RequestCandidates] ADD CONSTRAINT [RequestCandidates_requestId_fkey] FOREIGN KEY ([requestId]) REFERENCES [dbo].[Request]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[RequestCandidates] ADD CONSTRAINT [RequestCandidates_candidateId_fkey] FOREIGN KEY ([candidateId]) REFERENCES [dbo].[Candidate]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[RequestServices] ADD CONSTRAINT [RequestServices_requestId_fkey] FOREIGN KEY ([requestId]) REFERENCES [dbo].[Request]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
