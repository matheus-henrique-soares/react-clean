import { type HttpResponse } from './http-response'

export type HttpPostParams<T> = {
  url: string
  body?: T
}

export interface HttpPostClient<T, R> {
  [propName: string]: any

  post: (params: HttpPostParams<T>) => Promise<HttpResponse<R>>
}
