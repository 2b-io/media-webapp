import request from 'superagent'

import config from 'infrastructure/config'

export const getDistribution = async (identifier) => {
  const { cdnServer } = config
  const distribution = await request
    .get(`${ cdnServer }/projects/${ identifier }/distribution-get`)
    .set('Content-Type', 'application/json')
  return distribution.body
}
export const createDistribution = async () => {
  const { cdnServer } = config
  const distribution = await request
    .post(`${ cdnServer }/projects/distribution-create`)
    .set('Content-Type', 'application/json')
  return distribution.body
}
export const removeDistribution = async (identifier) => {
  const { cdnServer } = config
  const distribution = await request
    .delete(`${ cdnServer }/projects/${ identifier }/distribution-delete`)
    .set('Content-Type', 'application/json')
  return distribution.body
}
