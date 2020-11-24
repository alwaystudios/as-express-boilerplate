import { createLogger as createWinstonLogger, transports, format, Logger } from 'winston'
import { Config } from './config'

export const createLogger = (config: Config): Logger => {
  const level = config.get('logLevel')
  return createWinstonLogger({
    level: `${level}`,
    transports: [new transports.Console()],
    format: format.combine(format.timestamp(), format.colorize(), format.simple()),
  })
}
