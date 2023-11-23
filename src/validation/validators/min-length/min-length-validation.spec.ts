import { InvalidFieldError } from '@/validation/errors'
import { MinLengthValidation } from './min-length-validation'

type SutTypes = {
  sut: MinLengthValidation
}

const makeMinLengthValidation = (field: string, minLength: number): MinLengthValidation => {
  return new MinLengthValidation(field, minLength)
}

const makeSut = (): SutTypes => {
  const sut = makeMinLengthValidation('field', 5)
  return { sut }
}

describe('MinLengthValidation', () => {
  test('should return error if value is invalid.', () => {
    const { sut } = makeSut()
    const error = sut.validate('123')
    expect(error).toEqual(new InvalidFieldError('field'))
  })
})
