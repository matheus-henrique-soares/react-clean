import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'
import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client'
import { Login } from '@/presentation/pages'
import { ValidationBuilder, ValidationComposite } from '@/validation/validators'
import React from 'react'

export const makeLogin: React.FC = () => {
  const url = 'https://jsonplaceholder.typicode.com/posts'
  const axiosHttpClient = new AxiosHttpClient()
  const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient)
  const validationComposite = ValidationComposite.build(
    [
      ...ValidationBuilder.field('email').required().email().build(),
      ...ValidationBuilder.field('password').required().min(5).build()
    ]
  )
  return (
    <Login authentication={remoteAuthentication}
    validation={validationComposite}
    />
  )
}
