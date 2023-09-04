import { type HttpPostClientParams, type HttpPostClient } from 'data/protocols/http/http-post-client'
import { type AuthenticationParams, type Authentication } from 'domain/usecases/authentication'

export class RemoteAuthentication implements Authentication {
  constructor (private readonly url: string, private readonly httpPostClient: HttpPostClient) {}

  async auth (authenticationParams: AuthenticationParams): Promise<any> {
    const httpPostClientParams: HttpPostClientParams = { url: this.url, body: authenticationParams }
    await this.httpPostClient.post(httpPostClientParams)
    return await new Promise(resolve => { resolve(null) })
  }
}
