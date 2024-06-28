import { test } from '@playwright/test'
import { ApiClientSingleton } from '../api-singleton/ApiClientSingleton'
import { Consent } from '../models/Consent'
import { Reference } from '../models/Reference'


test.only('create consent', async ({context}) => {

  // init client; jwt will be part of client
  const apiClient = await ApiClientSingleton.getInstance(context)

  // create content
  const referenceInstance: Reference = new Reference('385d06f4-b5cc-476c-8894-b4945d14ca77')
  const consentInstance: Consent = new Consent(
    referenceInstance, 'randomText', 'DATA_PROCESSING', true
  )

  // send
  await apiClient.createConsent(consentInstance)


  // console.log(consentResponseBody)
  //
  // expect.soft(consentResponseBody.type).toBe('DATA_PROCESSING')
  // expect.soft(consentResponseBody.reference.referenceType).toBe('CONTRACT_UUID')
  // expect.soft(consentResponseBody.attachmentUuid).toBeNull()

})
