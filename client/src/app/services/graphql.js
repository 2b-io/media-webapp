import compress from 'graphql-query-compress'
import request from 'graphql-request'

const ENDPOINT = '/graphql'

export default async (query, variables) => {
  return await request(ENDPOINT, compress(query), variables)
}
