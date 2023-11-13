import { InvalidFieldError } from '@/validation/errors'
import { type FieldValidation } from '@/validation/protocols/field-validation'
import { EmailValidation } from './email-validation'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: FieldValidation
}

const makeEmailValidation = (email: string): FieldValidation => {
  return new EmailValidation(email)
}

const makeSut = (): SutTypes => {
  const sut = makeEmailValidation('email')
  return {
    sut
  }
}

describe('Email Validation', () => {
  test('should return an error if email is invalid.', () => {
    const { sut } = makeSut()
    const error = sut.validate(faker.word.words())
    expect(error).toEqual(new InvalidFieldError('email'))
  })
  test('should return falsy if email is valid.', () => {
    const { sut } = makeSut()
    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  })
})
