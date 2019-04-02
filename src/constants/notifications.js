export const NOTIFICATION_TYPES = Object.freeze([
  "error",
  "warning",
  "info",
  "rent_passport_info",
  "rent_passport_warning",
  "rent_passport_error",
]);

export const NOTIFICATION_ICON_COLORS = theme => ({
  error: {
    bg: theme.colors.alertRed,
    text: theme.colors.white,
    iconColor: theme.colors.white,
  },
  info: {
    bg: theme.colors.successGreen,
    text: theme.colors.white,
    iconColor: theme.colors.white,
  },
  warning: {
    bg: theme.colors.warning,
    text: theme.colors.white,
    iconColor: theme.colors.white,
  },
  rent_passport_info: {
    bg: theme.colors.none,
    text: theme.colors.successGreen,
    iconColor: theme.colors.successGreen,
  },
  rent_passport_warning: {
    bg: theme.colors.rentPassportWarningBg,
    text: theme.colors.orange,
    iconColor: theme.colors.orange,
  },
  rent_passport_error: {
    bg: theme.colors.rentPassportErrorBg,
    text: theme.colors.alertRed,
    iconColor: theme.colors.alertRed,
  },
});
