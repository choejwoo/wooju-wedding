// js/main.js — 메인 렌더링 로직

(function () {
  "use strict";

  // weddingData는 data.js에서 직접 로드됨

  /* ─── iOS Safari 핀치 줌 차단 ─── */
  document.addEventListener("gesturestart", (e) => e.preventDefault());
  document.addEventListener("gesturechange", (e) => e.preventDefault());
  document.addEventListener("gestureend", (e) => e.preventDefault());

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
    const minute = d.getMinutes();
    const ampm = hour < 12 ? "오전" : "오후";
    const h = hour <= 12 ? hour : hour - 12;
    const minStr = minute > 0 ? ` ${minute}분` : "";
    return `${year}년 ${month}월 ${day}일 ${dow}요일 ${ampm} ${h}시${minStr}`;
  }

  /* ─── 1. 커버 섹션 ─── */
  function renderCover() {
    setText("#cover-groom-name", weddingData.groom.name);
    setText("#cover-bride-name", weddingData.bride.name);
    setText("#cover-date", formatDate(weddingData.date));
    setText("#cover-location", weddingData.location.name);

    initCoverSlideshow();
  }

  /* ─── 커버 배경 슬라이드쇼 ─── */
  function initCoverSlideshow() {
    const bg = $(".cover-bg");
    if (!bg) return;

    const photos = weddingData.coverPhotos;

    // 사진이 없으면 단일 커버 이미지 폴백
    const sources = (photos && photos.length > 0)
      ? photos
      : [{ src: "images/cover.jpg", type: "png" }];

    // 슬라이드 생성
    const slides = sources.map((photo, i) => {
      const slide = document.createElement("div");
      slide.className = "cover-slide" + (i === 0 ? " active" : "");
      const img = document.createElement("img");
      img.src = photo.src;
      img.alt = "";
      img.setAttribute("aria-hidden", "true");
      img.loading = i === 0 ? "eager" : "lazy";
      slide.appendChild(img);
      bg.appendChild(slide);
      return slide;
    });

    if (slides.length <= 1) return;

    let current = 0;
    setInterval(() => {
      slides[current].classList.remove("active");
      current = (current + 1) % slides.length;
      const next = slides[current];
      next.classList.add("active");
      // ken burns 재실행: animation 리셋
      next.style.animation = "none";
      next.offsetHeight; // reflow
      next.style.animation = "";
    }, 5000);
  }

  /* ─── 연락하기 모달 ─── */
  function renderContactModal() {
    const list = $("#contact-list");
    if (!list) return;

    const { groom, bride } = weddingData;

    // 각 측의 연락처 항목 정의
    const sides = [
      {
        label: "신랑측",
        contacts: [
          { name: groom.name, role: "신랑", phone: groom.phone },
          { name: groom.father, role: "신랑 아버지", phone: groom.fatherPhone },
          { name: groom.mother, role: "신랑 어머니", phone: groom.motherPhone },
        ].filter((c) => c.name && c.phone),
      },
      {
        label: "신부측",
        contacts: [
          { name: bride.name, role: "신부", phone: bride.phone },
          { name: bride.father, role: "신부 아버지", phone: bride.fatherPhone },
          { name: bride.mother, role: "신부 어머니", phone: bride.motherPhone },
        ].filter((c) => c.name && c.phone),
      },
    ];

    const phoneIcon = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91A16 16 0 0016.09 17.09l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7a2 2 0 011.72 2.02z"></path></svg>`;
    const smsIcon = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"></path></svg>`;

    list.innerHTML = sides.map((side) => {
      // 연락처가 하나도 없으면 "—" 표시
      const rows = side.contacts.length > 0
        ? side.contacts.map((c) => `
            <div class="contact-row">
              <div>
                <div class="contact-person-name">${c.name}</div>
                <div class="contact-person-role">${c.role}</div>
              </div>
              <div class="contact-actions">
                <a href="sms:${c.phone}" class="btn-action btn-sms" aria-label="${c.name}에게 문자">
                  ${smsIcon} 문자
                </a>
                <a href="tel:${c.phone}" class="btn-action btn-call" aria-label="${c.name}에게 전화">
                  ${phoneIcon} 전화
                </a>
              </div>
            </div>
          `).join("")
        : `<p style="color:var(--color-text-light);font-size:14px;padding:8px 0;">연락처를 입력해 주세요</p>`;

      return `
        <div class="contact-section">
          <div class="contact-section-label">${side.label}</div>
          ${rows}
        </div>
      `;
    }).join("");
  }

  function initContactModal() {
    const modal = $("#modal-contact");
    if (!modal) return;

    function openModal() {
      // 1) display:flex 로 전환 (렌더링 시작, 아직 translateX(100%) 상태)
      modal.style.display = "flex";
      // 2) 브라우저가 레이아웃을 계산한 뒤 .open 추가 → transition 발동
      void modal.offsetHeight;
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
    }

    function closeModal() {
      // .open 제거 → translateX(100%) 로 슬라이드 아웃
      modal.classList.remove("open");
      // 트랜지션 끝나면 완전히 숨김
      modal.addEventListener("transitionend", () => {
        modal.style.display = "none";
        document.body.style.overflow = "";
      }, { once: true });
    }

    $("#btn-contact-open")?.addEventListener("click", openModal);
    $("#modal-close")?.addEventListener("click", closeModal);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
    });
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

  /* ─── 3. 갤러리 (캐러셀 + 썸네일) ─── */
  let carouselIndex = 0;
  let carouselTotal = 0;

  function renderGallery() {
    const section = $("#section-gallery");
    if (!section) return;

    const images = weddingData.gallery;
    carouselTotal = images.length;
    if (!carouselTotal) return;

    // 데이터 정규화: 문자열 또는 {src, type} 모두 지원
    const items = images.map((img) =>
      typeof img === "string" ? { src: img, type: "png" } : img
    );

    // 캐러셀 슬라이드
    const track = $("#carousel-track");
    if (track) {
      track.innerHTML = items
        .map(
          (item, i) => `
        <div class="carousel-slide" role="listitem" aria-label="사진 ${i + 1}">
          <img src="${item.src}" alt="웨딩 사진 ${i + 1}"
               loading="${i === 0 ? "eager" : "lazy"}"
               onerror="this.closest('.carousel-slide').classList.add('img-error')">
        </div>
      `
        )
        .join("");
    }

    // 도트 인디케이터
    const dotsEl = $("#carousel-dots");
    if (dotsEl) {
      dotsEl.innerHTML = items
        .map(
          (_, i) => `
        <button class="carousel-dot${i === 0 ? " active" : ""}"
                role="tab" aria-label="사진 ${i + 1}" aria-selected="${i === 0}"
                data-index="${i}"></button>
      `
        )
        .join("");
    }

    // 썸네일 그리드
    const thumbsEl = $("#gallery-thumbs");
    if (thumbsEl) {
      thumbsEl.innerHTML = items
        .map(
          (item, i) => `
        <div class="gallery-thumb${i === 0 ? " active" : ""} fade-up"
             style="--delay:${Math.min(i * 0.04, 0.4)}s"
             role="listitem" data-index="${i}"
             tabindex="0" aria-label="사진 ${i + 1}">
          <img src="${item.src}" alt="웨딩 사진 ${i + 1}" loading="lazy"
               onerror="this.closest('.gallery-thumb').classList.add('img-error')">
        </div>
      `
        )
        .join("");

      // 동적으로 추가된 fade-up 요소를 스크롤 옵저버에 등록
      if (typeof window.observeAnimations === "function") {
        window.observeAnimations(thumbsEl.querySelectorAll(".fade-up"));
      }
    }

    initCarousel();
  }

  function goToSlide(index) {
    if (index < 0 || index >= carouselTotal) return;
    carouselIndex = index;

    const track = $("#carousel-track");
    if (track) track.style.transform = `translateX(-${carouselIndex * 100}%)`;

    $$(".carousel-dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === carouselIndex);
      dot.setAttribute("aria-selected", String(i === carouselIndex));
    });

    $$(".gallery-thumb").forEach((thumb, i) => {
      thumb.classList.toggle("active", i === carouselIndex);
    });

    // 처음/마지막 버튼 비활성화
    const prevBtn = $("#carousel-prev");
    const nextBtn = $("#carousel-next");
    if (prevBtn) prevBtn.disabled = carouselIndex === 0;
    if (nextBtn) nextBtn.disabled = carouselIndex === carouselTotal - 1;
  }

  function initCarousel() {
    const trackContainer = $(".carousel-track-container");
    const dotsEl = $("#carousel-dots");
    const thumbsEl = $("#gallery-thumbs");

    // 이전/다음 버튼
    $("#carousel-prev")?.addEventListener("click", () => goToSlide(carouselIndex - 1));
    $("#carousel-next")?.addEventListener("click", () => goToSlide(carouselIndex + 1));

    // 도트
    dotsEl?.addEventListener("click", (e) => {
      const dot = e.target.closest(".carousel-dot");
      if (dot) goToSlide(parseInt(dot.dataset.index, 10));
    });

    // 썸네일 클릭 → 캐러셀 이동
    thumbsEl?.addEventListener("click", (e) => {
      const thumb = e.target.closest(".gallery-thumb");
      if (!thumb) return;
      goToSlide(parseInt(thumb.dataset.index, 10));
      $(".carousel-wrapper")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });

    thumbsEl?.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const thumb = e.target.closest(".gallery-thumb");
      if (thumb) { e.preventDefault(); thumb.click(); }
    });

    // 터치 스와이프
    let touchStartX = 0;
    let touchStartY = 0;
    let isSwiping = false;

    trackContainer?.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      isSwiping = false;
    }, { passive: true });

    trackContainer?.addEventListener("touchmove", (e) => {
      const dx = Math.abs(e.touches[0].clientX - touchStartX);
      const dy = Math.abs(e.touches[0].clientY - touchStartY);
      if (dx > dy && dx > 8) {
        isSwiping = true;
        e.preventDefault(); // 수평 스와이프 시 세로 스크롤 차단
      }
    }, { passive: false });

    trackContainer?.addEventListener("touchend", (e) => {
      if (!isSwiping) return;
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) goToSlide(carouselIndex + (diff > 0 ? 1 : -1));
      isSwiping = false;
    }, { passive: true });

    // 마우스 드래그 (데스크톱)
    let mouseStartX = 0;
    let mouseDown = false;

    trackContainer?.addEventListener("mousedown", (e) => {
      mouseDown = true;
      mouseStartX = e.clientX;
    });
    trackContainer?.addEventListener("mouseup", (e) => {
      if (!mouseDown) return;
      mouseDown = false;
      const diff = mouseStartX - e.clientX;
      if (Math.abs(diff) > 40) goToSlide(carouselIndex + (diff > 0 ? 1 : -1));
    });
    trackContainer?.addEventListener("mouseleave", () => { mouseDown = false; });

    // 키보드 (좌우 화살표)
    document.addEventListener("keydown", (e) => {
      if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName)) return;
      if (e.key === "ArrowLeft") goToSlide(carouselIndex - 1);
      if (e.key === "ArrowRight") goToSlide(carouselIndex + 1);
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

    // 티맵: 앱 딥링크 시도 → 실패 시 앱스토어로 폴백
    if (tmapBtn) {
      tmapBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const tmapDeepLink = loc.tmapUrl;
        const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
        const storeUrl = isIOS
          ? "https://apps.apple.com/kr/app/tmap/id431589174"
          : "https://play.google.com/store/apps/details?id=com.skt.tmap.ku";

        window.location.href = tmapDeepLink;
        setTimeout(() => {
          // 앱이 열리지 않았으면 스토어로
          if (!document.hidden) window.location.href = storeUrl;
        }, 1500);
      });
    }

    // Google Maps iframe 임베드
    renderGoogleMap(loc.mapCoord.lat, loc.mapCoord.lng, loc.name);
  }

  function renderGoogleMap(lat, lng, name) {
    const container = $("#google-map-container");
    if (!container) return;

    container.innerHTML = `
      <iframe
        title="${name} 지도"
        width="100%"
        height="100%"
        style="border:0;display:block;"
        loading="lazy"
        allowfullscreen
        referrerpolicy="no-referrer-when-downgrade"
        src="https://maps.google.com/maps?q=${lat},${lng}&z=16&output=embed&hl=ko">
      </iframe>
    `;
  }

  /* ─── 5. 계좌 섹션 ─── */
  function renderAccounts() {
    const section = $("#section-account");
    if (!section) return;

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
      copyToClipboard(number, "계좌번호가 복사되었습니다");
    });
  }

  function copyToClipboard(text, toastMsg) {
    const fallback = () => {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    };

    const done = () => showToast(toastMsg);

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(done).catch(() => { fallback(); done(); });
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

  /* ─── 6. 푸터 & 공유 ─── */
  function renderFooter() {
    setText("#footer-names", `${weddingData.groom.name} ♥ ${weddingData.bride.name}`);

    // 링크 복사
    const copyLinkBtn = $("#btn-copy-link");
    if (copyLinkBtn) {
      copyLinkBtn.addEventListener("click", () => {
        copyToClipboard(location.href, "링크가 복사되었습니다");
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

  /* ─── BGM ─── */
  function initBGM() {
    const btn = $("#bgm-toggle");
    const audio = $("#bgm-audio");
    if (!btn || !audio) return;

    btn.addEventListener("click", () => {
      if (audio.paused) {
        audio.play().then(() => {
          btn.classList.add("playing");
        }).catch(() => {});
      } else {
        audio.pause();
        btn.classList.remove("playing");
      }
    });
  }

  /* ─── 초기화 ─── */
  document.addEventListener("DOMContentLoaded", () => {
    renderCover();
    renderGreeting();
    renderGallery();
    renderLocation();
    renderAccounts();
    renderFooter();
    renderContactModal();
    initContactModal();
    initBGM();
  });
})();
