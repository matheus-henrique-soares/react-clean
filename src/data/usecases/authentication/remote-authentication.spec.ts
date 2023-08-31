import { type HttpPostClient } from 'data/protocols/http/http-post-client'
import { RemoteAuthentication } from './remote-authentication'

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

const makeSut = (): SutTypes => {
  const url = 'any_url'
  const httpPostClient = makeHttpPostClientStub()
  const sut = new RemoteAuthentication(url, httpPostClient)
  return {
    sut,
    httpPostClient
  }
}

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct URL.', async () => {
    const { sut, httpPostClient } = makeSut()
    await sut.auth()
    expect(httpPostClient.url).toBe('any_url')
  })
})
