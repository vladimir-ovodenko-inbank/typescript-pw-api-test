export const baseLendifyHeaders = {
  'x-api-name': 'lendify',
  'x-api-key': 'dS9bEkvE79WjMBbpaAsq5o0A233qHfrAT',
  'Content-Type': 'application/json',
  'X-Application': 'lendify'
}

export function getAuthorizedHeaders(jwt: string) {
  return {
    'X-Request-Id': '4ff5552d-f964-4cbc-96bb-16b949d827f3',
    'X-Session-Context': jwt
  }
}




