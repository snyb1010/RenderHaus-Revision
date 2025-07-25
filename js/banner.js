document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.getElementById("marquee-wrapper");
  const container = document.getElementById("marquee-container");

  const singleSet = `
  <!-- First Half -->
  <div class="flex items-center gap-6 w-1/2 flex-shrink-0">
    <span class="text-white lg:text-2xl lg:mr-[60px] sm:text-base sm:mr-6 inline whitespace-nowrap">Videos for what? </span>
    <img src="https://img.freepik.com/free-vector/detailed-podcast-logo-template_23-2148786067.jpg?semt=ais_hybrid&w=740" class="lg:w-10 lg:h-10 rounded-full sm:w-8 sm:h-8" />
    <span class="text-white lg:text-xl lg:mr-[70px] sm:text-base sm:mr-6">Podcast</span>

    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/YouTube_social_white_square_%282024%29.svg/1200px-YouTube_social_white_square_%282024%29.svg.png" class="lg:w-10 lg:h-10 rounded-full sm:w-8 sm:h-8" />
    <span class="text-white lg:text-xl lg:mr-[70px] sm:text-base sm:mr-6">YouTube</span>

    <img src="https://static.vecteezy.com/system/resources/previews/006/057/996/non_2x/tiktok-logo-on-transparent-background-free-vector.jpg" class="lg:w-10 lg:h-10 rounded-full sm:w-8 sm:h-8" />
    <span class="text-white lg:text-xl lg:mr-[70px] sm:text-base sm:mr-6">TikTok</span>

    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPjALG0pJf7jeOfliSMOEMYXEuW-IeFWuLCbEupy6SIxAAIHTfL7T6-XrHSDDEFSKpV7M&usqp=CAU" class="lg:w-10 lg:h-10 rounded-full sm:w-8 sm:h-8" />
    <span class="text-white lg:text-xl lg:mr-[70px] sm:text-base sm:mr-6">Agency</span>

    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt87zIaGO5Ro9h5LpFpg9vL7ZJeQVts2Laug&s" class="lg:w-10 lg:h-10 rounded-full sm:w-8 sm:h-8" />
    <!-- Desktop version -->
    <span class="text-white lg:text-xl lg:mr-[70px] sm:hidden lg:inline whitespace-nowrap sm:mr-6 ">Media Company</span>

    <!-- Mobile version -->
    <span class="text-white text-base lg:mr-6 md:mr-6 lg:hidden sm:inline whitespace-nowrap">Media Company</span>

    <img src="https://static.vecteezy.com/system/resources/previews/014/393/969/non_2x/startup-success-arrow-cursor-up-right-direction-overlap-overlapping-colorful-logo-design-vector.jpg" class="lg:w-10 lg:h-10 rounded-full sm:w-[33px] contain sm:h-8" />
    <span class="text-white lg:text-xl lg:mr-[200px] md:mr-[200px] sm:text-base sm:mr-6">Startup</span>

    <span class="text-white lg:text-2xl lg:mr-[60px] sm:text-base sm:mr-6 inline whitespace-nowrap sm:hidden lg:inline md:inline">Videos for what? </span>
    <img src="https://img.freepik.com/free-vector/detailed-podcast-logo-template_23-2148786067.jpg?semt=ais_hybrid&w=740" class="sm:hidden lg:inline md:inline lg:w-10 lg:h-10 rounded-full sm:w-8 sm:h-8" />
    <span class="text-white lg:text-xl lg:mr-[70px] sm:text-base sm:mr-6 sm:hidden lg:inline md:inline">Podcast</span>

    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/YouTube_social_white_square_%282024%29.svg/1200px-YouTube_social_white_square_%282024%29.svg.png" class="sm:hidden lg:inline md:inline lg:w-10 lg:h-10 rounded-full sm:w-8 sm:h-8" />
    <span class="text-white lg:text-xl lg:mr-[70px] sm:text-base sm:mr-6 sm:hidden lg:inline md:inline">YouTube</span>

    <img src="https://static.vecteezy.com/system/resources/previews/006/057/996/non_2x/tiktok-logo-on-transparent-background-free-vector.jpg" class="sm:hidden lg:inline md:inline lg:w-10 lg:h-10 rounded-full sm:w-8 sm:h-8" />
    <span class="text-white lg:text-xl lg:mr-[70px] sm:text-base sm:mr-6 sm:hidden lg:inline md:inline">TikTok</span>

    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPjALG0pJf7jeOfliSMOEMYXEuW-IeFWuLCbEupy6SIxAAIHTfL7T6-XrHSDDEFSKpV7M&usqp=CAU" class="sm:hidden lg:inline md:inline lg:w-10 lg:h-10 rounded-full sm:w-8 sm:h-8" />
    <span class="text-white lg:text-xl lg:mr-[70px] sm:text-base sm:mr-6 sm:hidden lg:inline md:inline">Agency</span>

    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt87zIaGO5Ro9h5LpFpg9vL7ZJeQVts2Laug&s" class="sm:hidden lg:inline md:inline lg:w-10 lg:h-10 rounded-full sm:w-8 sm:h-8" />
    <span class="text-white lg:text-xl lg:mr-[70px] sm:hidden lg:inline md:inline whitespace-nowrap sm:mr-6">Media Company</span>

    <img src="https://static.vecteezy.com/system/resources/previews/014/393/969/non_2x/startup-success-arrow-cursor-up-right-direction-overlap-overlapping-colorful-logo-design-vector.jpg" class="lg:w-10 lg:h-10 rounded-full sm:w-[33px] contain sm:h-8 sm:hidden lg:block" />
    <span class="text-white lg:text-xl lg:mr-[200px] md:mr-[200px] sm:text-base sm:mr-6 sm:hidden lg:block">Startup</span>
  `;

  const repeatCount = 20;
  wrapper.innerHTML = singleSet.repeat(repeatCount);

  let offset = 0;
  const speed = 5;
  let isPaused = false;
  let isVisible = true;

  function animate() {
    if (!isPaused && isVisible) {
      offset -= speed;
      if (Math.abs(offset) >= wrapper.scrollWidth / 2) {
        offset = 0;
      }
      wrapper.style.transform = `translate3d(${offset}px, 0, 0)`;
    }
    requestAnimationFrame(animate);
  }

  // Intersection Observer – pause when not visible
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      isVisible = entry.isIntersecting;
    });
  }, {
    threshold: 0.1
  });
  observer.observe(container);

  animate();
});
