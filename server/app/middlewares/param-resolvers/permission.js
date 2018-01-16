import { get as getPermission } from 'services/permission'

export default async (req) => {
  const { project, session } = req._params

  const permission = await getPermission(session, project)

  return permission
}
