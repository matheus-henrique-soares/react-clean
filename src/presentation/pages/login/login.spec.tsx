import React from 'react'
import { type RenderResult, render, cleanup, fireEvent } from '@testing-library/react'
import Login from './login'
import { type ValidationStub, makeValidationStub } from '@/presentation/test/mock-validation'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: RenderResult
  ValidationStub: ValidationStub
}

const makeSut = (): SutTypes => {
  const ValidationStub = makeValidationStub()
  const errorMessage = faker.word.words()
  ValidationStub.errorMessage = errorMessage
  const sut = render(<Login validation={ValidationStub}/>)
  return { sut, ValidationStub }
}

describe('Login component.', () => {
  afterEach(cleanup)

  test('Should start with initial state.', () => {
    const { sut, ValidationStub } = makeSut()
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(ValidationStub.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(ValidationStub.errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
  })
  test('Should show email error if validation fails.', () => {
    const { sut, ValidationStub } = makeSut()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(ValidationStub.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
  })
  test('Should show password error if validation fails.', () => {
    const { sut, ValidationStub } = makeSut()
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(ValidationStub.errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
  })
  test('Should show valid password state if validation succeeds.', () => {
    const { sut, ValidationStub } = makeSut()
    ValidationStub.errorMessage = null
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('everything right.')
    expect(passwordStatus.textContent).toBe('🟢')
  })
  test('Should show valid password state if validation succeeds.', () => {
    const { sut, ValidationStub } = makeSut()
    ValidationStub.errorMessage = null
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('everything right.')
    expect(emailStatus.textContent).toBe('🟢')
  })
})
