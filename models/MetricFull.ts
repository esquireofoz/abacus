import { ApiData } from '@/api/ApiData'

import { Event, MetricBare, MetricRevenueParams, MetricRevenueParamsTransactionTypesEnum } from './index'

export class MetricFull extends MetricBare {
  /**
   * If `true`, then higher values of the metric are considered better. For
   * example, if the metric event measures signups, this should be `true`. If the
   * event measures refunds, it should be `false`.
   */
  higherIsBetter: boolean

  /**
   * Events that capture metric conversion. If `null`, then `revenue_params` must
   * be given.
   */
  eventParams: Array<Event> | null

  /**
   * Parameters for a revenue query. If `null`, then `event_params` must be given.
   */
  revenueParams: MetricRevenueParams | null

  constructor(apiData: ApiData) {
    super(apiData)
    this.higherIsBetter = apiData.higher_is_better
    this.eventParams = Array.isArray(apiData.event_params)
      ? apiData.event_params.map((eventParam: ApiData) => ({
          event: eventParam.event,
          props: eventParam.props,
        }))
      : null
    this.revenueParams = apiData.revenue_params
      ? {
          refundDays: apiData.revenue_params.refund_days,
          productSlugs: Array.isArray(apiData.revenue_params.product_slugs)
            ? apiData.revenue_params.product_slugs.slice()
            : null,
          transactionTypes: Array.isArray(apiData.revenue_params.transaction_types)
            ? apiData.revenue_params.transaction_types.map(
                (transactionType: string) => transactionType as MetricRevenueParamsTransactionTypesEnum,
              )
            : null,
        }
      : null
    apiData.revenue_params
  }
}
