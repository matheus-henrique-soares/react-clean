import { type HttpPostClient } from 'data/protocols/http/http-post-client'
import { RemoteAuthentication } from './remote-authentication'
import { makeHttpPostClientMock } from '../../test/mock-http-client'
import { mockAuthentication } from '../../../domain/test/mock-authentication'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClient: HttpPostClient
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClient = makeHttpPostClientMock()
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
})
