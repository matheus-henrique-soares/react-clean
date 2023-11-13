type SutTypes = {
  sut: EmailValidation
}

interface EmailValidation {
  validate: (email: string) => Error
}

class EmailValidationError extends Error {
  constructor () {
    super('invalid email')
    this.name = 'EmailValidationError'
  }
}

const makeEmailValidation = (): EmailValidation => {
  class EmailValidationStub implements EmailValidation {
    validate (email: string): Error {
      return new EmailValidationError()
    }
  }
  return new EmailValidationStub()
}

const makeSut = (): SutTypes => {
  const sut = makeEmailValidation()
  return {
    sut
  }
}

describe('Email Validation', () => {
  test('should return an error if email is invalid.', () => {
    const { sut } = makeSut()
    const error = sut.validate('')
    expect(error).toEqual(new EmailValidationError())
  })
})
