import { type HttpPostClient } from 'data/protocols/http/http-post-client'
import { RemoteAuthentication } from './remote-authentication'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClient: HttpPostClient
}

const makeHttpPostClientStub = (): HttpPostClient => {
  class HttpPostClientStub implements HttpPostClient {
    url?: string

    async post (url: string): Promise<void> {
      this.url = url
    }
  }
  return new HttpPostClientStub()
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClient = makeHttpPostClientStub()
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
    await sut.auth()
    expect(httpPostClient.url).toBe(url)
  })
})
