// contentScript.js

// Default background color (empty string means revert to whatever the page had)
const defaultBackgroundColor = "";

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "UPDATE_BODY_BACKGROUND") {
    const color = message.color;
    document.body.style.backgroundColor = color;
  } else if (message.type === "RESET_BODY_BACKGROUND") {
    document.body.style.backgroundColor = defaultBackgroundColor;
  }
});
