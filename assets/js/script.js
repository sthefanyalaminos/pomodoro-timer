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
  if (hour >= 5 && hour < 13)  return "morning";
  if (hour >= 13 && hour < 19) return "afternoon";
  return "night";
}

function applyTheme(theme) {
  const root  = document.documentElement;
  const style = document.createElement("style");
 
  
  style.textContent = `
    header button:hover { background-color: ${theme.headerBtnHoverBg} !important; }
    footer button:hover { background-color: ${theme.footerBtnHoverBg} !important; }
  `;
  document.head.appendChild(style);
 
  // h1
  const h1 = document.querySelector("h1");
  if (h1) h1.style.color = theme.h1Color;
 
  // header buttons 
  document.querySelectorAll("header button").forEach(btn => {
    btn.style.backgroundColor = theme.headerBtnBg;
    btn.style.color            = theme.headerBtnColor;
  });

}