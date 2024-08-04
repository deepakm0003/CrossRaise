chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "openExtension") {
      chrome.runtime.sendMessage({ action: "openExtension" });
      sendResponse({ status: "Extension opened" });
    }
  });