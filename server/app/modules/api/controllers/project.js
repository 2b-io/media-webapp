import {
  getBySlug as getProjectBySlug,
  list as listAllProjects,
  create as createProject,
  update as updateProject
} from 'services/project'

export function get(req, res, next) {
  const { slug } = req.params

  getProjectBySlug(slug)
    .then(project => {
      if (!project) {
        return res.sendStatus(404)
      }

      res.json(project)
    })
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
  const { name, slug, origins } = req.body

  createProject({
      name,
      slug,
      origins
    }, req._account)
    .then(project => {
      res.status(201).json(project)
    })
    .catch(e => {
      res.status(500).json(e)
    })
}

export function update(req, res, next) {
  const { name, slug, origins } = req.body

  updateProject({ name, slug, origins })
    .then(project => res.json(project))
    .catch(e => next(e))
}
