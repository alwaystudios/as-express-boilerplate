import { createNamespace } from 'continuation-local-storage'
import { Logger } from 'winston'

const session = createNamespace('as-express-boilerplate')

export const getLog = (): Logger => session.get('log')

export const createLocalStorage = async (log: Logger): Promise<void> => {
  await new Promise((resolve) => {
    session.run(() => {
      session.set('log', log)
      // todo: add more here, e.g. db connection pools
      resolve(null)
    })
  })
}
