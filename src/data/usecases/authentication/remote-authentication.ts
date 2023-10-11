import { type HttpPostClient, HttpStatusCode } from '@/data/protocols/http'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { type AccountModel } from '@/domain/models'
import { type AuthenticationParams, type Authentication } from '@/domain/usecases'

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>
  ) {}

  async auth (authenticationParams: AuthenticationParams): Promise<any> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url, body: authenticationParams
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      case HttpStatusCode.badRequest: throw new UnexpectedError()
      default: return httpResponse.body
    }
  }
}
