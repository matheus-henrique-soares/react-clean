import React from 'react'
import { faker } from '@faker-js/faker'
import { type RenderResult, render, cleanup, fireEvent } from '@testing-library/react'
import Login from './login'
import { ValidationStub } from '@/presentation/test/mock-validation'
import { AuthenticationSpy } from '@/presentation/test/mock-authentication'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  ValidationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.ValidationError
  const authenticationSpy = new AuthenticationSpy()
  const sut = render(<Login validation={validationStub} authentication={authenticationSpy}/>)
  return { sut, authenticationSpy }
}

const populateEmailField = (sut: RenderResult, email = faker.internet.email()): void => {
  const emailInput = sut.getByTestId('email')
  fireEvent.input(emailInput, { target: { value: email } })
}

const populatepasswordField = (sut: RenderResult, password = faker.internet.password()): void => {
  const passwordInput = sut.getByTestId('password')
  fireEvent.input(passwordInput, { target: { value: password } })
}

const simulateStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationError || 'everything right.')
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

const simulateValidSubmit = (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): void => {
  populateEmailField(sut, email)
  populatepasswordField(sut, password)
  const submitButton = sut.getByTestId('submit')
  fireEvent.click(submitButton)
}

describe('Login component.', () => {
  afterEach(cleanup)

  test('Should start with initial state.', () => {
    const validationError = faker.word.words()
    const { sut } = makeSut({ ValidationError: validationError })
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
    simulateStatusForField(sut, 'email', validationError)
    simulateStatusForField(sut, 'password', validationError)
  })
  test('Should show email error if validation fails.', () => {
    const validationError = faker.word.words()
    const { sut } = makeSut({ ValidationError: validationError })
    populateEmailField(sut)
    simulateStatusForField(sut, 'email', validationError)
  })
  test('Should show password error if validation fails.', () => {
    const validationError = faker.word.words()
    const { sut } = makeSut({ ValidationError: validationError })
    populatepasswordField(sut)
    simulateStatusForField(sut, 'password', validationError)
  })
  test('Should show valid password state if validation succeeds.', () => {
    const { sut } = makeSut()
    populatepasswordField(sut)
    simulateStatusForField(sut, 'password')
  })
  test('Should show valid password state if validation succeeds.', () => {
    const { sut } = makeSut()
    populateEmailField(sut)
    simulateStatusForField(sut, 'email')
  })
  test('Should enable submit button if form is valid.', () => {
    const { sut } = makeSut()
    populateEmailField(sut)
    populatepasswordField(sut)
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })
  test('Should show spinner on submit.', () => {
    const { sut } = makeSut()
    simulateValidSubmit(sut)
    const spinner = sut.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })
  test('Should call Authentication with correct values.', () => {
    const { sut, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    simulateValidSubmit(sut, email, password)
    expect(authenticationSpy.params).toEqual({ email, password })
  })
  test('Should call Authentication only once.', () => {
    const { sut, authenticationSpy } = makeSut()
    simulateValidSubmit(sut)
    simulateValidSubmit(sut)
    expect(authenticationSpy.callsCount).toBe(1)
  })
})
