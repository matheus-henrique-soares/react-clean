import { AxiosHttpClient } from './axios-http-client'
import axios from 'axios'
import { faker } from '@faker-js/faker'
import { type HttpPostClientParams } from '@/data/protocols/http'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

type SutTypes = {
  sut: AxiosHttpClient
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  return {
    sut
  }
}

const mockPostRequest = (): HttpPostClientParams<any> => {
  return {
    url: faker.internet.url(),
    body: { any: 'any' }
  }
}

describe('AxiosHttpClient', () => {
  test('Should call Axios with correct values.', async () => {
    const { sut } = makeSut()
    const request = mockPostRequest()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })
})
