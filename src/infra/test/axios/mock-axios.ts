import { faker } from '@faker-js/faker'
import axios from 'axios'

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.post.mockResolvedValue({ data: { any: 'any' }, status: faker.number.int() })
  return mockedAxios
}
