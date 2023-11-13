import { RequiredFieldError } from '@/validation/errors'
import { type FieldValidation } from '@/validation/protocols/field-validation'

type SutTypes = {
  sut: FieldValidation
}

const makeRequiredFieldValidation = (fieldName: string): FieldValidation => {
  class RequiredFieldValidation implements FieldValidation {
    constructor (readonly field: string) {}
    validate (value: string): Error {
      return new RequiredFieldError()
    }
  }
  return new RequiredFieldValidation(fieldName)
}

const makeSut = (requiredField: string): SutTypes => {
  const sut = makeRequiredFieldValidation(requiredField)
  return {
    sut
  }
}

describe('RequiredFieldValidation', () => {
  test('Should return error if field is empty.', () => {
    const { sut } = makeSut('email')
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })
})
