# Changelog

## 2026-09-06 01:38:00
- **Description:** Deployed v2.0.0 production release to Vercel with dedicated serverless function (`/api/chat`), SPA routing rules, security header policies, and asset caching optimizations. Live production alias active at `https://anmolss-portfolio.vercel.app`.
- **Files Affected:** `vercel.json`, `api/chat.ts`, `.vercelignore`, `package.json`

## 2026-09-06 01:28:00
- **Description:** Implemented production-grade security, scalability, and resilience fixes from architectural review:
  - Mounted `helmet` with custom Content Security Policy allowing self-hosted PDF frame rendering.
  - Added strict payload size limits (`16kb`) to prevent memory exhaustion attacks.
  - Implemented `express-rate-limit` (30 requests/15 min per IP) on `/api/chat` to protect upstream quotas and prevent denial-of-service.
  - Hardened `/api/chat` with input length trimming (500 chars) and a 10-second upstream timeout promise race to prevent connection starvation.
  - Added "Open Full View" fallback link to the certificate modal for mobile and restricted WebKit environments.
- **Files Affected:** `server.ts`, `package.json`, `src/components/CertificatesSection.tsx`

## 2026-09-06 01:23:00
- **Description:** Fixed startup viewport jump where document-level `scrollIntoView` in chat components forced the entire window to scroll to the bottom on mount. Replaced with internal container scroll handlers guarded by mount detection.
- **Files Affected:** `src/components/AiChatSection.tsx`, `src/components/AiFloatingChat.tsx`

## 2026-09-06 01:12:00
- **Description:** Refactored credential viewing interface into a unified in-page viewer modal. Replaced external new-tab anchors and separate details buttons with a single "View Certificate" action that directly renders PDF documents and credential images within an in-page modal dialog.
- **Files Affected:** `src/components/CertificatesSection.tsx`

## 2026-08-24 11:45:00
- **Description:** Initialized next-level portfolio base. Created data aggregation script, styled index with glassmorphism and left sidebar. Added dynamic js script.
- **Files Affected:** `index.html`, `styles.css`, `script.js`, `update_data.py`, `data.js`

## 2026-08-24 11:48:00
- **Description:** Iteration 1: Ingested new certificates via update_data.py. Implemented a 3D perspective tilt effect on project and certificate cards for a more premium, interactive feel.
- **Files Affected:** `script.js`, `styles.css`

## 2026-08-24 11:50:00
- **Description:** Iteration 2: Ingested new certificates via update_data.py. Added a dynamic typewriter effect to the profile tagline for enhanced user engagement.
- **Files Affected:** `index.html`, `script.js`

## 2026-08-24 11:54:00
- **Description:** Iteration 4: Ingested new certificates via update_data.py. Implemented floating ambient shapes in the background for a modern, immersive aesthetic.
- **Files Affected:** `index.html`, `styles.css`

## 2026-08-24 11:56:00
- **Description:** Iteration 5: Integrated Gemini AI Chatbot directly into the frontend. The chatbot reads the ingested portfolio context (from data.js) and answers questions based on the resume and projects. Secured via client-side sessionStorage input.
- **Files Affected:** `index.html`, `script.js`, `styles.css`

## 2026-08-24 11:58:00
- **Description:** Iteration 6: Ingested new certificates via update_data.py. Implemented a dynamic top scroll progress bar tracking user scroll position for an extra premium touch.
- **Files Affected:** `index.html`, `script.js`, `styles.css`

## 2026-08-24 12:00:00
- **Description:** Iteration 7: Ingested new certificates via update_data.py. Added an interactive cursor glow effect that dynamically illuminates the glass panels and cards based on mouse position.
- **Files Affected:** `script.js`, `styles.css`

## 2026-08-24 12:02:00
- **Description:** Iteration 8: Refactored update_data.py to properly map and clean raw certificate file names into professional display titles. Added a pulsing neon glow animation to the avatar in the sidebar.
- **Files Affected:** `update_data.py`, `script.js`, `styles.css`

## 2026-08-24 12:04:00
- **Description:** Iteration 9: Ingested new certificates via update_data.py. Added an animated bouncing-dot typing indicator to the AI Chatbot to provide immediate visual feedback while awaiting the Gemini API response.
- **Files Affected:** `script.js`, `styles.css`

## 2026-08-24 12:06:00
- **Description:** Iteration 10: Ingested new certificates via update_data.py. Implemented a scroll-based Intersection Observer that dynamically triggers smooth fade-in and slide-up animations on cards as they enter the viewport.
- **Files Affected:** `script.js`, `styles.css`

## 2026-08-24 12:08:00
- **Description:** Iteration 11: Ingested new certificates via update_data.py. Added an interactive 3D glare/glint effect to the project and certificate cards. The reflection dynamically moves based on the cursor position over the card.
- **Files Affected:** `script.js`, `styles.css`

## 2026-08-24 12:10:00
- **Description:** Iteration 12: Ingested new certificates via update_data.py. Added an interactive custom 'magic cursor' that replaces the default pointer. It smoothly trails the mouse and expands with a blend-mode effect when hovering over interactive elements like cards and buttons.
- **Files Affected:** `index.html`, `script.js`, `styles.css`

## 2026-08-24 12:12:00
- **Description:** Iteration 13: Ingested new certificates via update_data.py. Added an interactive magnetic hover effect to the sidebar navigation links. The links dynamically pull toward the cursor, creating a highly tactile, premium feel.
- **Files Affected:** `script.js`, `styles.css`

## 2026-08-24 12:14:00
- **Description:** Iteration 14: Ingested new certificates via update_data.py. Upgraded the AI Chatbot floating toggle button with a continuous animated pulsing 'ripple' effect, drawing attention to it as a premium interactive element.
- **Files Affected:** `styles.css`

## 2026-08-24 12:16:00
- **Description:** Iteration 15: Ingested new certificates via update_data.py. Added an interactive parallax effect to the ambient background shapes, causing them to subtly shift and drift in response to the user's mouse position, greatly deepening the 3D aesthetic of the environment.
- **Files Affected:** `script.js`, `styles.css`

## 2026-08-24 12:18:00
- **Description:** Iteration 16: Ingested new certificates via update_data.py. Added a staggered CSS keyframe load sequence to the sidebar (Avatar -> Title -> Tagline -> Nav Links), causing elements to smoothly cascade into view when the page first loads.
- **Files Affected:** `styles.css`

## 2026-08-24 12:20:00
- **Description:** Iteration 17: Ingested new certificates via update_data.py. Implemented a Scroll Spy feature. The sidebar navigation links now dynamically update their active state based on the user's scroll position, providing clear feedback on exactly which section is currently being viewed.
- **Files Affected:** `script.js`

## 2026-08-24 12:22:00
- **Description:** Iteration 18: Ingested new certificates via update_data.py. Added a highly aesthetic, tech-inspired background grid pattern. The grid uses a radial gradient mask so it elegantly fades out towards the edges of the screen, anchoring the glassmorphism elements perfectly.
- **Files Affected:** `styles.css`

## 2026-08-24 12:24:00
- **Description:** Iteration 19: Ingested new certificates via update_data.py. Overhauled the project technology tags with a vibrant 'frosted glass pill' design. They now feature a subtle translucent background with an interactive hover state that gently lifts the tag and applies a neon drop-shadow.
- **Files Affected:** `styles.css`

## 2026-08-24 12:26:00
- **Description:** Iteration 20: Ingested new certificates via update_data.py. Enhanced the AI Chatbot UX by adding an automated, welcoming introductory message that greets the user the very first time they open the chat widget, significantly improving the onboarding experience.
- **Files Affected:** `script.js`

## 2026-08-24 12:28:00
- **Description:** Iteration 21: Ingested new certificates via update_data.py. Added an authentic blinking cursor element ( | ) to the end of the tagline typewriter animation to make the effect look like an actual terminal/typing interface.
- **Files Affected:** `styles.css`

## 2026-08-24 12:30:00
- **Description:** Iteration 22: Ingested new certificates via update_data.py. Upgraded all primary buttons (Resume, LinkedIn, GitHub, etc.) with a premium 'Animated Glowing Gradient' hover state. When hovered, the buttons emit a soft neon shadow and their backgrounds smoothly animate a shifting gradient, giving a highly polished and interactive feel.
- **Files Affected:** `styles.css`

## 2026-08-24 12:32:00
- **Description:** Iteration 23: Ingested new certificates via update_data.py. Added a dynamic, magnetic pulse effect to the profile Avatar (sidebar). Hovering over the avatar now causes it to gently pop out and emit a soft glowing shadow, making the sidebar feel more alive and interactive.
- **Files Affected:** `styles.css`

## 2026-08-24 12:34:00
- **Description:** Iteration 24: Ingested new certificates via update_data.py. Enhanced the Project and Certificate cards with a dynamic 'Illuminated Glow Border' effect on hover. When hovering over a card, its border lights up with the accent color and casts a premium neon drop-shadow, making the interface feel highly tactile.
- **Files Affected:** `styles.css`

## 2026-08-24 12:36:00
- **Description:** Iteration 25: Ingested new certificates via update_data.py. Upgraded the AI Chatbot's message bubbles. The AI's responses are no longer flat shapes; they now feature a beautiful glassmorphism effect (frosted blur and subtle borders) which elegantly contrasts with the user's solid accent-colored messages.
- **Files Affected:** `styles.css`

## 2026-08-24 12:38:00
- **Description:** Iteration 26: Ingested new certificates via update_data.py. Replaced the default browser scrollbar with a sleek, minimalist, translucent custom scrollbar that perfectly complements the dark-mode glassmorphism aesthetic.
- **Files Affected:** `styles.css`

## 2026-08-24 12:40:00
- **Description:** Iteration 27: Ingested new certificates via update_data.py. Added an Animated Chat Input Placeholder. The AI chatbot's text input box now dynamically types, deletes, and cycles through example questions, guiding the user on how to interact with the AI.
- **Files Affected:** `script.js`

## 2026-08-24 12:42:00
- **Description:** Iteration 28: Ingested new certificates via update_data.py. Enabled Native CSS Smooth Scrolling globally. Clicking sidebar navigation links now smoothly animates the page scrolling down to the target section instead of instantly jumping, delivering a much more premium single-page application experience.
- **Files Affected:** `styles.css`

## 2026-08-24 12:44:00
- **Description:** Iteration 29: Ingested new certificates via update_data.py. Added a Staggered Cascade Animation to the Project and Certificate grids. Now, when scrolling down to reveal these sections, the cards dynamically fade and slide up one by one in a seamless wave, rather than all appearing simultaneously.
- **Files Affected:** `script.js`

## 2026-08-24 12:46:00
- **Description:** Iteration 30: Ingested new certificates via update_data.py. Added an elegant Active Section Indicator to the sidebar navigation. When you scroll through the page, an animated accent-colored dot appears next to the currently active section in the sidebar, providing highly professional visual feedback on your current reading position.
- **Files Affected:** `styles.css`

## 2026-08-24 12:48:00
- **Description:** Iteration 31: Ingested new certificates via update_data.py. Added Animated Gradient Underlines to Section Titles. When scrolling into a new section, the main title ('About', 'Projects', etc.) now features a sleek gradient underline that dynamically grows in width, adding a satisfying micro-animation to the reading experience.
- **Files Affected:** `styles.css`

## 2026-08-24 12:51:00
- **Description:** Iteration 32: Ingested new certificates via update_data.py. Implemented Dynamic Brand Coloring for Project Tags. The technology tags in your project cards (e.g., React, Python, Node, HTML) now automatically detect the technology name and apply their respective official brand colors, complete with tinted translucent backgrounds and crisp borders, dramatically improving visual scanning.
- **Files Affected:** `script.js`

## 2026-08-24 12:51:00
- **Description:** Iteration 32: Ingested new certificates via update_data.py. Added Dynamic Badges to Section Titles. The 'Projects' and 'Certificates' section headers now dynamically read the JSON data to automatically append a numerical count of your achievements (e.g. 'Projects (8)'). This provides immediate context for visitors before they even begin scrolling.
- **Files Affected:** `script.js`

## 2026-08-24 12:54:00
- **Description:** Iteration 34: Ingested new certificates via update_data.py. Added an elegant 'Hover Reveal' micro-interaction to all cards. When you hover over a Project or Certificate, a sleek, accent-colored 'View Project / View Document' call-to-action seamlessly slides up and fades into view, providing a clean, distraction-free default state while remaining highly interactive.
- **Files Affected:** `styles.css`, `script.js`

## 2026-08-24 12:56:00
- **Description:** Iteration 35: Ingested new certificates via update_data.py. Upgraded the Ambient Background Shapes. The glowing glassmorphism orbs in the background no longer just float linearly; they now slowly swirl, rotate, and pulsate in size, giving the entire portfolio a feeling of deep, ambient life.
- **Files Affected:** `styles.css`

## 2026-08-24 12:58:00
- **Description:** Iteration 36: Ingested new certificates via update_data.py. Added a Floating 'Scroll To Top' button. This highly functional UI element appears only when you scroll deep into the page. Clicking it smoothly glides the user back to the top of the portfolio, ensuring they never feel 'lost' at the bottom of long lists.
- **Files Affected:** `index.html`, `styles.css`, `script.js`

## 2026-08-24 13:00:00
- **Description:** Iteration 37: Ingested new certificates via update_data.py. Added a 'Magnetic Physics' effect to the primary Call-To-Action buttons (like the Resume download button). When the user's cursor approaches the button, the button subtly pulls towards the cursor, giving the interface a highly satisfying, tactile sense of weight and physical presence.
- **Files Affected:** `script.js`

## 2026-08-24 13:02:00
- **Description:** Iteration 38: Ingested new certificates via update_data.py. Added a 'Cyberpunk Text Scramble' effect to your main Profile Name. When a user hovers over 'Anmol' in the sidebar, the text instantly scrambles into rapid-fire randomized letters before smoothly decoding back into your name, giving it a very tech-forward, high-end feel.
- **Files Affected:** `index.html`, `script.js`

## 2026-08-24 13:07:00
- **Description:** Iteration 39: Ingested new certificates via update_data.py. BUGFIX: Fixed an issue where Projects and Certificates sections were hidden by default, preventing scrolling and breaking the Scroll Spy. UI UPGRADE: Added a 'Cinematic Film Grain' texture overlay. A subtle SVG noise filter now spans the background beneath the glowing shapes, giving the sleek dark mode an ultra-premium, tactile matte finish.
- **Files Affected:** `index.html`, `script.js`, `styles.css`

## 2026-08-24 13:08:00
- **Description:** Iteration 41: Ingested new certificates via update_data.py. Implemented a 'Cursor Scroll Progress Indicator'. The custom mouse cursor is no longer just a floating orb. It is now wrapped in a dynamic SVG circle that physically fills up and draws itself around the cursor in real-time as the user scrolls down the portfolio, providing a hyper-modern, 'next-level' sense of spatial awareness.
- **Files Affected:** `index.html`, `script.js`, `styles.css`

## 2026-08-24 13:10:00
- **Description:** Iteration 42: Ingested new certificates via update_data.py. Added a 'Neon Glow Pulse' to the active sidebar navigation links. The small accent-colored dot that indicates which section you are currently viewing now emits a soft, rhythmic neon glow. It adds a subtle 'heartbeat' to the interface, pulling the eye just enough to keep the user oriented without being distracting.
- **Files Affected:** `styles.css`

## 2026-08-24 13:12:00
- **Description:** Iteration 43: Ingested new certificates via update_data.py. Added a 'Contextual Time-of-Day Greeting'. The main welcome text now automatically detects the user's local timezone and dynamically greets them with 'Good morning', 'Good afternoon', or 'Good evening' before welcoming them to your universe. It's a small touch that makes the portfolio feel personal and alive.
- **Files Affected:** `index.html`, `script.js`

## 2026-08-24 13:14:00
- **Description:** Iteration 44: Ingested new certificates via update_data.py. Added a Custom Hover Tooltip system for your Technology Tags. When a user hovers over a language/framework badge on a project card (e.g. 'React' or 'Python'), a sleek glassmorphic tooltip instantly pops up and physically follows the cursor, reading 'Built with [Tech]'. This provides delightful micro-context without cluttering the UI.
- **Files Affected:** `index.html`, `styles.css`, `script.js`

## 2026-08-24 13:16:00
- **Description:** Iteration 45: Ingested new certificates via update_data.py. Implemented a '3D Hover Tilt' on all Project and Certificate cards. Previously, cards simply slid upwards on hover. Now, using a bit of trigonometry mapping the mouse position, they dynamically tilt along their X and Y axes toward the cursor. This provides an incredible sense of depth and physics, making the UI feel like tactile, premium glass surfaces.
- **Files Affected:** `script.js`

## 2026-08-24 13:18:00
- **Description:** Iteration 46: Ingested new certificates via update_data.py. Upgraded the Profile Tagline 'Typewriter Effect'. Instead of just typing out 'Software Developer & Innovator' once and stopping, it now infinitely cycles through a dynamic list of your roles (Full-Stack Engineer, Applied AI Enthusiast, Geospatial Data Visualizer). It smoothly types, pauses, erases itself, and types the next phrase. I also added a realistic blinking cursor to complete the terminal aesthetic.
- **Files Affected:** `styles.css`, `script.js`

## 2026-08-24 13:20:00
- **Description:** Iteration 47: Ingested new certificates via update_data.py. Upgraded the 'Skills' section in the About tab. It is no longer just a comma-separated text list; it has been transformed into a dynamic 'Core Stack' visualizer featuring sleek, horizontally filling progress bars. The bars use gradient color fills that correspond to their respective tech stacks (e.g., Python yellow/blue, React cyan/green). They animate in smoothly when the page loads.
- **Files Affected:** `index.html`, `styles.css`

## 2026-08-24 13:23:00
- **Description:** Iteration 48: Ingested new certificates via update_data.py. Upgraded the Profile Avatar. It no longer has a static gradient background. Instead, the 'A' sits inside a clean glassmorphic disc, encircled by an infinitely spinning, animated conic gradient border. This adds a highly sophisticated, sci-fi/AI-inspired energy to the sidebar.
- **Files Affected:** `index.html`, `styles.css`

## 2026-08-24 13:24:00
- **Description:** Iteration 49: Ingested new certificates via update_data.py. Implemented a 'Terminal Boot Sequence' on initial page load. When a user first opens your portfolio, the screen is covered by a dark overlay where terminal text rapidly types out: 'Initializing system... Loading components... Establishing secure connection... Access granted. Welcome.' before smoothly fading away to reveal the UI. It uses 'sessionStorage' so it only happens once per session, preventing it from being annoying on refresh.
- **Files Affected:** `index.html`, `styles.css`, `script.js`

## 2026-08-24 13:26:00
- **Description:** Iteration 50: Ingested new certificates via update_data.py. Added an Interactive Particle Network Background using HTML5 Canvas. A constellation of purple/accent particles now gently float behind the glass panels of the portfolio. They subtly react to your mouse movementsconnecting with lines when close to each other, and dodging the cursor. This gives the entire site a highly dynamic, living backdrop.
- **Files Affected:** `index.html`, `styles.css`, `script.js`

## 2026-08-24 21:45:00
- **Description:** Iteration 52: Restored the original glassmorphism portfolio design. Fixed the 'View Project' buttons by wrapping project cards in functional anchor tags. Corrected the Delhi University Certificate name. Added a dedicated 'Resume' tab with a newly integrated timeline UI for Education and Experience, and migrated the Core Stack progress bars to this new section.
- **Files Affected:** `index.html`, `script.js`, `styles.css`, `data.js`
- **Date**: 2026-08-27T17:23:00+05:30
- **Description**: Replaced empty API key with the user-provided live key.
- **Files affected**: script.js
- **Date**: 2026-08-27T18:04:00+05:30
- **Description**: Added a Vercel Serverless Function (api/chat.js) to securely proxy Gemini API requests and updated script.js to call this backend route, removing all exposed API keys.
- **Files affected**: script.js, api/chat.js

## 2026-08-27 18:20:00
- **Description**: VFX-Grade UI Overhaul. Replaced 2D particle background with Three.js WebGL shader-based nebula/aurora. Added GSAP ScrollTrigger animations (staggered card reveals, word-by-word text, slide-in titles, scroll-triggered skill bars). Replaced manual tilt with VanillaTilt (GPU-accelerated 3D tilt with glare). Added holographic card shimmer overlay with animated gradient. Upgraded boot sequence with glitch text, progress bar, wave visualizer, and cinematic circular reveal. Upgraded sidebar with animated gradient border, breathing avatar glow, pill-shaped nav indicators, and background sweep hover effect. Upgraded section titles with animated gradient text shift and breathing scale. Upgraded chat messages with gradient user bubbles and accent-bordered AI responses. Added cursor trail dots, button ripple effect, focus ring glow, and reduced-motion accessibility media query. Enhanced mobile responsiveness.
- **Files affected**: index.html, styles.css, script.js

## 2026-08-27 18:29:00
- **Description**: Continuous Upgrade Loop - Iterations 1 & 2. Implemented GSAP ScrollToPlugin for smooth scrolling between sections and dynamic sidebar active link highlighting. Upgraded WebGL Nebula background to include an immersive 3D interactive floating starfield (THREE.Points) that reacts to cursor position and scroll depth using a PerspectiveCamera.
- **Files affected**: index.html, script.js

## 2026-08-27 18:30:00
- **Description**: Continuous Upgrade Loop - Iteration 3. Implemented custom Webkit scrollbars with animated gradient thumbs. Upgraded button global styling (.btn) with magnetic-style scaling hover effects and dynamic multi-layered neon drop shadows for enhanced tactile interaction.
- **Files affected**: styles.css

## 2026-08-27 18:34:00
- **Description**: Continuous Upgrade Loop - Iteration 4 & 5. Upgraded chat window with intense frosted glass backdrop filter and deeper shadowing for 3D depth. Upgraded typing dots with bouncy cascade animation. Added glowing pulse animation to the boot progress bar.
- **Files affected**: styles.css

## 2026-08-27 18:37:00
- **Description**: Continuous Upgrade Loop - Iteration 6. Added advanced interactive hover tracking (magnetic radial gradient glow) to .skill-item cards, matching premium VFX aesthetics seen in Lovable and Claude UIs.
- **Files affected**: styles.css, script.js

## 2026-08-27 18:39:00
- **Description**: Continuous Upgrade Loop - Iteration 7. Added cyber-punk aesthetic text scramble / glitch hover effect to .glitch-text headers to mimic a terminal decoding data on hover.
- **Files affected**: script.js

## 2026-08-27 18:45:00
- **Description**: Continuous Upgrade Loop - Iteration 8. Fixed Syntax error that was crashing the site on load. Added animated glowing timelines to the experience/education section that fills dynamically on scroll (GSAP ScrollTrigger).
- **Files affected**: styles.css, script.js

## 2026-08-27 18:49:00
- **Description**: Continuous Upgrade Loop - Iteration 11. Initialized 3D VanillaTilt effect on the dynamic Projects and Certificates cards so they react in 3D space with a glass glare effect on hover. Added a full-page Cyberpunk Scanner Line overlay that continuously sweeps across the UI.
- **Files affected**: script.js, index.html, styles.css

## 2026-08-27 18:50:00
- **Description**: Continuous Upgrade Loop - Iteration 12. Added "Liquid Energy" gradient animation to all section titles. Titles now have a slowly shifting gradient flow using CSS keyframes and background clipping, making them look highly dynamic and futuristic.
- **Files affected**: styles.css

## 2026-08-27 18:55:00
- **Description**: Manual Override. Per user request, significantly slowed down the WebGL particle nebula animation speed in script.js and completely removed the Cyberpunk Scanner line overlay from index.html and styles.css.

## 2026-08-27 18:56:00
- **Description**: Continuous Upgrade Loop - Iteration 15. Added an animated Cyberpunk Hex Grid pattern to the sidebar's background behind the glass overlay. The SVG grid gently pulses and scales over time to give the sidebar a highly futuristic, sci-fi HUD panel aesthetic.
- **Files affected**: styles.css

## 2026-08-27 18:57:00
- **Description**: Manual Override. Vastly reduced the mouse rotation multiplier for the WebGL particle nebula to prevent the particle field from spinning too fast when moving the cursor horizontally across the screen.

## 2026-08-27 18:58:00
- **Description**: Continuous Upgrade Loop - Iteration 16. Added a highly interactive "Magnetic Hover Effect" to the Sidebar Navigation Links and Social Icons. As the user moves their mouse close to these elements, they physically pull towards the cursor, creating a tactile and responsive UI experience.
- **Files affected**: script.js

## 2026-08-27 19:00:00
- **Description**: Continuous Upgrade Loop - Iteration 17. Implemented "Glassmorphism Glowing Borders" on all .card elements (Projects and Certificates). A dynamically rotating conic-gradient acts as a neon light beam racing around the card perimeter, fading in dramatically on hover, complementing the existing VanillaTilt 3D interaction.
- **Files affected**: styles.css

## 2026-08-27 19:02:00
- **Description**: Continuous Upgrade Loop - Iteration 18. Implemented a "Mouse-Reactive Parallax Depth" effect on all the background .shape elements. They now smoothly float in 3D space opposite to the user's cursor movement, enhancing the spatial depth of the entire portfolio.
- **Files affected**: script.js

## 2026-08-27 19:04:00
- **Description**: Continuous Upgrade Loop - Iteration 19. Added a "Segmented Sci-Fi Scroll Progress HUD" anchored to the right side of the screen. As you scroll down the page, a glowing neon cyan segmented bar fills up, acting as a high-tech visual indicator of page depth.
- **Files affected**: script.js, styles.css

## 2026-08-27 19:06:00
- **Description**: Continuous Upgrade Loop - Iteration 20. Completely replaced the standard OS mouse cursor with a custom "Sci-Fi Laser Pointer" cursor. It features a solid cyan dot that tracks the mouse instantly, followed by a glowing outline ring that trails behind with a smooth physics-based spring effect. The cursor morphs and highlights when hovering over clickable elements like cards and buttons.
- **Files affected**: index.html, script.js, styles.css

## 2026-08-27 19:08:00
- **Description**: Continuous Upgrade Loop - Iteration 21. Added a "Scroll Spy Interactive Navigation" system. The sidebar navigation links now dynamically glow, shift forward, and display a terminal prompt (>) when you scroll to their respective sections in the main viewport, providing clear contextual awareness.
- **Files affected**: script.js, styles.css

## 2026-08-27 19:10:00
- **Description**: Continuous Upgrade Loop - Iteration 22. Implemented a "Liquid Click Ripple" effect. Clicking anywhere on the screen now spawns a beautiful, glowing cyan water ripple that rapidly expands outward and fades away, giving the interface a highly tactile and immersive response.
- **Files affected**: script.js, styles.css

## 2026-08-27 19:12:00
- **Description**: Continuous Upgrade Loop - Iteration 23. Added a Cyberpunk "Text Scramble" decoding effect. When hovering over any Project or Certificate card, the title rapidly scrambles through random alphanumeric characters and symbols before cleanly resolving back into the actual title.
- **Files affected**: script.js

## 2026-08-27 19:14:00
- **Description**: Continuous Upgrade Loop - Iteration 24. Implemented a "Dynamic Image RGB Glitch" effect for the Sidebar Profile Picture. Hovering over the avatar now causes the image to visibly glitch and split into intense red and cyan color channels in a rapid loop, adding a chaotic but highly stylized cyber-aesthetic.
- **Files affected**: styles.css

## 2026-08-27 19:17:00
- **Description**: Continuous Upgrade Loop - Iteration 25. Added a "3D Layered Typography" hover effect to the main profile name (h1). Hovering over the name now pops it off the page by physically translating it up-and-left while casting a deep, multi-layered cyan-to-magenta block shadow beneath it, giving the text a very physical, retro-wave 3D presence.
- **Files affected**: styles.css

## 2026-08-27 19:18:00
- **Description**: Continuous Upgrade Loop - Iteration 26. Added a "Random Global CRT Glitch". Every few seconds, the entire viewport undergoes a micro-fraction of a second glitch with scanlines, simulating a corrupted data feed or an old-school CRT monitor losing sync. It is subtle and fast enough not to be distracting, but adds immense atmosphere.
- **Files affected**: index.html, script.js, styles.css

## 2026-08-27 19:21:00
- **Description**: Continuous Upgrade Loop - Iteration 27. Added "Holographic Skill Tags". When hovering over the skill tags on Project and Certificate cards, they now physically pop up, scale, rotate slightly in 3D, and cast a blurred, glowing neon reflection downwards, making them look like floating holograms.
- **Files affected**: styles.css

## 2026-08-27 19:28:00
- **Description**: Continuous Upgrade Loop - Iterations 28 & 29.
  - **Iteration 28**: Added a "Dynamic Neon Border" to all cards. They now feature a constantly shifting, animated gradient border that circles around the cards.
  - **Iteration 29**: Implemented a "Digital Glitch Transition on Scroll". Instead of simply sliding up, cards and section headers now digitally "glitch" into existence as they enter the viewport, using complex clip-paths and hue rotation.
- **Files affected**: script.js, styles.css

### Iteration 30: Final Deployment & Polish
- Finalized glassmorphism UI reduction for perfect glare balance.
- Updated data.js with comprehensive enterprise descriptions and correct live/github mapping.
- Added .gitignore for safe node_modules handling.
- Deployed final architecture live to Vercel via Github.


### Iteration 2 (New Loop): 3D Floating Cyber-Geometry
- Added interactive wireframe 3D primitives (Icosahedrons, Octahedrons) to the background WebGL scene.
- Implemented dynamic boundaries and mouse-tracking parallax for the 3D objects.


### Iteration 3 (New Loop): Cinematic Title Text Scramble
- Implemented a Hacker-style text scramble decode effect (scrambleText) for all section titles (.section-title).
- Wired the effect into the existing GSAP ScrollTrigger to decode dynamically when the user scrolls sections into view.


### Iteration 4 (New Loop): WebGL Shockwave Distortion on Click
- Added a spatial distortion shader to the WebGL fragment shader.
- Wired a global click listener to pass click coordinates and timestamp to the shader.
- Triggers a physics-based shockwave ripple across the nebula background whenever the user clicks.


### Iteration 5: Lenis Inertia Scrolling Integration
- Integrated Lenis smooth scrolling engine.
- Hooked Lenis requestAnimationFrame into GSAP ticker to ensure butter-smooth ScrollTrigger parity.
- Instantly upgrades the UX to a premium cinematic scrolling feel.


### Iteration 6: Magnetic UI Physics
- Implemented 'Magnetic' physics on sidebar navigation links using GSAP.
- Links now physically stretch and pull towards the user's cursor when hovered, creating an ultra-premium, tactile feel.


### Iteration 7: Kinetic Chromatic Aberration
- Tied Lenis scroll velocity to a CSS variable via JS.
- Added dynamic CSS drop-shadow/text-shadow to all headings (h1, h2, h3).
- Text and cards now dynamically split into red and cyan channels (RGB split / chromatic aberration) when the user scrolls fast, giving a kinetic cyberpunk feel.


### Iteration 8: Custom Interactive Cyber Cursor
- Implemented a custom mouse cursor with a trailing canvas-like GSAP ring.
- Hides default cursor across the site.
- Added magnetic hover interactions: when hovering over links or cards, the trailing ring expands and turns neon pink with a blur backdrop-filter.


### Iteration 9: Procedural Sci-Fi Audio Synthesizer
- Added the Web Audio API to synthesize zero-latency procedural UI sounds without needing external assets.
- Interactive elements (links, cards, buttons) now emit subtle frequency-modulated sci-fi 'beeps' on hover and 'clicks' on mousedown.
- Adds an auditory dimension to the portfolio, making the futuristic theme deeply immersive.


### Iteration 10: 3D Physics Particle Explosion
- Engineered a 3D-feeling particle explosion system on click using GSAP.
- Whenever the user clicks anywhere, 12 neon glowing particles burst out with independent vectors, fake gravity, and scale animations.
- Combined with the WebGL shader shockwave and the new Audio API SFX, clicking now feels insanely tactile and satisfying.


### Iteration 11: Holographic 3D Content Parallax
- Upgraded Vanilla Tilt cards by applying translateZ parallax to all child elements.
- Content (titles, descriptions, tags) now physically 'pops out' of the cards in 3D space when tilted or hovered, completing the WebGL/3D illusion.


### Iteration 12: Global Holographic Text Scrambling
- Expanded the text scrambling utility into a global event delegator.
- Now, hovering over any card title, button, or navigation link instantly triggers a matrix-style text scramble decode effect.
- Adds an incredibly cohesive cyberpunk 'hacker' aesthetic across the entire portfolio.


### Iteration 13: Cinematic Background Typography Marquee
- Added a massive, slowly scrolling hollow typography marquee to the background.
- Wedged perfectly between the WebGL nebula (z-index -2) and the glass panels (z-index 1).
- The marquee gives the site an unmistakable 'premium agency' aesthetic and deepens the sense of 3D layering.


### Iteration 14: Dynamic Cursor Lens Spotlight
- Created a massive radial gradient lens that follows the cursor across the entire viewport.
- The lens sits behind the main content (mix-blend-mode: screen) and softly illuminates the background neon grid and particles.
- The mouse coordinates are updated globally in JS and mapped natively to CSS radial gradients, creating an interactive lighting engine without performance drops.


### Iteration 15: Kinetic Scroll Velocity Skewing
- Bound the scroll velocity exposed by Lenis to GSAP skewY animations on the project and certificate grids.
- Now, when you scroll rapidly, the entire UI dynamically bends and stretches under 'air resistance' before snapping back into place.
- Adds an incredibly fluid, bouncy, tactile momentum to navigation.


### Iteration 16: Interactive CRT Scanline Overlay
- Added a persistent, subtle Retro CRT monitor overlay across the entire site.
- It features a static sub-pixel RGB matrix grid and a slow, infinitely animating glowing horizontal scanline.
- The mix-blend-mode: overlay ensures it only affects the highlights, adding immense texture and grit to the cyberpunk aesthetic without hurting readability.


### Iteration 17: Infinite 3D Cyber-Grid Floor
- Expanded the WebGL environment by injecting a dynamic THREE.GridHelper.
- The grid floor sits at the bottom of the 3D scene and continuously scrolls forward in the render loop, creating the illusion of infinite forward momentum through cyberspace.
- This completes the legendary synthwave/outrun aesthetic, anchoring the floating 3D shapes to a recognizable horizon line.


### Iteration 18: Cinematic 3D Letter Reveal for Section Titles
- Replaced the basic slide-in animation for section headers with an advanced GSAP SplitText simulation.
- As you scroll down the page, section titles ('Projects', 'Certificates') now physically unfold letter-by-letter in 3D space (
otationX), staggering perfectly.
- It drastically elevates the production value and gives a futuristic, highly engineered feel to the layout's typography.


### Iteration 19: Dynamic Scroll-Triggered Global Color Shift
- Tied the global CSS variables (--accent and --secondary) to the Lenis scroll percentage in script.js.
- As you scroll down the page, the entire color palette of the site (glows, text strokes, grids, and Three.js materials) slowly hue-shifts from Cyan/Purple to Magenta/Orange.
- This creates a massive, immersive ambient environment change as you move through the portfolio, making the page feel alive.


### Iteration 21: Cinematic Scroll Whoosh SFX
- Leveraged the Web Audio API to synthesize procedural white noise shaped by an exponential volume envelope and a dynamic low-pass filter.
- The volume and filter cutoff frequency of the 'wind' are directly mapped to the Lenis scroll velocity (e.velocity).
- Scrolling rapidly now produces a cinematic 'whoosh' sound effect, adding intense kinetic audio feedback to the physical scroll motion.


### Iteration 22: Procedural 3D Cyberpunk Terrain
- Deformed the infinite WebGL GridHelper floor into a dynamic 3D mountain range/terrain.
- Using a procedural sine/cosine mathematical displacement on the geometry's Y-axis, the edges of the grid now rise up into undulating wireframe mountains, while leaving a flat 'road' down the center.
- Because the grid's Z-axis is continuously animated in the render loop, this creates the ultimate illusion of driving fast down a neon highway through a digital valley.

## 2026-09-06 00:03:00
- **Description:** Optimized cursor performance, eliminated text scramble jitter, and added premium Apple-inspired GPU card hover animations. Streamlined Lenis scroll loop and removed procedural audio/rotation bottlenecks for O(1) frame time.
- **Files Affected:** script.js, styles.css

## 2026-09-06 00:06:00
- **Description:** Generated comprehensive structured XML representation of the portfolio codebase (project.xml) encompassing core source files, configurations, markup, and styles.
- **Files Affected:** project.xml

## 2026-09-06 00:58:00
- **Description:** Replaced legacy static portfolio codebase with modern React 19 + TypeScript + Tailwind CSS production app from anmol_s_portfolio. Configured environment variables (.env), migrated legacy files to deleted/, served certificate PDFs in public/cer with direct document links, integrated official resume download, and verified live Google Gemini AI assistant backend.
- **Files Affected:** package.json, server.ts, ite.config.ts, 	sconfig.json, index.html, src/types.ts, src/data/portfolioData.ts, src/components/CertificatesSection.tsx, src/components/ResumeModal.tsx, public/cer/, public/Anmol_S__resume.pdf

## 2026-09-06 01:02:00
- **Description:** Switched API backend model to Google DeepMind's Gemma 4 26B (gemma-4-26b-a4b-it) via the Gemini API endpoint. Verified system instructions, conversation context memory, and live inference responses.
- **Files Affected:** server.ts, src/components/AiChatSection.tsx

## 2026-09-06 01:06:00
- **Description:** Removed all 'powered by Google Gemini' and third-party model branding mentions across chatbot initial greetings, fallback responses, and system instructions.
- **Files Affected:** src/components/AiChatSection.tsx, src/components/AiFloatingChat.tsx, server.ts

## 2026-09-06 01:09:00
- **Description:** Replaced generic demo starter questions in the AI chatbot with focused engineering inquiries covering AeroInsight's dual-AI telemetry architecture, production full-stack systems, internship ML algorithms, and medical prescription verification.
- **Files Affected:** src/data/portfolioData.ts

