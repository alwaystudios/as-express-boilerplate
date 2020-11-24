import convict from 'convict'

const config = convict({
  env: {
    doc: 'The application environment',
    format: ['prod', 'dev', 'test'],
    env: 'NODE_ENV',
    default: 'dev',
  },
  port: {
    doc: 'The port to bind',
    format: 'port',
    env: 'PORT',
    default: '',
  },
  logLevel: {
    doc: 'Loggon level',
    format: ['debug', 'info', 'warn', 'error'],
    env: 'LOG_LEVEL',
    default: '',
  },
})

const env = process.env.NODE_ENV || config.get('env')
config.loadFile('./config/' + env + '.json')
config.validate({ allowed: 'strict' })

export default config

export type Config = typeof config
