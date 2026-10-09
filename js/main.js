/* ==========================================================================
   HƠI THỞ CỦA BIỂN - MASTER CLIENT SCRIPT
   Controls Hero, Counter, Amenities Lightbox, Timeline, News, CTA & Lead CRM
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  initHeader();
  initHeroSlider();
  initAnimatedCounters();
  initAmenities();
  initProgressTimeline();
  initNewsModule();
  initCountdownTimer();
  initLeadForms();
  initModals();
});

/* ==========================================================================
   01: STICKY HEADER & MOBILE NAVIGATION
   ========================================================================== */
function initHeader() {
  const header = document.getElementById('main-header');
  const mobileToggle = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu-drawer');
  const mobileClose = document.getElementById('mobile-close-btn');

  // Sticky header on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile Menu Drawer
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.remove('translate-x-full');
      document.body.classList.add('overflow-hidden');
    });
  }

  if (mobileClose && mobileMenu) {
    mobileClose.addEventListener('click', () => {
      mobileMenu.classList.add('translate-x-full');
      document.body.classList.remove('overflow-hidden');
    });
  }

  // Close mobile drawer when clicking nav links
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu) {
        mobileMenu.classList.add('translate-x-full');
        document.body.classList.remove('overflow-hidden');
      }
    });
  });
}

/* ==========================================================================
   02: HERO SECTION SLIDER & VIDEO TOGGLE
   ========================================================================== */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const indicators = document.querySelectorAll('.hero-indicator');
  const videoOverlay = document.getElementById('hero-video-container');
  const toggleModeBtn = document.getElementById('toggle-hero-mode-btn');
  let currentSlide = 0;
  let slideInterval = null;
  let isVideoMode = false;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.opacity = i === index ? '1' : '0';
      slide.style.zIndex = i === index ? '10' : '1';
    });
    indicators.forEach((ind, i) => {
      if (i === index) {
        ind.classList.add('bg-amber-400', 'w-10');
        ind.classList.remove('bg-white/40', 'w-3');
      } else {
        ind.classList.remove('bg-amber-400', 'w-10');
        ind.classList.add('bg-white/40', 'w-3');
      }
    });
    currentSlide = index;
  }

  function nextSlide() {
    let next = (currentSlide + 1) % slides.length;
    showSlide(next);
  }

  function startAutoplay() {
    slideInterval = setInterval(nextSlide, 5500);
  }

  function stopAutoplay() {
    if (slideInterval) clearInterval(slideInterval);
  }

  // Indicator click
  indicators.forEach((ind, i) => {
    ind.addEventListener('click', () => {
      stopAutoplay();
      showSlide(i);
      startAutoplay();
    });
  });

  // Toggle Video Flycam vs Photo Slider
  if (toggleModeBtn && videoOverlay) {
    toggleModeBtn.addEventListener('click', () => {
      isVideoMode = !isVideoMode;
      if (isVideoMode) {
        videoOverlay.classList.remove('hidden');
        toggleModeBtn.innerHTML = '<i class="fa-solid fa-images mr-2"></i> Chuyển Xem Phối Cảnh';
        stopAutoplay();
      } else {
        videoOverlay.classList.add('hidden');
        toggleModeBtn.innerHTML = '<i class="fa-solid fa-video mr-2"></i> Xem Flycam Toàn Cảnh';
        startAutoplay();
      }
    });
  }

  startAutoplay();
}

/* ==========================================================================
   03: ANIMATED COUNTERS (TỔNG QUAN DỰ ÁN)
   ========================================================================== */
function initAnimatedCounters() {
  const counterSection = document.getElementById('overview-counter-section');
  if (!counterSection) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        animateAllCounters();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(counterSection);

  function animateAllCounters() {
    const counters = document.querySelectorAll('[data-counter-target]');
    counters.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-counter-target'));
      const isDecimal = target % 1 !== 0;
      const duration = 2200; // ms
      const startTime = performance.now();

      function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing out cubic
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentVal = easeProgress * target;

        if (isDecimal) {
          counter.textContent = currentVal.toFixed(1);
        } else {
          counter.textContent = Math.floor(currentVal).toLocaleString('vi-VN');
        }

        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        } else {
          if (isDecimal) {
            counter.textContent = target.toFixed(1);
          } else {
            counter.textContent = target.toLocaleString('vi-VN');
          }
        }
      }

      requestAnimationFrame(updateNumber);
    });
  }
}

/* ==========================================================================
   06: AMENITIES ECOSYSTEM (LƯỚI TIỆN ÍCH & LIGHTBOX)
   ========================================================================== */
const amenitiesData = [
  {
    id: 'lagoon',
    title: 'Biển Nhân Tạo & Hồ Nước Mặn 5.2 Hecta',
    category: 'resort',
    categoryLabel: 'Nghỉ Dưỡng & Biển',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    desc: 'Hồ nước mặn công nghệ lọc tuần hoàn tinh khiết Crystal Lagoon từ Hoa Kỳ, đem cát trắng mịn và làn nước xanh như ngọc về tận thềm nhà.',
    specs: 'Diện tích 52,000m² • Cát trắng Nha Trang • Thể thao chèo kayak & paddle'
  },
  {
    id: 'marina-club',
    title: 'Bến Du Thuyền Quốc Tế 5 Sao Marina Bay',
    category: 'luxury',
    categoryLabel: 'Đặc Quyền VIP',
    image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?auto=format&fit=crop&w=1200&q=80',
    desc: 'Bến đỗ siêu du thuyền sang trọng với 120 vị trí neo đậu, câu lạc bộ du thuyền tư nhân Marina Club dành riêng cho giới thượng lưu quốc tế.',
    specs: 'Đón du thuyền đến 100 feet • Dịch vụ bảo dưỡng chuẩn Monaco • Cigar & Wine Lounge'
  },
  {
    id: 'infinity-pool',
    title: 'Tổ Hợp Hồ Bơi Vô Cực Tầng Thượng 360°',
    category: 'resort',
    categoryLabel: 'Nghỉ Dưỡng & Biển',
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80',
    desc: 'Hồ bơi tràn viền điện phân muối khoáng nằm trên đỉnh tháp căn hộ, ngắm trọn vẹn cảnh bình minh và hoàng hôn buông trên mặt biển.',
    specs: 'Cao 100m so với mực nước biển • Nước ấm 4 mùa • Pool bar sành điệu'
  },
  {
    id: 'golf-links',
    title: 'Sân Golf 18 Lỗ Chuẩn PGA Hướng Biển',
    category: 'sports',
    categoryLabel: 'Thể Thao & Sức Khỏe',
    image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80',
    desc: 'Địa hình đồi cát tự nhiên kết hợp thảm cỏ Paspalum nhập khẩu, thử thách mọi tay golf chuyên nghiệp với tầm nhìn biển ngoạn mục.',
    specs: '18 lỗ chuẩn Championship • Học viện golf quốc tế • Clubhouse 3 tầng'
  },
  {
    id: 'ocean-plaza',
    title: 'Tổ Hợp Mega Mall & Tuyến Phố Đêm 24/7',
    category: 'dining',
    categoryLabel: 'Ẩm Thực & Mua Sắm',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    desc: 'Thiên đường mua sắm hội tụ hơn 200 thương hiệu thời trang xa xỉ quốc tế, chuỗi nhà hàng ẩm thực sao Michelin và tuyến phố lễ hội ánh sáng.',
    specs: 'Quy mô 45,000m² • Phố đi bộ 1.8km • Chuỗi bar lounge ven bờ biển'
  },
  {
    id: 'onsen-spa',
    title: 'Khu Suối Khoáng Nóng Onsen & Wellness Spa',
    category: 'sports',
    categoryLabel: 'Thể Thao & Sức Khỏe',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80',
    desc: 'Liệu pháp chăm sóc phục hồi sức khỏe bằng khoáng chất tự nhiên nhập khẩu Nhật Bản, giúp tái tạo năng lượng thể chất và tinh thần.',
    specs: '12 bể khoáng chuyên đề • Phòng xông tuyết & đá muối Himalaya • Bác sĩ tư vấn'
  }
];

function initAmenities() {
  const tabs = document.querySelectorAll('[data-amenity-tab]');
  const items = document.querySelectorAll('.amenity-card-item');

  tabs.forEach(tab => {
    tab.addEventListener('click', function () {
      tabs.forEach(t => t.classList.remove('bg-amber-500', 'text-slate-950', 'active'));
      tabs.forEach(t => t.classList.add('bg-slate-800/80', 'text-slate-300'));
      this.classList.remove('bg-slate-800/80', 'text-slate-300');
      this.classList.add('bg-amber-500', 'text-slate-950', 'active');

      const filterVal = this.getAttribute('data-amenity-tab');
      items.forEach(item => {
        const cat = item.getAttribute('data-amenity-cat');
        if (filterVal === 'all' || cat === filterVal) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Lightbox Click
  items.forEach(item => {
    item.addEventListener('click', function () {
      const id = this.getAttribute('data-amenity-id');
      const data = amenitiesData.find(a => a.id === id);
      if (data) {
        openAmenityLightbox(data);
      }
    });
  });
}

function openAmenityLightbox(data) {
  const modal = document.getElementById('amenity-lightbox-modal');
  if (!modal) return;

  document.getElementById('lightbox-img').src = data.image;
  document.getElementById('lightbox-title').textContent = data.title;
  document.getElementById('lightbox-cat').textContent = data.categoryLabel;
  document.getElementById('lightbox-desc').textContent = data.desc;
  document.getElementById('lightbox-specs').textContent = data.specs;

  modal.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
}

function closeAmenityLightbox() {
  const modal = document.getElementById('amenity-lightbox-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
}

/* ==========================================================================
   07: CONSTRUCTION PROGRESS TIMELINE
   ========================================================================== */
const progressData = {
  'q1-2026': {
    title: 'Hiện Tại (Quý 1 - 2026): Thi Công Hoàn Thiện & Cất Nóc Tháp A',
    percent: '85% Tiến độ tổng',
    badge: 'Đang triển khai vượt tiến độ 45 ngày',
    headline: '1,500 kỹ sư và công nhân thi công 3 ca liên tục, đảm bảo bàn giao đúng cam kết.',
    photos: [
      { url: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=600&q=80', caption: 'Lắp đặt kính hộp Low-E tháp Aqua' },
      { url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80', caption: 'Hoàn thiện trục đường Shophouse San Hô' },
      { url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=600&q=80', caption: 'Hệ thống hạ tầng ngầm phân khu Ngọc Trai' }
    ],
    videoText: 'Flycam 4K tuần 1 tháng này ghi nhận diện mạo đại đô thị hoàn chỉnh 85%'
  },
  'q4-2025': {
    title: 'Quý 4 - 2025: Hoàn Thành Kè Biển & Khai Trương Sales Gallery',
    percent: '65% Tiến độ tổng',
    badge: 'Hoàn tất mốc hạ tầng',
    headline: 'Toàn bộ 3.2km kè chắn sóng biển và công viên cát trắng đã nghiệm thu chất lượng.',
    photos: [
      { url: 'https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=600&q=80', caption: 'Khánh thành Sales Gallery & Nhà Mẫu' },
      { url: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=600&q=80', caption: 'Hoàn thiện hồ nước mặn Lagoon 5ha' },
      { url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80', caption: 'Đổ sàn tầng 18 tháp The Aqua' }
    ],
    videoText: 'Lễ ra mắt nhà mẫu thực tế đón hơn 2,000 lượt khách tham quan'
  },
  'q3-2025': {
    title: 'Quý 3 - 2025: Thi Công Móng Cọc & Hạ Tầng Kỹ Thuật Số',
    percent: '45% Tiến độ tổng',
    badge: 'Đúng kế hoạch',
    headline: 'Hoàn thành 100% cọc khoan nhồi sâu 45m chạm tầng đá gốc, nghiệm thu thử tải trọng.',
    photos: [
      { url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=600&q=80', caption: 'Thi công cọc móng phân khu Dinh thự' },
      { url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80', caption: 'Khai thông tuyến đại lộ nội khu 40m' },
      { url: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=600&q=80', caption: 'Hệ thống điện âm & trạm biến áp trung tâm' }
    ],
    videoText: 'Video ghi nhận đại công trường rực sáng ngày đêm'
  }
};

function initProgressTimeline() {
  const timelineBtns = document.querySelectorAll('[data-progress-period]');
  timelineBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      timelineBtns.forEach(b => b.classList.remove('bg-amber-500', 'text-slate-950', 'active'));
      timelineBtns.forEach(b => b.classList.add('bg-slate-800/80', 'text-slate-300'));
      this.classList.remove('bg-slate-800/80', 'text-slate-300');
      this.classList.add('bg-amber-500', 'text-slate-950', 'active');

      const period = this.getAttribute('data-progress-period');
      updateProgressDisplay(period);
    });
  });
}

function updateProgressDisplay(period) {
  const data = progressData[period];
  if (!data) return;

  document.getElementById('progress-title').textContent = data.title;
  document.getElementById('progress-percent-badge').textContent = data.percent;
  document.getElementById('progress-headline').textContent = data.headline;
  document.getElementById('progress-video-caption').textContent = data.videoText;

  const photosContainer = document.getElementById('progress-photos-container');
  if (photosContainer) {
    photosContainer.innerHTML = data.photos.map(p => `
      <div class="group relative rounded-xl overflow-hidden shadow-lg border border-slate-700/60 aspect-video">
        <img src="${p.url}" alt="${p.caption}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex items-end p-3">
          <span class="text-xs font-medium text-slate-200">${p.caption}</span>
        </div>
      </div>
    `).join('');
  }
}

/* ==========================================================================
   08: NEWS & MARKET INSIGHTS
   ========================================================================== */
const newsArticles = [
  {
    id: 'news-1',
    title: 'Hạ Tầng Cao Tốc Thông Suốt: Bất Động Sản Nghỉ Dưỡng Bên Biển Đón Làn Sóng Đầu Tư Mới',
    category: 'market',
    categoryLabel: 'Phân Tích Thị Trường',
    date: '28/02/2026',
    author: 'Chuyên gia BĐS TS. Trần Đình Hải',
    views: '3,840 lượt đọc',
    isHighlight: true,
    image: 'https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=1000&q=80',
    excerpt: 'Tuyến cao tốc kết nối trung tâm kinh tế phía Nam đã rút ngắn thời gian di chuyển xuống còn 2.5 giờ, kích hoạt dòng vốn hàng chục nghìn tỷ đổ vào các đại đô thị biển chuẩn quốc tế.',
    content: `
      <p class="mb-4">Theo báo cáo thị trường bất động sản mới nhất của CBRE và Savills, sự hoàn thiện đồng bộ của hệ thống giao thông cao tốc ven biển và việc nâng cấp cảng hàng không quốc tế đã tạo nên bước ngoặt lịch sử cho phân khúc bất động sản nghỉ dưỡng cao cấp.</p>
      <h4 class="text-lg font-bold text-amber-300 mb-2">Đòn bẩy từ hạ tầng kết nối liên vùng</h4>
      <p class="mb-4">Nếu như trước đây du khách mất từ 5-6 tiếng di chuyển bằng đường bộ, thì nay với tuyến cao tốc hiện đại, thời gian chỉ còn tương đương một chuyến lái xe dã ngoại cuối tuần. Điều này biến các quần thể như <strong>Hơi Thở Của Biển</strong> trở thành "Ngôi nhà thứ hai" (Second Home) lý tưởng cho giới tinh hoa thành thị.</p>
      <h4 class="text-lg font-bold text-amber-300 mb-2">Dòng tiền thông minh tìm nơi trú ẩn an toàn</h4>
      <p class="mb-4">Trong bối cảnh nguồn cung bất động sản biển sở hữu lâu dài ngày càng khan hiếm, các dự án có pháp lý hoàn chỉnh 100% và quy hoạch đồng bộ "All-in-one" như Hơi Thở Của Biển ghi nhận mức tăng trưởng giá trị kỳ vọng từ 18% - 25%/năm.</p>
    `
  },
  {
    id: 'news-2',
    title: 'Chính Thức Cất Nóc Tháp Căn Hộ Nghỉ Dưỡng The Aqua Breeze Vượt Tiến Độ 45 Ngày',
    category: 'project',
    categoryLabel: 'Tin Dự Án',
    date: '15/02/2026',
    author: 'Ban Quản Lý Dự Án',
    views: '2,910 lượt đọc',
    isHighlight: false,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Sáng nay, Lễ cất nóc tháp căn hộ The Aqua Breeze đã diễn ra trang trọng tại công trường dự án với sự chứng kiến của hơn 500 khách hàng và đối tác quốc tế.',
    content: `
      <p class="mb-4">Đại diện Tổng thầu thi công khẳng định toàn bộ kết cấu phần thô đã đạt tiêu chuẩn thẩm định khắt khe của đơn vị tư vấn giám sát quốc tế Bureau Veritas (Pháp).</p>
      <p class="mb-4">Các hạng mục hoàn thiện mặt ngoài kính Low-E cản tia UV và hệ thống cơ điện thông minh BMS đang được triển khai song song nhằm đảm bảo bàn giao cho khách hàng vào Quý 4/2026.</p>
    `
  },
  {
    id: 'news-3',
    title: 'Đặc Quyền Early Bird Tháng 3: Chiết Khấu 8% & Tặng Thẻ Du Thuyền Hạng Thương Gia',
    category: 'policy',
    categoryLabel: 'Chính Sách Bán Hàng',
    date: '02/03/2026',
    author: 'Khối Kinh Doanh & Tiếp Thị',
    views: '4,150 lượt đọc',
    isHighlight: false,
    image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Chương trình tri ân 50 chủ nhân đầu tiên sở hữu biệt thự biển và shophouse thương mại với gói quà tặng đặc quyền chưa từng có.',
    content: `
      <p class="mb-4">Chủ đầu tư chính thức công bố chính sách bán hàng mùa xuân 2026:</p>
      <ul class="list-disc pl-5 space-y-2 mb-4">
        <li>Chiết khấu ngay 8% vào giá trị hợp đồng khi thanh toán theo tiến độ chuẩn.</li>
        <li>Hỗ trợ tài chính: Ngân hàng giải ngân 70%, ân hạn gốc và lãi suất 0% trong 24 tháng.</li>
        <li>Tặng 01 thẻ du thuyền thành viên Marina VIP thời hạn 2 năm.</li>
        <li>Miễn phí 3 năm phí dịch vụ quản lý vận hành chuẩn 5 sao quốc tế.</li>
      </ul>
    `
  },
  {
    id: 'news-4',
    title: 'Xu Hướng Bất Động Sản "Wellness & Blue Economy": Sống Khỏe Bên Đại Dương Xanh',
    category: 'market',
    categoryLabel: 'Phân Tích Thị Trường',
    date: '20/01/2026',
    author: 'Tạp chí Forbes Real Estate',
    views: '1,890 lượt đọc',
    isHighlight: false,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Khí hậu biển chứa nồng độ ion âm cao giúp tăng cường miễn dịch, đưa các đại đô thị biển tích hợp trung tâm suối khoáng Onsen trở thành tài sản vô giá.',
    content: `
      <p class="mb-4">Nghiên cứu y khoa chỉ ra rằng sống gần biển làm giảm tới 40% căng thẳng thần kinh và cải thiện đáng kể sức khỏe tim mạch.</p>
      <p class="mb-4">Hơi Thở Của Biển tiên phong quy hoạch hệ sinh thái chăm sóc sức khỏe toàn diện với trung tâm Wellness Spa khoáng nóng 12 bể Onsen chuyên sâu chuẩn Nhật Bản.</p>
    `
  }
];

function initNewsModule() {
  const categoryTabs = document.querySelectorAll('[data-news-category]');
  const searchInput = document.getElementById('news-search-input');
  const newsList = document.querySelectorAll('.news-item-card');

  function filterNews() {
    const activeTab = document.querySelector('[data-news-category].active');
    const category = activeTab ? activeTab.getAttribute('data-news-category') : 'all';
    const keyword = searchInput ? searchInput.value.toLowerCase().trim() : '';

    newsList.forEach(item => {
      const itemCat = item.getAttribute('data-news-cat');
      const itemTitle = item.querySelector('.news-title')?.textContent.toLowerCase() || '';

      const matchCat = (category === 'all' || itemCat === category);
      const matchSearch = (keyword === '' || itemTitle.includes(keyword));

      if (matchCat && matchSearch) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }

  categoryTabs.forEach(tab => {
    tab.addEventListener('click', function () {
      categoryTabs.forEach(t => t.classList.remove('bg-amber-500', 'text-slate-950', 'active'));
      categoryTabs.forEach(t => t.classList.add('bg-slate-800/80', 'text-slate-300'));
      this.classList.remove('bg-slate-800/80', 'text-slate-300');
      this.classList.add('bg-amber-500', 'text-slate-950', 'active');
      filterNews();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', filterNews);
  }

  // Read full article click
  document.querySelectorAll('[data-read-article]').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const articleId = this.getAttribute('data-read-article');
      const article = newsArticles.find(n => n.id === articleId);
      if (article) {
        openArticleModal(article);
      }
    });
  });
}

function openArticleModal(article) {
  const modal = document.getElementById('article-modal');
  if (!modal) return;

  document.getElementById('modal-article-img').src = article.image;
  document.getElementById('modal-article-title').textContent = article.title;
  document.getElementById('modal-article-cat').textContent = article.categoryLabel;
  document.getElementById('modal-article-date').textContent = article.date;
  document.getElementById('modal-article-author').textContent = article.author;
  document.getElementById('modal-article-views').textContent = article.views;
  document.getElementById('modal-article-body').innerHTML = article.content;

  modal.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
}

function closeArticleModal() {
  const modal = document.getElementById('article-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
}

/* ==========================================================================
   09: LIVE FOMO COUNTDOWN TIMER
   ========================================================================== */
function initCountdownTimer() {
  // Target date: 3 days, 14 hours from current session
  let targetTime = localStorage.getItem('ocean_countdown_target');
  if (!targetTime) {
    targetTime = new Date().getTime() + (3 * 24 * 60 * 60 * 1000) + (14 * 60 * 60 * 1000);
    localStorage.setItem('ocean_countdown_target', targetTime);
  } else {
    targetTime = parseInt(targetTime, 10);
  }

  function updateTimer() {
    const now = new Date().getTime();
    let diff = targetTime - now;

    if (diff <= 0) {
      // Reset cycle if expired
      diff = 3 * 24 * 60 * 60 * 1000;
      targetTime = now + diff;
      localStorage.setItem('ocean_countdown_target', targetTime);
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const dEl = document.getElementById('timer-days');
    const hEl = document.getElementById('timer-hours');
    const mEl = document.getElementById('timer-minutes');
    const sEl = document.getElementById('timer-seconds');

    if (dEl) dEl.textContent = String(days).padStart(2, '0');
    if (hEl) hEl.textContent = String(hours).padStart(2, '0');
    if (mEl) mEl.textContent = String(minutes).padStart(2, '0');
    if (sEl) sEl.textContent = String(seconds).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ==========================================================================
   09 & 10: LEAD FORMS, CRM SIMULATION & INSTANT BROCHURE DOWNLOAD
   ========================================================================== */
function initLeadForms() {
  // Main CTA Form
  const ctaForm = document.getElementById('lead-capture-form');
  if (ctaForm) {
    ctaForm.addEventListener('submit', function (e) {
      e.preventDefault();
      handleFormSubmission(this, 'Form Nhận Báo Giá CTA');
    });
  }

  // Quick Modal Form
  const modalForm = document.getElementById('quick-lead-form');
  if (modalForm) {
    modalForm.addEventListener('submit', function (e) {
      e.preventDefault();
      handleFormSubmission(this, 'Form Popup Đăng Ký');
    });
  }

  // Newsletter Form
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      saveLead({
        name: 'Đăng Ký Bản Tin',
        email: email,
        phone: 'Chưa cập nhật',
        source: 'Footer Newsletter',
        date: new Date().toISOString()
      });
      this.reset();
      showGlobalToast('Quý khách đã đăng ký nhận bản tin thành công!', 'success');
    });
  }
}

function handleFormSubmission(formElement, sourceName) {
  const submitBtn = formElement.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Gửi Đăng Ký';

  // Gather form values
  const name = formElement.querySelector('[name="fullname"]')?.value || 'Quý Khách';
  const phone = formElement.querySelector('[name="phone"]')?.value || '';
  const email = formElement.querySelector('[name="email"]')?.value || '';
  const interest = formElement.querySelector('[name="interest"]')?.value || 'Tất cả phân khu';
  const note = formElement.querySelector('[name="note"]')?.value || '';

  // Simple phone check
  if (!phone || phone.length < 9) {
    showGlobalToast('Vui lòng nhập số điện thoại hợp lệ để nhận bảng giá!', 'error');
    return;
  }

  // Show loading state
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Đang đồng bộ CRM...';
  }

  // Simulate API Push to CRM (HubSpot/GetFly)
  setTimeout(() => {
    saveLead({
      name,
      phone,
      email,
      interest,
      note,
      source: sourceName,
      date: new Date().toISOString()
    });

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }

    formElement.reset();
    closeAllModals();

    // Trigger Success Confirmation Modal
    openSuccessModal(name, phone);

    // Auto trigger brochure download
    triggerBrochureDownload();

    showGlobalToast('Đăng ký thành công! Bảng giá đã được gửi và tự động tải về.', 'success');
  }, 900);
}

function saveLead(leadData) {
  try {
    const existing = JSON.parse(localStorage.getItem('ocean_leads') || '[]');
    existing.unshift(leadData);
    localStorage.setItem('ocean_leads', JSON.stringify(existing));
    console.log('[CRM Integration Simulator] New Lead Captured:', leadData);
  } catch (err) {
    console.error('Error saving lead:', err);
  }
}

function triggerBrochureDownload() {
  // Generate mock PDF / HTML luxury brochure download blob
  const brochureContent = `
========================================================================
             ĐẠI ĐÔ THỊ NGHỈ DƯỠNG BIỂN "HƠI THỞ CỦA BIỂN"
                   BREATH OF THE SEA - ULTRA LUXURY
========================================================================
Kính gửi Quý Khách Hàng,

Cảm ơn Quý Khách đã quan tâm đến Đại dự án Hơi Thở Của Biển.
Dưới đây là thông tin tổng hợp bảng giá và chính sách ưu đãi tháng này:

1. QUY MÔ DỰ ÁN:
   - Tổng diện tích: 128.5 ha
   - Đường bờ biển riêng: 3.2 km
   - Mật độ xây dựng: 21.8%
   - Đơn vị quản lý vận hành: Quốc tế 5 sao

2. BẢNG GIÁ DỰ KIẾN CÁC PHÂN KHU:
   - Phân khu The Aqua Breeze (Căn hộ nghỉ dưỡng): Từ 3.8 - 9.5 Tỷ VNĐ
   - Phân khu Shophouse San Hô (Phố đi bộ biển 5 tầng): Từ 12.5 - 19 Tỷ VNĐ
   - Phân khu Biệt thự Ngọc Trai (Biệt thự biển có hồ bơi riêng): Từ 28 - 45 Tỷ VNĐ
   - Phân khu Dinh thự Ocean Sapphire (36 Dinh thự độc bản mặt biển): Từ 68 - 135 Tỷ VNĐ

3. CHÍNH SÁCH BÁN HÀNG ĐẶC BIỆT:
   - Chiết khấu thanh toán sớm: 8%
   - Hỗ trợ lãi suất 0% trong 24 tháng cho 70% giá trị căn hộ
   - Tặng thẻ VIP Du Thuyền Marina Club trị giá 200,000,000 VNĐ
   - Miễn phí 3 năm phí dịch vụ quản lý vận hành

Hotline Giám Đốc Kinh Doanh: 1800 6868 - 0909 888 999
Văn phòng Sales Gallery: Cung đường Hoàng Hôn, Vịnh Biển Thượng Lưu
Website: www.hoithocuabien.vn
========================================================================
  `;

  const blob = new Blob([brochureContent], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Brochure-Bang-Gia-Hoi-Tho-Cua-Bien.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ==========================================================================
   MODALS CONTROLLER
   ========================================================================== */
function initModals() {
  // Trigger Open Lead Modal buttons
  document.querySelectorAll('[data-open-lead-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = document.getElementById('lead-register-modal');
      if (modal) {
        modal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
      }
    });
  });

  // Close buttons
  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      closeAllModals();
    });
  });

  // Close when clicking modal backdrop
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', function (e) {
      if (e.target === this) {
        closeAllModals();
      }
    });
  });

  // Esc key closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });
}

function closeAllModals() {
  document.querySelectorAll('.app-modal').forEach(m => m.classList.add('hidden'));
  document.body.classList.remove('overflow-hidden');
}

function openSuccessModal(name, phone) {
  const modal = document.getElementById('success-modal');
  if (!modal) return;

  const textEl = document.getElementById('success-modal-msg');
  if (textEl) {
    textEl.innerHTML = `Hệ thống đã chuyển thông tin của Quý khách <strong>${name}</strong> (${phone}) đến Trưởng bộ phận tư vấn VIP. Chuyên viên sẽ liên hệ trong ít phút nữa!`;
  }

  modal.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
}

/* ==========================================================================
   GLOBAL TOAST NOTIFICATION
   ========================================================================== */
function showGlobalToast(message, type = 'info') {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'fixed top-6 right-6 z-[1000] flex flex-col gap-2.5 pointer-events-none';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  const bgClass = type === 'success' 
    ? 'bg-emerald-950/95 border-emerald-500/80 text-emerald-100' 
    : type === 'error'
    ? 'bg-rose-950/95 border-rose-500/80 text-rose-100'
    : 'bg-slate-900/95 border-amber-500/80 text-amber-100';

  const iconClass = type === 'success' ? 'fa-circle-check text-emerald-400' : type === 'error' ? 'fa-circle-exclamation text-rose-400' : 'fa-bell text-amber-400';

  toast.className = `flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl backdrop-blur-md pointer-events-auto transform translate-y-2 opacity-0 transition-all duration-300 max-w-sm text-sm ${bgClass}`;
  toast.innerHTML = `
    <i class="fa-solid ${iconClass} text-lg flex-shrink-0"></i>
    <div class="leading-snug">${message}</div>
  `;

  toastContainer.appendChild(toast);

  // Animate in
  setTimeout(() => {
    toast.classList.remove('translate-y-2', 'opacity-0');
  }, 10);

  // Remove after 4s
  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-x-4');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4000);
}
