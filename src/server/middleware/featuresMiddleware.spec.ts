import { featureMiddleware } from './featuresMiddleware'
import { Request } from 'express'
import { ApiResponse } from '../../types'
import { testLog } from '../../../test/testLog'

const testRequest = ({ query = {}, cookies = {} } = {}) => ({ query, cookies } as Request)
const testResponse = ({ cookie = jest.fn() as any } = {}) => ({ locals: {}, cookie } as ApiResponse)
const next = jest.fn()

describe('feature middleware', () => {
  beforeEach(jest.resetAllMocks)

  describe('feature toggles', () => {
    it('loads features from feature cookie', async () => {
      const middleware = featureMiddleware(testLog())
      const req = testRequest({ cookies: { features: `{ "one": "first", "two": "second" }` } })
      const res = testResponse()

      await middleware(req, res, next)

      expect(res.locals.features).toMatchObject({
        one: 'first',
        two: 'second',
      })
    })

    it('gracefully fail if feature cookie value is not valid', async () => {
      const middleware = featureMiddleware(testLog())
      const req = testRequest({ cookies: { features: `this is not json` } })
      const res = testResponse()

      await middleware(req, res, next)

      expect(res.locals.features).toEqual({})
    })
  })
})
