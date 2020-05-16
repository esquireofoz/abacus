import ExperimentsApi from '@/api/ExperimentsApi'

import { Platform, Status } from '@/models/index'

const PLATFORMS = Object.values(Platform)
const STATUSES = Object.values(Status)

describe('ExperimentsApi.ts module', () => {
  describe('findAll', () => {
    it('should return a set of experiments with the expected experiment shape', async () => {
      const experiments = await ExperimentsApi.findAll()
      expect(experiments).toBeDefined()
      expect(Array.isArray(experiments)).toBe(true)
      expect(experiments.length).toBeGreaterThan(0)
      experiments.forEach((experiment) => {
        expect(typeof experiment.experimentId).toBe('number')
        expect(typeof experiment.name).toBe('string')
        expect(experiment.startDatetime).toBeInstanceOf(Date)
        expect(experiment.endDatetime).toBeInstanceOf(Date)
        expect(PLATFORMS.includes(experiment.platform)).toBe(true)
        expect(STATUSES.includes(experiment.status)).toBe(true)
        expect(typeof experiment.ownerLogin).toBe('string')
      })
    })
  })
})
