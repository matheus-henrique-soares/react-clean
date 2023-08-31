export interface HttpPostClient {
  readonly url?: string

  post: (url: string) => Promise<void>
}
