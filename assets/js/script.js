// THEMES CONFIGURATION

const THEMES = {
 
  night: {
    h1Color:            "--first-brown",   // h1 "Study Room"
    headerBtnBg:        "--principal-gray",   // header button background
    headerBtnColor:     "--first-brown",   // header button text
    headerBtnHoverBg:   "#d9d4cc",   // header button hover background
    footerBtnBg:        "--first-mauve",   // footer button background
    footerBtnColor:     "--principal-gray",   // footer button text
    footerBtnHoverBg:   "#8a5c5f",   // footer button hover background
 
    containerBg:        "--first-pink",   // timer / to-do / notes background
    containerTimerText: "--first-brown",   // "00:00" text color
    cardBg:             "#fcf7f0",   // inner card background (h2 + content area)
    cardTextColor:      "--first-brown",   // h2 text color inside cards
 
    partnerImage:       "assets/images/night.png",
  },

    morning: {
    h1Color:            "--second-red",   
    headerBtnBg:        "--principal-gray",   
    headerBtnColor:     "--second-red",   
    headerBtnHoverBg:   "#d9d4cc",   
    footerBtnBg:        "--second-blue",   
    footerBtnColor:     "--principal-gray",   
    footerBtnHoverBg:   "#9fabcbe8",   
 
    containerBg:        "--second-pink",   
    containerTimerText: "--second-red",  
    cardBg:             "#fcf7f0",  
    cardTextColor:      "--second-red",   
 
    partnerImage:       "assets/images/morning.png",
  },

  afternoon: {
    h1Color:            "--third-red",   
    headerBtnBg:        "--principal-gray",   
    headerBtnColor:     "--third-red",   
    headerBtnHoverBg:   "#d9d4cc",   
    footerBtnBg:        "--third-yellow",   
    footerBtnColor:     "#76463c",   
    footerBtnHoverBg:   "#e1aa4cf1",   
 
    containerBg:        "--third-pink",   
    containerTimerText: "--third-red", 
    cardBg:             "#fcf7f0",   
    cardTextColor:      "--third-red",   
 
    partnerImage:       "assets/images/afternoon.png",
  },

};

function getPeriod() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12)  return "morning";
  if (hour >= 12 && hour < 19) return "afternoon";
  return "night";
}

function cssValue(val) {
  return val.startsWith("--") ? `var(${val})` : val;
}

function applyTheme(theme) {
  const root  = document.documentElement;
  const style = document.createElement("style");
 
  
  style.textContent = `
    header button:hover { background-color: ${cssValue(theme.headerBtnHoverBg)} !important; }
    footer button:hover { background-color: ${cssValue(theme.footerBtnHoverBg)} !important; }
  `;
  document.head.appendChild(style);

  // h1
  const h1 = document.querySelector("h1");
  if (h1) h1.style.color = cssValue(theme.h1Color);

  // header buttons
  document.querySelectorAll("header button").forEach(btn => {
    btn.style.backgroundColor = cssValue(theme.headerBtnBg);
    btn.style.color            = cssValue(theme.headerBtnColor);
  });

  // footer button
  const footerBtn = document.querySelector("footer button");
  if (footerBtn) {
    footerBtn.style.backgroundColor = cssValue(theme.footerBtnBg);
    footerBtn.style.color            = cssValue(theme.footerBtnColor);
  }

  // containers background
  document.querySelectorAll(".container_hours, .container_list, .container_notes").forEach(el => {
    el.style.backgroundColor = cssValue(theme.containerBg);
  });

  // timer text
  root.style.setProperty("--timer-color", cssValue(theme.containerTimerText));

  // card backgrounds + h2 text color
  document.querySelectorAll(".container_list h2, .container_notes h2").forEach(h2 => {
    h2.style.backgroundColor = cssValue(theme.cardBg);
    h2.style.color            = cssValue(theme.cardTextColor);
  });

  // study partner image
  const img = document.querySelector(".image img");
  if (img) img.src = theme.partnerImage;
}

// TIMER CONFIGURATION

const POMODORO = {
  focus:  25 * 60,
  break:   5 * 60,
};

const timer = {
  intervalId:  null,
  secondsLeft: POMODORO.focus,
  isFocus:     true,
  isRunning:   false,
};


function formatTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function renderDisplay() {
  const display = document.getElementById("timer-display");
  if (display) display.textContent = formatTime(timer.secondsLeft);
}

function switchPhase() {
  timer.isFocus     = !timer.isFocus;
  timer.secondsLeft = timer.isFocus ? POMODORO.focus : POMODORO.break;
  renderDisplay();
}

function tick() {
  if (timer.secondsLeft === 0) {
    switchPhase();
    return;
  }
  timer.secondsLeft--;
  renderDisplay();
}

function start() {
  if (timer.isRunning) return;
  timer.isRunning = true;
  timer.intervalId = setInterval(tick, 1000);
}

function pause() {
  clearInterval(timer.intervalId);
  timer.isRunning = false;
}

function reset() {
  pause();
  timer.isFocus     = true;
  timer.secondsLeft = POMODORO.focus;
  renderDisplay();
}

function injectTimerDisplay() {
  const container = document.querySelector(".container_hours");
  if (!container) return;
  const span = document.createElement("span");
  span.id = "timer-display";
  span.textContent = formatTime(timer.secondsLeft);
  container.appendChild(span);
}

function bindButtons() {
  const [btnStart, btnPause, btnReset] = document.querySelectorAll("header button");
  btnStart?.addEventListener("click", start);
  btnPause?.addEventListener("click", pause);
  btnReset?.addEventListener("click", reset);
}


document.addEventListener("DOMContentLoaded", () => {
  const period = getPeriod();
  applyTheme(THEMES[period]);
  console.log(`[Study Room] Period detected: ${period}`);

  injectTimerDisplay();
  bindButtons();
});