import * as Sentry from "@sentry/react-native";

/**
 * Reports a caught error: console, Sentry issue (with stack trace) and Sentry log entry.
 * @param {Error} err - the caught error
 * @param {String} where - short place name, ex. "api.request"
 * @param {Object} [context] - extra attributes, never put tokens or passwords here
 */
export const logError = (err, where, context = {}) => {
  console.error(`[${where}]`, err);
  Sentry.captureException(err, { tags: { where }, extra: context });
  Sentry.logger.error(`Caught error in ${where}`, {
    where,
    errorName: err?.name,
    errorMessage: err?.message,
    status: err?.response?.status,
    ...context,
  });
};

/**
 * Logs an expected, non-exceptional event (ex. session expired).
 */
export const logInfo = (message, context = {}) => {
  Sentry.logger.info(message, context);
};
