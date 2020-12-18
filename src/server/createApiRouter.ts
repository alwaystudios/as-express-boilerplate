import { json, Router, urlencoded } from 'express'
import { getLog } from './localStorage'
import { sampleRouter } from './routers/sampleRouter'

export const createApiRouter = (): Router => {
  const router = Router()

  router.use(json({ limit: '100mb' }))
  router.use(urlencoded({ extended: true }))

  router.get('/healthcheck', (_, res) => {
    getLog().info('Service is healthy')
    res.send({ status: 'healthy' })
  })

  // todo: sample router - deleteme
  router.use(sampleRouter())

  return router
}
