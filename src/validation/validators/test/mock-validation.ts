import { type FieldValidation } from '@/validation/protocols/field-validation'

export class FieldValidationSpy implements FieldValidation {
  constructor (readonly field: string, readonly error: Error = null) {}

  validate (value: string): Error {
    return this.error
  }
}
