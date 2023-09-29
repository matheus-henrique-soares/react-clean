import { type Validation } from '@/presentation/protocols/validation'

interface IValidationStub extends Validation {
  errorMessage: string
}

export const makeValidationStub = (): IValidationStub => {
  class ValidationStub implements IValidationStub {
    errorMessage: string

    validate (fieldName: string, fieldValue: string): string {
      return this.errorMessage
    }
  }
  return new ValidationStub()
}
