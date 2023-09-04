export type HttpPostClientParams = {
  url: string
}

export interface HttpPostClient {
  readonly url?: string

  post: (params: HttpPostClientParams) => Promise<void>
}
