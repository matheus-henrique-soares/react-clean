import { type HttpPostClient, type HttpPostClientParams, type HttpResponse, HttpStatusCode } from '../protocols/http'

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
