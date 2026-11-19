// script.js
// 圖片輪播功能 (首頁專用，其他頁面載入也不影響)
document.addEventListener('DOMContentLoaded', function() {
  const carouselSlides = document.querySelectorAll('.carousel-slide');
  if (carouselSlides.length === 0) return; // 非首頁則退出

  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  let currentIndex = 0;
  const totalSlides = carouselSlides.length;
  let autoPlayInterval;

  // 更新輪播顯示
  function showSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;

    carouselSlides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    carouselSlides[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');

    currentIndex = index;
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  // 點擊圓點切換
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showSlide(idx);
      resetAutoPlay();
    });
  });

  // 按鈕事件
  if (nextBtn) nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoPlay();
  });
  if (prevBtn) prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoPlay();
  });

  // 自動輪播 (每4秒)
  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 4000);
  }

  function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
  }

  showSlide(0);
  startAutoPlay();

  // 滑鼠移到輪播區暫停自動播放
  const carouselContainer = document.querySelector('.carousel-container');
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', () => {
      clearInterval(autoPlayInterval);
    });
    carouselContainer.addEventListener('mouseleave', () => {
      resetAutoPlay();
    });
  }

  // ---- 聯絡表單送出提示 (僅示意) ----
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('✨ 多謝你嘅訊息！我哋會盡快同你聯絡～ (此為示範表單，未實際送出)');
      contactForm.reset();
    });
  }
});