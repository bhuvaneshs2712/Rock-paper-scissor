

(function () {
  const userScoreEl = document.getElementById('userScore');
  const aiScoreEl = document.getElementById('aiScore');
  const resultEl = document.getElementById('result');
  const userHandEl = document.getElementById('userHand');
  const aiHandEl = document.getElementById('aiHand');
  const arenaEl = document.querySelector('.arena');
  const resetBtn = document.getElementById('resetBtn');
  const choiceButtons = Array.from(document.querySelectorAll('.choice'));

  const emojiByChoice = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️',
  };

  let userScore = 0;
  let aiScore = 0;

  // Put emojis on the buttons
  function setupChoiceButtonEmojis() {
    choiceButtons.forEach((btn) => {
      const c = btn.getAttribute('data-choice');
      const span = btn.querySelector('span');
      if (span) span.textContent = emojiByChoice[c] || '';
    });
  }

  function getAiChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const index = Math.floor(Math.random() * choices.length);
    return choices[index];
  }

  function decideWinner(user, ai) {
    if (user === ai) return 'draw';
    if (
      (user === 'rock' && ai === 'scissors') ||
      (user === 'paper' && ai === 'rock') ||
      (user === 'scissors' && ai === 'paper')
    ) {
      return 'user';
    }
    return 'ai';
  }

  function setHands(user, ai) {
    userHandEl.innerHTML = `<span>${emojiByChoice[user] || '❓'}</span>`;
    aiHandEl.innerHTML = `<span>${emojiByChoice[ai] || '❓'}</span>`;
  }

  function updateScores() {
    userScoreEl.textContent = String(userScore);
    aiScoreEl.textContent = String(aiScore);
  }

  function showResult(state) {
    resultEl.classList.remove('win', 'lose', 'draw');
    if (state === 'draw') {
      resultEl.textContent = 'Draw!';
      resultEl.classList.add('draw');
    } else if (state === 'user') {
      resultEl.textContent = 'You win!';
      resultEl.classList.add('win');
    } else {
      resultEl.textContent = 'BOT wins!';
      resultEl.classList.add('lose');
    }
  }

  function playRound(userChoice) {
    // visual: highlight selected button
    choiceButtons.forEach((b) => b.classList.toggle('selected', b.getAttribute('data-choice') === userChoice));

    // Pre-throw: show fists and shake
    userHandEl.innerHTML = '<span>✊</span>';
    aiHandEl.innerHTML = '<span>✊</span>';
    arenaEl.classList.add('countdown');

    // After shake, reveal and play existing animation
    setTimeout(() => {
      arenaEl.classList.remove('countdown');
      arenaEl.classList.add('playing');

      const aiChoice = getAiChoice();
      setHands(userChoice, aiChoice);
      const winner = decideWinner(userChoice, aiChoice);

      setTimeout(() => {
        if (winner === 'user') userScore += 1;
        else if (winner === 'ai') aiScore += 1;
        updateScores();
        // score bump
        if (winner === 'user') bumpScore(userScoreEl); else if (winner === 'ai') bumpScore(aiScoreEl);
        showResult(winner);
        if (winner === 'user') fireConfetti();
        // remove playing state after animations complete
        setTimeout(() => {
          arenaEl.classList.remove('playing');
        }, 650);
      }, 150);
    }, 900); // 300ms x 3 shakes
  }

  function resetGame() {
    userScore = 0;
    aiScore = 0;
    updateScores();
    userHandEl.innerHTML = '<span class="placeholder">🙂</span>';
    aiHandEl.innerHTML = '<span class="placeholder">🤖</span>';
    resultEl.textContent = 'Make your move!';
    resultEl.classList.remove('win', 'lose', 'draw');
    choiceButtons.forEach((b) => b.classList.remove('selected'));
  }

  // Wire up buttons
  choiceButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      // ripple position
      const rect = btn.getBoundingClientRect();
      const rx = (e.clientX - rect.left) + 'px';
      const ry = (e.clientY - rect.top) + 'px';
      btn.style.setProperty('--rx', rx);
      btn.style.setProperty('--ry', ry);
      btn.classList.remove('rippling');
      // force reflow to restart animation
      void btn.offsetWidth;
      btn.classList.add('rippling');
      const userChoice = btn.getAttribute('data-choice');
      playRound(userChoice);
    });
  });

  resetBtn.addEventListener('click', resetGame);

  // Initial state
  setupChoiceButtonEmojis();
  resetGame();

  function bumpScore(el) {
    el.parentElement.classList.remove('bump');
    void el.parentElement.offsetWidth;
    el.parentElement.classList.add('bump');
  }

  function fireConfetti() {
    const colors = ['#34d399', '#60a5fa', '#f472b6', '#fbbf24', '#c084fc'];
    const count = 18;
    for (let i = 0; i < count; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti';
      const x = (Math.random() * window.innerWidth) + 'px';
      const delay = (Math.random() * 200) + 'ms';
      const duration = (800 + Math.random() * 900) + 'ms';
      piece.style.left = x;
      piece.style.background = colors[i % colors.length];
      piece.style.animation = `confettiFall ${duration} ease-out forwards`;
      piece.style.animationDelay = delay;
      piece.style.transform = `translate(${x}, -20px)`;
      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), 2000);
    }
  }
})();


