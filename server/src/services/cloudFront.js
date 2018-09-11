import request from 'superagent'

import config from 'infrastructure/config'

export const createDistribution = async () => {
  const { cdnServer } = config
  const distribution = await request
    .post(`${ cdnServer }/projects/distribution-create`)
    .set('Content-Type', 'application/json')
  return distribution.body
}
