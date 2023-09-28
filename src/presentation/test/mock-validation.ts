import { type Validation } from '@/presentation/protocols/validation'

export interface ValidationStub extends Validation {
  errorMessage: string
}

export const makeValidationStub = (): ValidationStub => {
  class ValidationStub implements ValidationStub {
    errorMessage: string

    validate (fieldName: string, fieldValue: string): string {
      return this.errorMessage
    }
  }
  return new ValidationStub()
}
