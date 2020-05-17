import { MetricFull } from './MetricFull'

describe('models/MetricFull.ts module', () => {
  describe('MetricFull', () => {
    describe('constructor', () => {
      it('called with valid API data should create a new `MetricFull` instance', () => {
        const metricFullWithEventParams = new MetricFull({
          metric_id: 123,
          name: 'Example Metric',
          description: 'An example metric.',
          higher_is_better: true,
          event_params: [
            {
              event: 'foo',
              props: {
                foo: 'bar',
              },
            },
          ],
          revenue_params: null,
        })
        expect(metricFullWithEventParams).toEqual({
          metricId: 123,
          name: 'Example Metric',
          description: 'An example metric.',
          higherIsBetter: true,
          eventParams: [
            {
              event: 'foo',
              props: {
                foo: 'bar',
              },
            },
          ],
          revenueParams: null,
        })

        const metricFullWithRevenueParams = new MetricFull({
          metric_id: 123,
          name: 'Example Metric',
          description: 'An example metric.',
          higher_is_better: true,
          event_params: null,
          revenue_params: {
            refund_days: 30,
            product_slugs: null,
            transaction_types: null,
          },
        })
        expect(metricFullWithRevenueParams).toEqual({
          metricId: 123,
          name: 'Example Metric',
          description: 'An example metric.',
          higherIsBetter: true,
          eventParams: null,
          revenueParams: {
            refundDays: 30,
            productSlugs: null,
            transactionTypes: null,
          },
        })

        const metricFullWithoutRevenueRefundDays = new MetricFull({
          metric_id: 123,
          name: 'Example Metric',
          description: 'An example metric.',
          higher_is_better: true,
          event_params: null,
          revenue_params: {
            refund_days: null,
            product_slugs: null,
            transaction_types: null,
          },
        })
        expect(metricFullWithoutRevenueRefundDays).toEqual({
          metricId: 123,
          name: 'Example Metric',
          description: 'An example metric.',
          higherIsBetter: true,
          eventParams: null,
          revenueParams: {
            refundDays: null,
            productSlugs: null,
            transactionTypes: null,
          },
        })

        const metricFullWithRevenueProductSlugs = new MetricFull({
          metric_id: 123,
          name: 'Example Metric',
          description: 'An example metric.',
          higher_is_better: true,
          event_params: null,
          revenue_params: {
            refund_days: 30,
            product_slugs: ['foo', 'bar'],
            transaction_types: null,
          },
        })
        expect(metricFullWithRevenueProductSlugs).toEqual({
          metricId: 123,
          name: 'Example Metric',
          description: 'An example metric.',
          higherIsBetter: true,
          eventParams: null,
          revenueParams: {
            refundDays: 30,
            productSlugs: ['foo', 'bar'],
            transactionTypes: null,
          },
        })

        const metricFullWithRevenueTransactionTypes = new MetricFull({
          metric_id: 123,
          name: 'Example Metric',
          description: 'An example metric.',
          higher_is_better: true,
          event_params: null,
          revenue_params: {
            refund_days: 30,
            product_slugs: null,
            transaction_types: ['new purchase', 'start trial'],
          },
        })
        expect(metricFullWithRevenueTransactionTypes).toEqual({
          metricId: 123,
          name: 'Example Metric',
          description: 'An example metric.',
          higherIsBetter: true,
          eventParams: null,
          revenueParams: {
            refundDays: 30,
            productSlugs: null,
            transactionTypes: ['new purchase', 'start trial'],
          },
        })
      })
    })
  })
})
