/*!
 * Fanmo Education Technology - main.js
 * njfanmo.com
 */
'use strict';

(function () {

  /* ============================================================
     INIT
     ============================================================ */
  document.addEventListener('DOMContentLoaded', function () {
    initLoader();
    initNav();
    initMobileMenu();
    markActive();
    initScrollAnimations();
    initCounters();
    initParallax();
    initScrollProgress();
    initBackToTop();
    initCustomCursor();
    initParticles();
    initContactForm();
  });

  /* ============================================================
     LOADING SCREEN
     ============================================================ */
  function initLoader() {
    var loader = document.querySelector('.loading-screen');
    if (!loader) return;
    document.body.style.overflow = 'hidden';
    window.addEventListener('load', function () {
      setTimeout(function () {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
      }, 1700);
    });
  }

  /* ============================================================
     NAVIGATION
     ============================================================ */
  function initNav() {
    var nav = document.querySelector('.nav');
    if (!nav) return;
    function update() {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ============================================================
     MOBILE MENU
     ============================================================ */
  function initMobileMenu() {
    var burger = document.querySelector('.nav-burger');
    var mobile = document.querySelector('.nav-mobile');
    if (!burger || !mobile) return;
    var open = false;

    burger.addEventListener('click', function () {
      open = !open;
      mobile.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
      burger.setAttribute('aria-expanded', open);
      var spans = burger.querySelectorAll('span');
      if (open) {
        spans[0].style.transform = 'rotate(45deg) translateY(7px)';
        spans[1].style.opacity  = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-7px)';
      } else {
        spans[0].style.transform = spans[1].style.opacity = spans[2].style.transform = '';
      }
    });

    mobile.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        open = false;
        mobile.classList.remove('open');
        document.body.style.overflow = '';
        var spans = burger.querySelectorAll('span');
        spans[0].style.transform = spans[1].style.opacity = spans[2].style.transform = '';
      });
    });
  }

  /* ============================================================
     MARK ACTIVE PAGE
     ============================================================ */
  function markActive() {
    var page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(function (a) {
      if (a.getAttribute('href') === page) a.classList.add('active');
    });
  }

  /* ============================================================
     SCROLL ANIMATIONS (Intersection Observer)
     ============================================================ */
  function initScrollAnimations() {
    var els = document.querySelectorAll('.fade-up,.fade-in,.slide-left,.slide-right,.rev-line');
    if (!els.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('vis');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ============================================================
     COUNTERS
     ============================================================ */
  function initCounters() {
    var els = document.querySelectorAll('[data-count]');
    if (!els.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCount(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    els.forEach(function (el) { io.observe(el); });
  }

  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var dur = 2200;
    var step = target / (dur / 16);
    var cur = 0;
    var t = setInterval(function () {
      cur = Math.min(cur + step, target);
      el.textContent = Math.floor(cur) + suffix;
      if (cur >= target) clearInterval(t);
    }, 16);
  }

  /* ============================================================
     PARALLAX
     ============================================================ */
  function initParallax() {
    var bg = document.querySelector('.hero-bg');
    var content = document.querySelector('.hero-content');
    if (!bg) return;

    function update() {
      var sy = window.scrollY;
      bg.style.transform = 'translateY(' + (sy * 0.28) + 'px) scale(1.08)';
      if (content && sy < window.innerHeight) {
        var opacity = Math.max(0, 1 - (sy / window.innerHeight) * 1.6);
        content.style.transform = 'translateY(' + (sy * 0.14) + 'px)';
        content.style.opacity = opacity;
      }
    }
    window.addEventListener('scroll', update, { passive: true });
  }

  /* ============================================================
     SCROLL PROGRESS
     ============================================================ */
  function initScrollProgress() {
    var bar = document.querySelector('.scroll-progress');
    if (!bar) return;
    window.addEventListener('scroll', function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = 'scaleX(' + (window.scrollY / max) + ')';
    }, { passive: true });
  }

  /* ============================================================
     BACK TO TOP
     ============================================================ */
  function initBackToTop() {
    var btn = document.querySelector('.back-top');
    if (!btn) return;
    window.addEventListener('scroll', function () {
      btn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============================================================
     CUSTOM CURSOR
     ============================================================ */
  function initCustomCursor() {
    var dot  = document.querySelector('.cursor-dot');
    var ring = document.querySelector('.cursor-ring');
    if (!dot || !ring) return;
    if (window.matchMedia('(hover:none)').matches) return;

    var mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    });

    (function animRing() {
      rx += (mx - rx) * 0.14; ry += (my - ry) * 0.14;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(animRing);
    })();

    document.querySelectorAll('a,button,.service-card,.news-card,.svc-full-card,.val-card').forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        ring.style.width = ring.style.height = '58px'; ring.style.opacity = '0.9';
      });
      el.addEventListener('mouseleave', function () {
        ring.style.width = ring.style.height = '36px'; ring.style.opacity = '0.55';
      });
    });
  }

  /* ============================================================
     PARTICLES (Canvas)
     ============================================================ */
  function initParticles() {
    var canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var pts = [];

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function build() {
      pts = [];
      var n = Math.floor((canvas.width * canvas.height) / 16000);
      for (var i = 0; i < n; i++) {
        pts.push({
          x:  Math.random() * canvas.width,
          y:  Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          r:  Math.random() * 1.4 + 0.4,
          op: Math.random() * 0.35 + 0.08,
          gold: Math.random() > 0.55
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.gold
          ? 'rgba(201,168,76,' + p.op + ')'
          : 'rgba(255,255,255,' + (p.op * 0.45) + ')';
        ctx.fill();

        for (var j = i + 1; j < pts.length; j++) {
          var q = pts[j];
          var dx = p.x - q.x, dy = p.y - q.y;
          var d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = 'rgba(201,168,76,' + ((1 - d / 110) * 0.07) + ')';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }

    resize(); build(); draw();
    window.addEventListener('resize', function () { resize(); build(); });
  }

  /* ============================================================
     CONTACT FORM
     ============================================================ */
  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('[type=submit]');
      var orig = btn.textContent;
      btn.textContent = 'Sending…'; btn.disabled = true;
      setTimeout(function () {
        btn.textContent = 'Message Sent!';
        btn.style.background = 'linear-gradient(135deg,#2d6a4f,#40916c)';
        setTimeout(function () {
          btn.textContent = orig; btn.style.background = ''; btn.disabled = false;
          form.reset();
        }, 3000);
      }, 1600);
    });
  }

})();
