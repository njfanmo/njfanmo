/*!
 * Fanmo Education Technology - animations.js
 * Advanced animation helpers
 */
'use strict';

(function () {

  document.addEventListener('DOMContentLoaded', function () {
    initTextSplit();
    initMagneticBtns();
    initCardTilt();
    initServiceNumbers();
  });

  /* ---- Text split + stagger ---- */
  function initTextSplit() {
    var targets = document.querySelectorAll('.hero-title');
    targets.forEach(function (el) {
      /* already animated via CSS keyframes in animations.css */
    });
  }

  /* ---- Magnetic buttons ---- */
  function initMagneticBtns() {
    if (window.matchMedia('(hover:none)').matches) return;
    document.querySelectorAll('.btn-gold,.btn-outline').forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var r = btn.getBoundingClientRect();
        var cx = r.left + r.width  / 2;
        var cy = r.top  + r.height / 2;
        var dx = (e.clientX - cx) * 0.22;
        var dy = (e.clientY - cy) * 0.22;
        btn.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
      });
      btn.addEventListener('mouseleave', function () {
        btn.style.transform = '';
      });
    });
  }

  /* ---- Subtle 3D tilt on cards ---- */
  function initCardTilt() {
    if (window.matchMedia('(hover:none)').matches) return;
    document.querySelectorAll('.service-card,.svc-full-card,.val-card,.news-card').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r  = card.getBoundingClientRect();
        var xr = (e.clientX - r.left) / r.width  - 0.5;
        var yr = (e.clientY - r.top)  / r.height - 0.5;
        card.style.transform = 'perspective(700px) rotateY(' + (xr * 5) + 'deg) rotateX(' + (-yr * 5) + 'deg) translateY(-6px)';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  /* ---- Service card hover: show number ---- */
  function initServiceNumbers() {
    document.querySelectorAll('.service-card').forEach(function (card, i) {
      var num = card.querySelector('.svc-num');
      if (num) num.textContent = String(i + 1).padStart(2, '0');
    });
  }

})();
