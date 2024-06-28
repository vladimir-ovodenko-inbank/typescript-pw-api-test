export class RequestSpecBuilder {

  static buildRequest(url: string, method: string, headers: any, data?: any) {
    console.log('Preparing request ...')
    const request = {
      URL: url,
      method: method,
      data: data ? JSON.stringify(data) : undefined,
      headers: headers
    }
    console.log(request)
    return request
  }

}
