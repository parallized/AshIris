import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { createCoreApiClient } from '@halo-dev/api-client'

const axiosInstance = axios.create({
  baseURL: 'https://halo.parallized.cn/',
  headers: {
    Authorization:
      'Bearer pat_eyJraWQiOiJJa2F5UkE0UUdQUlZZX1hxWUJCSGZXR0I5N2pJQXdPRnFaLWhHRTdPdnZzIiwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJodHRwOi8vcGFyYWxsaXplZC5jbiIsInN1YiI6InBhcmFsbGl6ZWQiLCJpYXQiOjE3MzkxNDgxNjYsImp0aSI6ImJhYTczZmZhLWNhZmYtYjMxNC1mY2ZjLTQ3MmY3MTM1Y2ZhNCIsInBhdF9uYW1lIjoicGF0LXBhcmFsbGl6ZWQtRXVNVEEifQ.M2V9qVn4MFpMEQ3qwuw1-MarefXZSk2WotnQjwOBqtpoiafijmZfIYOEiwxkM8aG4cV78IZ3cWYekNqG1ZQ7Irt8Un81BtrH30NEf2qPLr8pDqklMI0DRO_dzO6Xi9EniJpkDFzhj0CSu8qhlswfcOmCB8liBVKvUL5tLVQUrXPb52wahNMTpPiPpebygMF0cem6c51it5j5XUvlPG4l5gM32_-IeTy29QBpZSJ4f-9y5OjkfIOYprDH4kOx-wr-65k40rvdOFOnzjeDdWocujsbnPLAs-DPTadu51fE2Z-y7qiuCf_YGpwnagwygz5hm1419Hp4EjlIjmvVXUHDa-weID26rsna5ps0BSAAToEU7OXx9mvRFNgZJd5QpNqH3pHmobodrZoaeGGi2HYT4CjEgVArSWg2QpP5k_8q-_-mW-2pEj6DgS8OX4a_06Nld7v0_wmGS8c1AUn4fFfn4JiFxXQ-ZDxSFkEhW4xNN6cd_moXirCghAeKvrTboqVKG1borlzZb30ZDcd0g8-EHi4jjcCSOkz-YwF_ilSP6dJcRxt975FnsoEmZmzNldZjLws99fxG8lCrHbSlqSWd4TdFikn0bMJHKf4im2nwA4jsxxBI0WjNuKIivguoIOvDNwb1-INR-5wkpxLH26yKzbhAU6okLhfCmoyQMCUwZqg'
  }
})

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response: any) => {
    return response
  },
  async (_: AxiosError) => {
  }
)

export const useHalo = () => {
  const coreApiClient = createCoreApiClient(axiosInstance as AxiosInstance)

  return {
    coreApi: coreApiClient
  }
}
