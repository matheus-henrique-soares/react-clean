import { InvalidFieldError } from '@/validation/errors'
import { type FieldValidation } from '@/validation/protocols/field-validation'

export class MinLengthValidation implements FieldValidation {
  constructor (readonly field: string, private readonly minLength: number) {}

  validate (value: string): Error {
    if (value.length < this.minLength) return new InvalidFieldError(this.field)
    return null
  }
}
