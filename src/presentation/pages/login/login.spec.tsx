import React from 'react'
import { type RenderResult, render, cleanup, fireEvent } from '@testing-library/react'
import Login from './login'
import { makeValidationStub } from '@/presentation/test/mock-validation'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: RenderResult
}

type SutParams = {
  ValidationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const ValidationStub = makeValidationStub()
  ValidationStub.errorMessage = params?.ValidationError
  const sut = render(<Login validation={ValidationStub}/>)
  return { sut }
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
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🔴')
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationError)
    expect(passwordStatus.textContent).toBe('🔴')
  })
  test('Should show email error if validation fails.', () => {
    const validationError = faker.word.words()
    const { sut } = makeSut({ ValidationError: validationError })
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🔴')
  })
  test('Should show password error if validation fails.', () => {
    const validationError = faker.word.words()
    const { sut } = makeSut({ ValidationError: validationError })
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationError)
    expect(passwordStatus.textContent).toBe('🔴')
  })
  test('Should show valid password state if validation succeeds.', () => {
    const { sut } = makeSut()
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('everything right.')
    expect(passwordStatus.textContent).toBe('🟢')
  })
  test('Should show valid password state if validation succeeds.', () => {
    const { sut } = makeSut()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('everything right.')
    expect(emailStatus.textContent).toBe('🟢')
  })
  test('Should enable submit button if form is valid.', () => {
    const { sut } = makeSut()
    const emailInput = sut.getByTestId('email')
    const passwordIpunt = sut.getByTestId('password')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    fireEvent.input(passwordIpunt, { target: { value: faker.internet.password() } })
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })
})
