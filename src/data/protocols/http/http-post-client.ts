export type HttpPostClientParams = {
  url: string
  body: object
}

export interface HttpPostClient {
  readonly url?: string
  readonly body?: object

  post: (params: HttpPostClientParams) => Promise<void>
}
