import { json, Router, urlencoded } from 'express'
import { Logger } from 'winston'
import { sampleRouter } from './routers/sampleRouter'

export const createApiRouter = (log: Logger): Router => {
  const router = Router()

  log.debug('Creating API routes')
  router.use(json({ limit: '100mb' }))
  router.use(urlencoded({ extended: true }))

  router.get('/healthcheck', (_, res) => res.send({ status: 'healthy' }))
  router.use(sampleRouter(log))

  return router
}
