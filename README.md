# trabalho-multimidia

`trabalho-multimidia` is a small multimedia web application built as a
coursework project. The current implementation serves a login and registration
flow backed by PostgreSQL and provides a page with an HTML5 player for the
bundled MP4 file.

This repository is a prototype, not a production-ready public service. The
limitations and security notes below describe the current source without
claiming features that are not implemented.

## Current Interactions

- `GET /` serves the login form from `views/index.html`.
- The login form sends `POST /login`. The server looks up the username in the
  `usuarios` PostgreSQL table, compares the submitted password with the stored
  bcrypt hash, and redirects successful logins to `/page-video.html`.
- The login page links to `GET /register`, which serves the registration form
  from `views/register.html`.
- The registration form sends `POST /register`. The server checks for an
  existing username, hashes the password with bcrypt, inserts the user, and
  redirects to `/`.
- `GET /page-video.html` serves `views/page-video.html`, which displays a
  browser-controlled HTML5 video player for `views/media/video.mp4`.
- The `Sair` link returns to the login page. It does not terminate a server-side
  session because the application does not currently create sessions.

## Technology

The declared runtime dependencies are:

- Node.js and Express for the HTTP server and routing
- `pg` for PostgreSQL access
- `bcrypt` for password hashing and comparison
- EJS is declared and configured as the view engine, although the current views
  are static `.html` files

The current UI consists of HTML files with inline styles in the video page. No
separate client-side JavaScript or CSS files are present.

## Repository Structure

```text
.
├── server.js
├── package.json
├── package-lock.json
└── views/
    ├── index.html
    ├── register.html
    ├── page-video.html
    └── media/
        └── video.mp4
```

## Prerequisites

- Node.js and npm
- A reachable PostgreSQL database
- A database table named `usuarios` with `username` and `password` columns

The repository does not declare a required Node.js version. The commands in
this README were checked with Node.js `v22.22.0` and npm `10.9.4`.

## Setup and Run

Clone the repository using its canonical HTTPS URL:

```bash
git clone https://github.com/xfelipealves/trabalho-multimidia.git
cd trabalho-multimidia
```

Install the locked dependencies:

```bash
npm install
```

Before starting the server, provide a PostgreSQL database containing the
`usuarios` table expected by `server.js`. The current implementation reads a
connection string directly from `server.js`; it does not read database
configuration from environment variables.

Start the server with the command currently supported by the repository:

```bash
node server.js
```

Open <http://localhost:3000/> in a browser. There is no `start` script in
`package.json`, so `npm start` is not currently available.

## Testing and Status

The project has no automated test suite. The package test script is the default
placeholder and exits with an error:

```bash
npm test
```

For a syntax-only JavaScript check, run:

```bash
node --check server.js
```

An end-to-end manual check requires a reachable PostgreSQL database and should
cover registration, login, video playback, and the return link. The project is
currently best treated as an educational prototype with one bundled video.

## Limitations and Public-Readiness Notes

- The server contains a hard-coded PostgreSQL connection string. Do not deploy
  or share this application publicly as-is. Rotate the exposed database
  credential and move connection settings to secure environment configuration
  before any public deployment.
- The video page has a public route and is not protected by a session or access
  check. A successful login redirects there, but the route can also be requested
  directly.
- Only one local MP4 asset is wired into the UI. No media catalog, upload flow,
  audio interface, or streaming service is implemented in the current files.
- Error handling is returned as plain text from the server routes, and there is
  no documented production configuration.
- There are no automated tests, and `npm test` is intentionally configured to
  fail until a test suite is added.
- No public deployment is verified by the repository itself. The former README
  mentioned a Render URL, but it is not treated as a supported project endpoint
  here because the current repository does not define or verify that deployment.

## Contributing

Issues and pull requests are welcome. Before contributing:

1. Keep changes scoped to the behavior or documentation being addressed.
2. Run `node --check server.js` for JavaScript syntax validation.
3. Run the available manual flow when database access is configured.
4. Document any new routes, dependencies, setup requirements, or limitations.

There is no separate contribution guide or automated CI configuration in this
repository.

## License Status

`package.json` declares the `ISC` license, but the repository does not include a
`LICENSE` file or a separate license notice. The licensing status should be
confirmed by the project owner before public redistribution.
