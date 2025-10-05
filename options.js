// DOM elements
const blockShorts = document.getElementById('blockShorts');
const blockPromoted = document.getElementById('blockPromoted');
const stealthMode = document.getElementById('stealthMode');
const blockAllAds = document.getElementById('blockAllAds'); // new toggle

// Load saved settings
chrome.storage.sync.get(
  {
    blockShorts: true,
    blockPromoted: true,
    stealthMode: false,
    blockAllAds: true // default value for the new feature
  },
  (items) => {
    blockShorts.checked = items.blockShorts;
    blockPromoted.checked = items.blockPromoted;
    stealthMode.checked = items.stealthMode;
    blockAllAds.checked = items.blockAllAds; // initialize new toggle
  }
);

// Save settings when changed
blockShorts.addEventListener('change', () => {
  chrome.storage.sync.set({ blockShorts: blockShorts.checked });
});

blockPromoted.addEventListener('change', () => {
  chrome.storage.sync.set({ blockPromoted: blockPromoted.checked });
});

stealthMode.addEventListener('change', () => {
  chrome.storage.sync.set({ stealthMode: stealthMode.checked });
});

blockAllAds.addEventListener('change', () => {
  chrome.storage.sync.set({ blockAllAds: blockAllAds.checked }); // save new toggle
});
