/* ==========================================================================
   HƠI THỞ CỦA BIỂN - MODULE 10: TRỢ LÝ AI OCEANBOT 24/7 (AI VIRTUAL CONSULTANT)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  initOceanChatbot();
});

function initOceanChatbot() {
  const chatToggle = document.getElementById('chat-toggle-btn');
  const chatClose = document.getElementById('chat-close-btn');
  const chatbotWindow = document.getElementById('ocean-chatbot');
  const chatForm = document.getElementById('chatbot-form');
  const chatInput = document.getElementById('chat-input');
  const chatMessages = document.getElementById('chat-messages');
  const quickChips = document.querySelectorAll('.chat-quick-chip');

  if (!chatbotWindow) return;

  // Toggle Chatbot
  if (chatToggle) {
    chatToggle.addEventListener('click', function () {
      chatbotWindow.classList.toggle('open');
      const badge = document.getElementById('chat-notification-badge');
      if (badge) badge.style.display = 'none';
      if (chatbotWindow.classList.contains('open')) {
        chatInput && chatInput.focus();
      }
    });
  }

  if (chatClose) {
    chatClose.addEventListener('click', function () {
      chatbotWindow.classList.remove('open');
    });
  }

  // Quick Chips Click
  quickChips.forEach(chip => {
    chip.addEventListener('click', function () {
      const text = this.getAttribute('data-query') || this.textContent.trim();
      handleUserMessage(text);
    });
  });

  // Chat Form Submit
  if (chatForm) {
    chatForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;
      chatInput.value = '';
      handleUserMessage(text);
    });
  }

  function appendMessage(sender, text, isHtml = false) {
    const time = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    const msgDiv = document.createElement('div');
    msgDiv.className = `flex flex-col ${sender === 'user' ? 'items-end' : 'items-start'} mb-3`;

    if (sender === 'user') {
      msgDiv.innerHTML = `
        <div class="chat-msg-user text-white text-xs md:text-sm px-4 py-2.5 max-w-[85%] shadow-md">
          ${escapeHtml(text)}
        </div>
        <span class="text-[10px] text-slate-400 mt-1 mr-1">${time}</span>
      `;
    } else {
      msgDiv.innerHTML = `
        <div class="flex items-start gap-2 max-w-[90%]">
          <div class="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 text-xs font-bold flex-shrink-0 mt-0.5 shadow">
            <i class="fa-solid fa-sparkles"></i>
          </div>
          <div>
            <div class="chat-msg-agent text-slate-100 text-xs md:text-sm px-4 py-3 leading-relaxed shadow-lg">
              ${isHtml ? text : escapeHtml(text)}
            </div>
            <span class="text-[10px] text-slate-400 mt-1 ml-1 block">${time} • AI Trợ Lý OceanBot</span>
          </div>
        </div>
      `;
    }

    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function handleUserMessage(userText) {
    appendMessage('user', userText);

    // Show typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.id = 'typing-indicator';
    typingIndicator.className = 'flex items-center gap-2 mb-3 text-slate-400 text-xs italic';
    typingIndicator.innerHTML = `
      <div class="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-amber-400">
        <i class="fa-solid fa-circle-notch fa-spin text-[10px]"></i>
      </div>
      <span>OceanBot đang xử lý dữ liệu dự án...</span>
    `;
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    setTimeout(() => {
      typingIndicator.remove();
      const botResponse = generateBotResponse(userText);
      appendMessage('agent', botResponse.reply, true);

      // If phone number detected, record to simulated CRM
      if (botResponse.leadPhone) {
        saveLead({
          name: 'Khách hàng Chatbot',
          phone: botResponse.leadPhone,
          email: 'chatbot@lead.vn',
          source: 'AI OceanBot Live Chat',
          note: `Nhu cầu tìm hiểu: "${userText}"`,
          date: new Date().toISOString()
        });
        showGlobalToast('Đã chuyển yêu cầu của Quý khách đến Giám đốc dự án!', 'success');
      }
    }, 700);
  }

  function generateBotResponse(input) {
    const text = input.toLowerCase();
    const phoneRegex = /(0[3|5|7|8|9][0-9]{8})\b/;
    const phoneMatch = text.match(phoneRegex);

    if (phoneMatch) {
      const phone = phoneMatch[0];
      return {
        reply: `
          <div class="space-y-2">
            <p class="font-semibold text-emerald-400">
              <i class="fa-solid fa-check-circle mr-1"></i> Dạ em đã ghi nhận số điện thoại của Quý khách: <strong>${phone}</strong>.
            </p>
            <p>Hệ thống CRM đã điều phối chuyên viên cao cấp của Chủ Đầu Tư chuẩn bị trọn bộ:</p>
            <ul class="list-disc pl-4 text-xs space-y-1 text-slate-300">
              <li>Bảng giá niêm yết có dấu đỏ & chính sách chiết khấu 8%</li>
              <li>Sơ đồ quy hoạch phân lô chi tiết tỷ lệ 1/500</li>
              <li>Thư mời VIP tham quan thực tế công trường và trải nghiệm du thuyền</li>
            </ul>
            <p class="text-xs text-amber-300 pt-1">Chuyên viên sẽ liên hệ với Quý khách trong vòng 10-15 phút tới ạ!</p>
          </div>
        `,
        leadPhone: phone
      };
    }

    if (text.includes('giá') || text.includes('bao nhiêu') || text.includes('bảng giá')) {
      return {
        reply: `
          <div class="space-y-2">
            <p class="font-bold text-amber-300">Bảng giá dự kiến các phân khu giai đoạn 1:</p>
            <div class="space-y-1 text-xs">
              <div class="p-1.5 rounded bg-slate-900/80 border border-slate-700 flex justify-between">
                <span>1. Căn hộ The Aqua Breeze:</span>
                <span class="font-bold text-sky-300">Từ 3.8 - 9.5 Tỷ</span>
              </div>
              <div class="p-1.5 rounded bg-slate-900/80 border border-slate-700 flex justify-between">
                <span>2. Shophouse San Hô 5 Tầng:</span>
                <span class="font-bold text-amber-400">Từ 12.5 - 19 Tỷ</span>
              </div>
              <div class="p-1.5 rounded bg-slate-900/80 border border-slate-700 flex justify-between">
                <span>3. Biệt thự Ngọc Trai Biển:</span>
                <span class="font-bold text-emerald-400">Từ 28 - 45 Tỷ</span>
              </div>
              <div class="p-1.5 rounded bg-slate-900/80 border border-slate-700 flex justify-between">
                <span>4. Siêu Dinh thự Sapphire:</span>
                <span class="font-bold text-purple-300">Từ 68 - 135 Tỷ</span>
              </div>
            </div>
            <p class="text-xs text-slate-300 pt-1">
              Quý khách chỉ cần để lại số điện thoại, em sẽ gửi file PDF Bảng tính dòng tiền & Lịch thanh toán chi tiết ngay ạ!
            </p>
          </div>
        `
      };
    }

    if (text.includes('chính sách') || text.includes('chiết khấu') || text.includes('ưu đãi') || text.includes('ngân hàng') || text.includes('vay')) {
      return {
        reply: `
          <div class="space-y-2">
            <p class="font-bold text-amber-300">Chính Sách Bán Hàng Đặc Biệt Tháng Này:</p>
            <ul class="text-xs space-y-1 text-slate-300 list-disc pl-4">
              <li><strong>Chiết khấu Early Bird lên đến 8%</strong> khi thanh toán sớm 95%.</li>
              <li>Hỗ trợ vay <strong>70% giá trị hợp đồng</strong>, ân hạn nợ gốc & lãi suất 0% trong 24 tháng.</li>
              <li>Tặng thẻ VIP đặc quyền du thuyền 5 sao trị giá <strong>200 triệu VNĐ</strong>.</li>
              <li>Miễn phí quản lý vận hành 3 năm đầu tiên tiêu chuẩn quốc tế.</li>
            </ul>
            <p class="text-xs text-sky-300">Quý khách để lại SĐT để nhận bảng tính ngân hàng theo từng đợt nhé!</p>
          </div>
        `
      };
    }

    if (text.includes('vị trí') || text.includes('ở đâu') || text.includes('địa chỉ') || text.includes('bản đồ')) {
      return {
        reply: `
          <div class="space-y-2">
            <p class="font-bold text-amber-300">Tọa độ Vàng bên Vịnh Biển Thượng Lưu:</p>
            <p class="text-xs text-slate-300 leading-relaxed">
              Dự án sở hữu mặt tiền cung đường biển triệu đô, thuộc quần thể vịnh biển nguyên sơ với 3.2km đường bờ biển riêng biệt.
            </p>
            <div class="text-xs space-y-1 text-slate-300">
              <div>✈️ <strong>15 phút</strong> đến Sân bay Quốc tế Cam Ranh</div>
              <div>🚗 <strong>8 phút</strong> kết nối Nút giao Cao tốc Bắc - Nam</div>
              <div>⛵ <strong>3 phút</strong> đến Bến du thuyền quốc tế Marina</div>
              <div>⛳ <strong>5 phút</strong> đến Sân Golf 18 lỗ chuẩn PGA</div>
            </div>
          </div>
        `
      };
    }

    if (text.includes('tiến độ') || text.includes('xây dựng') || text.includes('bàn giao')) {
      return {
        reply: `
          <div class="space-y-2">
            <p class="font-bold text-amber-300">Tiến Độ Xây Dựng Thực Tế (Cập Nhật 2026):</p>
            <p class="text-xs text-slate-300 leading-relaxed">
              Hạ tầng giao thông nội khu, kè biển và cảnh quan cây xanh đã hoàn thành 95%. 
              Khu Biệt Thự Ngọc Trai đang cất nóc đợt 1 và phân khu Shophouse San Hô đã hoàn thiện kết cấu tầng 4.
            </p>
            <p class="text-xs text-emerald-300 font-semibold">
              Dự kiến bàn giao phân khu đầu tiên: Quý 4/2026 với sổ đỏ từng căn.
            </p>
          </div>
        `
      };
    }

    if (text.includes('pháp lý') || text.includes('sổ hồng') || text.includes('sổ đỏ') || text.includes('sở hữu')) {
      return {
        reply: `
          <div class="space-y-2">
            <p class="font-bold text-amber-300">Pháp Lý Minh Bạch & Vững Chắc 100%:</p>
            <ul class="text-xs space-y-1 text-slate-300 list-disc pl-4">
              <li>Quyết định phê duyệt quy hoạch chi tiết 1/500 hoàn chỉnh.</li>
              <li>Giấy phép xây dựng số 28/GPXD của Sở Xây Dựng.</li>
              <li>Đã hoàn thành 100% nghĩa vụ thuế sử dụng đất.</li>
              <li>Sở hữu lâu dài (Sổ hồng từng căn cho người Việt Nam) và 50 năm cho khách quốc tế theo luật định.</li>
            </ul>
          </div>
        `
      };
    }

    if (text.includes('xem') || text.includes('nhà mẫu') || text.includes('tham quan') || text.includes('đăng ký')) {
      return {
        reply: `
          <div class="space-y-2">
            <p class="font-bold text-amber-300">Đăng Ký Tham Quan Nhà Mẫu & Thực Tế Dự Án:</p>
            <p class="text-xs text-slate-300">
              Nhà mẫu Sales Gallery mở cửa đón khách từ 8:00 đến 18:30 hàng ngày. Có xe limousine đưa đón tận nơi từ sân bay hoặc trung tâm.
            </p>
            <p class="text-xs text-sky-300 font-semibold">
              Quý khách vui lòng nhắn Số Điện Thoại & Ngày mong muốn xem, em sẽ gửi thư mời VIP và bố trí xe đón tiếp chu đáo ạ!
            </p>
          </div>
        `
      };
    }

    // Default polite response
    return {
      reply: `
        <div class="space-y-2">
          <p class="text-xs text-slate-200">
            Cảm ơn Quý khách đã quan tâm đến Đại đô thị <strong>Hơi Thở Của Biển</strong>. Em là Trợ lý AI OceanBot, luôn sẵn sàng hỗ trợ Quý khách 24/7.
          </p>
          <p class="text-xs text-slate-300">
            Quý khách có thể hỏi em về <em>Bảng giá, Chính sách thanh toán, Tiến độ xây dựng, Mặt bằng phân khu</em> hoặc chỉ cần để lại <strong>Số Điện Thoại</strong> để chuyên viên tư vấn gửi bảng tính chi tiết ngay ạ!
          </p>
        </div>
      `
    };
  }

  function escapeHtml(string) {
    const div = document.createElement('div');
    div.innerText = string;
    return div.innerHTML;
  }
}
