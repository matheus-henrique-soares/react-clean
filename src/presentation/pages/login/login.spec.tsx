import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import 'jest-localstorage-mock'
import { faker } from '@faker-js/faker'
import { type RenderResult, render, cleanup, fireEvent, waitFor } from '@testing-library/react'
import Login from './login'
import { ValidationStub } from '@/presentation/test/mock-validation'
import { AuthenticationSpy } from '@/presentation/test/mock-authentication'
import { InvalidCredentialsError } from '@/domain/errors'
import { populateField, testElementChildCount, testButtonIsDisabled, testElementExists, testElementText, testStatusForField } from '@/presentation/test/helpers'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  ValidationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.ValidationError
  const authenticationSpy = new AuthenticationSpy()
  const sut = render(
    <Router location={history.location} navigator={history}>
      <Login validation={validationStub} authentication={authenticationSpy}/>
    </Router>
  )
  return { sut, authenticationSpy }
}

const simulateValidSubmit = async (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  populateField(sut, 'email', email)
  populateField(sut, 'password', password)
  const form = sut.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('Login component.', () => {
  afterEach(cleanup)
  beforeEach(() => {
    localStorage.clear()
  })

  test('Should start with initial state.', () => {
    const validationError = faker.word.words()
    const { sut } = makeSut({ ValidationError: validationError })
    testElementChildCount(sut, 'error-wrap', 0)
    testButtonIsDisabled(sut, 'submit', true)
    testStatusForField(sut, 'email', validationError)
    testStatusForField(sut, 'password', validationError)
  })
  test('Should show email error if validation fails.', () => {
    const validationError = faker.word.words()
    const { sut } = makeSut({ ValidationError: validationError })
    populateField(sut, 'email', faker.internet.email())
    testStatusForField(sut, 'email', validationError)
  })
  test('Should show password error if validation fails.', () => {
    const validationError = faker.word.words()
    const { sut } = makeSut({ ValidationError: validationError })
    populateField(sut, 'password', faker.internet.password())
    testStatusForField(sut, 'password', validationError)
  })
  test('Should show valid password state if validation succeeds.', () => {
    const { sut } = makeSut()
    populateField(sut, 'password', faker.internet.password())
    testStatusForField(sut, 'password')
  })
  test('Should show valid password state if validation succeeds.', () => {
    const { sut } = makeSut()
    populateField(sut, 'email', faker.internet.email())
    testStatusForField(sut, 'email')
  })
  test('Should enable submit button if form is valid.', () => {
    const { sut } = makeSut()
    populateField(sut, 'email', faker.internet.email())
    populateField(sut, 'password', faker.internet.password())
    testButtonIsDisabled(sut, 'submit', false)
  })
  test('Should show spinner on submit.', async () => {
    const { sut } = makeSut()
    await simulateValidSubmit(sut)
    testElementExists(sut, 'spinner')
  })
  test('Should call Authentication with correct values.', async () => {
    const { sut, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(sut, email, password)
    expect(authenticationSpy.params).toEqual({ email, password })
  })
  test('Should call Authentication only once.', async () => {
    const { sut, authenticationSpy } = makeSut()
    await simulateValidSubmit(sut)
    await simulateValidSubmit(sut)
    expect(authenticationSpy.callsCount).toBe(1)
  })
  test('Should not call Authentication if form is invalid.', async () => {
    const validationError = faker.word.words()
    const { sut, authenticationSpy } = makeSut({ ValidationError: validationError })
    await simulateValidSubmit(sut)
    expect(authenticationSpy.callsCount).toBe(0)
  })
  test('Should present error if authentication fails.', async () => {
    const { sut, authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))
    await simulateValidSubmit(sut)
    testElementChildCount(sut, 'error-wrap', 1)
    testElementText(sut, 'main-error', error.message)
  })
  test('Should add accesstoken to local storage on success.', async () => {
    const { sut, authenticationSpy } = makeSut()
    await simulateValidSubmit(sut)
    expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', authenticationSpy.account.AccessToken)
    expect(history.index).toBe(0)
    expect(history.location.pathname).toBe('/')
  })
  test('Should go to signup page.', () => {
    const { sut } = makeSut()
    const register = sut.getByTestId('signup')
    fireEvent.click(register)
    expect(history.index).toBe(1)
    expect(history.location.pathname).toBe('/signup')
  })
})
