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

Mobile follow-up 2026-10-18 (owner-provided iPhone screenshot):
- Identified V2 particle regression: simplified 1,000-point line paths replaced V1's 4,200-point sculptural geometry; original shape transitions and perspective were lost, with misleading 'mouse' and 'knot' silhouettes.
- Root cause of page moving when dragging the planet: `touch-action: pan-y` on both `.scene` and `#particle-canvas` allowed touch-gesture scrolling. Both now use `touch-action: none` while surrounding content-panel scroll remains enabled.
- V2 restored 4,200 particles, perspective/depth-based alpha and color, and shape morphing; improved trefoil tube and mouse silhouette. Pointer drags, pointer capture, and keyboard rotation now work on the particle sculpture. JS/CSS cache-bust query version `20261018-touchfix` in both HTML entry points.
- Local validation: syntax pass; CPU planet scene 10/10; static/HTTP 25/25; actual Edge emulated-mobile CDP touch tests 7/7 (planet angle changed while page scrollY stayed 0; particle angle changed while panel scroll stayed 0; normal panel content touch scroll still worked; all three 4,200-point shapes drawn; no JS errors). Evidence `evidence/mobile-regression.json` and `evidence/repair-{ring,knot,mouse}-mobile.png`.
- Headless Edge mobile touch tests are NOT proof of physical iPhone Safari; owner must verify the published revision on the device.

Next step: publish the tested V2 patch solely in this separate repository; verify GitHub Pages and repeat mobile regression against the remote deployed URL. Leave original V1 untouched.
