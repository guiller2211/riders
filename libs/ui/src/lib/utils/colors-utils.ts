export type BackgroundColors =
  | 'neutral'
  | 'neutral-faded'
  | 'primary'
  | 'primary-faded'
  | 'positive'
  | 'positive-faded'
  | 'critical'
  | 'critical-faded'
  | undefined;

export class ColorUtils {
  static getBackgroundColor(color: BackgroundColors) {
    switch (color) {
      case 'neutral':
        return this.getBackgroundNeutral();
      case 'neutral-faded':
        return this.getBackgroundNeutralFaded();
      case 'primary':
        return this.getBackgroundPrimary();
      case 'primary-faded':
        return this.getBackgroundPrimaryFaded();
      case 'positive':
        return this.getBackgroundPositive();
      case 'positive-faded':
        return this.getBackgroundPositiveFaded();
      case 'critical':
        return this.getBackgroundCritical();
      case 'critical-faded':
        return this.getBackgroundCriticalFaded();
      default:
        return this.getBackgroundNeutral();
    }
  }

  static getBackgroundNeutral() {
    return 'var(--rs-color-background-neutral)';
  }

  static getBackgroundNeutralFaded() {
    return 'var(--rs-color-background-neutral-faded)';
  }

  static getBackgroundPrimary() {
    return 'var(--rs-color-background-primary)';
  }

  static getBackgroundPrimaryFaded() {
    return 'var(--rs-color-background-primary-faded)';
  }

  static getBackgroundPositive() {
    return 'var(--rs-color-background-positive)';
  }

  static getBackgroundPositiveFaded() {
    return 'var(--rs-color-background-positive-faded)';
  }

  static getBackgroundCritical() {
    return 'var(--rs-color-background-critical)';
  }

  static getBackgroundCriticalFaded() {
    return 'var(--rs-color-background-critical-faded)';
  }
}
