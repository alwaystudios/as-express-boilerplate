import request from 'supertest'
import { testApp } from '../../../test/testApp'
import config from '../../infra/config'
import { testLog } from '../../../test/testLog'
import * as someFunctionModule from './sampleFunction'
import * as localStorage from '../localStorage'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const categories = require('../../data/categories.json')

jest.spyOn(localStorage, 'getLog').mockReturnValue(testLog())
const someFuncMock = jest.spyOn(someFunctionModule, 'someFunction')

describe('sample router', () => {
  beforeEach(jest.clearAllMocks)

  describe('GET /api/test', () => {
    it('responds with some data', async () => {
      someFuncMock.mockResolvedValueOnce({ data: 'test data' })
      const app = testApp(config)

      const { status, body } = await request(app).get('/api/test')

      expect(someFuncMock).toHaveBeenCalledTimes(1)
      expect(status).toEqual(200)
      expect(body).toEqual({ data: 'test data' })
    })

    it('handles failures', async () => {
      const err = jest.fn()
      const error = Error('boom')
      someFuncMock.mockRejectedValueOnce(error)
      const app = testApp(config, testLog({ err }))
      const { status } = await request(app).get('/api/test')

      expect(someFuncMock).toHaveBeenCalledTimes(1)
      expect(status).toBe(500)
      expect(err).toHaveBeenCalledTimes(1)
      expect(err).toHaveBeenCalledWith('Service error, url: GET /api/test, features: {}', error)
    })
  })

  describe('GET /api/categories', () => {
    it('responds with some static data - categories feature ON', async () => {
      const app = testApp(config)

      const { status, body } = await request(app)
        .get('/api/categories')
        .set('Cookie', 'features={"categories": "true"}')

      expect(status).toEqual(200)
      expect(body).toEqual(categories)
    })

    it('responds 404 - categories feature OFF', async () => {
      const app = testApp(config)

      const { status } = await request(app)
        .get('/api/categories')
        .set('Cookie', 'features={"categories": "false"}')

      expect(status).toEqual(404)
    })
  })
})
