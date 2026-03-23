// js/animations.js — Intersection Observer 기반 스크롤 애니메이션

(function () {
  "use strict";

  let scrollObserver = null;

  function initScrollAnimations() {
    const targets = document.querySelectorAll(".fade-up, .fade-in");

    scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            scrollObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    targets.forEach((el) => scrollObserver.observe(el));
  }

  // Expose for dynamically added elements (e.g. gallery thumbnails)
  window.observeAnimations = function (elements) {
    if (!scrollObserver) return;
    elements.forEach((el) => scrollObserver.observe(el));
  };

  function initCoverAnimation() {
    const cover = document.querySelector(".cover-content");
    const section = document.getElementById("section-cover");
    if (cover) {
      setTimeout(() => {
        cover.classList.add("loaded");
        if (section) section.classList.add("loaded");
      }, 200);
    }
  }

  function initScrollArrow() {
    const arrow = document.querySelector(".scroll-arrow");
    if (!arrow) return;

    window.addEventListener(
      "scroll",
      () => {
        if (window.scrollY > 100) {
          arrow.style.opacity = "0";
          arrow.style.pointerEvents = "none";
        } else {
          arrow.style.opacity = "1";
          arrow.style.pointerEvents = "auto";
        }
      },
      { passive: true }
    );
  }

  // D-Day 카운터 (선택 사항)
  function initCountdown(targetDateStr) {
    const el = document.getElementById("countdown");
    if (!el || !targetDateStr) return;

    function update() {
      const now = new Date();
      const target = new Date(targetDateStr);
      const diff = target - now;

      if (diff <= 0) {
        el.textContent = "오늘이에요! 🎉";
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      el.textContent = `D-${days}`;
    }

    update();
    setInterval(update, 60000);
  }

  document.addEventListener("DOMContentLoaded", () => {
    initCoverAnimation();
    initScrollArrow();
    initScrollAnimations();

    if (typeof weddingData !== "undefined") {
      initCountdown(weddingData.date);
    }
  });
})();
