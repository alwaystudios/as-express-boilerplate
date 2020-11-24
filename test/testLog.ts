import { Logger } from 'winston'

type LogOverrides = {
  err?: any
  warn?: any
}

const noop = (() => {
  return
}) as any

export const testLog = (overrides: LogOverrides = {}): Logger => {
  const log = ((message: string, error?: Error) => {
    console.error(message, error)
  }) as any
  return ({
    error: overrides.err || log,
    warn: overrides.warn || log,
    info: noop,
    debug: noop,
  } as any) as Logger
}
