import { get as getPreset } from 'services/preset'

export default async (req) => {
  const { hash } = req.params
  const { project } = req._params

  const preset = await getPreset(project, hash)

  return preset
}
