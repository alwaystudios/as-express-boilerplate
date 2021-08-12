import { omit } from 'ramda'

export type Candidate = {
  id: string
  name: string
  skills: string[]
}

type CandidateMatch = Candidate & { skillsCount: number }

export const skillsMatch = (required: string[], actual: string[]) =>
  required.reduce((acc: number, curr: string) => {
    return actual.includes(curr) ? acc + 1 : acc
  }, 0)

const rankCandidates = (a: CandidateMatch, b: CandidateMatch): number => {
  if (a.skillsCount > b.skillsCount) return -1
  if (b.skillsCount > a.skillsCount) return 1

  return 0
}

export const findBestFit = (skills: string[], candidates: Candidate[]): Candidate | null => {
  const bestFits: CandidateMatch[] = candidates
    .map((candidate) => ({
      ...candidate,
      skillsCount: skillsMatch(skills, candidate.skills),
    }))
    .sort(rankCandidates)

  if (!bestFits.length) {
    return null
  }

  return bestFits[0].skillsCount ? omit(['skillsCount'], bestFits[0]) : null
}
