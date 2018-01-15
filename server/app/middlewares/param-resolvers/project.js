import {
  getBySlug as getProjectBySlug
} from 'services/project'

export default async (req) => {
  const { slug } = req.params

  if (!slug) {
    throw new Error('Invalid parameters')
  }

  const project = await getProjectBySlug(slug)

  return project
}
