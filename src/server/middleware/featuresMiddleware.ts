import { NextFunction, Request, Response } from 'express'
import { unnest } from 'ramda'
import { FeaturesType } from '../../types'
import { getLog } from '../localStorage'

const SEPARATOR = '|'

const getQueryStringFeatures = (req: Request) =>
  unnest([req.query.feature || []]).reduce(
    (acc: any, feature: any) => ({
      ...acc,
      [feature.split(SEPARATOR)[0]]: feature.split(SEPARATOR)[1],
    }),
    {},
  )

const getCookieFeatures = (req: Request): FeaturesType => {
  try {
    const features = req.cookies && req.cookies.features ? JSON.parse(req.cookies.features) : {}
    return features
  } catch (err) {
    getLog().warn('Unable to parse feature cookie', err)
    return {}
  }
}

export const featureMiddleware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const cookieFeatures = getCookieFeatures(req)
    const queryFeatures = getQueryStringFeatures(req)

    res.cookie('features', JSON.stringify({ ...cookieFeatures, ...queryFeatures }))

    res.locals.features = { ...cookieFeatures, ...queryFeatures }
    next()
  }
}
