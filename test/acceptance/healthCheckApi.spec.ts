import { healthCheck } from './apiClient'

describe('health check', () => {
  it('returns healthy', async () => {
    const response = await healthCheck()
    expect(response).toEqual({
      status: 'healthy',
    })
  })
})
