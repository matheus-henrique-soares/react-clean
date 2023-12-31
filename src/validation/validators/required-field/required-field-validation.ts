import { type FieldValidation } from '@/validation/protocols/field-validation'
import { RequiredFieldError } from '@/validation/errors'

export class RequiredFieldValidation implements FieldValidation {
  constructor (readonly field: string) {}
  validate (value: string): Error {
    if (value) return null
    return new RequiredFieldError()
  }
}
