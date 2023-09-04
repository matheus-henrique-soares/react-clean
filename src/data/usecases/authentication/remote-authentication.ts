import { HttpStatusCode } from '@/data/protocols/http/http-response'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { type HttpPostClientParams, type HttpPostClient } from 'data/protocols/http/http-post-client'
import { type AuthenticationParams, type Authentication } from 'domain/usecases/authentication'

export class RemoteAuthentication implements Authentication {
  constructor (private readonly url: string, private readonly httpPostClient: HttpPostClient) {}

  async auth (authenticationParams: AuthenticationParams): Promise<any> {
    const httpPostClientParams: HttpPostClientParams = { url: this.url, body: authenticationParams }
    const httpResponse = await this.httpPostClient.post(httpPostClientParams)
    switch (httpResponse.statusCode) {
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      case HttpStatusCode.badRequest: throw new UnexpectedError()
      default: return httpResponse
    }
  }
}
