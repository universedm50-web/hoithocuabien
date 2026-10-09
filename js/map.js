/* ==========================================================================
   HƠI THỞ CỦA BIỂN - MODULE 04: BẢN ĐỒ VỊ TRÍ CHIẾN LƯỢC (INTERACTIVE MAP)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  initLocationMap();
});

function initLocationMap() {
  const mapElement = document.getElementById('location-map');
  if (!mapElement) return;

  // Project coordinates: Coastal prime bay (Vịnh biển Nha Trang - Cam Ranh)
  const projectCoords = [12.0250, 109.1850];

  // Initialize Leaflet Map
  const map = L.map('location-map', {
    center: projectCoords,
    zoom: 12,
    zoomControl: false,
    scrollWheelZoom: false
  });

  // Add zoom control top-right
  L.control.zoom({ position: 'topright' }).addTo(map);

  // Luxury Dark Ocean Map Tiles (CartoDB Dark Matter)
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://carto.com/">CARTO</a> | Hơi Thở Của Biển',
    maxZoom: 19,
    subdomains: 'abcd'
  }).addTo(map);

  // Markers Data
  const locations = [
    {
      id: 'core-project',
      name: 'Đại Đô Thị Hơi Thở Của Biển',
      category: 'core',
      coords: projectCoords,
      distance: '0 km',
      time: 'Tâm điểm kết nối',
      icon: 'fa-gem',
      color: '#D4AF37',
      isCore: true,
      description: 'Quy mô 128.5 ha với 3.2km mặt biển riêng nguyên sơ, vị thế phong thủy vượng khí.',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'airport',
      name: 'Sân Bay Quốc Tế Cam Ranh',
      category: 'transport',
      coords: [11.9982, 109.2194],
      distance: '12 km',
      time: '15 phút di chuyển',
      icon: 'fa-plane-departure',
      color: '#0284C7',
      description: 'Cửa ngõ hàng không quốc tế đón hàng triệu lượt du khách trong và ngoài nước mỗi năm.',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'marina',
      name: 'Bến Du Thuyền Quốc Tế Marina Bay',
      category: 'resort',
      coords: [12.0310, 109.1950],
      distance: '1.2 km',
      time: '3 phút di chuyển',
      icon: 'fa-ship',
      color: '#0D9488',
      description: 'Bến đỗ tiêu chuẩn 5 sao dành riêng cho các siêu du thuyền thượng lưu quốc tế.',
      image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'highway',
      name: 'Nút Giao Cao Tốc Bắc - Nam',
      category: 'transport',
      coords: [12.0720, 109.1420],
      distance: '7.5 km',
      time: '8 phút di chuyển',
      icon: 'fa-road',
      color: '#0284C7',
      description: 'Kết nối cao tốc thông suốt chỉ mất 2.5 giờ lái xe từ TP. Hồ Chí Minh.',
      image: 'https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'golf',
      name: 'Sân Golf Quốc Tế 18 Lỗ PGA Links',
      category: 'resort',
      coords: [12.0120, 109.1680],
      distance: '3.8 km',
      time: '5 phút di chuyển',
      icon: 'fa-golf-ball-tee',
      color: '#10B981',
      description: 'Sân golf chuẩn quốc tế thiết kế bởi huyền thoại Greg Norman hướng trọn tầm nhìn vịnh biển.',
      image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'vinmec',
      name: 'Bệnh Viện Đa Khoa Quốc Tế Vinmec',
      category: 'health',
      coords: [12.0550, 109.1620],
      distance: '6.2 km',
      time: '9 phút di chuyển',
      icon: 'fa-hospital',
      color: '#EF4444',
      description: 'Hệ thống y tế chuẩn JCI quốc tế với trang thiết bị y khoa tân tiến nhất.',
      image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'city-center',
      name: 'Trung Tâm Hành Chính & Quảng Trường',
      category: 'commercial',
      coords: [12.0850, 109.1780],
      distance: '9.8 km',
      time: '12 phút di chuyển',
      icon: 'fa-city',
      color: '#8B5CF6',
      description: 'Tâm điểm thương mại văn hóa sầm uất với các đại siêu thị, phố đi bộ và lễ hội.',
      image: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const markerInstances = [];

  // Add markers to map
  locations.forEach(loc => {
    // Custom Icon HTML
    const markerHtml = loc.isCore
      ? `<div class="w-12 h-12 rounded-full bg-amber-500 border-2 border-white shadow-2xl flex items-center justify-center pulse-gold text-slate-950 font-bold text-lg">
           <i class="fa-solid ${loc.icon}"></i>
         </div>`
      : `<div class="w-9 h-9 rounded-full text-white flex items-center justify-center shadow-lg transition-transform hover:scale-125 border border-white/60" style="background-color: ${loc.color}">
           <i class="fa-solid ${loc.icon} text-sm"></i>
         </div>`;

    const customIcon = L.divIcon({
      html: markerHtml,
      className: 'custom-leaflet-marker',
      iconSize: loc.isCore ? [48, 48] : [36, 36],
      iconAnchor: loc.isCore ? [24, 24] : [18, 18],
      popupAnchor: [0, -22]
    });

    const popupHtml = `
      <div class="w-64 overflow-hidden rounded-xl bg-slate-900 text-white">
        <img src="${loc.image}" alt="${loc.name}" class="w-full h-28 object-cover">
        <div class="p-3">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-xs font-semibold px-2 py-0.5 rounded text-amber-300 bg-amber-950/80 border border-amber-600/40">
              ${loc.time}
            </span>
            <span class="text-xs text-slate-400 font-mono">(${loc.distance})</span>
          </div>
          <h4 class="font-bold text-sm text-amber-200 mb-1 leading-snug">${loc.name}</h4>
          <p class="text-xs text-slate-300 leading-relaxed mb-2">${loc.description}</p>
          <a href="#register" class="inline-block text-xs font-semibold text-sky-400 hover:text-sky-300">
            Xem hướng dẫn di chuyển &rarr;
          </a>
        </div>
      </div>
    `;

    const marker = L.marker(loc.coords, { icon: customIcon }).addTo(map);
    marker.bindPopup(popupHtml);

    markerInstances.push({
      data: loc,
      marker: marker
    });
  });

  // Filter Buttons Handler
  const filterBtns = document.querySelectorAll('[data-map-filter]');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      filterBtns.forEach(b => b.classList.remove('bg-amber-500', 'text-slate-950', 'active'));
      filterBtns.forEach(b => b.classList.add('bg-slate-800/80', 'text-slate-300'));
      this.classList.remove('bg-slate-800/80', 'text-slate-300');
      this.classList.add('bg-amber-500', 'text-slate-950', 'active');

      const filterVal = this.getAttribute('data-map-filter');

      markerInstances.forEach(item => {
        if (filterVal === 'all' || item.data.category === filterVal || item.data.isCore) {
          map.addLayer(item.marker);
        } else {
          map.removeLayer(item.marker);
        }
      });
    });
  });

  // Click on location list item to focus map
  const locationListItems = document.querySelectorAll('[data-focus-location]');
  locationListItems.forEach(item => {
    item.addEventListener('click', function () {
      const targetId = this.getAttribute('data-focus-location');
      const target = markerInstances.find(m => m.data.id === targetId);
      if (target) {
        map.flyTo(target.data.coords, 14, { duration: 1.2 });
        setTimeout(() => {
          target.marker.openPopup();
        }, 1200);
      }
    });
  });
}
