// background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "openExtension") {
      chrome.tabs.create({ url: "chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html" });
      sendResponse({ status: "Extension page opened" });
    }
  });