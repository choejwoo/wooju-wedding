// js/main.js — 메인 렌더링 로직

(function () {
  "use strict";

  // URL 파라미터로 버전 선택 (?v=friends → 친구용, 기본값 seniors)
  const variantKey =
    new URLSearchParams(location.search).get("v") === "friends"
      ? "friends"
      : "seniors";
  const weddingVariant = weddingVariants[variantKey];
  const weddingData = Object.assign({}, weddingCommon, weddingVariant);

  /* ─── 유틸 ─── */
  function $(sel, ctx) {
    return (ctx || document).querySelector(sel);
  }
  function $$(sel, ctx) {
    return Array.from((ctx || document).querySelectorAll(sel));
  }
  function setText(sel, text) {
    const el = $(sel);
    if (el) el.textContent = text;
  }
  function setHTML(sel, html) {
    const el = $(sel);
    if (el) el.innerHTML = html;
  }

  /* ─── 날짜 포맷 ─── */
  function formatDate(isoStr) {
    const d = new Date(isoStr);
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const dow = days[d.getDay()];
    const hour = d.getHours();
    const ampm = hour < 12 ? "오전" : "오후";
    const h = hour <= 12 ? hour : hour - 12;
    return `${year}년 ${month}월 ${day}일 ${dow}요일 ${ampm} ${h}시`;
  }

  /* ─── 1. 커버 섹션 ─── */
  function renderCover() {
    setText("#cover-groom-name", weddingData.groom.name);
    setText("#cover-bride-name", weddingData.bride.name);
    setText("#cover-date", formatDate(weddingData.date));
    setText("#cover-location", weddingData.location.name);
  }

  /* ─── 2. 초대 문구 섹션 ─── */
  function renderGreeting() {
    setText("#greeting-title", weddingData.greetingTitle);

    const greetingEl = $("#greeting-text");
    if (greetingEl) {
      greetingEl.innerHTML = weddingData.greeting
        .split("\n")
        .map((line) => `<p>${line}</p>`)
        .join("");
    }

    // 양가 부모님
    const parentsEl = $("#parents-info");
    if (parentsEl) {
      const { groom, bride } = weddingData;
      parentsEl.innerHTML = `
        <div class="parents-side">
          <span class="parents-label">신랑측</span>
          <span>${groom.father} · ${groom.mother}의 아들</span>
          <span class="parents-name">${groom.name}</span>
        </div>
        <div class="parents-divider">♥</div>
        <div class="parents-side">
          <span class="parents-label">신부측</span>
          <span>${bride.father} · ${bride.mother}의 딸</span>
          <span class="parents-name">${bride.name}</span>
        </div>
      `;
    }

    setText("#greeting-date", formatDate(weddingData.date));
    setText("#greeting-location", `${weddingData.location.name} ${weddingData.location.hall}`);
  }

  /* ─── 3. 갤러리 섹션 ─── */
  let currentLightboxIndex = 0;

  function renderGallery() {
    const section = $("#section-gallery");
    if (!section || !weddingData.sections.gallery) {
      if (section) section.style.display = "none";
      return;
    }

    const grid = $("#gallery-grid");
    if (!grid) return;

    const images = weddingData.gallery;
    grid.innerHTML = images
      .map(
        (src, i) => `
      <div class="gallery-item fade-up" style="--delay:${i * 0.05}s" data-index="${i}">
        <img src="${src}" alt="웨딩 사진 ${i + 1}" loading="lazy"
             onerror="this.closest('.gallery-item').classList.add('img-error')">
      </div>
    `
      )
      .join("");

    // 라이트박스 이벤트
    grid.addEventListener("click", (e) => {
      const item = e.target.closest(".gallery-item");
      if (!item) return;
      openLightbox(parseInt(item.dataset.index, 10));
    });
  }

  function openLightbox(index) {
    currentLightboxIndex = index;
    const lb = $("#lightbox");
    if (!lb) return;
    const img = lb.querySelector(".lightbox-img");
    if (img) img.src = weddingData.gallery[index];
    lb.classList.add("active");
    document.body.style.overflow = "hidden";

    const counter = lb.querySelector(".lightbox-counter");
    if (counter)
      counter.textContent = `${index + 1} / ${weddingData.gallery.length}`;
  }

  function closeLightbox() {
    const lb = $("#lightbox");
    if (!lb) return;
    lb.classList.remove("active");
    document.body.style.overflow = "";
  }

  function moveLightbox(dir) {
    const total = weddingData.gallery.length;
    currentLightboxIndex = (currentLightboxIndex + dir + total) % total;
    openLightbox(currentLightboxIndex);
  }

  function initLightbox() {
    const lb = $("#lightbox");
    if (!lb) return;

    lb.querySelector(".lightbox-close")?.addEventListener("click", closeLightbox);
    lb.querySelector(".lightbox-prev")?.addEventListener("click", () => moveLightbox(-1));
    lb.querySelector(".lightbox-next")?.addEventListener("click", () => moveLightbox(1));
    lb.addEventListener("click", (e) => {
      if (e.target === lb) closeLightbox();
    });

    // 스와이프
    let startX = 0;
    lb.addEventListener("touchstart", (e) => (startX = e.touches[0].clientX), { passive: true });
    lb.addEventListener("touchend", (e) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) moveLightbox(diff > 0 ? 1 : -1);
    }, { passive: true });

    // 키보드
    document.addEventListener("keydown", (e) => {
      if (!lb.classList.contains("active")) return;
      if (e.key === "ArrowLeft") moveLightbox(-1);
      if (e.key === "ArrowRight") moveLightbox(1);
      if (e.key === "Escape") closeLightbox();
    });
  }

  /* ─── 4. 장소 섹션 ─── */
  function renderLocation() {
    const loc = weddingData.location;
    setText("#location-name", loc.name);
    setText("#location-hall", loc.hall);
    setText("#location-address", loc.address);

    const transportEl = $("#location-transport");
    if (transportEl) {
      transportEl.innerHTML = loc.transport
        .map((t) => `<li>${t}</li>`)
        .join("");
    }
    setText("#location-parking", loc.parking);

    // 지도 링크 버튼
    const kakaoBtn = $("#btn-kakaomap");
    const naverBtn = $("#btn-navermap");
    const tmapBtn = $("#btn-tmap");
    if (kakaoBtn) kakaoBtn.href = loc.kakaoMapUrl;
    if (naverBtn) naverBtn.href = loc.naverMapUrl;
    if (tmapBtn) tmapBtn.href = loc.tmapUrl;

    // 카카오맵 임베드
    renderKakaoMap(loc.mapCoord.lat, loc.mapCoord.lng, loc.name);
  }

  function renderKakaoMap(lat, lng, name) {
    const container = $("#kakao-map");
    if (!container) return;

    // 카카오맵 SDK가 로드된 경우에만 초기화
    if (typeof kakao === "undefined" || !kakao.maps) {
      // SDK 없으면 정적 링크 이미지로 대체
      container.innerHTML = `
        <a href="https://map.kakao.com/link/map/${encodeURIComponent(name)},${lat},${lng}"
           target="_blank" rel="noopener" class="map-fallback">
          <span>📍 지도에서 보기</span>
        </a>
      `;
      return;
    }

    const options = {
      center: new kakao.maps.LatLng(lat, lng),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(lat, lng),
    });
    marker.setMap(map);

    const infowindow = new kakao.maps.InfoWindow({
      content: `<div style="padding:5px 10px;font-size:13px;">${name}</div>`,
    });
    infowindow.open(map, marker);
  }

  /* ─── 5. 계좌 섹션 ─── */
  function renderAccounts() {
    const section = $("#section-account");
    if (!section || !weddingData.sections.account) {
      if (section) section.style.display = "none";
      return;
    }

    function buildAccountHTML(accounts, label) {
      return accounts
        .map(
          (acc) => `
        <div class="account-item">
          <div class="account-info">
            <span class="account-bank">${acc.bank}</span>
            <span class="account-holder">${acc.holder}</span>
            <span class="account-number">${acc.number}</span>
          </div>
          <button class="btn-copy" data-number="${acc.number}" aria-label="${acc.holder} 계좌번호 복사">
            복사
          </button>
        </div>
      `
        )
        .join("");
    }

    setHTML("#account-groom", buildAccountHTML(weddingData.accounts.groom, "신랑측"));
    setHTML("#account-bride", buildAccountHTML(weddingData.accounts.bride, "신부측"));

    // 탭 전환
    $$(".account-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        $$(".account-tab").forEach((t) => t.classList.remove("active"));
        $$(".account-panel").forEach((p) => p.classList.remove("active"));
        tab.classList.add("active");
        const target = tab.dataset.target;
        $(`#${target}`)?.classList.add("active");
      });
    });

    // 계좌번호 복사
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-copy");
      if (!btn) return;
      const number = btn.dataset.number;
      copyToClipboard(number, btn);
    });
  }

  function copyToClipboard(text, btn) {
    const fallback = () => {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    };

    const done = () => showToast("계좌번호가 복사되었습니다");

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(done).catch(fallback);
    } else {
      fallback();
      done();
    }
  }

  function showToast(message) {
    let toast = $("#toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "toast";
      toast.setAttribute("role", "alert");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2500);
  }

  /* ─── 6. 버스 & RSVP 섹션 ─── */
  function renderBus() {
    const section = $("#section-bus");
    if (!section) return;

    if (!weddingData.sections.bus) {
      section.style.display = "none";
      return;
    }

    const bus = weddingData.bus;
    setText("#bus-info", bus.info);

    const routesEl = $("#bus-routes");
    if (routesEl && bus.routes) {
      routesEl.innerHTML = bus.routes
        .map(
          (r) => `
        <div class="bus-route">
          <span class="bus-icon">🚌</span>
          <div class="bus-detail">
            <strong>${r.departure}</strong>
            <span>출발 ${r.time} · 귀환 ${r.returnTime}</span>
          </div>
        </div>
      `
        )
        .join("");
    }

    setText("#bus-note", bus.note);
    const busFormBtn = $("#btn-bus-form");
    if (busFormBtn) busFormBtn.href = bus.formUrl;
  }

  function renderRsvp() {
    const section = $("#section-rsvp");
    if (!section || !weddingData.sections.rsvp) {
      if (section) section.style.display = "none";
      return;
    }

    setText("#rsvp-deadline", weddingData.rsvp.deadline);
    const rsvpBtn = $("#btn-rsvp");
    if (rsvpBtn) rsvpBtn.href = weddingData.rsvp.formUrl;
  }

  /* ─── 7. 푸터 & 공유 ─── */
  function renderFooter() {
    setText("#footer-names", `${weddingData.groom.name} ♥ ${weddingData.bride.name}`);

    // 링크 복사
    const copyLinkBtn = $("#btn-copy-link");
    if (copyLinkBtn) {
      copyLinkBtn.addEventListener("click", () => {
        copyToClipboard(location.href, copyLinkBtn);
        showToast("링크가 복사되었습니다");
      });
    }

    // 카카오 공유
    initKakaoShare();
  }

  function initKakaoShare() {
    const btn = $("#btn-kakao-share");
    if (!btn) return;

    btn.addEventListener("click", () => {
      if (typeof Kakao === "undefined" || !Kakao.isInitialized()) {
        showToast("카카오 공유를 사용할 수 없습니다");
        return;
      }

      const share = weddingData.share;
      Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: share.title,
          description: share.description,
          imageUrl: share.imageUrl,
          link: {
            mobileWebUrl: location.href,
            webUrl: location.href,
          },
        },
        buttons: [
          {
            title: "청첩장 보기",
            link: {
              mobileWebUrl: location.href,
              webUrl: location.href,
            },
          },
        ],
      });
    });
  }

  /* ─── 초기화 ─── */
  document.addEventListener("DOMContentLoaded", () => {
    renderCover();
    renderGreeting();
    renderGallery();
    renderLocation();
    renderAccounts();
    renderBus();
    renderRsvp();
    renderFooter();
    initLightbox();
  });
})();
