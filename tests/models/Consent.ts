import { Reference } from './Reference'

export class Consent {
  reference: Reference
  text: string
  type: string
  value: boolean

  constructor(reference: Reference, text: string, type: string, value: boolean) {
    this.reference = reference
    this.text = text
    this.type = type
    this.value = value
  }
}
