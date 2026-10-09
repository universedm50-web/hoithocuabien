/* ==========================================================================
   HƠI THỞ CỦA BIỂN - MODULE 05: QUY HOẠCH MẶT BẰNG & PHÂN KHU (INTERACTIVE MASTERPLAN)
   ========================================================================== */

const subdivisionsData = {
  'ngoc-trai': {
    id: 'ngoc-trai',
    name: 'Phân Khu Biệt Thự Ngọc Trai',
    subName: 'The Pearl Villas - Đặc Quyền Thượng Lưu',
    type: 'villa',
    typeLabel: 'Biệt Thự Đơn Lập & Song Lập',
    totalUnits: '180 Căn',
    areaRange: '280m² – 450m²',
    priceRange: '28 – 45 Tỷ VNĐ',
    status: 'Đang mở bán giai đoạn 1',
    badge: 'Limited Edition',
    color: '#D4AF37',
    coverImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    floorplanImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    description: 'Tọa lạc tại dải đất hướng biển đẹp nhất vịnh, phân khu Ngọc Trai là bộ sưu tập 180 dinh thự biệt lập sở hữu hồ bơi chân mây riêng, lối đi bộ thẳng ra bãi cát vàng và tầm nhìn 360 độ ngắm hoàng hôn.',
    features: [
      '100% dinh thự sở hữu hồ bơi vô cực điện phân muối riêng',
      'Thiết kế kính Low-E cản nhiệt, trần cao 4.2m phong cách Tropical Modern',
      'Đặc quyền bãi tắm riêng biệt lập 800m cùng dịch vụ quản gia cao cấp',
      'Sân vườn nhiệt đới riêng biệt rộng từ 120m² – 250m²'
    ],
    unitsList: [
      { code: 'NT-DL01', type: 'Biệt thự Đơn Lập VIP', area: '420 m²', bedrooms: '5 PN', price: '42.5 Tỷ', status: 'Còn 3 căn' },
      { code: 'NT-DL02', type: 'Biệt thự Đơn Lập', area: '350 m²', bedrooms: '4 PN', price: '34.8 Tỷ', status: 'Còn 5 căn' },
      { code: 'NT-SL01', type: 'Biệt thự Song Lập', area: '280 m²', bedrooms: '3 PN', price: '28.2 Tỷ', status: 'Hot booking' }
    ]
  },
  'san-ho': {
    id: 'san-ho',
    name: 'Phân Khu Shophouse San Hô',
    subName: 'The Coral Commercial Avenue - Trái Tim Kinh Tế Đêm',
    type: 'shophouse',
    typeLabel: 'Nhà Phố Thương Mại Biển 5 Tầng',
    totalUnits: '320 Căn',
    areaRange: '120m² – 185m²',
    priceRange: '12.5 – 19 Tỷ VNĐ',
    status: 'Mở bán đợt cuối',
    badge: 'Sinh lời tối ưu',
    color: '#F97316',
    coverImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    floorplanImage: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=80',
    description: 'Nằm trên đại lộ lễ hội ven biển rộng 40m, Shophouse San Hô là tâm điểm kinh doanh mua sắm, ẩm thực và giải trí sầm uất 24/7. Thiết kế tối ưu hóa mặt tiền kinh doanh 2 cửa mở trước sau linh hoạt.',
    features: [
      'Mặt tiền đại lộ rộng 7.5m - 9m, vỉa hè lát đá hoa cương 6m',
      'Kết cấu 5 tầng có thang máy kính riêng, công năng vừa ở vừa cho thuê',
      'Tiếp cận trực tiếp dòng khách du lịch từ quảng trường nhạc nước',
      'Cam kết hỗ trợ lãi suất 0% trong 24 tháng & gói hoàn thiện nội thất'
    ],
    unitsList: [
      { code: 'SH-MD01', type: 'Shophouse Mặt Đại Lộ', area: '165 m²', bedrooms: '4 Tầng + Tum', price: '18.5 Tỷ', status: 'Còn 2 căn' },
      { code: 'SH-LK02', type: 'Shophouse Phố Đi Bộ', area: '135 m²', bedrooms: '4 Tầng + Tum', price: '14.2 Tỷ', status: 'Đang giữ chỗ' },
      { code: 'SH-GC03', type: 'Shophouse Căn Góc VIP', area: '185 m²', bedrooms: '5 Tầng', price: '22.0 Tỷ', status: 'Còn 1 căn' }
    ]
  },
  'aqua-breeze': {
    id: 'aqua-breeze',
    name: 'Phân Khu Căn Hộ The Aqua Breeze',
    subName: 'The Aqua Towers - Biểu Tượng Tầng Không',
    type: 'apartment',
    typeLabel: 'Căn Hộ Nghỉ Dưỡng Hạng Sang & Sky Villa',
    totalUnits: '1,200 Căn (4 Tòa Tháp)',
    areaRange: '52m² – 145m² (Sky Villa 260m²)',
    priceRange: '3.8 – 11.5 Tỷ VNĐ',
    status: 'Nhận booking ưu tiên',
    badge: 'Chính sách 1%/tháng',
    color: '#0284C7',
    coverImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    floorplanImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
    description: 'Quần thể 4 tòa tháp kiêu hãnh vươn mình giữa tầng mây, thiết kế uốn lượn mô phỏng từng đợt sóng biển. 100% căn hộ đều sở hữu góc nhìn panorama bao trọn đường chân trời đại dương xanh ngắt.',
    features: [
      'Ban công kính tràn viền uốn cong góc rộng 270 độ',
      'Hồ bơi vô cực chân mây và Sky Bar tầng thượng 25',
      'Bàn giao đầy đủ nội thất nhập khẩu Châu Âu chuẩn 5 sao vận hành',
      'Chương trình ủy thác cho thuê chia sẻ lợi nhuận 85/15 bền vững'
    ],
    unitsList: [
      { code: 'AQ-1BR', type: 'Căn Hộ 1 Phòng Ngủ Suite', area: '54 m²', bedrooms: '1 PN + 1 WC', price: '3.85 Tỷ', status: 'Còn hàng' },
      { code: 'AQ-2BR', type: 'Căn Hộ 2 Phòng Ngủ Dual-key', area: '82 m²', bedrooms: '2 PN + 2 WC', price: '5.9 Tỷ', status: 'Bán chạy nhất' },
      { code: 'AQ-SKY', type: 'Sky Villa Penthouse Tầng 25', area: '260 m²', bedrooms: '4 PN + Bể bơi', price: '18.9 Tỷ', status: 'Duy nhất 4 căn' }
    ]
  },
  'ocean-sapphire': {
    id: 'ocean-sapphire',
    name: 'Phân Khu Dinh Thự Ocean Sapphire',
    subName: 'Sapphire Ultra Mansions - Đỉnh Cao Tột Cùng Danh Vọng',
    type: 'mansion',
    typeLabel: 'Siêu Dinh Thự Độc Bản Mặt Biển',
    totalUnits: '36 Căn Độc Bản',
    areaRange: '650m² – 1,200m²',
    priceRange: '68 – 135 Tỷ VNĐ',
    status: 'Dành riêng khách mời VIP',
    badge: 'Ultra Luxury 36 Căn',
    color: '#6366F1',
    coverImage: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80',
    floorplanImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80',
    description: 'Chỉ 36 chủ nhân kiệt xuất mới có thể sở hữu siêu dinh thự Ocean Sapphire. Nằm trên mũi bán đảo độc lập, mỗi dinh thự có bến du thuyền riêng trước hiên nhà, sân đậu trực thăng tư nhân và bãi cát biệt lập.',
    features: [
      'Bến du thuyền riêng nối liền thềm nhà đón du thuyền 60-feet',
      'Sân đỗ trực thăng cá nhân và hầm bảo quản siêu xe tiêu chuẩn',
      'Hầm rượu vang nhiệt độ chuẩn và phòng chiếu phim tiêu chuẩn Dolby Atmos',
      'Dịch vụ Butler quản gia hoàng gia phục vụ riêng 24/7'
    ],
    unitsList: [
      { code: 'SAP-01', type: 'Dinh thự Hoàng Gia Mũi Đảo', area: '1,200 m²', bedrooms: '7 PN + Helipad', price: '135 Tỷ', status: 'Chỉ 1 căn' },
      { code: 'SAP-08', type: 'Dinh thự Bờ Vịnh Marina', area: '850 m²', bedrooms: '6 PN + Bến Thuyền', price: '88 Tỷ', status: 'Còn 2 căn' },
      { code: 'SAP-12', type: 'Dinh thự Vườn Xanh Ngọc Bảo', area: '650 m²', bedrooms: '5 PN + Hồ bơi 25m', price: '68 Tỷ', status: 'Đang đàm phán' }
    ]
  }
};

document.addEventListener('DOMContentLoaded', function () {
  initMasterplan();
});

function initMasterplan() {
  const zoneElements = document.querySelectorAll('.masterplan-zone');
  const tooltip = document.getElementById('masterplan-tooltip');
  const filterType = document.getElementById('filter-product-type');
  const filterPrice = document.getElementById('filter-product-price');
  const filterArea = document.getElementById('filter-product-area');
  const productCards = document.querySelectorAll('.product-grid-card');

  // SVG Zones Hover & Click
  zoneElements.forEach(zone => {
    const zoneKey = zone.getAttribute('data-zone');
    const data = subdivisionsData[zoneKey];

    if (!data) return;

    zone.addEventListener('mouseenter', function (e) {
      if (tooltip) {
        tooltip.innerHTML = `
          <div class="p-3 bg-slate-950/95 border border-amber-400/50 rounded-xl shadow-2xl text-white max-w-xs backdrop-blur-md">
            <div class="flex items-center gap-2 mb-1">
              <span class="w-2.5 h-2.5 rounded-full" style="background-color: ${data.color}"></span>
              <span class="text-xs font-bold text-amber-300 uppercase tracking-wider">${data.name}</span>
            </div>
            <div class="text-xs text-slate-300 mb-1">${data.typeLabel}</div>
            <div class="flex items-center justify-between text-xs font-mono font-bold text-sky-400">
              <span>${data.totalUnits}</span>
              <span>${data.priceRange}</span>
            </div>
            <div class="mt-2 text-[11px] text-amber-400 font-semibold flex items-center gap-1">
              <span>Click để khám phá chi tiết</span> &rarr;
            </div>
          </div>
        `;
        tooltip.style.display = 'block';
      }
    });

    zone.addEventListener('mousemove', function (e) {
      if (tooltip) {
        const svgContainer = document.getElementById('interactive-map-container');
        const rect = svgContainer.getBoundingClientRect();
        const x = e.clientX - rect.left + 15;
        const y = e.clientY - rect.top + 15;
        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y}px`;
      }
    });

    zone.addEventListener('mouseleave', function () {
      if (tooltip) {
        tooltip.style.display = 'none';
      }
    });

    zone.addEventListener('click', function () {
      openSubdivisionModal(zoneKey);
    });
  });

  // Mega Menu Links Click to Open Subdivision Modal
  document.querySelectorAll('[data-open-subdivision]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const zoneKey = this.getAttribute('data-open-subdivision');
      openSubdivisionModal(zoneKey);
    });
  });

  // Product Filter Logic
  function applyFilters() {
    const selectedType = filterType ? filterType.value : 'all';
    const selectedPrice = filterPrice ? filterPrice.value : 'all';
    const selectedArea = filterArea ? filterArea.value : 'all';

    let visibleCount = 0;

    productCards.forEach(card => {
      const cardType = card.getAttribute('data-card-type');
      const cardPrice = parseFloat(card.getAttribute('data-price-val') || 0);
      const cardArea = parseFloat(card.getAttribute('data-area-val') || 0);

      let matchType = (selectedType === 'all' || cardType === selectedType);
      
      let matchPrice = true;
      if (selectedPrice === 'under-15') matchPrice = (cardPrice < 15);
      else if (selectedPrice === '15-30') matchPrice = (cardPrice >= 15 && cardPrice <= 30);
      else if (selectedPrice === 'over-30') matchPrice = (cardPrice > 30);

      let matchArea = true;
      if (selectedArea === 'under-150') matchArea = (cardArea < 150);
      else if (selectedArea === '150-300') matchArea = (cardArea >= 150 && cardArea <= 300);
      else if (selectedArea === 'over-300') matchArea = (cardArea > 300);

      if (matchType && matchPrice && matchArea) {
        card.style.display = 'block';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    const noResults = document.getElementById('no-filter-results');
    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  if (filterType) filterType.addEventListener('change', applyFilters);
  if (filterPrice) filterPrice.addEventListener('change', applyFilters);
  if (filterArea) filterArea.addEventListener('change', applyFilters);

  // Reset Filters Button
  const resetBtn = document.getElementById('reset-product-filters');
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      if (filterType) filterType.value = 'all';
      if (filterPrice) filterPrice.value = 'all';
      if (filterArea) filterArea.value = 'all';
      applyFilters();
    });
  }

  // Check URL hash on page load (e.g., mat-bang.html#ngoc-trai)
  if (window.location.hash) {
    const hash = window.location.hash.replace('#', '');
    if (subdivisionsData[hash]) {
      setTimeout(() => {
        openSubdivisionModal(hash);
      }, 300);
    }
  }
}

// Open Subdivision Detail Modal
function openSubdivisionModal(zoneKey) {
  const data = subdivisionsData[zoneKey];
  if (!data) return;

  const modal = document.getElementById('subdivision-modal');
  if (!modal) return;

  // Populate data
  document.getElementById('modal-zone-title').textContent = data.name;
  document.getElementById('modal-zone-subtitle').textContent = data.subName;
  document.getElementById('modal-zone-type').textContent = data.typeLabel;
  document.getElementById('modal-zone-units').textContent = data.totalUnits;
  document.getElementById('modal-zone-area').textContent = data.areaRange;
  document.getElementById('modal-zone-price').textContent = data.priceRange;
  document.getElementById('modal-zone-status').textContent = data.status;
  document.getElementById('modal-zone-badge').textContent = data.badge;
  document.getElementById('modal-zone-desc').textContent = data.description;
  document.getElementById('modal-zone-img').src = data.coverImage;
  document.getElementById('modal-zone-floorplan').src = data.floorplanImage;

  // Features list
  const featuresList = document.getElementById('modal-zone-features');
  if (featuresList) {
    featuresList.innerHTML = data.features.map(f => `
      <li class="flex items-start gap-2.5 text-sm text-slate-300">
        <i class="fa-solid fa-circle-check text-amber-400 mt-1 flex-shrink-0"></i>
        <span>${f}</span>
      </li>
    `).join('');
  }

  // Units table
  const unitsTable = document.getElementById('modal-zone-units-table');
  if (unitsTable) {
    unitsTable.innerHTML = data.unitsList.map(u => `
      <tr class="border-b border-slate-800/80 hover:bg-slate-800/40 text-sm">
        <td class="py-3 px-4 font-mono font-bold text-amber-300">${u.code}</td>
        <td class="py-3 px-4 text-white">${u.type}</td>
        <td class="py-3 px-4 text-slate-300">${u.area}</td>
        <td class="py-3 px-4 text-slate-300">${u.bedrooms}</td>
        <td class="py-3 px-4 font-bold text-sky-400 font-mono">${u.price}</td>
        <td class="py-3 px-4">
          <span class="px-2.5 py-1 rounded text-xs font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-600/30">
            ${u.status}
          </span>
        </td>
      </tr>
    `).join('');
  }

  // Pass current zone to CTA inside modal
  const modalCtaBtn = document.getElementById('modal-zone-cta-btn');
  if (modalCtaBtn) {
    modalCtaBtn.setAttribute('data-target-zone', data.name);
  }

  // Show modal
  modal.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
}

function closeSubdivisionModal() {
  const modal = document.getElementById('subdivision-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
}
