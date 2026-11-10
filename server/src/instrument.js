/*
 * Sentry initialisation. Must be the very first import in index.js so that
 * the SDK is ready before the rest of the app loads.
 */
import dotenv from "dotenv";
dotenv.config();

import * as Sentry from "@sentry/node";

// The JWT travels in the query string (?jwt=...), so it must never reach Sentry.
const JWT_PARAM = /([?&]jwt=)[^&#\s"]*/gi;
const scrub = (value) =>
  typeof value === "string" ? value.replace(JWT_PARAM, "$1[Filtered]") : value;

const scrubEvent = (event) => {
  if (event.request) {
    event.request.url = scrub(event.request.url);
    event.request.query_string = scrub(event.request.query_string);
  }
  (event.breadcrumbs || []).forEach((breadcrumb) => {
    if (breadcrumb.data?.url) {
      breadcrumb.data.url = scrub(breadcrumb.data.url);
    }
  });
  return event;
};

// With no SENTRY_DSN the SDK stays disabled and every Sentry call is a no-op.
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.SENTRY_ENVIRONMENT || process.env.NODE_ENV || "development",
  sendDefaultPii: false,
  initialScope: { tags: { app: "Node Express" } },
  beforeSend: scrubEvent,
  beforeBreadcrumb: (breadcrumb) => {
    if (breadcrumb.data?.url) {
      breadcrumb.data.url = scrub(breadcrumb.data.url);
    }
    return breadcrumb;
  },
});
