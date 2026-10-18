# SHUGE Little Universe — status

Updated: 2026-10-18

Goal: publish a separate V2 homepage while preserving the original ChatGPT Sites V1 and original GitHub homepage.

Source: copied from the Codex checkout `E:\CHATGPT\2026-10-17\b-w\work\curious-home`. Original checkout not edited in this handoff. V1 rollback ZIP: `E:\CHATGPT\2026-10-17\b-w\outputs\curious-home-v1-fc58c1e-rollback.zip`.

Verified: V2 is independently deployed at https://ndshuge.github.io/shuge-little-universe/ from the public repository https://github.com/ndshuge/shuge-little-universe . The original V1 login-gated ChatGPT Sites site (https://curious-practice-1017.ndshuge.chatgpt.site), the original Codex checkout and original GitHub homepage were not overwritten. The V2 release includes a V1-style `classic.html` view.

Validation results:
- `npm run check`: syntax passed.
- `npm run check:scene`: 10/10 CPU Three.js scene checks passed (367 meshes, 42,442 vertices).
- `npm run check:http`: 25/25 local HTTP and asset checks passed on independent local port 5198.
- GitHub Pages initial workflow triggered before Pages enablement failed. After Pages enablement, GitHub Actions run https://github.com/ndshuge/shuge-little-universe/actions/runs/39139519338 completed successfully.
- Remote site HTTP 200 for root, classic.html, town.js and vendor/three.module.js.
- Real deployed site in Windows Edge headless with Playwright: 19/19 browser checks passed, 0 JavaScript console errors. After WebGL readiness desktop viewport 1440×900 reported 366 draw calls and canvas 1195×900; mobile viewport 390×844 reported 354 draw calls and canvas 390×470. All five destinations worked in both viewports. Evidence: `evidence/live-ready-desktop.png`, `evidence/live-ready-mobile.png`, `evidence/remote-browser-qa.json`.
- First quick remote screenshot captured a loading spinner; that was cold-loading timing, disproved by wait-for-WebGL test and captured rendered screenshots.

Known limitation: actual physical iPhone/Android device, mobile Safari gestures, battery cost and screen reader use not verified. Mobile-sized Edge viewport is not equivalent to real-device testing.

Next step: ask owner to review real-phone usability if desired, and implement further improvements solely in this separate V2 repository. Original V1 deployment remains untouched.
