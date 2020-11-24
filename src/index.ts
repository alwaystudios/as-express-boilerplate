import { createApp } from './server/createApp'
import config from './infra/config'
import { createLogger } from './infra/logger'

const log = createLogger(config)

Promise.resolve()
  .then(() => {
    const { startApp } = createApp(config, log)
    return startApp
  })
  .then((startApp) => startApp())
  .catch((error) => {
    log.error('Service crashed with error: ', error)
  })
