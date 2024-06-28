import { APIResponse, BrowserContext, expect } from '@playwright/test'
import { API_GATEWAY_URL } from '../config/environment'
import { Consent } from '../models/Consent'
import { RequestSpecBuilder } from '../request-spec/RequestSpecBuilder'
import { baseLendifyHeaders, getAuthorizedHeaders } from './HttpHeaders'
import { GET, POST } from './HttpMethods'

export class ApiClientSingleton {

  static instance: ApiClientSingleton
  private context: BrowserContext
  private jwt: string

  private constructor(context: BrowserContext) {
    this.context = context
  }

  // init client
  public static async getInstance(context: BrowserContext): Promise<ApiClientSingleton> {
    if (!ApiClientSingleton.instance) {
      ApiClientSingleton.instance = new ApiClientSingleton(context)
      await this.instance.requestJwt()
    }
    return ApiClientSingleton.instance
  }

  // all request are here
  public async createConsent(consentInstance: Consent): Promise<APIResponse> {

    const URL = API_GATEWAY_URL
    const headers = {
      ...baseLendifyHeaders,
      ...getAuthorizedHeaders(this.jwt)
    }

    const request = RequestSpecBuilder
      .buildRequest(URL, POST, headers, consentInstance)

    const consentResponse = await this.context.request.fetch(request.URL, {
      method: request.method,
      data: request.data,
      headers: request.headers
    })

    console.log('Response: ')
    console.log(consentResponse)

    const consentResponseBody = await consentResponse.json()
    console.log('Response body: ')
    console.log(consentResponseBody)


    return consentResponse
  }

  // action for init client
  private async requestJwt(): Promise<void> {
    const authResponse = await this.context.request.fetch('https://staging-apigateway.inbank.eu/api/token/jwt/trusted?instance=ee3', {
      method: GET,
      headers: {
        ...baseLendifyHeaders,
      }
    })

    console.log('Auth response: ')
    console.log(authResponse)

    const authResponseBody = await authResponse.json()

    console.log('Auth response body: ')
    console.log(authResponseBody)

    expect(authResponse.status()).toBe(200)
    this.jwt = authResponseBody.jwt
  }


}
