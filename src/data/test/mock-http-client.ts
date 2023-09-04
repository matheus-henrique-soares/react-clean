import { type HttpPostClient, type HttpPostClientParams } from 'data/protocols/http/http-post-client'
import { HttpStatusCode, type HttpResponse } from '@/data/protocols/http/http-response'

export const makeHttpPostClientMock = (): HttpPostClient => {
  class HttpPostClientStub implements HttpPostClient {
    url?: string
    body?: object
    response: HttpResponse = {
      statusCode: HttpStatusCode.noContent
    }

    async post (params: HttpPostClientParams): Promise<HttpResponse> {
      this.url = params.url
      this.body = params.body
      return await new Promise(resolve => { resolve(this.response) })
    }
  }
  return new HttpPostClientStub()
}
