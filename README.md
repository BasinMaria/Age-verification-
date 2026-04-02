# Age Verification

A simple client-side age verification gate with clean session management.

## Features

- **Age-verification modal** – visitors must confirm they are of legal age
  before accessing protected content.
- **Session management** – verification state is stored in `sessionStorage` so
  it persists across page reloads within the same tab.
- **Automatic session cleanup** – stale, expired, or corrupt sessions are purged
  on every page load so users are never locked out by stuck state.
- **Configurable TTL** – sessions expire after 30 minutes by default (editable
  in `script.js`).

## Usage

Open `index.html` in a browser. No build step is required.

## How sessions work

| Event | Behaviour |
|---|---|
| First visit | Verification modal is displayed; content is blurred. |
| User confirms age | A session record is written to `sessionStorage` with a timestamp. |
| Page reload (session valid) | Modal is skipped; content is shown immediately. |
| Session expired / corrupt | Old session is removed; modal is shown again. |
| Browser tab closed | `sessionStorage` is cleared automatically by the browser. |
