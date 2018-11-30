import request from 'superagent'

import config from 'infrastructure/config'

export default async (projectIdentifier) => {
  return await request
    .post(`${ config.jobServer }/jobs`)
    .set('Content-Type', 'application/json')
    .send({
      name: 'CHECK_INFRASTRUCTURE',
      when: Date.now(),
      payload: {
        projectIdentifier
      }
    })
}
