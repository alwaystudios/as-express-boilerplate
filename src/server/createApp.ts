import express from 'express'
import { AddressInfo } from 'net'
import { Logger } from 'winston'
import { Config } from '../infra/config'
import { createApiRouter } from './createApiRouter'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import { featureMiddleware } from './middleware/featuresMiddleware'
import { createLocalStorage } from './localStorage'

interface App {
  app: express.Express
  startApp: () => Promise<void>
}

export const createApp = (config: Config, log: Logger): App => {
  const app = express()
  log.info(`config: ${config.toString()}`)

  app.use(async (_req, _res, next) => {
    await createLocalStorage(log)
    next()
  })

  app.use(cookieParser())
  app.use(cors())
  app.use(helmet())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(featureMiddleware())

  app.use('/api', createApiRouter())

  app.all('*', (_, res) => {
    res.sendStatus(404)
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { originalUrl, method } = req
    const features = JSON.stringify(res.locals.features)

    log.error(`Service error, url: ${method} ${originalUrl}, features: ${features}`, err)

    res.status(500)
    res.send({
      error: err.message,
    })
  })

  const startApp = async (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      try {
        const server = app.listen(config.get('port'), () => {
          const address = server.address() as AddressInfo
          log.info(`Started on port ${address.port}`)
          return resolve()
        })
        server.once('error', (err) => {
          return reject(err)
        })
      } catch (err) {
        reject(err)
      }
    })
  }

  return { app, startApp }
}
