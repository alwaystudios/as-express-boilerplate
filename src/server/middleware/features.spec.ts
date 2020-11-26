import { FeaturesType } from '../../types'
import { isFeatureEnabled } from './features'

describe('isFeatureEnabled', () => {
  it('checks if a feature is enabled', () => {
    const features: FeaturesType = { one: 'true', two: 'false' }
    expect(isFeatureEnabled(features, 'one')).toBe(true)
    expect(isFeatureEnabled(features, 'two')).toBe(false)
  })
})
