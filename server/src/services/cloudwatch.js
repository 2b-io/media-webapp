import ApiService from 'services/api'

class CloudwatchService extends ApiService {
  async metricCloudfront(projectIdentifier, name, startTime, endTime, period) {
    return await this.callApi('get', `/projects/${ projectIdentifier }/metrics/${ name }/datapoints?startTime=${ new Date(startTime).toISOString() }&endTime=${ new Date(endTime).toISOString() }&period=${ period }`)
  }
}

export default (accountIdentifier) => {
  return new CloudwatchService('webapp', accountIdentifier)
}
