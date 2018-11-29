import PullSetting from 'models/pull-setting'

import ApiService from 'services/api'

export const get = async (project) => {
  return await PullSetting.findOne({
    project
  }).lean()
}

export const update = async (project, data) => {
  return await PullSetting.findOneAndUpdate(
    { project },
    { ...data },
    { new: true }
  ).lean()
}

class PullSettingService extends ApiService {
  async get(projectIdentifier) {
    return await this.callApi('get', `/projects/${ projectIdentifier }/pull-setting`)
  }
}

export default (accountIdentifier) => {
  return new PullSettingService('webapp', accountIdentifier)
}
