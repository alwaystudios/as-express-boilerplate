import { NextFunction } from 'express'

export const middlewareError = (next: NextFunction, message: string) => (error: Error): void => {
  // eslint-disable-next-line functional/immutable-data
  return next(Object.assign(error, { message }))
}
