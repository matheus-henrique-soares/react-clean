import { AxiosHttpClient } from './axios-http-client'
import axios from 'axios'
import { faker } from '@faker-js/faker'
import { type HttpPostClientParams } from '@/data/protocols/http'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
const mockedAxiosResponse = { data: { any: 'any' }, status: faker.number.int() }
mockedAxios.post.mockResolvedValue(mockedAxiosResponse)

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
    body: { a: 'a' }
  }
}

describe('AxiosHttpClient', () => {
  test('Should call Axios with correct values.', async () => {
    const { sut } = makeSut()
    const request = mockPostRequest()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })
  test('Should return the orrect statusCode and body.', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.post(mockPostRequest())
    expect(httpResponse).toEqual({ statusCode: mockedAxiosResponse.status, body: mockedAxiosResponse.data })
  })
})
