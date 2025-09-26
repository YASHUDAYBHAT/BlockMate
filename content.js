document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(
    { blockShorts: true, blockPromoted: true, stealthMode: false, blockAllAds: true },
    (settings) => {

      // =======================
      // YouTube-specific code (unchanged)
      // =======================
      if (location.hostname.includes("youtube.com")) {
        function removeYouTubeAds() {
          try {
            const video = document.querySelector('video');
            const adActive = document.querySelector('.ad-showing, .ytp-ad-player-overlay');
            const skipButton = document.querySelector('.ytp-ad-skip-button.ytp-button');

            if (adActive && video) {
              if (skipButton) skipButton.click();
              if (!video.paused && video.currentTime > 0) {
                document.querySelectorAll(
                  '.ytp-ad-module, .ytp-ad-overlay-container, .ytp-ad-player-overlay'
                ).forEach(el => el.remove());
              }
            }

            if (settings.blockShorts) {
              document.querySelectorAll(
                'ytd-reel-shelf-renderer, ytd-promoted-sparkles-web-renderer'
              ).forEach(el => el.remove());
            }

            if (settings.blockPromoted) {
              document.querySelectorAll(
                'ytd-compact-promoted-video-renderer, ytd-promoted-video-renderer'
              ).forEach(el => el.remove());
            }

            if (settings.stealthMode) {
              document.querySelectorAll('.ad-showing, .ytp-ad-player-overlay').forEach(el => {
                el.classList.remove('ad-showing', 'ytp-ad-player-overlay');
              });
            }
          } catch (err) {
            console.error("YouTube AdShield error:", err);
          }
        }

        const style = document.createElement('style');
        let css = '';
        if (settings.blockShorts) {
          css += 'ytd-reel-shelf-renderer, ytd-promoted-sparkles-web-renderer { display: none !important; }';
        }
        if (settings.blockPromoted) {
          css += 'ytd-compact-promoted-video-renderer, ytd-promoted-video-renderer { display: none !important; }';
        }
        style.textContent = css;
        document.head.appendChild(style);

        setTimeout(removeYouTubeAds, 2000);
        const observer = new MutationObserver(removeYouTubeAds);
        observer.observe(document.body, { childList: true, subtree: true });
        setInterval(removeYouTubeAds, 2000);
      }

      // =======================
      // Generic ad removal for all websites
      // =======================
      if (settings.blockAllAds) {
        function removeAllWebsiteAds() {
          try {
            // Remove iframes and common ad classes
            document.querySelectorAll('iframe, .ad, .ads, [id*="ad"], [class*="ad"]').forEach(el => el.remove());

            // Remove fixed-position popups or banners
            document.querySelectorAll('div, section, aside').forEach(el => {
              const style = getComputedStyle(el);
              if (style.position === 'fixed' && el.offsetHeight > 20 && el.offsetWidth > 50) {
                el.remove();
              }
            });

            // Remove overlay ads or video overlays
            document.querySelectorAll('.overlay-ad, .ad-container, video + .ad').forEach(el => el.remove());
          } catch (err) {
            console.error("Generic Ad Removal error:", err);
          }
        }

        // Run generic ad removal after short delay
        setTimeout(removeAllWebsiteAds, 2000);

        // Observe for dynamically inserted ads
        const observer = new MutationObserver(removeAllWebsiteAds);
        observer.observe(document.body, { childList: true, subtree: true });

        // Backup interval
        setInterval(removeAllWebsiteAds, 3000);
      }

    }
  );
});
