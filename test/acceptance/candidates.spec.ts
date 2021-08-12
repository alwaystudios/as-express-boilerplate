import { testCandidate } from '../testCandidates'
import { getCandidate, postCandidate } from './apiClient'

describe('candidates', () => {
  it('post candidates', async () => {
    const response = await postCandidate(testCandidate())
    expect(response.status).toEqual(200)
  })

  it('gets candidates', async () => {
    const response = await getCandidate(['java', 'es6'])
    expect(response).not.toBeNull()
  })
})
