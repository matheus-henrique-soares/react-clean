import { RequiredFieldError } from '@/validation/errors'
import { type FieldValidation } from '@/validation/protocols/field-validation'
import { RequiredFieldValidation } from './required-field-validation'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: FieldValidation
}

const makeRequiredFieldValidation = (fieldName: string): FieldValidation => {
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
  test('Should return falsy if field is not empty.', () => {
    const { sut } = makeSut('email')
    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  })
})
