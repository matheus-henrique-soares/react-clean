import { RemoteAuthentication } from './remote-authentication'
import { HttpPostClientMock, type HttpPostClientMockInterface } from '@/data/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { mockAuthentication, mockAccountModel } from '@/domain/test'
import { type AuthenticationParams } from '@/domain/usecases'
import { type AccountModel } from '@/domain/models'
import { UnexpectedError, InvalidCredentialsError } from '@/domain/errors'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClient: HttpPostClientMockInterface<AuthenticationParams, AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClient = new HttpPostClientMock<AuthenticationParams, AccountModel>()
  const sut = new RemoteAuthentication(url, httpPostClient)
  return {
    sut,
    httpPostClient
  }
}

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct URL.', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClient } = makeSut(url)
    await sut.auth(mockAuthentication())
    expect(httpPostClient.url).toBe(url)
  })
  test('Should call HttpPostClient with correct body.', async () => {
    const { sut, httpPostClient } = makeSut()
    const authenticationParams = mockAuthentication()
    await sut.auth(authenticationParams)
    expect(httpPostClient.body).toEqual(authenticationParams)
  })
  test('Should throw UnexpectdError if HttpPostClient returns 400.', async () => {
    const { sut, httpPostClient } = makeSut()
    httpPostClient.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('Should throw invalidCredentialsError if HttpPostClient returns 401.', async () => {
    const { sut, httpPostClient } = makeSut()
    httpPostClient.response = {
      statusCode: HttpStatusCode.unauthorized
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })
  test('Should return an accountModel on HttpostClient success.', async () => {
    const { sut, httpPostClient } = makeSut()
    const httpResult = mockAccountModel()
    httpPostClient.response = {
      statusCode: HttpStatusCode.noContent,
      body: httpResult
    }
    const account = await sut.auth(mockAuthentication())
    expect(account).toEqual(httpResult)
  })
})
