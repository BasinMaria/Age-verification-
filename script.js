/**
 * Age Verification – Session Manager
 *
 * Manages age-verification sessions with automatic cleanup of stale/stuck
 * sessions so users are never locked out by orphaned state.
 *
 * Session lifecycle
 * -----------------
 * 1. On first visit the verification modal is shown.
 * 2. If the user confirms they are of age a session record is written to
 *    sessionStorage with a TTL (default 30 minutes).
 * 3. Subsequent page loads within the same browser tab re-use the session
 *    as long as it has not expired.
 * 4. Expired or corrupt sessions are automatically purged on load so they
 *    never get "stuck".
 * 5. Closing the browser tab clears sessionStorage automatically (browser
 *    built-in behaviour).
 */

(function () {
  "use strict";

  /* ------------------------------------------------------------------ */
  /*  Configuration                                                      */
  /* ------------------------------------------------------------------ */

  var SESSION_KEY = "ageVerificationSession";
  var SESSION_TTL_MS = 30 * 60 * 1000; // 30 minutes

  /* ------------------------------------------------------------------ */
  /*  Session helpers                                                     */
  /* ------------------------------------------------------------------ */

  /**
   * Read the current session from sessionStorage.
   * Returns the parsed object or null when missing / corrupt / expired.
   */
  function getSession() {
    var raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) {
      return null;
    }

    try {
      var session = JSON.parse(raw);
    } catch (_err) {
      // Corrupt data – clean it up immediately.
      clearSession();
      return null;
    }

    // Validate required fields.
    if (!session || typeof session.verified !== "boolean" || !session.createdAt) {
      clearSession();
      return null;
    }

    // Check expiry – remove stuck / stale sessions.
    var age = Date.now() - session.createdAt;
    if (age > SESSION_TTL_MS || age < 0) {
      clearSession();
      return null;
    }

    return session;
  }

  /**
   * Create a new session record.
   */
  function createSession(verified) {
    var session = {
      verified: verified,
      createdAt: Date.now(),
    };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  }

  /**
   * Remove the session record so a fresh verification can take place.
   */
  function clearSession() {
    sessionStorage.removeItem(SESSION_KEY);
  }

  /* ------------------------------------------------------------------ */
  /*  UI helpers                                                          */
  /* ------------------------------------------------------------------ */

  function showContent() {
    var overlay = document.getElementById("age-overlay");
    var content = document.getElementById("main-content");
    if (overlay) overlay.classList.add("hidden");
    if (content) content.classList.remove("blurred");
  }

  function showDenied() {
    var overlay = document.getElementById("age-overlay");
    var content = document.getElementById("main-content");
    if (overlay) overlay.classList.add("hidden");
    if (content) {
      content.classList.remove("blurred");
      content.innerHTML =
        '<div class="denied-message">' +
        "<h1>Access Denied</h1>" +
        "<p>You must be of legal age to view this content.</p>" +
        "</div>";
    }
  }

  function updateSessionInfo(session) {
    var el = document.getElementById("session-info");
    if (!el) return;
    if (session && session.verified) {
      var expires = new Date(session.createdAt + SESSION_TTL_MS);
      el.textContent = "Session expires: " + expires.toLocaleTimeString();
    } else {
      el.textContent = "";
    }
  }

  /* ------------------------------------------------------------------ */
  /*  Initialisation                                                      */
  /* ------------------------------------------------------------------ */

  function init() {
    // --- 1. Cleanup: purge any stuck / stale sessions ---
    var session = getSession();

    // --- 2. If a valid session already exists, apply its state ---
    if (session) {
      if (session.verified) {
        showContent();
        updateSessionInfo(session);
      } else {
        showDenied();
      }
      return;
    }

    // --- 3. No valid session – show the verification prompt ---
    var confirmBtn = document.getElementById("btn-confirm-age");
    var denyBtn = document.getElementById("btn-deny-age");

    if (confirmBtn) {
      confirmBtn.addEventListener("click", function () {
        var s = createSession(true);
        showContent();
        updateSessionInfo(s);
      });
    }

    if (denyBtn) {
      denyBtn.addEventListener("click", function () {
        createSession(false);
        showDenied();
      });
    }
  }

  // Run when the DOM is ready.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
