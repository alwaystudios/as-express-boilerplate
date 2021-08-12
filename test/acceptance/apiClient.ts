import request from 'superagent'
import { Candidate } from '../../src/candidateSkills'

const BASE_URL = 'http://localhost:3001/api'

export const healthCheck = async (): Promise<JSON> =>
  request.get(`${BASE_URL}/healthcheck`).then(({ body }) => {
    return body as JSON
  })

export const postCandidate = async (candidate: Candidate) =>
  request.post(`${BASE_URL}/candidates`).send(candidate)

export const getCandidate = async (skills: string[]): Promise<JSON> =>
  request
    .get(`${BASE_URL}/candidates`)
    .query({ skills })
    .then(({ body }) => {
      return body as JSON
    })
