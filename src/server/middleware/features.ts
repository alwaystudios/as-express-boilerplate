import { FeaturesType } from '../../types'

export const isFeatureEnabled = (features: FeaturesType, feature: string): boolean =>
  features && features[feature] === 'true'
