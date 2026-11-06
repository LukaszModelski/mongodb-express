# Authentication flow

How the app logs a user in, restores the session on start, refreshes tokens during requests, and logs the user out when the session cannot be saved.

## Tokens

| Token | Details |
| --- | --- |
| Access token | JWT valid for 1 hour (`JWT_ACCESS_EXPIRES`). Sent with API requests as the `?jwt=` query parameter. |
| Refresh token | 32 random bytes, valid for 30 days (`REFRESH_TOKEN_DAYS`). Only its SHA-256 hash is stored in the database. Every refresh issues a new one and invalidates the old one. |
| Storage | AsyncStorage on mobile (`@jwt`, `@refreshToken`), cookies on web (`jwt`, `refreshToken`). |

The server keeps a single refresh token per user, so logging in on a second device invalidates the session on the first.

## 1. Password login

The only place where the user enters a password. The result is a token pair saved on the device.

Files: `client/src/views/LoginView/LoginView.js`, `client/src/js/api.js` (`loginUser`), `server/src/resources/user/user.router.js` (`/login`), `server/src/utils/tokens.js`.

```mermaid
flowchart TD
  A["User enters email and password"] --> B["loginUser: POST /api/user/login"]
  B --> C{"User exists and password matches?"}
  C -- "no" --> D["401 Authentication failed"]
  C -- "yes" --> E["getAuthTokens: new JWT and new refresh token"]
  E --> F["Database: refresh token hash and expiry date"]
  F --> G["200: token and refreshToken"]
  G --> H{"Both tokens in the response?"}
  H -- "no" --> I["Error: Auth response is missing tokens"]
  H -- "yes" --> J["saveAuthTokens: store on the device"]
  J --> K["setIsUserSignedIn true: Navigation shows the app screens"]
```

## 2. App start and screen focus

The `validateJWTFronted` hook and `Navigation` call `restoreSession`. Its result goes to Redux and decides whether the user sees the app or the login screen.

Files: `client/src/js/api.js` (`restoreSession`), `client/src/Navigation.js`, `client/src/hooks/validateJWTFrontend.js`.

```mermaid
flowchart TD
  A["restoreSession"] --> B{"JWT present and valid locally?"}
  B -- "yes" --> OK["true: user is signed in"]
  B -- "no" --> C["refreshAccessToken"]
  C --> D{"Refresh token on the device?"}
  D -- "no" --> OUT
  D -- "yes" --> E["POST /api/user/refresh"]
  E --> F{"Server response"}
  F -- "200" --> G["Save the new token pair"]
  G --> OK
  F -- "401" --> OUT["clearAuthTokens and false: login screen"]
  F -- "network error or 5xx" --> KEEP["Keep tokens, true: session untouched"]
```

Tokens are cleared only on an explicit 401 or when there is no refresh token. A network failure does not log the user out.

## 3. API request (expenses)

Every API request (list, month, add, delete) goes through `authorizedRequest`. It retries exactly once, and only after a 401.

Files: `client/src/js/api.js` (`authorizedRequest`, `handleAPIerror`), `ExpensesView`, `AddExpenseView`, `ExpensesListItem`.

```mermaid
flowchart TD
  A["authorizedRequest"] --> B{"JWT valid locally?"}
  B -- "no" --> C["refreshAccessToken"]
  B -- "yes" --> D["Send request with jwt"]
  C -- "success" --> D
  C -- "error" --> ERR["Error goes to the view: handleAPIerror"]
  D --> E{"Response"}
  E -- "2xx" --> OK["Return data"]
  E -- "error other than 401" --> ERR
  E -- "401" --> F["refreshAccessToken"]
  F -- "success" --> G["Retry the request once with the new JWT"]
  G --> OK
  F -- "401 or no refresh token" --> H["clearAuthTokens and throw 401"]
  H --> ERR
  F -- "network error" --> ERR
  ERR --> I{"401 or no refresh token?"}
  I -- "yes" --> J["clearAuthTokens and setIsUserSignedIn false: login screen"]
  I -- "no" --> K["console.error: user stays in the app"]
```

Logout happens in one place, `handleAPIerror`, when the error is a 401 or the refresh token is missing. Network and server errors are only logged to the console.

## 4. Refresh on the server

The `/refresh` endpoint takes the refresh token in the request body, not in the URL.

Files: `server/src/resources/user/user.router.js` (`/refresh`), `server/src/utils/tokens.js`.

```mermaid
flowchart TD
  A["POST /api/user/refresh with refreshToken"] --> B{"refreshToken in the body?"}
  B -- "no" --> C["400"]
  B -- "yes" --> D["Find the user by SHA-256 hash"]
  D --> E{"Found and not expired?"}
  E -- "no" --> F["If found: clear the user's refresh token. Respond 401"]
  E -- "yes" --> G["getAuthTokens: new JWT and new refresh token"]
  G --> H["Old refresh token stops working. Respond 200"]
```

Tokens rotate: if a 200 response is lost on the way, the client keeps the old, already invalid token and has to log in again.
