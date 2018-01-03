import {
  getBySlug as getProjectBySlug,
  list as listAllProjects,
  create as createProject
} from 'services/project'

export function get(req, res, next) {
  const { slug } = req.params

  getProjectBySlug(slug)
    .then(project => res.json(project))
    .catch(e => next(e))
}

export function list(req, res, next) {
  listAllProjects(req._account ? req._account._id : null)
    .then(projects => {
      res.json(projects)
    })
    .catch(e => next(e))
}

export function create(req, res, next) {
  const { name, slug } = req.body

  createProject({
      name,
      slug,
    }, req._account)
    .then(project => {
      res.status(201).json(project)
    })
    .catch(e => {
      res.status(500).json(e)
    })
}

