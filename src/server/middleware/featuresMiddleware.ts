import { NextFunction, Request, Response } from 'express'
import { unnest } from 'ramda'
import { Logger } from 'winston'
import { FeaturesType } from '../../types'

const SEPARATOR = '|'

const getQueryStringFeatures = (req: Request) =>
  unnest([req.query.feature || []]).reduce(
    (acc: any, feature: any) => ({
      ...acc,
      [feature.split(SEPARATOR)[0]]: feature.split(SEPARATOR)[1],
    }),
    {},
  )

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
    const queryFeatures = getQueryStringFeatures(req)

    res.cookie('features', JSON.stringify({ ...cookieFeatures, ...queryFeatures }))

    res.locals.features = { ...cookieFeatures, ...queryFeatures }
    next()
  }
}
