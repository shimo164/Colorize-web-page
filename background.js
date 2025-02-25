// background.js (Service Worker)

// Hard-coded conditions array
// requiredStrings: Array of required substrings (ALL must be present)
// excludedStrings: Array of substrings to exclude (ANY match fails condition)
// color:           Body background color if condition is met
const conditions = [
  {
    requiredStrings: ["microsoft", "azure"],
    excludedStrings: ["learn", "example"],
    color: "#f09696"
  },
  {
    requiredStrings: ["microsoft", "windows"],
    excludedStrings: [],  // no excludes
    color: "#f03434"
  }
];

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Proceed only if the URL has changed or the tab has finished loading
  if (changeInfo.status === "complete" || changeInfo.url) {
    // If there's no valid URL or it's not HTTPS, do nothing (clear the badge, reset body, etc.)
    if (!tab.url || !tab.url.startsWith("https://")) {
      chrome.action.setBadgeText({ tabId, text: "" });
      chrome.tabs.sendMessage(tabId, { type: "RESET_BODY_BACKGROUND" }).catch(() => {});
      return;
    }

    const currentUrl = tab.url.toLowerCase();
    let matched = false;
    let matchedColor = null;

    // Loop through each condition
    for (const condition of conditions) {
      // 1. Check if ALL required strings are in the URL
      const allRequiredMatch = condition.requiredStrings.every(reqStr =>
        currentUrl.includes(reqStr.toLowerCase())
      );
      if (!allRequiredMatch) {
        continue; // not all required matched, skip
      }

      // 2. Check if ANY excluded string is in the URL
      //    If yes, skip this condition
      const anyExcludedMatch = (condition.excludedStrings || []).some(exStr => {
        if (!exStr) return false;
        return currentUrl.includes(exStr.toLowerCase());
      });
      if (anyExcludedMatch) {
        continue; // found an excluded string, skip
      }

      // We have a match: set the badge color, text, and store matchedColor
      chrome.action.setBadgeText({ tabId, text: " " });
      chrome.action.setBadgeBackgroundColor({ tabId, color: condition.color });

      matched = true;
      matchedColor = condition.color;
      break;
    }

    // If matched, send a message to the content script to update the body background
    if (matched && matchedColor) {
      chrome.tabs.sendMessage(tabId, {
        type: "UPDATE_BODY_BACKGROUND",
        color: matchedColor
      }).catch(() => {});
    } else {
      // If no conditions matched, clear the badge and reset the body background
      chrome.action.setBadgeText({ tabId, text: "" });
      chrome.tabs.sendMessage(tabId, { type: "RESET_BODY_BACKGROUND" }).catch(() => {});
    }
  }
});
