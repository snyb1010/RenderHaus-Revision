document.addEventListener('DOMContentLoaded', () => {
  const videos = [
    { category: 'ads', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ', type: 'youtube' },
    { category: 'ads', src: 'https://www.youtube.com/embed/tVj0ZTS4WF4', type: 'youtube' },
    { category: 'coaching', src: 'https://www.youtube.com/embed/3JWTaaS7LdU', type: 'youtube' },
    { category: 'podcast', src: 'https://www.youtube.com/embed/LsoLEjrDogU', type: 'youtube' },
    { category: 'Real Estate', src: 'https://www.youtube.com/embed/kXYiU_JCYtU', type: 'youtube' },
    { category: 'shorts', src: 'https://www.youtube.com/embed/ysz5S6PUM-U', type: 'youtube' },
  ];

  const filterButtonsContainer = document.getElementById('filter-buttons');
  const videoGrid = document.getElementById('video-grid');

  // Group videos by category
  const categories = {};
  videos.forEach(v => {
    if (!categories[v.category]) categories[v.category] = [];
    categories[v.category].push(v.src);
  });

  // Helper to build YouTube embed URL with parameters
  function buildYouTubeEmbedURL(baseUrl, params) {
    const url = new URL(baseUrl);
    Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
    return url.toString();
  }

  // Create filter buttons dynamically
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
      const videoWrapper = document.createElement('div');
      videoWrapper.className = 'video-container relative rounded-lg overflow-hidden aspect-w-16 aspect-h-9';

      const iframe = document.createElement('iframe');
      iframe.src = buildYouTubeEmbedURL(src, {
        rel: 0,
        showinfo: 0,
        autoplay: 0,
        mute: 1,
      });
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      iframe.className = 'w-full h-full rounded-lg';

      videoWrapper.appendChild(iframe);
      videoGrid.appendChild(videoWrapper);
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
});
