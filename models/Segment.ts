import { ApiData } from '@/api/ApiData'

/**
 * A segment of users, e.g., grouped by geolocation. Used to constrain an
 * experiment to one or more segments.
 */
export class Segment {
  /**
   * Globally-unique segment ID.
   */
  readonly segmentId: number

  /**
   * Globally-unique segment name.
   */
  name: string

  /**
   * Type of segment.
   */
  type: SegmentType

  constructor(apiData: ApiData) {
    this.segmentId = apiData.segment_id
    this.name = apiData.name
    this.type = apiData.type as SegmentType
  }
}

export enum SegmentType {
  Country = 'country',
  Locale = 'locale',
}
