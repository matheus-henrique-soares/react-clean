import { faker } from '@faker-js/faker'
import { type AuthenticationParams } from '@/domain/usecases/authentication'
import { type AccountModel } from '../models/account/account-model'

export const mockAuthentication = (): AuthenticationParams => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password()
  }
}

export const mockAccountModel = (): AccountModel => {
  return {
    AccessToken: faker.string.uuid()
  }
}
