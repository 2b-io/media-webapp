import Infrastructure from 'models/Infrastructure'

export const getInfrastructure = async (project) => {
  return await Infrastructure.findOne({
    project
  }).lean()
}
