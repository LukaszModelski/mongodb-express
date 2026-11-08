import * as Sentry from "@sentry/node";

/*
 * Logs every HTTP request to Sentry once the response is sent.
 * Only the path is logged, never the query string, because it carries the JWT.
 */
export const requestLogger = (req, res, next) => {
  const startedAt = Date.now();

  res.on("finish", () => {
    const level = res.statusCode >= 500 ? "error" : res.statusCode >= 400 ? "warn" : "info";
    Sentry.logger[level]("HTTP request", {
      method: req.method,
      path: req.originalUrl.split("?")[0],
      status: res.statusCode,
      durationMs: Date.now() - startedAt,
      userId: req.user?._id ? String(req.user._id) : res.locals.userId,
    });
  });

  next();
};
