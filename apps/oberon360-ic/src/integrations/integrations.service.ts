import * as fs from 'fs';
import * as docusign from 'docusign-esign';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
// import * as jwtConfig from '../config/jwtConfig.json';

@Injectable()
export class IntegrationsService {
  /*
  docuSignApi: docusign.ApiClient;
  rsaKey: Buffer;

  constructor() {
    this.docuSignApi = new docusign.ApiClient();
    this.docuSignApi.setOAuthBasePath(
      jwtConfig.dsOauthServer.replace('https://', ''),
    );
    this.rsaKey = fs.readFileSync(
      path.resolve(__dirname, '../config/private.key'),
    );
  }

  async authenticateJwtApp(): Promise<IJwtDocuSignResponse> {
    try {
      const results = await this.docuSignApi.requestJWTUserToken(
        jwtConfig.dsJWTClientId,
        jwtConfig.impersonatedUserGuid,
        this.SCOPES,
        this.rsaKey,
        this.jwtLifeSec,
        );
        const accessToken = results.body.access_token;
      // get user info
      const userInfoResults = await this.docuSignApi.getUserInfo(accessToken);
      // use the default account
      let userInfo = userInfoResults.accounts.find(
        (account: any) => account.isDefault === 'true',
      );
      return {
        accessToken,
        apiAccountId: userInfo.accountId,
        basePath: `${userInfo.baseUri}/restapi`,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async generateSigning(options: any): Promise<any> {
    try {
      let results = null;
      const envelopeArgs = {
        signerEmail: options.signerEmail,
        signerName: options.signerName,
        signerClientId: 1000,
        dsReturnUrl: `${process.env.APP_CALLBACK_URL}/dashboard/ds/callback`,
        dsPingUrl: `${process.env.APP_CALLBACK_URL}/`,
        docFile: path.resolve(this.docsPath, this.nameFile),
      };
      const args = {
        accessToken: options.accessToken,
        basePath: options.basePath,
        accountId: options.accountId,
        envelopeArgs: envelopeArgs,
      };
      results = await this.sendEnvelopeForEmbeddedSigning(args);
      return results.redirectUrl;
    } catch (error) {
      throw new Error(error);
    }
  }

  private makeEnvelope = (args: any) => {
    let docPdfBytes: any;
    docPdfBytes = fs.readFileSync(args.docFile);
    // @ts-ignore
    let env = new docusign.EnvelopeDefinition();
    env.emailSubject = 'Por favor completa el documento';
    // @ts-ignore
    let doc1 = new docusign.Document(),
      doc1b64 = Buffer.from(docPdfBytes).toString('base64');
    doc1.documentBase64 = doc1b64;
    doc1.name = 'Lorem Ipsum';
    doc1.fileExtension = 'pdf';
    doc1.documentId = '3';
    // The order in the docs array determines the order in the envelope
    env.documents = [doc1];
    // @ts-ignore
    let signer1 = docusign.Signer.constructFromObject({
      email: args.signerEmail,
      name: args.signerName,
      clientUserId: args.signerClientId,
      recipientId: 1,
    });
    // @ts-ignore
    let signHere1 = docusign.SignHere.constructFromObject({
      anchorString: '/sn1/',
      anchorYOffset: '10',
      anchorUnits: 'pixels',
      anchorXOffset: '20',
    });
    // @ts-ignore
    let signer1Tabs = docusign.Tabs.constructFromObject({
      signHereTabs: [signHere1],
    });
    signer1.tabs = signer1Tabs;

    // @ts-ignore
    let recipients = docusign.Recipients.constructFromObject({
      signers: [signer1],
    });
    env.recipients = recipients;
    env.status = 'sent';
    return env;
  };

  private makeRecipientViewRequest = (args: any) => {
    // @ts-ignore
    let viewRequest = new docusign.RecipientViewRequest();
    viewRequest.returnUrl = args.dsReturnUrl + '?state=success';
    viewRequest.authenticationMethod = 'none';
    viewRequest.email = args.signerEmail;
    viewRequest.userName = args.signerName;
    viewRequest.clientUserId = args.signerClientId;
    viewRequest.pingFrequency = 600; // seconds
    viewRequest.pingUrl = args.dsPingUrl;
    return viewRequest;
  };

  private sendEnvelopeForEmbeddedSigning = async (args: any) => {
    this.docuSignApi.setBasePath(args.basePath);
    this.docuSignApi.addDefaultHeader(
      'Authorization',
      'Bearer ' + args.accessToken,
    );
    let envelopesApi = new docusign.EnvelopesApi(this.docuSignApi),
      results = null;
    let envelope = this.makeEnvelope(args.envelopeArgs);
    results = await envelopesApi.createEnvelope(args.accountId, {
      envelopeDefinition: envelope,
    });
    let envelopeId = results.envelopeId;
    let viewRequest = this.makeRecipientViewRequest(args.envelopeArgs);
    results = await envelopesApi.createRecipientView(
      args.accountId,
      envelopeId,
      {
        recipientViewRequest: viewRequest,
      },
    );
    return { envelopeId: envelopeId, redirectUrl: results.url };
  };

  private jwtLifeSec = 10 * 60;

  private SCOPES = ['signature', 'impersonation'];

  private docsPath = path.resolve(__dirname, '../documents');

  private nameFile = 'World_Wide_Corp_lorem.pdf';
  */
}
