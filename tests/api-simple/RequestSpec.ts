export class RequestSpec {
  readonly X_API_NAME = 'x-api-name'
  readonly X_API_KEY = 'x-api-key'
  readonly X_APPLICATION = 'X-Application'
  readonly CONTENT_TYPE = 'Content-Type'
  readonly X_REQUEST_ID = 'X-Request-Id'
  readonly X_SESSION_CONTEXT = 'X-Session-Context'

  readonly requestId = '4ff5552d-f964-4cbc-96bb-16b949d827f3'
  readonly lendify = 'lendify'
  readonly apiKey = 'dS9bEkvE79WjMBbpaAsq5o0A233qHfrAT'
  readonly contentTypeJson = 'application/json'

  getBaseHeaders() {
    return {
      [this.X_API_NAME]: this.lendify,
      [this.X_API_KEY]: this.apiKey,
      [this.X_APPLICATION]: this.lendify,
      [this.CONTENT_TYPE]: this.contentTypeJson,
    }
  }

  getAuthorizedHeaders(jwt: string) {
    return {
      ...this.getBaseHeaders(),
      [this.X_REQUEST_ID]: this.requestId,
      [this.X_SESSION_CONTEXT]: jwt,
    }
  }

  buildRequest(method: string, data: any, headers: any) {
    console.log('Preparing request')
    const requestDetails = {
      method: method,
      data: JSON.stringify(data),
      headers: headers
    }
    console.log(requestDetails)
    return requestDetails
  }
}
