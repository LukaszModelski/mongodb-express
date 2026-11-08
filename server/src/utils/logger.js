import * as Sentry from "@sentry/node";

/**
 * Reports a caught error: console, Sentry issue (with stack trace) and Sentry log entry.
 * @param {Error} err - the caught error
 * @param {String} where - short place name, ex. "user.login"
 * @param {Object} [context] - extra attributes, never put tokens or passwords here
 */
export const logError = (err, where, context = {}) => {
  console.error(`[${where}]`, err);
  Sentry.captureException(err, { tags: { where }, extra: context });
  Sentry.logger.error(`Caught error in ${where}`, {
    where,
    errorName: err?.name,
    errorMessage: err?.message,
    ...context,
  });
};

/**
 * Logs an expected, non-exceptional problem (ex. wrong JWT) as a warning.
 */
export const logWarning = (message, context = {}) => {
  Sentry.logger.warn(message, context);
};
