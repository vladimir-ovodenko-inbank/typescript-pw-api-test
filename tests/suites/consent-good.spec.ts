import { expect, test } from '@playwright/test'
import { RequestSpec } from '../api-simple/RequestSpec'
import { GET, POST } from '../api-singleton/HttpMethods'
import { Consent } from '../models/Consent'
import { Reference } from '../models/Reference'


test('create consent', async ({context}) => {

  const requestSpec = new RequestSpec()
  const customerId = '8dd4c73f-83db-4ad1-818a-882757ba9ab1'
  const API_GATEWAY_BASE_URL = 'https://staging-apigateway.inbank.eu'
  const API_PATH = '/api/token/jwt/trusted'
  const INSTANCE_VALUE = 'ee3'

  const AUTH_URL = `${API_GATEWAY_BASE_URL}${API_PATH}?instance=${INSTANCE_VALUE}`
  const CRM_URL = `${API_GATEWAY_BASE_URL}/api/staging1/crm/customers/${customerId}/consents`

  // get jwt
  const authResponse = await context.request.fetch(AUTH_URL, {
    method: GET,
    headers: requestSpec.getBaseHeaders()
  })

  console.log(authResponse.status())
  console.log(await authResponse.json())

  const authResponseBody = await authResponse.json()
  expect(authResponse.status()).toBe(200)

  const jwt = authResponseBody.jwt
  console.log('jwt: ' + jwt)

  // send consent
  const referenceInstance: Reference = new Reference('385d06f4-b5cc-476c-8894-b4945d14ca77')
  const consentInstance: Consent = new Consent(
    referenceInstance, 'randomText', 'DATA_PROCESSING', true
  )

  // request wrapped
  const consentResponse = await context.request.fetch(
    CRM_URL,
    requestSpec.buildRequest(POST, consentInstance, requestSpec.getAuthorizedHeaders(jwt))
  )

  const consentResponseBody = await consentResponse.json()
  expect(consentResponse.status()).toBe(201)
  console.log(consentResponseBody)

  expect.soft(consentResponseBody.type).toBe('DATA_PROCESSING')
  expect.soft(consentResponseBody.reference.referenceType).toBe('CONTRACT_UUID')
  expect.soft(consentResponseBody.attachmentUuid).toBeNull()

})
