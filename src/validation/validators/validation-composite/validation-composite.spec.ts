import { type FieldValidation } from '@/validation/protocols/field-validation'
import { FieldValidationSpy } from '../../test/mock-validation'
import { ValidationComposite } from './validation-composite'

type SutTypes = {
  sut: ValidationComposite
}

const makeSut = (fieldValidators: FieldValidation[]): SutTypes => {
  const sut = ValidationComposite.build(fieldValidators)
  return { sut }
}

const makeValidationSpy = (field: string, error?: Error): FieldValidationSpy => {
  if (error) return new FieldValidationSpy(field, error)
  return new FieldValidationSpy(field)
}

describe('ValidationComposite', () => {
  test('Should return the first error if any validation fails.', () => {
    const validations: FieldValidation[] = []
    validations.push(makeValidationSpy('any_field', new Error('first_error_message')))
    validations.push(makeValidationSpy('any_field', new Error('second_error_message')))
    const { sut } = makeSut(validations)
    const errorMessage = sut.validate('any_field', 'any_value')
    expect(errorMessage).toBe('first_error_message')
  })
  test('Should return falsy if validation pass.', () => {
    const validations: FieldValidation[] = []
    validations.push(makeValidationSpy('any_field'))
    const { sut } = makeSut(validations)
    const errorMessage = sut.validate('any_field', 'any_value')
    expect(errorMessage).toBeFalsy()
  })
})
