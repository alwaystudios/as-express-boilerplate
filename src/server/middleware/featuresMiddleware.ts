import { NextFunction, Request, Response } from 'express'
import { Logger } from 'winston'
import { FeaturesType } from '../../types'

const getCookieFeatures = (log: Logger, req: Request): FeaturesType => {
  try {
    const features = req.cookies && req.cookies.features ? JSON.parse(req.cookies.features) : {}
    return features
  } catch (err) {
    log.warn('Unable to parse feature cookie', err)
    return {}
  }
}

export const featureMiddleware = (log: Logger) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const cookieFeatures = getCookieFeatures(log, req)

    res.locals.features = { ...cookieFeatures }
    next()
  }
}
