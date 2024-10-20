import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://gutendex.com',
  }),
  tagTypes: ['Books', 'Book'],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (page = 1) => `/books/?page=${page}`,
    }),
  }),
})

export const { useGetBookQuery, useGetBooksQuery } = apiSlice
