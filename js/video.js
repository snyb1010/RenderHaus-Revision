document.addEventListener('DOMContentLoaded', () => {
  const videos = [
    { category: 'ads', src: 'Ads.mp4' },
    { category: 'ads', src: 'Ads2.mp4' },
    { category: 'ads', src: 'Ads3.mp4' },
    { category: 'coaching', src: 'Coaching.mp4' },
    { category: 'coaching', src: 'Coaching2.mp4' },
    { category: 'coaching', src: 'Coaching3.mp4' },
    { category: 'podcast', src: 'Podcast1.mp4' },
    { category: 'podcast', src: 'Podcast2.mp4' },
    { category: 'podcast', src: 'Podcast3.mp4' },
    { category: 'Real Estate', src: 'RealEstate1.mp4' },
    { category: 'Real Estate', src: 'RealEstate2.mp4' },
    { category: 'Real Estate', src: 'RealEstate3.mp4' },
    { category: 'shorts', src: 'Shorts1.mp4' },
    { category: 'shorts', src: 'Shorts2.mp4' },
    { category: 'shorts', src: 'Shorts3.mp4' }
  ];

  const portraitVideos = ['Shorts1.mp4', 'Shorts2.mp4', 'Shorts3.mp4', 'RealEstate1.mp4'];

  const filterButtonsContainer = document.getElementById('filter-buttons');
  const videoGrid = document.getElementById('video-grid');

  const categories = {};
  videos.forEach(v => {
    if (!categories[v.category]) categories[v.category] = [];
    categories[v.category].push(v.src);
  });

  Object.entries(categories).forEach(([category, vids], i) => {
    const btn = document.createElement('button');
    btn.className = 'tag-btn bg-white/10 text-white rounded-full px-4 py-2 font-semibold transition flex items-center gap-2';
    if (i === 0) btn.classList.add('bg-white/20', 'active');
    btn.setAttribute('data-filter', category);
    btn.innerHTML = `
      <span>${category.charAt(0).toUpperCase() + category.slice(1)}</span>
      <span class="count bg-white/20 px-2 rounded text-sm">${vids.length}</span>
    `;
    filterButtonsContainer.appendChild(btn);
  });

  let currentCategory = Object.keys(categories)[0];

  function loadVideos(category) {
    const srcList = categories[category];
    videoGrid.innerHTML = '';

    srcList.forEach(src => {
      const filename = src.split('/').pop();
      const isPortrait = portraitVideos.includes(filename);

      const videoWrapper = document.createElement('div');
      videoWrapper.className = 'video-container relative overflow-hidden ' + (isPortrait ? 'portrait-video' : 'landscape-video');

      const videoEl = document.createElement('video');
      videoEl.src = src;
      videoEl.autoplay = true;
      videoEl.controls = true;
      videoEl.muted = true;
      videoEl.loop = true;
      videoEl.playsInline = true;
      videoEl.className = 'video-el';

      const controlsOverlay = document.createElement('div');
      controlsOverlay.className = 'controls-overlay absolute top-2 right-2 flex space-x-2 bg-black bg-opacity-60 rounded-md p-1 z-10';

      const muteBtn = document.createElement('button');
      muteBtn.title = 'Mute / Unmute';
      muteBtn.className = 'mute-btn text-white';

      function updateMuteIcon() {
        muteBtn.innerHTML = videoEl.muted
          ? `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
               <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
             </svg>`
          : `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
               <path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
             </svg>`;
      }
      updateMuteIcon();

      muteBtn.addEventListener('click', () => {
        videoEl.muted = !videoEl.muted;
        updateMuteIcon();
      });

      controlsOverlay.appendChild(muteBtn);
      videoWrapper.appendChild(videoEl);
      videoWrapper.appendChild(controlsOverlay);
      videoGrid.appendChild(videoWrapper);

      videoEl._muteBtn = muteBtn;
    });
  }

  loadVideos(currentCategory);

  filterButtonsContainer.addEventListener('click', e => {
    const btn = e.target.closest('button.tag-btn');
    if (!btn) return;

    const filter = btn.getAttribute('data-filter');
    if (filter === currentCategory) return;

    filterButtonsContainer.querySelectorAll('button').forEach(b => {
      b.classList.remove('bg-white/20', 'active');
      b.classList.add('bg-white/10');
    });
    btn.classList.add('bg-white/20', 'active');
    btn.classList.remove('bg-white/10');

    currentCategory = filter;
    loadVideos(currentCategory);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target;
      if (!entry.isIntersecting) {
        if (!video.paused) video.pause();
      } else {
        if (video.paused) video.play();
      }
    });
  }, { threshold: 0.3 });

  const observeAllVisibleVideos = () => {
    const allVideos = videoGrid.querySelectorAll('video');
    allVideos.forEach(video => observer.observe(video));
  };

  const originalLoadVideos = loadVideos;
  loadVideos = function (category) {
    originalLoadVideos(category);
    setTimeout(observeAllVisibleVideos, 100);
  };
  loadVideos(currentCategory);

  // Fullscreen behavior: pause others, resume after exit
  let previouslyFullscreenVideo = null;

  document.addEventListener('fullscreenchange', () => {
    const fullscreenElement = document.fullscreenElement;
    const allVideos = document.querySelectorAll('video');

    if (fullscreenElement) {
      previouslyFullscreenVideo = fullscreenElement;
      allVideos.forEach(video => {
        if (video !== fullscreenElement && !video.paused) {
          video.pause();
        }
      });
    } else {
      allVideos.forEach(video => {
        if (video !== previouslyFullscreenVideo && video.paused) {
          video.play();
        }
      });
      previouslyFullscreenVideo = null;
    }
  });

  // Optional jumpToTime helper
  window.jumpToTime = function (videoElement, seconds) {
    if (videoElement && !isNaN(seconds)) {
      videoElement.currentTime = seconds;
      videoElement.play();
    }
  };
});
