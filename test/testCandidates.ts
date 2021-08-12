import { datatype, name } from 'faker'
import { Candidate } from '../src/candidateSkills'

export const testCandidate = (overrides: Partial<Candidate> = {}): Candidate => ({
  id: `${datatype.uuid()}`,
  name: name.firstName(),
  skills: ['javascript', 'nodejs', 'es6'],
  ...overrides,
})
