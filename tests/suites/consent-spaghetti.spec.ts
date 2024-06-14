import {test, request, expect, APIResponse} from '@playwright/test';
import {Reference} from "../models/Reference";
import {Consent} from "../models/Consent";


test('create consent', async ({context}) => {

    // get jwt
    const authResponse = await context.request.fetch('https://staging-apigateway.inbank.eu/api/token/jwt/trusted?instance=ee3', {
        method: 'GET',
        headers: {
            'x-api-name': 'lendify',
            'x-api-key': 'dS9bEkvE79WjMBbpaAsq5o0A233qHfrAT',
            'X-Application': 'lendify',
            'Content-Type': 'application/json'
        }
    });

    console.log(authResponse.status());
    console.log(await authResponse.json())

    const authResponseBody = await authResponse.json()
    expect(authResponse.status()).toBe(200);

    const jwt = authResponseBody.jwt
    console.log("jwt: " + jwt)

    // send consent
    const referenceInstance: Reference = new Reference('385d06f4-b5cc-476c-8894-b4945d14ca77')
    const consentInstance: Consent = new Consent(
        referenceInstance, 'randomText', 'DATA_PROCESSING', true
    )

    const consentResponse = await context.request.fetch('https://staging-apigateway.inbank.eu/api/staging1/crm/customers/8dd4c73f-83db-4ad1-818a-882757ba9ab1/consents', {
        method: 'POST',
        data: JSON.stringify(consentInstance),
        headers: {
            'x-api-name': 'lendify',
            'x-api-key': 'dS9bEkvE79WjMBbpaAsq5o0A233qHfrAT',
            'X-Application': 'lendify',
            'Content-Type': 'application/json',
            'X-Request-Id': '4ff5552d-f964-4cbc-96bb-16b949d827f3',
            'X-Session-Context': jwt
        }
    });

    const consentResponseBody = await consentResponse.json()
    expect(consentResponse.status()).toBe(201);
    console.log(consentResponseBody)

    expect.soft(consentResponseBody.type).toBe('DATA_PROCESSING')
    expect.soft(consentResponseBody.reference.referenceType).toBe('CONTRACT_UUID')
    expect.soft(consentResponseBody.attachmentUuid).toBeNull()

});
