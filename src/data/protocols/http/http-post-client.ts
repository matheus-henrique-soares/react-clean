import { type HttpResponse } from './http-response'

export type HttpPostClientParams<T> = {
  url: string
  body?: T
}

export interface HttpPostClient<T, U> {
  url?: string
  body?: T
  response: HttpResponse<U>

  post: (params: HttpPostClientParams<T>) => Promise<HttpResponse<U>>
}
