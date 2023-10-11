import { type AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'
import { type Authentication, type AuthenticationParams } from '@/domain/usecases'

export class AuthenticationSpy implements Authentication {
  params: AuthenticationParams
  callsCount = 0
  account: AccountModel

  async auth (authenticationParams: AuthenticationParams): Promise<AccountModel> {
    this.params = authenticationParams
    this.callsCount++
    this.account = mockAccountModel()
    return await new Promise(resolve => { resolve(this.account) })
  }
}
