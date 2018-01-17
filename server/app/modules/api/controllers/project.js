import param from 'middlewares/param'
import {
  create as createProject,
  getBySlug as getProjectBySlug,
  list as listAllProjects,
  remove as removeProject,
  update as updateProject
} from 'services/project'

export const get = [
  param('session', 'project', 'permission'),
  (req, res, next) => {
    const { project } = req._params

    res.json(project)
  }
]

export const list = [
  param('session'),
  (req, res, next) => {
    const { session } = req._params

    listAllProjects(session._id)
      .then(projects => {
        res.json(projects)
      })
      .catch(e => next(e))
  }
]

export const create = [
  param('session'),
  (req, res, next) => {
    const { session } = req._params
    const { name, slug, origins } = req.body

    createProject({
        name,
        slug,
        origins
      }, session)
      .then(project => {
        res.status(201).json(project)
      })
      .catch(e => {
        res.status(500).json(e)
      })
  }
]

export const update = [
  param('session', 'project', 'permission'),
  (req, res, next) => {
    const { project } = this._params
    const { disabled, name, origins } = req.body

    updateProject(project.slug, { disabled, name, origins })
      .then(project => res.json(project))
      .catch(e => next(e))
  }
]

export const remove = [
  param('session', 'project', 'permission'),
  (req, res, next) => {
    const { project } = req._params

    removeProject(project.slug)
      .then(() => res.sendStatus(204))
      .catch(e => next(e))
  }
]
