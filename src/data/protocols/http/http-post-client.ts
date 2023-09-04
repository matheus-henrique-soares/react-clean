import { type HttpResponse } from './http-response'

export type HttpPostClientParams = {
  url: string
  body: object
}

export interface HttpPostClient {
  url?: string
  body?: object
  response: HttpResponse

  post: (params: HttpPostClientParams) => Promise<HttpResponse>
}
