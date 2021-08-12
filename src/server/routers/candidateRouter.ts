import { Router } from 'express'
import { Candidate, findBestFit } from '../../candidateSkills'

export const candidateRouter = (): Router => {
  const router = Router()
  const candidates: Candidate[] = []

  router.post('/candidates', function (req, res) {
    // eslint-disable-next-line functional/immutable-data
    candidates.push(req.body)
    res.sendStatus(200)
  })

  router.get('/candidates', function (req, res) {
    res.set('content-type', 'application/json')

    if (!candidates.length) {
      res.sendStatus(404)
      return
    }

    const { skills } = req.query
    const bestFit = findBestFit(skills as string[], candidates)

    if (!bestFit?.skills.length) {
      res.sendStatus(404)
      return
    }

    res.send(JSON.stringify(bestFit))
  })

  return router
}
