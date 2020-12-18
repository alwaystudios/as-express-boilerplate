import request from 'supertest'
import { testApp } from '../../test/testApp'
import { testLog } from '../../test/testLog'
import config from '../infra/config'
import * as localStorage from './localStorage'

jest.spyOn(localStorage, 'getLog').mockReturnValue(testLog())

describe('GET /api/v2/healthcheck', () => {
  it('responds as healthy', async () => {
    const app = testApp(config)

    const { status, body } = await request(app).get('/api/healthcheck')

    expect(status).toEqual(200)
    expect(body).toEqual({
      status: 'healthy',
    })
  })
})
