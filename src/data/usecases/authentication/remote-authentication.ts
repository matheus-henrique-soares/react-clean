import { type HttpPostClientParams, type HttpPostClient } from 'data/protocols/http/http-post-client'
import { type Authentication } from 'domain/usecases/authentication'

export class RemoteAuthentication implements Authentication {
  constructor (private readonly url: string, private readonly httpPostClient: HttpPostClient) {}

  async auth (): Promise<any> {
    const httpPostClientParams: HttpPostClientParams = { url: this.url }
    await this.httpPostClient.post(httpPostClientParams)
    return await new Promise(resolve => { resolve(null) })
  }
}
