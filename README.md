Rock • Paper • Scissors (Funky Edition)
======================================

A sleek, animated Rock–Paper–Scissors game with a beginner-friendly codebase and a stylish UI. Play against a very simple AI that picks moves at random. Built with plain HTML, CSS, and JavaScript — no frameworks.

✨ Features
- Neon glass UI with animated gradient background
- Realistic pre-throw hand “shake” animation, then reveal
- Click ripples, pulsing VS, popping results
- Score bump on win and a confetti burst 🎉
- Emoji badges instead of labels for a fun vibe

🎮 How to Play
1. Open `index.html` in your browser.
2. Click Rock, Paper, or Scissors.
3. Watch the shake → reveal → result sequence.
4. First to… well, as many as you want — use Reset anytime.

🛠️ Tech
- HTML for structure (`index.html`)
- CSS for the animated, glassy UI (`style.css`)
- JavaScript for game logic and effects (`script.js`)

🧩 Customization
- Change colors/animation speeds in `style.css`:
  - Background motion: `@keyframes bgShift`
  - Hand shake: `@keyframes rpsShake`
  - Result pop: `@keyframes pop`
- Edit confetti colors in `script.js` (function `fireConfetti`) — update the `colors` array.
- Replace emojis on buttons or placeholders in `script.js` / `index.html`.

📁 Project Structure
```
RPS/
├─ index.html   # Markup for the app
├─ style.css    # Styling, animations, and visual effects
└─ script.js    # Game logic, scoring, and UI triggers
```

🧠 How it Works (Quick)
- You click a move → AI randomly picks one → both hands shake (fists) → choices reveal → winner is decided and score updates → result text animates. Reset returns to the start state.

🙌 Credits
Designed and implemented with a focus on clarity and beginner-friendly code. Enjoy and remix!



