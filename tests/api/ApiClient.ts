import {BrowserContext} from "@playwright/test";
import {RequestSpec} from "./RequestSpec";
import {POST} from "./HttpMethods";

export class ApiClient {
    readonly context: BrowserContext; // Assuming context is of type BrowserContext
    // readonly CRM_URL: string;
    readonly requestSpec: RequestSpec; // Assuming requestSpec is of type RequestSpec

    constructor(context: BrowserContext, requestSpec: RequestSpec) {
        this.context = context;
        this.requestSpec = requestSpec;
    }

    async createConsentRequest(URL: string, consentInstance: any, jwt: string): Promise<any> {
        const consentResponse = await this.context.request.fetch(
            URL,
            this.requestSpec.buildRequest(POST, consentInstance, this.requestSpec.getAuthorizedHeaders(jwt))
        );
        console.log('Consent response: ')
        console.log(consentResponse);
        return consentResponse;
    }
}
