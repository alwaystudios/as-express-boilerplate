import { testCandidate } from '../test/testCandidates'
import { findBestFit, skillsMatch } from './candidateSkills'

const candidates = [
  testCandidate({ skills: ['java', 'nodejs', 'es6'] }),
  testCandidate({ skills: ['java', 'es5'] }),
  testCandidate({ skills: ['javascript', 'nodejs', 'es6'] }),
]

describe('candidate skills', () => {
  describe('skills matcher', () => {
    it('skills matcher', () => {
      expect(skillsMatch(['java', 'javascript', 'es5'], ['javascript'])).toEqual(1)
    })

    it('skills matcher', () => {
      expect(skillsMatch(['java', 'javascript', 'es5'], ['javascript', 'java', 'express'])).toEqual(
        2,
      )
    })
  })

  describe('find the best fit candidate', () => {
    it('finds the best fit candidate', () => {
      expect(findBestFit(['java', 'javascript', 'es5', 'express'], candidates)).toEqual(
        candidates[1],
      )
    })

    it('returns null where no skills match', () => {
      expect(findBestFit(['python', 'sql'], candidates)).toBeNull()
    })

    it('returns null when empty candidates', () => {
      expect(findBestFit(['python', 'sql'], [])).toBeNull()
    })
  })
})
