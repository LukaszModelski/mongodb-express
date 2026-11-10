/*
 * Same DSN as the server: one Sentry project for both apps.
 * Events are told apart by the "app" tag ("React Native" here, "Node Express" on the server).
 * A DSN is not a secret, it is meant to be shipped inside the app.
 * Leave it empty to keep Sentry disabled.
 */
export const SENTRY_DSN =
  "https://733edf22de027edfdd5c983153b881dc@o4512397505921024.ingest.de.sentry.io/4512397522108496";
