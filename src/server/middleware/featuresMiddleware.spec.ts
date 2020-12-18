import { featureMiddleware } from './featuresMiddleware'
import { Request } from 'express'
import { ApiResponse } from '../../types'
import { testLog } from '../../../test/testLog'
import * as localStorage from '../localStorage'

const testRequest = ({ query = {}, cookies = {} } = {}) => ({ query, cookies } as Request)
const testResponse = ({ cookie = jest.fn() as any } = {}) => ({ locals: {}, cookie } as ApiResponse)
const next = jest.fn()

describe('feature middleware', () => {
  beforeEach(jest.resetAllMocks)

  describe('feature toggles', () => {
    it('loads features from feature cookie', async () => {
      const middleware = featureMiddleware()
      const req = testRequest({ cookies: { features: `{ "one": "first", "two": "second" }` } })
      const res = testResponse()

      await middleware(req, res, next)

      expect(res.locals.features).toMatchObject({
        one: 'first',
        two: 'second',
      })
    })

    it('fails gracefully if feature cookie value is not valid', async () => {
      jest.spyOn(localStorage, 'getLog').mockReturnValue(testLog())
      const middleware = featureMiddleware()
      const req = testRequest({ cookies: { features: `this is not json` } })
      const res = testResponse()

      await middleware(req, res, next)

      expect(res.locals.features).toEqual({})
    })

    it('persists features as cookie', () => {
      const middleware = featureMiddleware()
      const req = testRequest({ query: { feature: ['one|first', 'two|second'] } })
      const cookie = jest.fn() as any
      const res = testResponse({ cookie })

      middleware(req, res, next)

      const features = { one: 'first', two: 'second' }

      expect(cookie).toHaveBeenCalledTimes(1)
      expect(cookie).toHaveBeenCalledWith('features', JSON.stringify(features))
    })

    it('loads features from cookie and overriding querystring', () => {
      const middleware = featureMiddleware()
      const req = testRequest({
        cookies: { one: 'first', two: 'second' },
        query: { feature: ['one|first', 'two|updated'] },
      })
      const res = testResponse()

      middleware(req, res, next)

      expect(res.locals.features).toMatchObject({
        one: 'first',
        two: 'updated',
      })
    })
  })
})
