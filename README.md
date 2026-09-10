# iBook

An Expo / React Native reading app with an Express API and Neon PostgreSQL storage. The existing visual components now support real account and reading workflows on web and native clients.

## Run locally

Requires Node.js 22.13 or newer and npm. The supplied Neon connection is configured in the local, ignored `.env` file. Do not commit this file or put database credentials in any `EXPO_PUBLIC_` variable.

```sh
npm install
npm run dev
```

Open **http://localhost:8081**. The API runs at **http://localhost:3001**. `npm run dev` starts both processes; you can also use `npm run server` and `npm run web` in separate terminals. Create your account in the app; there are no hard-coded users or passwords.

For another checkout, copy `.env.example` to `.env` and supply a PostgreSQL URL. API startup applies the idempotent schema and catalog seed. `npm run db:migrate` runs this step separately. All application tables live in the `ibook` schema, leaving unrelated database tables alone.

For a physical phone, set `EXPO_PUBLIC_API_URL` to your computer's LAN address, such as `http://192.168.1.20:3001`, restart Expo, and run `npm start`. Your phone must be able to reach that address. Use HTTPS for a deployed API. Native session tokens are stored in Expo SecureStore. Native builds were not verified on a simulator or device in this implementation.

## Working features

- Email/password sign-up, sign-in, persistent sessions, and sign-out with session revocation.
- Search and category filters using the database catalog, with genuine empty results.
- Private library saves, reading lists, finished books, and bookmarks.
- Create, rename, delete, and populate private collections; remove books individually.
- A four-chapter original reading guide, chapter navigation, saved position, reading time, completion, reader font size and background preferences.
- Text-file download for available content; native devices use their share sheet.
- Published ratings and reviews, including editing and deleting your own review.
- Profile changes, persisted appearance and notification settings, daily reading goals, and reading history.
- Reader search, friend requests, acceptance, removal, blocking/unblocking, and messaging between accepted friends.
- Stored in-app notifications and mark-as-read. Active chats refresh every five seconds.
- Native share sheets or web sharing/clipboard support.

Reading-day totals use UTC. The streak shown counts days with recorded reading time in the last 366 days. The reader records active time in batches; an abrupt browser or device shutdown can lose the last unsent batch (up to 30 seconds). Offline app synchronization is not implemented; download the available text for offline reading instead.

## Content and services

The named commercial books are **catalog entries only**. Their text is not supplied or fabricated. They can be saved and reviewed, but cannot be read, purchased, or downloaded. **A Small Guide to Reading** is original content included with this project, so the complete reading workflow is usable immediately.

Payments, paid memberships, gift codes, Apple/Google sign-in, SMS verification, and push notifications are unavailable. The app does not simulate payments or collect card details. In-app notifications are functional.

Password reset has a server implementation but requires `SMTP_URL` and `MAIL_FROM` before it can deliver email. Until configured, the API and UI explicitly report that reset delivery is unavailable. When configured, codes expire after 30 minutes, are stored only as hashes, and successful resets invalidate all account sessions. SMTP delivery was not tested because no email provider was supplied.

To add licensed content, insert or update a row in `ibook.books`: `chapters` is a JSON array of `{ "title": "Chapter title", "text": "Chapter text" }`; set `available=true` only when content is present and permitted for distribution. There is no administrative CMS in this release.

## Configuration and deployment

| Variable                | Purpose                                                     |
| ----------------------- | ----------------------------------------------------------- |
| `DATABASE_URL`          | Server-only Neon connection string                          |
| `API_PORT`              | API port, defaults to 3001                                  |
| `EXPO_PUBLIC_API_URL`   | Public URL of the API, embedded when Expo builds the app    |
| `ALLOWED_ORIGINS`       | Comma-separated exact web origins allowed to access the API |
| `NODE_ENV=production`   | Enables secure web session cookies                          |
| `SMTP_URL`, `MAIL_FROM` | Optional password-reset email delivery                      |

Deploy the web app and API behind the same HTTPS site (route `/api` to Express) or same-site HTTPS subdomains. Web sessions use HttpOnly, SameSite=Lax cookies; unrelated cross-site hosting is intentionally unsupported. Set `ALLOWED_ORIGINS` to the deployed frontend origin and configure the public API URL before building. If the API is behind a proxy, configure Express's trusted proxy hop count for that exact infrastructure before launch so rate limiting uses the correct client address; do not blindly trust all forwarded headers.

```sh
npm run build:web
npm run server
```

Serve `dist/` with a fallback to `index.html` for app routes. Supply server environment variables through the hosting provider's secret settings. This work runs locally and does not deploy a public service.

Before a public launch, the operator still needs real terms/contact details, content rights, a deployment/backup plan, and any desired payment/email integrations. See the in-app help and privacy information for current data visibility. Messages are not end-to-end encrypted.

## Validation

```sh
npm run typecheck
npm run test:api   # run against the local API with the same DATABASE_URL
npm run build:web
```

The API integration tests create uniquely named test accounts in the configured database and remove only those accounts afterward. They exercise authentication, invalid input, catalog search, progress persistence, collection ownership and rollback, profiles, reviews, friend acceptance, messaging permissions, blocking, notifications, deletion, and session revocation. Do not point the tests at an unrelated API/database pair.

Browser QA exercises sign-up, reload persistence, collections, search, reviews, settings, goals, downloading, and login/logout at phone and desktop sizes. Browser verification artifacts are kept outside the repository.

The dependency audit currently reports moderate advisories in the existing Expo / React Navigation dependency trees. Suggested automatic fixes include incompatible downgrades; these were not applied. Review upstream compatible releases before public deployment.
