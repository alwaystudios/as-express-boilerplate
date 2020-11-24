import request from 'superagent'

const BASE_URL = 'http://localhost:3001/api'

export const healthCheck = async (): Promise<JSON> =>
  request.get(`${BASE_URL}/healthcheck`).then(({ body }) => {
    return body as JSON
  })
