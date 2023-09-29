import { type AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'
import { type Authentication, type AuthenticationParams } from '@/domain/usecases'

export class AuthenticationSpy implements Authentication {
  params: AuthenticationParams

  async auth (authenticationParams: AuthenticationParams): Promise<AccountModel> {
    this.params = authenticationParams
    return await new Promise(resolve => { resolve(mockAccountModel()) })
  }
}
