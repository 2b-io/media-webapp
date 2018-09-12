import request from 'superagent'

import config from 'infrastructure/config'

export const createDistribution = async () => {
  const { cdnServer } = config
  const distribution = await request
    .post(`${ cdnServer }/projects/distribution-create`)
    .set('Content-Type', 'application/json')
  return distribution.body
}
export const removeDistribution = async (domain) => {
  const { cdnServer } = config
  const distribution = await request
    .delete(`${ cdnServer }/projects/${ domain }/distribution-delete`)
    .set('Content-Type', 'application/json')
  return distribution.body
}
