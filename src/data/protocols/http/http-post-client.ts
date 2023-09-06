import { type HttpResponse } from './http-response'

export type HttpPostClientParams<T> = {
  url: string
  body?: T
}

export interface HttpPostClient<T, R> {
  [propName: string]: any

  post: (params: HttpPostClientParams<T>) => Promise<HttpResponse<R>>
}
