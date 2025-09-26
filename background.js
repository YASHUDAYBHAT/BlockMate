// background.js

// Listen for installation event
chrome.runtime.onInstalled.addListener((details) => {
  console.log("YouTube Ad Blocker Ultimate Safe Installed");

  // Optional: set default settings
  chrome.storage.sync.get(
    { blockShorts: true, blockPromoted: true, stealthMode: false, blockAllAds: false },
    (settings) => {
      chrome.storage.sync.set(settings, () => {
        console.log("Default settings initialized:", settings);
      });
    }
  );

  // Show welcome page ONLY on first install
  if (details.reason === "install") {
    chrome.tabs.create({
      url: chrome.runtime.getURL("welcome.html")
    });
  }
});
