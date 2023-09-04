import { type HttpPostClient, type HttpPostClientParams } from 'data/protocols/http/http-post-client'

export const makeHttpPostClientMock = (): HttpPostClient => {
  class HttpPostClientStub implements HttpPostClient {
    url?: string
    body?: object

    async post (params: HttpPostClientParams): Promise<void> {
      this.url = params.url
      this.body = params.body
    }
  }
  return new HttpPostClientStub()
}
