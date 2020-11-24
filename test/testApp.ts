import { Express } from 'express'
import { createApp } from '../src/server/createApp'
import { Config } from '../src/infra/config'
import { testLog } from './testLog'

export const testApp = (config: Config, log = testLog()): Express => {
  return createApp(config, log).app
}
