/*
 * Sentry initialisation. Imported first in index.js so the SDK is ready
 * before the rest of the app loads.
 */
import * as Sentry from "@sentry/react-native";
import { SENTRY_DSN } from "./vars/sentry";

// The JWT travels in the query string (?jwt=...), so it must never reach Sentry.
const JWT_PARAM = /([?&]jwt=)[^&#\s"]*/gi;
const scrub = (value) =>
  typeof value === "string" ? value.replace(JWT_PARAM, "$1[Filtered]") : value;

const scrubBreadcrumb = (breadcrumb) => {
  if (breadcrumb.data?.url) {
    breadcrumb.data.url = scrub(breadcrumb.data.url);
  }
  return breadcrumb;
};

Sentry.init({
  dsn: SENTRY_DSN,
  enabled: Boolean(SENTRY_DSN),
  environment: __DEV__ ? "development" : "production",
  sendDefaultPii: false,
  // Only logs written explicitly with Sentry.logger reach Sentry,
  // console.* output is not forwarded.
  enableLogs: true,
  initialScope: { tags: { app: "React Native" } },
  beforeBreadcrumb: scrubBreadcrumb,
  beforeSend: (event) => {
    if (event.request) {
      event.request.url = scrub(event.request.url);
      event.request.query_string = scrub(event.request.query_string);
    }
    (event.breadcrumbs || []).forEach(scrubBreadcrumb);
    return event;
  },
});
