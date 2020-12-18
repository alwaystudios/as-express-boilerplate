import { Router } from 'express'
import { middlewareError } from '../errorHandler'
import { isFeatureEnabled } from '../middleware/features'
import { someFunction } from './sampleFunction'
import path from 'path'
import { getLog } from '../localStorage'

const DATA_PATH = '../../data'

export const sampleRouter = (): Router => {
  const router = Router()

  router.get('/test', async (_, res, next) => {
    getLog().debug('sample test route - deleteme')
    await someFunction()
      .then((data) => res.send(data))
      .catch(middlewareError(next, `Unable to process request`))
  })

  router.get('/categories', (_, res) => {
    getLog().debug('sample test route - deleteme')
    if (isFeatureEnabled(res.locals.features || {}, 'categories')) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      res.send(require(path.join(__dirname, `${DATA_PATH}/categories.json`)))
    } else {
      res.send(404)
    }
  })

  return router
}
