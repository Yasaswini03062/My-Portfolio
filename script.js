/* =========================================
   YASASWINI PORTFOLIO — script.js
   Loaded at bottom of body, so DOM is
   fully ready before any code runs.
   ========================================= */

/* ── EmailJS init ── */
emailjs.init({ publicKey: "O_Ie2NzGRjxmv5KTk" });

/* =========================================
   goTo(id) — MAIN NAVIGATION FUNCTION
   Called by onclick on every nav button.
   Uses display property directly — the most
   reliable method, works in every browser.
   ========================================= */
function goTo(id) {

  /* 1. Hide all pages */
  var pages = document.getElementsByClassName('page');
  for (var i = 0; i < pages.length; i++) {
    pages[i].style.display = 'none';
  }

  /* 2. Show the target page */
  var target = document.getElementById(id);
  if (target) {
    target.style.display = 'flex';
    target.scrollTop = 0;
  }

  /* 3. Update active nav button */
  var btns = document.getElementsByClassName('nav-btn');
  for (var j = 0; j < btns.length; j++) {
    btns[j].classList.remove('active');
    if (btns[j].getAttribute('data-id') === id) {
      btns[j].classList.add('active');
    }
  }

  /* 4. Close mobile menu */
  var menu = document.getElementById('navMenu');
  var ham  = document.getElementById('ham');
  if (menu) menu.classList.remove('open');
  if (ham)  ham.classList.remove('open');

  /* 5. Animate skill bars when skills page opens */
  if (id === 'skills') {
    setTimeout(animateBars, 120);
  }
}

/* =========================================
   HAMBURGER MENU
   ========================================= */
function toggleMenu() {
  var menu = document.getElementById('navMenu');
  var ham  = document.getElementById('ham');
  if (menu) menu.classList.toggle('open');
  if (ham)  ham.classList.toggle('open');
}

/* Close menu when clicking outside */
document.addEventListener('click', function(e) {
  var menu = document.getElementById('navMenu');
  var ham  = document.getElementById('ham');
  if (menu && ham && !ham.contains(e.target) && !menu.contains(e.target)) {
    menu.classList.remove('open');
    ham.classList.remove('open');
  }
});

/* Close menu on ESC */
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    var menu = document.getElementById('navMenu');
    var ham  = document.getElementById('ham');
    if (menu) menu.classList.remove('open');
    if (ham)  ham.classList.remove('open');
  }
});

/* =========================================
   SKILL BARS ANIMATION
   ========================================= */
function animateBars() {
  var fills = document.getElementsByClassName('bar-fill');
  for (var i = 0; i < fills.length; i++) {
    (function(el, delay) {
      var w = el.getAttribute('data-w') + '%';
      el.style.transition = 'none';
      el.style.width = '0%';
      el.getBoundingClientRect(); /* force reflow */
      el.style.transition = 'width 1.0s ease ' + delay + 's';
      el.style.width = w;
    })(fills[i], i * 0.07);
  }
}

/* =========================================
   KEYBOARD NAVIGATION (arrow keys)
   ========================================= */
var PAGES = ['home', 'about', 'projects', 'skills', 'certificates', 'contact'];

document.addEventListener('keydown', function(e) {
  /* Skip when user is typing in a form field */
  if (['INPUT', 'TEXTAREA'].indexOf(document.activeElement.tagName) !== -1) return;

  /* Find currently visible page */
  var cur = null;
  var pages = document.getElementsByClassName('page');
  for (var i = 0; i < pages.length; i++) {
    if (pages[i].style.display === 'flex') {
      cur = pages[i].id;
      break;
    }
  }

  var idx = PAGES.indexOf(cur);
  if (idx === -1) return;

  if ((e.key === 'ArrowRight' || e.key === 'ArrowDown') && idx < PAGES.length - 1) {
    e.preventDefault();
    goTo(PAGES[idx + 1]);
  }
  if ((e.key === 'ArrowLeft' || e.key === 'ArrowUp') && idx > 0) {
    e.preventDefault();
    goTo(PAGES[idx - 1]);
  }
});

/* =========================================
   CONTACT FORM — EmailJS
   ========================================= */
function sendMail(e) {
  e.preventDefault();

  var name    = document.getElementById('cName').value.trim();
  var email   = document.getElementById('cEmail').value.trim();
  var message = document.getElementById('cMsg').value.trim();
  var btn     = document.getElementById('sendBtn');
  var status  = document.getElementById('fStatus');

  /* Validate */
  if (!name) {
    setStatus(status, 'Please enter your name.', 'err'); return;
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setStatus(status, 'Please enter a valid email address.', 'err'); return;
  }
  if (message.length < 5) {
    setStatus(status, 'Please write a message (at least 5 characters).', 'err'); return;
  }

  /* Loading state */
  btn.disabled = true;
  btn.textContent = 'Sending...';

  /* Send via EmailJS */
  emailjs.send('service_q84nutc', 'template_qtfiyjr', {
    from_name:  name,
    from_email: email,
    message:    message,
    to_name:    'Yasaswini',
    to_email:   'chaluvadhiyasaswini@gmail.com'
  }).then(function() {
    setStatus(status, '✓ Message sent! I will get back to you soon.', 'ok');
    document.getElementById('contactForm').reset();
  }).catch(function() {
    setStatus(status, 'Something went wrong. Please try again.', 'err');
  }).finally(function() {
    btn.disabled = false;
    btn.textContent = 'Send Message';
  });
}

function setStatus(el, msg, type) {
  el.textContent = msg;
  el.className = 'fstatus ' + type;
  setTimeout(function() {
    el.textContent = '';
    el.className = 'fstatus';
  }, 6000);
}

/* =========================================
   INIT — show Home on load
   ========================================= */
goTo('home');