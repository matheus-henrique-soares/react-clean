import { type AccountModel } from 'domain/models/account/account-model'

type AuthenticationParams = {
  email: string
  password: string
}

export interface Authentication {
  auth: (authenticationParams: AuthenticationParams) => Promise<AccountModel>
}
