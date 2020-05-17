import MetricsApi from '@/api/MetricsApi'

describe('MetricsApi.ts module', () => {
  describe('findAll', () => {
    it('should return a set of metrics with the expected metric shape', async () => {
      const metrics = await MetricsApi.findAll()
      expect(metrics).toBeDefined()
      expect(Array.isArray(metrics)).toBe(true)
      expect(metrics.length).toBeGreaterThan(0)
      metrics.forEach((metric) => {
        expect(typeof metric.metricId).toBe('number')
        expect(typeof metric.name).toBe('string')
        expect(typeof metric.description).toBe('string')
      })
    })
  })
})
