# Hormuz Run

## One-Liner

Navigate a tanker through the Strait of Hormuz during the 2026 blockade. Pick your flag. Dodge mines. Decide whether to pay the toll. Try not to get sunk.

---

## Concept

Hormuz Run is a short, replayable browser game inspired by the ongoing Strait of Hormuz crisis. The player is a tanker captain attempting to transit the strait — the world's most dangerous chokepoint — and deliver their cargo to the other side.

The hook: your experience changes dramatically based on which country's flag you're flying. A Chinese-flagged vessel gets waved through but earns less. A US-allied flag is hard mode. An Iranian flag sails free but no port will take your oil. Every run is 3–5 minutes. The goal is to deliver the most cargo value in a single transit.

Tone is deadpan satirical — think *Papers, Please* meets a shipping logistics nightmare. Dark humor, understated, never preachy.

---

## Core Loop

1. **Pick your flag** — Choose from ~8 countries. Each has different risk/reward profiles, unique encounters, and a tongue-in-cheek description.
2. **Enter the strait** — Top-down 2D view of a stylized Strait of Hormuz. You pilot your tanker through a narrow channel.
3. **Survive the transit** — Dodge sea mines, avoid drone strikes, navigate around debris and grounded ships. Obstacle density depends on your flag.
4. **Handle encounters** — IRGC patrol boats hail you. You make choices: pay the toll, refuse, bluff, radio for escort, or try to slip past. Each choice has consequences.
5. **Deliver (or don't)** — If you make it through, your cargo is valued based on flag, damage taken, tolls paid, and current "oil price." If you sink, you get a death screen with a satirical headline.

---

## Flag Profiles

Each flag is a de facto difficulty setting with narrative flavor.

| Flag | Difficulty | Notes |
|------|-----------|-------|
| 🇨🇳 China | Easy | Pre-approved passage. Low toll. But cargo value is reduced — China's already swimming in oil. |
| 🇮🇳 India | Medium | Negotiated corridor exists but patrols are unpredictable. Navy escort *might* show up. |
| 🇹🇷 Turkey | Medium | Broadcasts "MUSLIM-OWNED VESSEL" on repeat. Works sometimes. |
| 🇵🇰 Pakistan | Medium-Easy | Ceasefire broker privileges. Smooth sailing unless the ceasefire collapses mid-transit. |
| 🇬🇧 UK | Hard | Allied flag. Mines, drones, the full experience. Cargo is worth a lot if you survive. |
| 🇺🇸 USA | Very Hard | Everything is trying to kill you. Maximum cargo value. Glory run. |
| 🇱🇷 Liberia | Hard | Flag of convenience. IRGC doesn't trust you. Could be anyone under that flag. |
| 🇮🇷 Iran | ???  | You sail through freely. No one shoots. But when you arrive... no port accepts your cargo. Score: $0. Easter egg mode. |

---

## Encounter System

Mid-transit, the player gets hailed by IRGC patrol boats. A radio dialogue box appears. Player picks from options like:

- **Pay the toll** — Costs $1/barrel. Safe passage. Eats into your score.
- **Refuse** — Risk getting fired on. Outcome depends on flag + RNG.
- **Bluff** — Claim a different flag or cargo. Might work. Might make things worse.
- **Radio for escort** — If playing an allied flag, a navy ship *might* respond. Delay + uncertainty.
- **Go dark** — Cut transponder and try to slip through. High risk, high reward.

Encounters scale in intensity. First hail might be routine. Second might be a warning shot. Third is live fire.

---

## Map & Visuals

- **Top-down 2D**, stylized but geographically recognizable. Iran on one side, Oman/UAE on the other. The channel narrows.
- Minimal art style — dark water, simple ship silhouettes, glowing mines, radar-style UI elements.
- The HUD shows: cargo value (ticking), damage meter, oil price (global), distance remaining.
- Grounded/burning ships visible as scenery (the Mayuree Naree on Qeshm Island, etc.).
- The vibe is somewhere between a naval radar screen and a Soviet-era strategy game.

---

## Scoring & End Screen

**Score = Cargo Value − Tolls Paid − Damage Costs**

Bonus multipliers:
- Flag difficulty multiplier (USA = 3x, China = 0.5x, etc.)
- Speed bonus for fast transits
- "Clean run" bonus for zero damage

**End screen options:**

- **Success:** A satirical news headline about your delivery. ("LIBERIAN-FLAGGED TANKER ARRIVES IN MUMBAI; OIL PRICES DROP 0.002%"). Your score. Share button.
- **Sunk:** A different satirical headline. ("UNNAMED VESSEL LOST IN STRAIT; INSURANCE PREMIUMS RISE AGAIN"). Share button.
- **Iran mode:** You arrive safely. No one lets you dock. Headline: "IRANIAN TANKER COMPLETES FLAWLESS TRANSIT; LITERALLY NO ONE CARES." Score: $0.

The end screen is designed to be screenshot-friendly and postable.

---

## Technical Notes

- **Platform:** Browser-based (desktop + mobile). Single HTML page or lightweight React app.
- **Hosting:** TBD — Vercel, Cloudflare Pages, or similar. Needs a clean vanity URL.
- **Backend:** Minimal. Leaderboard could be a simple KV store or Supabase table. Optional for v1.
- **Engine:** No heavy engine needed. Canvas 2D or even SVG-based rendering. Could also work in Phaser.js if we want more game-engine features.
- **Scope:** v1 is single-player, no persistent backend required. Leaderboard and global oil price mechanic are v2.

---

## Virality Mechanics

- **Shareable end screen** — The satirical headline + score + flag combo is built for screenshots.
- **Flag selection is inherently social** — "I survived on a US flag" becomes a flex. Comparing runs across flags drives conversation.
- **Topical** — The game is about something happening *right now*. The window for maximum relevance is the next few weeks.
- **Short session time** — 3–5 minutes means low barrier. People play once, screenshot, share, then friends play.
- **Easter eggs reward exploration** — Iran mode, specific dialogue options, hidden outcomes. People will post discoveries.

---

## Open Questions

- Do we want a global "oil price" that shifts based on aggregate player outcomes? Great for engagement but adds backend complexity.
- Sound design — even minimal audio (radio static, engine hum, warning sirens) would add a lot. Worth the effort?
- Mobile-first or desktop-first? The share mechanic suggests mobile matters, but top-down ship navigation might play better on desktop.
- Localization — is it worth translating the flag descriptions / headlines for non-English audiences?
- Domain name — hormuzrun.com? straitrun.com? Something else?

---

## Timeline Consideration

The Strait of Hormuz is front-page news *today*. The blockade is going live in hours. Every day we wait, the window shrinks. Speed matters more than polish for v1.
