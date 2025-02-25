# Colorize web page
Chrome extension that automatically changes the element color based on specific URL matching rules.

## Installation
1. Clone or download this repository.
2. Open Google Chrome and navigate to `chrome://extensions`.
3. **Enable Developer Mode** in the top right corner.
4. Click **Load unpacked** and select the project folder.

## Usage
1. Set **Hard-coded URL conditions** stored in `background.js`
  - Each condition has:
    - **requiredStrings**: All must appear in the URL
    - **excludedStrings**: If any appear in the URL, the condition is skipped
    - **color**: Applied to the page’s background
2. Visit a **HTTPS** page (e.g., `https://www.microsoft.com/`).
3. If it matches any condition (based on `requiredStrings` and `excludedStrings`), the badge color and the webpage background color will change.
4. If not matched, the background is reset to its default color.

## Test
For a simple test, perform a Google search using the `requiredStrings` and `excludedStrings`. The resulting pages will have URLs that match the condition words.
(TODO Exclude these query.)
