import { Router } from 'express'
import { Logger } from 'winston'
import { middlewareError } from '../errorHandler'
import { someFunction } from './sampleFunction'

export const sampleRouter = (log: Logger): Router => {
  const router = Router()

  router.get('/test', async (_, res, next) => {
    log.debug('sample test route - deleteme')
    await someFunction()
      .then((data) => res.send(data))
      .catch(middlewareError(next, `Unable to process request`))
  })

  return router
}
