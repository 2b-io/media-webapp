import request from 'superagent'

import config from 'infrastructure/config'

export const getDistribution = async (identifier) => {
  const { cdnServer } = config
  const distribution = await request
    .get(`${ cdnServer }/distributions/${ identifier }`)
    .set('Content-Type', 'application/json')
  return distribution.body
}
export const createDistribution = async (projectName) => {
  const { cdnServer } = config
  const distribution = await request
    .post(`${ cdnServer }/distributions`)
    .set('Content-Type', 'application/json')
    .send({
      projectName: projectName
    })
  return distribution.body
}
export const removeDistribution = async (identifier) => {
  const { cdnServer } = config
  const distribution = await request
    .delete(`${ cdnServer }/distributions/${ identifier }`)
    .set('Content-Type', 'application/json')
  return distribution.body
}
