import { type HttpPostClient, type HttpPostClientParams } from 'data/protocols/http/http-post-client'
import { HttpStatusCode, type HttpResponse } from '@/data/protocols/http/http-response'

export class HttpPostClientMock<T, U> implements HttpPostClient<T, U> {
  url?: string
  body?: T
  response: HttpResponse<U> = {
    statusCode: HttpStatusCode.noContent
  }

  async post (params: HttpPostClientParams<T>): Promise<HttpResponse<U>> {
    this.url = params.url
    this.body = params.body
    return await new Promise(resolve => { resolve(this.response) })
  }
}
