import { type Validation } from '@/presentation/protocols/validation'

export interface ValidationSpy extends Validation {
  errorMessage: string
  fieldName: string
  fieldValue: string
}

export const makeValidationSpy = (): ValidationSpy => {
  class ValidationSpy implements ValidationSpy {
    errorMessage: string
    fieldName: string
    fieldValue: string

    validate (fieldName: string, fieldValue: string): string {
      this.fieldName = fieldName
      this.fieldValue = fieldValue
      return this.errorMessage
    }
  }
  return new ValidationSpy()
}
