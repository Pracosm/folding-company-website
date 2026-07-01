/* =====================================================================
   The Folding Company — interaction layer
   The page is a pixel-perfect static export. This script runs after React
   commits and wires the rendered DOM into a believable, working website:
   editable prompt, a "fold" flow, toasts, demo + auth modals, a working
   newsletter form, toggles, a sticky nav with scroll-spy, and sane links.
   It reads/writes the live DOM only — the section JSX is never touched.
   ===================================================================== */
(function () {
  'use strict';

  /* ---------- tiny helpers ------------------------------------------- */
  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var norm = function (el) { return (el.textContent || '').replace(/\s+/g, ' ').trim(); };

  // Material Symbols render their name as ligature text, so a button's
  // textContent is polluted with icon words. Match by inclusion instead.
  function has(el, str) { return norm(el).indexOf(str) !== -1; }

  // Find the deepest element whose text equals `str` (a leaf, not a wrapper).
  function leafWithText(str) {
    var hit = null, best = 1e9;
    $$('div,span,p').forEach(function (el) {
      if (norm(el) === str) {
        var n = el.getElementsByTagName('*').length;
        if (n < best) { best = n; hit = el; }
      }
    });
    return hit;
  }

  /* ---------- toast --------------------------------------------------- */
  var toastWrap;
  function toast(msg, opts) {
    opts = opts || {};
    if (!toastWrap) {
      toastWrap = document.createElement('div');
      toastWrap.className = 'fc-toasts';
      document.body.appendChild(toastWrap);
    }
    var t = document.createElement('div');
    t.className = 'fc-toast';
    var lead = '<span class="fc-dot"></span>';
    if (opts.spin) lead = '<span class="fc-spin"></span>';
    else if (opts.icon) lead = '<span class="fc-ico">' + opts.icon + '</span>';
    t.innerHTML = lead + '<span>' + msg + '</span>';
    toastWrap.appendChild(t);
    requestAnimationFrame(function () { t.classList.add('in'); });
    var life = opts.life || 2600;
    var kill = function () {
      t.classList.remove('in');
      setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 420);
    };
    if (!opts.sticky) setTimeout(kill, life);
    return { el: t, dismiss: kill };
  }

  /* ---------- modal scaffold ----------------------------------------- */
  var openOverlay = null;
  function modal(buildInner, wide) {
    closeModal();
    var ov = document.createElement('div');
    ov.className = 'fc-overlay';
    var m = document.createElement('div');
    m.className = 'fc-modal' + (wide ? ' fc-wide' : '');
    var x = document.createElement('button');
    x.className = 'fc-x'; x.textContent = 'close'; x.setAttribute('aria-label', 'Close');
    x.addEventListener('click', closeModal);
    m.appendChild(x);
    buildInner(m);
    ov.appendChild(m);
    ov.addEventListener('mousedown', function (e) { if (e.target === ov) closeModal(); });
    document.body.appendChild(ov);
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(function () { ov.classList.add('in'); });
    openOverlay = ov;
    return m;
  }
  function closeModal() {
    if (!openOverlay) return;
    var ov = openOverlay; openOverlay = null;
    ov.classList.remove('in');
    document.body.style.overflow = '';
    setTimeout(function () { if (ov.parentNode) ov.parentNode.removeChild(ov); }, 320);
  }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

  function pad(inner) {
    var d = document.createElement('div');
    d.style.cssText = 'padding:30px 30px 28px';
    inner.appendChild(d);
    return d;
  }
  function el(tag, css, html) {
    var n = document.createElement(tag);
    if (css) n.style.cssText = css;
    if (html != null) n.innerHTML = html;
    return n;
  }

  /* ---------- auth / checkout modal ---------------------------------- */
  function authModal(title, sub, cta) {
    var m = modal(function (m) {
      var body = pad(m);
      body.appendChild(el('div',
        'font-family:"Geist Mono",monospace;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#0E8A72;margin-bottom:12px',
        'The Folding Company'));
      body.appendChild(el('div',
        'font-size:25px;font-weight:600;letter-spacing:-.03em;color:#0A0A0A;line-height:1.1', title));
      body.appendChild(el('div',
        'font-size:14px;color:#5B6664;line-height:1.5;margin:10px 0 22px', sub));

      var g = el('button', null, '<span style="font-family:\'Geist\';font-weight:600">G</span>&nbsp; Continue with Google');
      g.className = 'fc-ghost'; g.style.marginBottom = '12px';
      g.addEventListener('click', function () { closeModal(); toast('Connecting to Google…', { spin: true, life: 1700 }); });
      body.appendChild(g);

      body.appendChild(el('div',
        'display:flex;align-items:center;gap:12px;margin:4px 0 14px;color:#A9A39A;font-size:11px;font-family:"Geist Mono",monospace;letter-spacing:.1em',
        '<span style="flex:1;height:1px;background:#ECEAE4"></span>OR<span style="flex:1;height:1px;background:#ECEAE4"></span>'));

      var input = el('input'); input.className = 'fc-field';
      input.type = 'email'; input.placeholder = 'you@studio.com'; input.style.marginBottom = '12px';
      body.appendChild(input);

      var btn = el('button', null, (cta || 'Continue') +
        ' <span style="font-family:\'Material Symbols Rounded\';font-size:16px">arrow_forward</span>');
      btn.className = 'fc-primary';
      var go = function () {
        var v = input.value.trim();
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) {
          input.style.borderColor = '#E0736A';
          input.style.boxShadow = '0 0 0 3px rgba(224,115,106,.16)';
          input.focus();
          return;
        }
        closeModal();
        toast('Magic link sent to ' + v, { icon: 'mark_email_read', life: 3200 });
      };
      btn.addEventListener('click', go);
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter') go(); });
      input.addEventListener('input', function () { input.style.borderColor = ''; input.style.boxShadow = ''; });
      body.appendChild(btn);

      body.appendChild(el('div',
        'font-size:11.5px;color:#9A948A;text-align:center;margin-top:14px;line-height:1.5',
        'No password. We email you a one-tap link.'));
      setTimeout(function () { input.focus(); }, 360);
    });
    return m;
  }

  /* ---------- sign-in gate (Paper S01 · "Sign in to fold your box") -- */
  var EMAIL_GRAD = 'linear-gradient(in oklab 115deg, oklab(50% -0.091 0.008) 0%, oklab(77% -0.142 0.015) 60%, oklab(50% -0.091 0.008) 185%)';
  var GOOGLE_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" style="flex-shrink:0"><path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.71 17.57V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/><path d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.71 17.57C14.73 18.23 13.48 18.63 12 18.63C9.14 18.63 6.71 16.7 5.84 14.1H2.18V16.94C3.99 20.53 7.7 23 12 23Z" fill="#34A853"/><path d="M5.84 14.09C5.62 13.43 5.49 12.73 5.49 12C5.49 11.27 5.62 10.57 5.84 9.91V7.07H2.18C1.43 8.55 1 10.22 1 12C1 13.78 1.43 15.45 2.18 16.93L5.84 14.09Z" fill="#FBBC05"/><path d="M12 5.38C13.62 5.38 15.06 5.94 16.21 7.02L19.36 3.87C17.45 2.09 14.97 1 12 1C7.7 1 3.99 3.47 2.18 7.07L5.84 9.91C6.71 7.31 9.14 5.38 12 5.38Z" fill="#EA4335"/></svg>';
  var APPLE_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" style="flex-shrink:0"><path d="M17.05 20.28C16.07 21.23 15 21.08 13.95 20.62C12.85 20.15 11.85 20.13 10.7 20.62C9.21 21.26 8.43 21.06 7.55 20.28C2.93 15.5 3.66 8.13 8.97 7.91C10.34 7.95 11.32 8.6 12.13 8.65C13.34 8.4 14.5 7.69 15.84 7.77C17.51 7.9 18.78 8.55 19.61 9.7C16.21 11.86 17.05 16.07 19.94 17.36C19.32 18.51 18.51 19.65 17.04 20.29M12.03 7.87C11.87 6.07 13.31 4.58 14.98 4.43C15.21 6.51 13.08 8.07 12.03 7.87Z" fill="#FFFFFF"/></svg>';
  function sgStat(n, l) {
    return '<div style="display:flex;flex-direction:column;gap:6px">' +
      '<span style="font-family:\'Geist\',system-ui,sans-serif;font-weight:500;font-size:32px;letter-spacing:-1.2px;color:#041713">' + n + '</span>' +
      '<span style="font-family:\'Geist Mono\',system-ui,sans-serif;color:#8A8378;font-size:10px;letter-spacing:1.1px;text-transform:uppercase">' + l + '</span></div>';
  }
  function signInGate() {
    closeModal();
    var SGDIV = '<span style="width:1px;align-self:stretch;background:#E4E1DA"></span>';
    var MONO11 = 'font-family:\'Geist Mono\',system-ui,sans-serif;color:#8A8378;font-size:11px;letter-spacing:.8px';
    var LABEL = 'font-family:\'Geist Mono\',system-ui,sans-serif;color:#8A8378;font-size:10px;letter-spacing:.12em';
    var ov = el('div', 'position:fixed;inset:0;z-index:10040;display:flex;background:#fff;opacity:0;transition:opacity .3s ease;overflow:auto');
    ov.innerHTML = [
      '<style>',
      '.sg-input{width:100%;box-sizing:border-box;height:48px;border:1px solid #E7E7E5;border-radius:12px;padding:0 14px;font-family:"Geist",system-ui,sans-serif;font-size:14px;color:#041713;background:#fff;outline:none;transition:border-color .18s,box-shadow .18s}',
      '.sg-input::placeholder{color:#8A8378}',
      '.sg-input:focus,.sg-field:focus-within{border-color:#1CD1AD;box-shadow:0 0 0 3px rgba(28,209,173,.16)}',
      '.sg-btn{cursor:pointer;border:none;background:none}',
      '.sg-act:hover{filter:brightness(.97)}',
      '@media (max-width:920px){.sg-left{display:none !important}}',
      '</style>',
      '<div class="sg-left" style="flex:1 1 0;min-width:0;position:relative;overflow:hidden;display:flex;flex-direction:column;justify-content:space-between;padding:48px 56px;background:#EAF6F1;min-height:100vh;box-sizing:border-box">',
        '<video src="assets/auth/login.mp4" autoplay loop playsinline style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0"></video>',
        '<img src="assets/auth/logo-full.png" alt="The Folding Company" style="width:150px;height:auto;position:relative;z-index:1">',
        '<div style="display:flex;flex-direction:column;gap:28px;position:relative;z-index:1">',
          '<div style="display:inline-flex;align-items:center;align-self:flex-start;gap:8px;border-radius:999px;padding:5px 12px;background:#1CD1AD1F;border:1px solid #1CD1AD59">',
            '<span style="width:6px;height:6px;border-radius:50%;background:#1CD1AD"></span>',
            '<span style="font-family:\'Geist Mono\',system-ui,sans-serif;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:#0E8A72;font-size:11px">Welcome back</span>',
          '</div>',
          '<div style="font-family:\'Geist\',system-ui,sans-serif;font-weight:500;font-size:56px;line-height:105%;letter-spacing:-3px;color:#041713;max-width:640px">Pick up where you left off.</div>',
          '<div style="font-family:\'Geist\',system-ui,sans-serif;font-size:17px;line-height:150%;color:#5A5448;max-width:480px">Your designs, dielines, and 3D renders — right where you parked them. Sign in to keep shipping.</div>',
          '<div style="display:flex;gap:24px;margin-top:8px">' + sgStat('240', 'Dielines') + SGDIV + sgStat('1.8s', 'Avg. render') + SGDIV + sgStat('12k+', 'Boxes shipped') + '</div>',
        '</div>',
        '<div style="display:flex;flex-direction:column;gap:14px;max-width:540px;border-radius:16px;padding:22px;background:#fff;border:1px solid #ECECE8;box-shadow:#0A0A0A0A 0px 8px 24px -12px;position:relative;z-index:1">',
          '<svg width="20" height="20" viewBox="0 0 24 24" style="flex-shrink:0"><path d="M4 14 C4 8 7 4.5 11 3.5 L11 6.5 C8.8 7.4 7.6 9.2 7.4 11 L10.5 11 L10.5 18 L4 18 Z" fill="#1CD1AD"/><path d="M13.5 14 C13.5 8 16.5 4.5 20.5 3.5 L20.5 6.5 C18.3 7.4 17.1 9.2 16.9 11 L20 11 L20 18 L13.5 18 Z" fill="#1CD1AD"/></svg>',
          '<div style="font-family:\'Geist\',system-ui,sans-serif;font-size:15px;line-height:150%;color:#041713">&quot;We replaced six weeks of back-and-forth with one prompt. Genie nailed the dieline on the second try.&quot;</div>',
          '<div style="display:flex;align-items:center;gap:10px">',
            '<div style="width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;background-image:linear-gradient(135deg,#28332E,#141A17)"><span style="font-family:\'Geist\',system-ui,sans-serif;font-weight:600;color:#fff;font-size:12px">AC</span></div>',
            '<div style="display:flex;flex-direction:column">',
              '<span style="font-family:\'Geist\',system-ui,sans-serif;font-weight:500;color:#041713;font-size:13px">Anika Chowdhury</span>',
              '<span style="font-family:\'Geist Mono\',system-ui,sans-serif;color:#8A8378;font-size:10px;letter-spacing:.8px">Founder · Artisan Coffee Collective</span>',
            '</div>',
          '</div>',
        '</div>',
      '</div>',
      '<div class="sg-right" style="flex:1 1 0;min-width:0;background:#fff;display:flex;flex-direction:column;justify-content:space-between;align-items:center;padding:48px 56px;position:relative;min-height:100vh;box-sizing:border-box">',
        '<div style="display:flex;align-items:center;justify-content:flex-end;gap:12px;width:100%;max-width:520px">',
          '<span data-switch-label style="font-family:\'Geist\',system-ui,sans-serif;color:#8A8378;font-size:14px">Already have an account?</span>',
          '<button class="sg-btn" data-act="switch" style="border:1px solid #E7E7E5;border-radius:10px;padding:8px 16px;font-family:\'Geist\',system-ui,sans-serif;font-weight:500;color:#041713;font-size:14px;background:#fff">Sign in</button>',
        '</div>',
        '<div style="display:flex;flex-direction:column;gap:18px;width:440px;max-width:100%">',
          '<div style="display:flex;flex-direction:column;gap:8px">',
            '<div data-title style="font-family:\'Geist\',system-ui,sans-serif;font-weight:500;font-size:34px;line-height:1.2;letter-spacing:-.03em;color:#0A0A0A">Create your account</div>',
            '<div data-sub style="font-family:\'Geist\',system-ui,sans-serif;font-size:15px;color:#5A5448">Start with 50 free folds. No card required.</div>',
          '</div>',
          '<div style="display:flex;gap:10px">',
            '<button class="sg-btn sg-act" data-act="google" style="flex:1;display:flex;align-items:center;justify-content:center;gap:8px;border:1px solid #E4E1DA;border-radius:12px;padding:12px;background:#fff">' + GOOGLE_SVG + '<span style="font-family:\'Geist\',system-ui,sans-serif;font-weight:500;color:#041713;font-size:13px">Continue with Google</span></button>',
            '<button class="sg-btn sg-act" data-act="apple" style="flex:1;display:flex;align-items:center;justify-content:center;gap:8px;border-radius:12px;padding:12px;background:#041713">' + APPLE_SVG + '<span style="font-family:\'Geist\',system-ui,sans-serif;font-weight:500;color:#fff;font-size:13px">Continue with Apple</span></button>',
          '</div>',
          '<div style="display:flex;align-items:center;gap:12px"><span style="flex:1;height:1px;background:#ECECE8"></span><span style="' + LABEL + '">OR WITH EMAIL</span><span style="flex:1;height:1px;background:#ECECE8"></span></div>',
          '<div data-studio-wrap style="display:flex;flex-direction:column;gap:6px">',
            '<label style="' + LABEL + '">STUDIO NAME</label>',
            '<input class="sg-input" data-field="studio" placeholder="e.g. Aakar Labs">',
          '</div>',
          '<div style="display:flex;flex-direction:column;gap:6px">',
            '<label style="' + LABEL + '">EMAIL</label>',
            '<div class="sg-field" style="display:flex;align-items:center;gap:10px;height:48px;border:1px solid #E7E7E5;border-radius:12px;padding:0 14px;transition:border-color .18s,box-shadow .18s"><span style="font-family:\'Material Symbols Rounded\',system-ui,sans-serif;color:#8A8378;font-size:18px">mail</span><input data-field="email" type="email" placeholder="you@studio.com" style="flex:1;border:none;outline:none;background:none;font-family:\'Geist\',system-ui,sans-serif;font-size:14px;color:#041713"></div>',
          '</div>',
          '<button class="sg-btn sg-act" data-act="create" style="display:flex;align-items:center;justify-content:center;gap:8px;height:50px;border-radius:12px;background-image:' + EMAIL_GRAD + '"><span data-cta style="font-family:\'Geist\',system-ui,sans-serif;font-weight:600;color:#fff;font-size:15px">Create account</span><span style="font-family:\'Material Symbols Rounded\',system-ui,sans-serif;color:#fff;font-size:18px">arrow_forward</span></button>',
          '<div style="font-family:\'Geist\',system-ui,sans-serif;color:#8A8378;font-size:12px">By continuing you agree to the Terms and Privacy Policy.</div>',
        '</div>',
        '<div style="display:flex;align-items:center;justify-content:space-between;width:100%;max-width:520px">',
          '<div style="display:flex;align-items:center;gap:18px"><span style="' + MONO11 + '">© 2026 Folding Co.</span><span style="' + MONO11 + '">Terms</span><span style="' + MONO11 + '">Privacy</span></div>',
          '<div style="display:flex;align-items:center;gap:6px"><span style="width:6px;height:6px;border-radius:50%;background:#1CD1AD"></span><span style="' + MONO11 + ';text-transform:uppercase">All systems operational</span></div>',
        '</div>',
      '</div>',
      '<button class="fc-x" data-act="close" aria-label="Close" style="position:fixed;top:20px;right:20px;z-index:3">close</button>',
    ].join('');

    var mode = 'signup';
    function applyMode() {
      var s = mode === 'signup';
      ov.querySelector('[data-studio-wrap]').style.display = s ? 'flex' : 'none';
      ov.querySelector('[data-title]').textContent = s ? 'Create your account' : 'Welcome back';
      ov.querySelector('[data-sub]').textContent = s ? 'Start with 50 free folds. No card required.' : 'Sign in to your studio — pick up where you left off.';
      ov.querySelector('[data-cta]').textContent = s ? 'Create account' : 'Sign in';
      ov.querySelector('[data-switch-label]').textContent = s ? 'Already have an account?' : 'New to Folding Co.?';
      ov.querySelector('[data-act="switch"]').textContent = s ? 'Sign in' : 'Create account';
    }
    function submit() {
      var email = ov.querySelector('[data-field="email"]');
      var wrap = email.parentNode;
      var v = email.value.trim();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) { wrap.style.borderColor = '#E0736A'; wrap.style.boxShadow = '0 0 0 3px rgba(224,115,106,.16)'; email.focus(); return; }
      closeModal();
      toast(mode === 'signup' ? 'Studio created — magic link sent to ' + v : 'Magic link sent to ' + v, { icon: 'mark_email_read', life: 3200 });
    }
    ov.addEventListener('click', function (e) {
      var b = e.target.closest('[data-act]'); if (!b) return;
      var a = b.getAttribute('data-act');
      if (a === 'close') return closeModal();
      if (a === 'switch') { mode = mode === 'signup' ? 'signin' : 'signup'; applyMode(); return; }
      if (a === 'google') { closeModal(); return toast('Connecting to Google…', { spin: true, life: 1700 }); }
      if (a === 'apple') { closeModal(); return toast('Connecting to Apple…', { spin: true, life: 1700 }); }
      if (a === 'create') return submit();
    });
    var emailInput = ov.querySelector('[data-field="email"]');
    emailInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') submit(); });
    emailInput.addEventListener('input', function () { emailInput.parentNode.style.borderColor = ''; emailInput.parentNode.style.boxShadow = ''; });

    document.body.appendChild(ov);
    document.body.style.overflow = 'hidden';
    var vid = ov.querySelector('video');
    if (vid) { vid.muted = false; vid.volume = 1; var vp = vid.play(); if (vp && vp.catch) vp.catch(function () {}); }
    requestAnimationFrame(function () { ov.style.opacity = '1'; });
    openOverlay = ov;
    return ov;
  }

  /* ---------- demo player modal -------------------------------------- */
  function demoModal() {
    modal(function (m) {
      var player = el('div'); player.className = 'fc-player';
      var glow = el('div', 'position:absolute;inset:0;background:radial-gradient(circle at 50% 42%,rgba(28,209,173,.22),transparent 60%);pointer-events:none');
      player.appendChild(glow);
      var play = el('button'); play.className = 'fc-play'; play.textContent = 'play_arrow';
      player.appendChild(play);
      var cap = el('div', 'position:absolute;left:18px;top:16px;font-family:"Geist Mono",monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.7)', 'Watch the fold · 1:38');
      player.appendChild(cap);
      var scrub = el('div'); scrub.className = 'fc-scrub';
      var bar = el('i'); scrub.appendChild(bar); player.appendChild(scrub);
      m.appendChild(player);

      var foot = el('div', 'padding:18px 24px;display:flex;align-items:center;justify-content:space-between;gap:16px');
      foot.appendChild(el('div', 'font-family:"Geist";font-size:15px;font-weight:600;color:#0A0A0A',
        'From one sentence to a press-ready box'));
      var book = el('button', null, 'Book a 15-min demo'); book.className = 'fc-ghost'; book.style.width = 'auto';
      book.addEventListener('click', function () { closeModal(); toast('Opening the scheduler…', { spin: true, life: 1700 }); });
      foot.appendChild(book);
      m.appendChild(foot);

      var playing = false, pct = 0, timer = null;
      function tick() {
        pct += 0.7; if (pct >= 100) { pct = 100; stop(true); }
        bar.style.width = pct + '%';
        cap.textContent = 'Watch the fold · ' + fmt(pct) + ' / 1:38';
      }
      function fmt(p) { var s = Math.round(98 * p / 100); return Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2); }
      function start() { playing = true; play.textContent = 'pause'; play.style.opacity = '0'; timer = setInterval(tick, 60); }
      function stop(done) { playing = false; play.textContent = done ? 'replay' : 'play_arrow'; play.style.opacity = '1'; clearInterval(timer); }
      play.addEventListener('click', function () {
        if (playing) { stop(false); }
        else { if (pct >= 100) { pct = 0; bar.style.width = '0'; } start(); }
      });
      start();
    }, true);
  }

  /* ---------- newsletter form (footer) ------------------------------- */
  function wireNewsletter() {
    var ph = leafWithText('Drop your email — one letter, every full moon');
    if (!ph) return;
    var input = el('input');
    input.type = 'email';
    input.placeholder = 'Drop your email — one letter, every full moon';
    input.style.cssText = 'flex:1;min-width:0;border:none;background:transparent;outline:none;' +
      'font-family:"Geist",system-ui,sans-serif;font-size:14px;color:#1A1108;padding:0';
    ph.replaceWith(input);

    var btn = $$('[role="button"]').filter(function (b) { return has(b, 'Subscribe'); })[0];
    if (!btn) return;
    var pill = input.closest('div').parentNode; // the bordered pill row
    function submit() {
      var v = input.value.trim();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) {
        input.focus();
        toast('Enter a valid email to subscribe', { icon: 'error', life: 2400 });
        return;
      }
      // collapse the pill into a confirmation
      if (pill) {
        pill.innerHTML = '<div style="display:flex;align-items:center;gap:9px;padding:6px 8px;' +
          'color:#0B7460;font-family:\'Geist\';font-size:14px;font-weight:500">' +
          '<span style="font-family:\'Material Symbols Rounded\';font-size:18px;font-variation-settings:\'FILL\' 1">check_circle</span>' +
          'Subscribed — watch for the next full moon.</div>';
      }
      toast('Subscribed ✓ confirmation sent to ' + v, { icon: 'mark_email_read', life: 3200 });
    }
    btn.addEventListener('click', submit);
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') submit(); });
  }

  /* ---------- editable hero prompt + example chips -------------------- */
  var promptEl = null;
  var PROMPTS = [
    'A 240gsm rigid mailer for premium skincare, soft-touch matte, navy & gold foil',
    'A kraft single-origin coffee bag, 250g, matte finish with a one-way degassing valve',
    'A tri-fold wine sleeve for a 750ml bottle, deep deboss and copper foil',
    'A friction-fit matcha tin, 100g, embossed lid in sage green',
    'A magnetic-closure rigid mailer, 1200gsm, soft-touch black with spot UV',
    'A hexagonal candle carton, recycled board, blind emboss and a tuck-top lid',
    'A Diwali sweets box shaped like a trapezoid, kraft brown with gold foil'
  ];
  var CHIP_PROMPT = {
    'Skincare carton': PROMPTS[0],
    'Single-origin coffee': PROMPTS[1],
    'Wine sleeve': PROMPTS[2],
    'Matcha tin': PROMPTS[3],
    'Rigid mailer': PROMPTS[4]
  };
  function wirePrompt() {
    promptEl = leafWithText('A 240gsm rigid mailer for premium skincare, soft matte, navy & gold foil');
    if (!promptEl) return;
    promptEl.classList.add('fc-prompt');
    promptEl.setAttribute('contenteditable', 'true');
    promptEl.setAttribute('spellcheck', 'false');
    promptEl.setAttribute('role', 'textbox');
    promptEl.setAttribute('aria-label', 'Describe the packaging you want');
    promptEl.setAttribute('data-ph', 'Describe a box in one sentence…');
    promptEl.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); runFold(); }
    });
  }
  function setPrompt(text) {
    if (!promptEl) return;
    promptEl.textContent = text;
    promptEl.focus();
    // place caret at end
    var r = document.createRange(); r.selectNodeContents(promptEl); r.collapse(false);
    var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
  }

  /* ---------- the "fold" flow ---------------------------------------- */
  var folding = false;
  function runFold() {
    if (folding) return;
    var brief = promptEl ? norm(promptEl) : '';
    if (promptEl && !brief) { promptEl.focus(); toast('Type a sentence first ✍️', { icon: 'edit', life: 2200 }); return; }
    folding = true;
    var statusEl = leafWithText('Live · Genie is folding') ||
                   leafWithText('Live · genie is folding'.replace('genie', 'Genie'));
    var orig = statusEl ? statusEl.textContent : null;
    var steps = ['Folding · reading the brief', 'Folding · choosing a dieline', 'Folding · applying materials', 'Folding · hot-foil pass'];
    var t = toast(steps[0], { spin: true, sticky: true });
    var i = 0;
    var iv = setInterval(function () {
      i++;
      if (i < steps.length) {
        t.el.querySelector('span:last-child').textContent = steps[i];
        if (statusEl) statusEl.textContent = steps[i].toUpperCase();
      } else {
        clearInterval(iv);
        t.dismiss();
        if (statusEl) statusEl.textContent = 'Folded ✓ · rendered in 1.8s';
        var done = toast('Folded ✓ your box is ready — open it in the Studio', { icon: 'check_circle', sticky: true });
        var link = el('button', 'margin-left:4px;background:#1CD1AD;color:#053D31;border:none;border-radius:8px;' +
          'padding:6px 11px;font-family:"Geist";font-size:12.5px;font-weight:600;cursor:pointer', 'Open');
        link.addEventListener('click', function () { done.dismiss(); authModal('Open your fold', 'Sign in to open this box in the 3D Studio and export print files.', 'Open Studio'); });
        done.el.appendChild(link);
        setTimeout(function () { done.dismiss(); if (statusEl && orig != null) statusEl.textContent = orig; folding = false; }, 6000);
        return;
      }
    }, 850);
  }

  /* ---------- toggles ------------------------------------------------- */
  function activateBilling(clicked, other) {
    [clicked, other].forEach(function (p) {
      var label = $('div', p);
      var active = p === clicked;
      p.style.backgroundColor = active ? '#00FFBD' : 'transparent';
      if (label) label.style.color = active ? '#0A0A0A' : '#5C5C5C';
    });
  }
  function wireBillingToggle() {
    var pills = $$('[role="button"]').filter(function (b) {
      var t = norm(b); return t === 'Short Term' || t === 'Long Term';
    });
    if (pills.length < 2) return;
    var shortP = pills.filter(function (p) { return norm(p) === 'Short Term'; })[0];
    var longP  = pills.filter(function (p) { return norm(p) === 'Long Term'; })[0];
    // price nodes
    var month = leafWithText('₹830'), day = leafWithText('₹125');
    var monthState = { 'short': '₹830', 'long': '₹690' };
    var dayState   = { 'short': '₹125', 'long': '₹99' };
    function set(mode) {
      if (month) month.textContent = monthState[mode];
      if (day) day.textContent = dayState[mode];
    }
    shortP.addEventListener('click', function () { activateBilling(shortP, longP); set('short'); });
    longP.addEventListener('click', function () {
      activateBilling(longP, shortP); set('long');
      toast('Long-term billing · save ~17%', { icon: 'savings', life: 2400 });
    });
  }

  function wireMaterialToggle() {
    // hero "Physical / Digital" segmented control
    var phys = $$('[role="button"]').filter(function (b) { return norm(b) === 'Physical'; })[0];
    var digi = $$('[role="button"]').filter(function (b) { return norm(b) === 'Digital'; })[0];
    if (!phys || !digi) return;
    function pick(on, off) {
      on.style.backgroundColor = '#FFFFFF';
      on.style.boxShadow = '#1A11080F 0px 1px 2px';
      off.style.backgroundColor = 'transparent';
      off.style.boxShadow = 'none';
      var onTxt = on.querySelector('div:last-child'), offTxt = off.querySelector('div:last-child');
      if (onTxt) onTxt.style.color = '#041713';
      if (offTxt) offTxt.style.color = '#5A5448';
    }
    phys.addEventListener('click', function () { pick(phys, digi); });
    digi.addEventListener('click', function () { pick(digi, phys); });
  }

  function wireExtraOptions() {
    var chip = $$('[role="button"]').filter(function (b) { return has(b, 'Extra options'); })[0];
    if (!chip) return;
    var track = chip.querySelector('div:last-child');
    var knob = track && track.querySelector('div');
    if (!knob) return;
    var on = false;
    chip.addEventListener('click', function () {
      on = !on;
      track.style.justifyContent = on ? 'flex-end' : 'flex-start';
      track.style.backgroundColor = on ? '#1CD1AD' : '#E2E7EE';
      track.style.transition = 'background-color .2s ease';
    });
  }

  /* ---------- shape carousel: infinite auto-scroll loop -------------- */
  function wireShapeRail() {
    var rail = document.querySelector('.fc-shape-rail');
    if (!rail) return;
    var sec = rail.closest('section');
    var originals = Array.prototype.slice.call(rail.children);
    var ORIG = originals.length; // 11

    // clone the whole set once so the rail can wrap seamlessly
    originals.forEach(function (c, idx) {
      var clone = c.cloneNode(true);
      clone.classList.remove('reveal');   // bypass the scroll-reveal opacity:0
      clone.classList.add('in');
      clone.setAttribute('aria-hidden', 'true');
      if (idx === 0) { clone.style.borderColor = '#E7E7E5'; clone.style.borderWidth = '1px'; clone.style.boxShadow = 'none'; }
      rail.appendChild(clone);
    });
    var cards = Array.prototype.slice.call(rail.children); // 22

    function step() { return (cards[0] ? cards[0].offsetWidth : 200) + 16; }
    function half() { return step() * ORIG; }
    function wrap() {
      var h = half();
      if (rail.scrollLeft >= h) rail.scrollLeft -= h;
      else if (rail.scrollLeft < 0) rail.scrollLeft += h;
    }

    // live "01 / 11" counter
    var counter = $$('div', sec).filter(function (d) {
      return !d.children.length && /^\d{1,2}\s*\/\s*\d{1,2}$/.test(norm(d));
    })[0];
    function update() {
      if (!counter) return;
      var i = ((Math.round(rail.scrollLeft / step()) % ORIG) + ORIG) % ORIG;
      counter.textContent = ('0' + (i + 1)).slice(-2) + ' / ' + ORIG;
    }
    rail.addEventListener('scroll', function () { requestAnimationFrame(update); }, { passive: true });

    // continuous auto-scroll (pauses on hover / interaction, then resumes).
    // We accumulate position in JS and assign it, so sub-pixel steps aren't
    // lost to scrollLeft rounding. While paused, pos tracks the real scroll
    // position (so manual scrolls and arrow glides hand back cleanly).
    var paused = false, resumeT, last = 0, pos = rail.scrollLeft;
    function tick(ts) {
      var dt = last ? Math.min(ts - last, 48) : 16; last = ts;
      if (paused) { pos = rail.scrollLeft; }
      else {
        pos += dt * 0.04; // ~40px/s
        var h = half();
        if (pos >= h) pos -= h; else if (pos < 0) pos += h;
        rail.scrollLeft = pos;
        update();
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    function holdThenResume() { paused = true; clearTimeout(resumeT); resumeT = setTimeout(function () { paused = false; }, 2600); }
    rail.addEventListener('pointerenter', function () { paused = true; clearTimeout(resumeT); });
    rail.addEventListener('pointerleave', function () { paused = false; });
    rail.addEventListener('wheel', holdThenResume, { passive: true });
    rail.addEventListener('touchstart', function () { paused = true; clearTimeout(resumeT); }, { passive: true });
    rail.addEventListener('touchend', holdThenResume, { passive: true });

    // arrow nudge — eased one-card glide, then wrap (no fight with auto-scroll)
    rail._fcArrow = function (dir) {
      holdThenResume();
      var startL = rail.scrollLeft, delta = dir * step(), t0 = 0, dur = 340;
      function anim(ts) {
        if (!t0) t0 = ts;
        var k = Math.min(1, (ts - t0) / dur), e = 1 - Math.pow(1 - k, 3);
        rail.scrollLeft = startL + delta * e;
        if (k < 1) requestAnimationFrame(anim); else wrap();
      }
      requestAnimationFrame(anim);
    };

    // click a shape to select it (teal highlight follows)
    var selected = cards[0];
    cards.forEach(function (c) {
      c.dataset.ob = c.style.borderColor;
      c.dataset.ow = c.style.borderWidth;
      c.dataset.os = c.style.boxShadow;
      c.style.cursor = 'pointer';
      c.addEventListener('click', function () {
        if (selected && selected !== c) {
          selected.style.borderColor = selected.dataset.ob;
          selected.style.borderWidth = selected.dataset.ow;
          selected.style.boxShadow = selected.dataset.os;
        }
        c.style.borderColor = '#1CD1AD';
        c.style.borderWidth = '2px';
        c.style.boxShadow = '#1CD1AD2E 0px 4px 12px';
        selected = c;
        var title = c.lastElementChild && c.lastElementChild.lastElementChild ? norm(c.lastElementChild.lastElementChild) : '';
        if (title.indexOf('Describe it') !== -1) { toast('Describe your own shape in the prompt above', { icon: 'auto_awesome', life: 2600 }); }
        else if (title) { toast('“' + title + '” selected', { icon: 'check', life: 1900 }); }
      });
    });
  }

  /* ---------- sticky header (exact clone of the hero nav) ------------- */
  var HERO_LOGO = 'https://app.paper.design/file-assets/01KTNNTSJJ3G5MHVGA4S55GZJX/3DP33PM6ACEEK3BY0FE80V9ESE.png';
  var NAV = [
    { label: 'Pricing',   id: 'pricing',   dark: false },
    { label: 'Materials', id: 'materials', dark: false },
    { label: 'Library',   id: 'templates', dark: false },
    { label: 'Studio',    id: 'studio',    dark: true }
  ];
  function smoothTo(id) {
    var t = document.getElementById(id);
    if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  function buildHeader() {
    var bar = el('div'); bar.className = 'fc-stick';
    var inner = el('div', 'width:100%;max-width:1280px;box-sizing:border-box;padding:13px 32px;' +
      'display:flex;align-items:center;justify-content:space-between;gap:24px');

    // logo — same asset / drop-shadow as the hero
    var logo = el('button', 'border:none;background-color:transparent;cursor:pointer;flex-shrink:0;padding:0;' +
      'height:42px;width:104px;background-image:url(' + HERO_LOGO + ');background-position:50%;' +
      'background-repeat:no-repeat;background-size:contain;filter:drop-shadow(#04171359 0px 1px 4px)');
    logo.setAttribute('aria-label', 'Folding Co. — back to top');
    logo.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

    // centre nav pill — identical styling to the hero
    var pill = el('div', 'align-items:center;background-image:linear-gradient(in oklab 180deg, oklab(100% 0 0 / 85%) 0%, oklab(100% 0 0 / 85%) 100%);' +
      'background-origin:border-box;border:1px solid #E4E1DAAB;border-radius:999px;box-shadow:#0417131A 0px 2px 8px -4px;' +
      'display:flex;gap:4px;padding:5px');
    pill.className = 'fc-stick-pill';
    NAV.forEach(function (n) {
      var c = el('button', 'border:none;cursor:pointer;border-radius:999px;padding:7px 14px;' +
        'font-family:"Geist",system-ui,sans-serif;font-size:13px;font-weight:500;line-height:16px;' +
        (n.dark ? 'background-color:#000000E6;color:#FFFFFF' : 'background-color:transparent;color:#20100E'), n.label);
      c.className = n.dark ? 'hov-chip' : 'hov-chip flink';
      c.addEventListener('click', function () { smoothTo(n.id); });
      pill.appendChild(c);
    });

    // right side — Log in + Open Studio, same as the hero
    var right = el('div', 'display:flex;align-items:center;gap:16px;flex-shrink:0');
    var login = el('button', 'border:none;background:none;cursor:pointer;color:#FFFFFF;' +
      'font-family:"Geist",system-ui,sans-serif;font-size:14px;font-weight:500;line-height:18px;' +
      'text-shadow:#0417138C 0px 1px 2px;white-space:nowrap', 'Log in');
    login.className = 'flink';
    login.addEventListener('click', function () { signInGate(); });
    var cta = el('button', 'border:none;cursor:pointer;display:flex;align-items:center;background-color:#0F1623;' +
      'border-radius:8px;padding:9px 16px;color:#FFFFFF;font-family:"Geist",system-ui,sans-serif;' +
      'font-size:13px;font-weight:500;line-height:16px;white-space:nowrap', 'Open Studio');
    cta.className = 'hov-btn';
    cta.addEventListener('click', function () { authModal('Open the Studio', 'Create your workspace and fold your first box free.', 'Open Studio'); });
    right.appendChild(login); right.appendChild(cta);

    inner.appendChild(logo); inner.appendChild(pill); inner.appendChild(right);
    bar.appendChild(inner);
    document.body.appendChild(bar);

    var hero = document.getElementById('top');
    window.addEventListener('scroll', function () {
      var past = window.scrollY > (hero ? hero.offsetHeight - 120 : 600);
      bar.classList.toggle('in', past);
    }, { passive: true });
  }

  /* ---------- mobile: hamburger menu, sticky nav, auth pages ---------- */
  function isMobile() { return window.matchMedia('(max-width:640px)').matches; }
  var MAIL_SVG  = '<svg width="16" height="16" viewBox="0 0 24 24" style="flex-shrink:0"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="#1A1108" stroke-width="1.6"/><path d="M3 7L12 13L21 7" fill="none" stroke="#1A1108" stroke-width="1.6" stroke-linejoin="round"/></svg>';
  var LOCK_SVG  = '<svg width="16" height="16" viewBox="0 0 24 24" style="flex-shrink:0"><rect x="3" y="11" width="18" height="11" rx="2" fill="none" stroke="#3A352D" stroke-width="1.6"/><path d="M7 11V7A5 5 0 0 1 17 7V11" fill="none" stroke="#3A352D" stroke-width="1.6"/></svg>';
  var EYE_SVG   = '<svg width="16" height="16" viewBox="0 0 24 24" style="flex-shrink:0"><path d="M1 12C3 7 7 4 12 4C17 4 21 7 23 12C21 17 17 20 12 20C7 20 3 17 1 12Z" fill="none" stroke="#8A8378" stroke-width="1.6" stroke-linejoin="round"/><circle cx="12" cy="12" r="3" fill="none" stroke="#8A8378" stroke-width="1.6"/></svg>';
  var ARROW_SVG = '<svg width="13" height="13" viewBox="0 0 24 24" style="flex-shrink:0"><path d="M5 12H19M19 12L13 6M19 12L13 18" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var SPARK_SVG = '<svg width="14" height="14" viewBox="0 0 24 24" style="flex-shrink:0"><path d="M2 12L7 12M22 12L17 12M12 2V7M12 17V22M5 5L8 8M16 8L19 5M5 19L8 16M16 16L19 19" fill="none" stroke="#1A1108" stroke-width="1.8" stroke-linecap="round"/></svg>';
  var CHECK_SVG = '<svg width="10" height="10" viewBox="0 0 24 24" style="flex-shrink:0"><path d="M5 13L9 17L19 7" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  /* login / signup full-screen pages (Paper 1VU9-0 / 1VWU-0) */
  function mobileAuth(initialMode) {
    closeModal();
    var LBL = "font-family:'Geist Mono',system-ui,sans-serif;color:#5A5448;font-size:11px;font-weight:500;letter-spacing:1.32px;text-transform:uppercase";
    var ov = el('div', "position:fixed;inset:0;z-index:10040;background:#FBFBF9;opacity:0;transition:opacity .28s ease;overflow:auto;-webkit-overflow-scrolling:touch");
    ov.className = 'fc-mauth';

    function fields(signup) {
      if (signup) {
        return '<div style="display:flex;flex-direction:column;gap:16px">' +
          '<div style="display:flex;flex-direction:column;gap:8px"><span style="' + LBL + '">Studio name</span>' +
          '<div class="ma-field"><input class="ma-input" data-field="studio" placeholder="e.g. Aakar Labs"></div></div>' +
          '<div style="display:flex;flex-direction:column;gap:8px"><span style="' + LBL + '">Email</span>' +
          '<div class="ma-field" data-fieldwrap>' + MAIL_SVG + '<input class="ma-input" data-field="email" type="email" placeholder="you@studio.com"></div></div>' +
          '</div>';
      }
      return '<div style="display:flex;flex-direction:column;gap:16px">' +
        '<div style="display:flex;flex-direction:column;gap:8px"><span style="' + LBL + '">Work email</span>' +
          '<div class="ma-field" data-fieldwrap>' + MAIL_SVG + '<input class="ma-input" data-field="email" type="email" placeholder="you@studio.com">' +
            '<span data-verified style="display:none;align-items:center;gap:4px;background:#1CD1AD1F;border-radius:999px;padding:2px 8px;flex-shrink:0"><span style="width:5px;height:5px;border-radius:50%;background:#1CD1AD"></span><span style="font-family:\'Geist Mono\',system-ui,sans-serif;font-size:10px;letter-spacing:.8px;text-transform:uppercase;color:#0E8A72">Verified</span></span></div></div>' +
        '<div style="display:flex;flex-direction:column;gap:8px">' +
          '<div style="display:flex;align-items:center;justify-content:space-between"><span style="' + LBL + '">Password</span>' +
            '<button class="ma-btn" data-act="forgot" style="font-family:\'Geist\',system-ui,sans-serif;font-size:12px;font-weight:500;color:#0E8A72">Forgot?</button></div>' +
          '<div class="ma-field">' + LOCK_SVG + '<input class="ma-input" data-field="password" type="password" placeholder="••••••••" style="letter-spacing:2px"><button class="ma-btn" data-act="eye" aria-label="Show password" style="display:flex">' + EYE_SVG + '</button></div></div>' +
        '<button class="ma-btn" data-act="remember" style="display:flex;align-items:center;gap:8px;align-self:flex-start">' +
          '<span data-box data-on="1" style="width:18px;height:18px;border-radius:5px;background:#041713;display:flex;align-items:center;justify-content:center;flex-shrink:0">' + CHECK_SVG + '</span>' +
          '<span style="font-family:\'Geist\',system-ui,sans-serif;font-size:13px;color:#5A5448">Keep me signed in on this device</span></button>' +
        '</div>';
    }
    function cta(signup) {
      if (signup) {
        return '<div style="display:flex;flex-direction:column;gap:12px">' +
          '<button class="ma-btn ma-act" data-act="create" style="display:flex;align-items:center;justify-content:center;gap:8px;border-radius:12px;padding:14px;background-image:' + EMAIL_GRAD + '"><span style="font-family:\'Geist\',system-ui,sans-serif;font-size:14px;font-weight:600;color:#fff">Create account</span>' + ARROW_SVG + '</button>' +
          '<div style="font-family:\'Geist\',system-ui,sans-serif;font-size:12px;color:#8A8378">By continuing you agree to the Terms and Privacy Policy.</div></div>';
      }
      return '<div style="display:flex;flex-direction:column;gap:10px">' +
        '<button class="ma-btn ma-act" data-act="signin" style="display:flex;align-items:center;justify-content:center;gap:8px;border-radius:12px;padding:14px;background-image:' + EMAIL_GRAD + '"><span style="font-family:\'Geist\',system-ui,sans-serif;font-size:14px;font-weight:600;color:#fff">Sign in</span>' + ARROW_SVG + '</button>' +
        '<button class="ma-btn" data-act="magic" style="display:flex;align-items:center;justify-content:center;gap:8px;border-radius:12px;padding:14px;background:#fff;border:1px solid #ECECE8">' + SPARK_SVG + '<span style="font-family:\'Geist\',system-ui,sans-serif;font-size:14px;font-weight:500;color:#041713">Email me a magic link</span></button></div>';
    }
    function render(mode) {
      var signup = mode === 'signup';
      ov.dataset.mode = mode;
      ov.innerHTML =
        '<style>.ma-input{border:none;outline:none;background:none;flex:1;min-width:0;font-family:"Geist",system-ui,sans-serif;font-size:14px;color:#041713}.ma-input::placeholder{color:#8A8378}.ma-field{display:flex;align-items:center;gap:10px;background:#fff;border:1px solid #E4E1DA;border-radius:12px;padding:14px 16px;transition:border-color .18s,box-shadow .18s}.ma-field:focus-within{border-color:#1CD1AD;box-shadow:0 0 0 3px rgba(28,209,173,.18)}.ma-btn{cursor:pointer;border:none;background:none}.ma-act:active{filter:brightness(.96)}</style>' +
        '<div style="position:fixed;inset:0;background-image:url(assets/auth/hero-render.png);background-size:cover;background-position:50% 0"></div>' +
        '<div style="position:fixed;inset:0;background:linear-gradient(180deg,#FBFBF9D6 0%,#FBFBF9F2 55%,#FBFBF9 100%)"></div>' +
        '<div style="position:relative;z-index:2;min-height:100%;display:flex;flex-direction:column">' +
          '<div style="display:flex;align-items:center;justify-content:space-between;padding:18px 22px 6px">' +
            '<img src="assets/auth/logo-full.png" alt="The Folding Company" style="height:34px;width:auto">' +
            '<div style="display:flex;align-items:center;gap:10px">' +
              '<button class="ma-btn" data-act="switch" style="background:#fff;border:1px solid #E4E1DA;border-radius:8px;padding:8px 14px;font-family:\'Geist\',system-ui,sans-serif;font-size:13px;font-weight:500;color:#1A1108">' + (signup ? 'Sign in' : 'Create account') + '</button>' +
              '<button class="ma-btn" data-act="close" aria-label="Close" style="width:34px;height:34px;border-radius:999px;background:#FFFFFFCC;border:1px solid #E4E1DA;display:flex;align-items:center;justify-content:center;font-family:\'Material Symbols Rounded\',system-ui,sans-serif;font-size:18px;color:#1A1108">close</button>' +
            '</div></div>' +
          '<div style="display:flex;flex-direction:column;gap:20px;padding:40px 22px 40px;width:100%;max-width:440px;box-sizing:border-box;align-self:center">' +
            '<div style="display:flex;flex-direction:column;gap:8px"><div style="font-family:\'Geist\',system-ui,sans-serif;font-size:36px;font-weight:500;letter-spacing:-1.4px;line-height:105%;color:#041713">' + (signup ? 'Create your account' : 'Sign In') + '</div>' +
              '<div style="font-family:\'Geist\',system-ui,sans-serif;font-size:15px;line-height:150%;color:#5A5448">' + (signup ? 'Start with 50 free folds. No card required.' : "Use your work email — we'll send a magic link, or you can use a password.") + '</div></div>' +
            '<div style="display:flex;flex-direction:column;gap:10px">' +
              '<button class="ma-btn" data-act="google" style="display:flex;align-items:center;justify-content:center;gap:8px;background:#fff;border:1px solid #E4E1DA;border-radius:12px;padding:12px;width:100%">' + GOOGLE_SVG + '<span style="font-family:\'Geist\',system-ui,sans-serif;font-size:13px;font-weight:500;color:#041713">Continue with Google</span></button>' +
              '<button class="ma-btn" data-act="apple" style="display:flex;align-items:center;justify-content:center;gap:8px;background:#041713;border-radius:12px;padding:12px;width:100%">' + APPLE_SVG + '<span style="font-family:\'Geist\',system-ui,sans-serif;font-size:13px;font-weight:500;color:#fff">Continue with Apple</span></button></div>' +
            '<div style="display:flex;align-items:center;gap:14px"><span style="flex:1;height:1px;background:#ECECE8"></span><span style="font-family:\'Geist Mono\',system-ui,sans-serif;color:#8A8378;font-size:10px;letter-spacing:1.32px;text-transform:uppercase">Or with email</span><span style="flex:1;height:1px;background:#ECECE8"></span></div>' +
            fields(signup) + cta(signup) +
          '</div></div>';
      var email = ov.querySelector('[data-field="email"]');
      if (email) {
        email.addEventListener('input', function () {
          var w = email.closest('[data-fieldwrap]'); if (w) { w.style.borderColor = ''; w.style.boxShadow = ''; }
          var vb = ov.querySelector('[data-verified]');
          if (vb) vb.style.display = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value.trim()) ? 'flex' : 'none';
        });
        email.addEventListener('keydown', function (e) { if (e.key === 'Enter') submit(signup ? 'create' : 'magic'); });
        setTimeout(function () { email.focus(); }, 320);
      }
    }
    function submit(kind) {
      var email = ov.querySelector('[data-field="email"]');
      var v = email ? email.value.trim() : '';
      var wrap = email ? (email.closest('[data-fieldwrap]') || email.parentNode) : null;
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) { if (wrap) { wrap.style.borderColor = '#E0736A'; wrap.style.boxShadow = '0 0 0 3px rgba(224,115,106,.16)'; } if (email) email.focus(); return; }
      closeModal();
      toast(kind === 'create' ? 'Studio created — magic link sent to ' + v : 'Magic link sent to ' + v, { icon: 'mark_email_read', life: 3200 });
    }
    ov.addEventListener('click', function (e) {
      var b = e.target.closest('[data-act]'); if (!b) return;
      var a = b.getAttribute('data-act');
      if (a === 'close') return closeModal();
      if (a === 'switch') return render(ov.dataset.mode === 'signup' ? 'signin' : 'signup');
      if (a === 'google') { closeModal(); return toast('Connecting to Google…', { spin: true, life: 1700 }); }
      if (a === 'apple') { closeModal(); return toast('Connecting to Apple…', { spin: true, life: 1700 }); }
      if (a === 'forgot') { closeModal(); return toast('Reset link sent — check your inbox', { icon: 'mark_email_read', life: 2800 }); }
      if (a === 'eye') { var p = ov.querySelector('[data-field="password"]'); if (p) p.type = p.type === 'password' ? 'text' : 'password'; return; }
      if (a === 'remember') { var box = b.querySelector('[data-box]'); if (box) { var on = box.getAttribute('data-on') !== '0'; on = !on; box.setAttribute('data-on', on ? '1' : '0'); box.style.background = on ? '#041713' : '#fff'; box.style.border = on ? 'none' : '1px solid #C9C5BC'; var sv = box.querySelector('svg'); if (sv) sv.style.display = on ? 'block' : 'none'; } return; }
      if (a === 'create' || a === 'signin' || a === 'magic') return submit(a);
    });
    render(initialMode || 'signin');
    document.body.appendChild(ov);
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(function () { ov.style.opacity = '1'; });
    openOverlay = ov;
  }

  /* hamburger menu — desktop nav links + Log in / Open Studio at the bottom */
  var NAV_M = [['Pricing', 'm-pricing'], ['Materials', 'm-materials'], ['Library', 'm-templates'], ['Studio', 'm-studio']];
  function openMobileMenu() {
    closeModal();
    var ov = el('div', "position:fixed;inset:0;z-index:10045;background:#FFFFFF;opacity:0;transition:opacity .24s ease;display:flex;flex-direction:column;overflow:auto");
    ov.className = 'fc-mmenu';
    ov.innerHTML =
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:18px 20px;border-bottom:1px solid #F0EFEA">' +
        '<img src="assets/auth/logo-full.png" alt="The Folding Company" style="height:30px;width:auto">' +
        '<button data-act="close" aria-label="Close menu" style="cursor:pointer;border:1px solid #E7E7E5;background:#fff;width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-family:\'Material Symbols Rounded\',system-ui,sans-serif;font-size:22px;color:#1A1108">close</button>' +
      '</div>' +
      '<div style="display:flex;flex-direction:column;padding:14px 12px;gap:2px;flex:1">' +
        NAV_M.map(function (n) {
          return '<button data-go="' + n[1] + '" style="cursor:pointer;border:none;background:none;display:flex;align-items:center;justify-content:space-between;padding:16px 14px;border-radius:12px;text-align:left;font-family:\'Geist\',system-ui,sans-serif;font-size:22px;font-weight:500;letter-spacing:-0.02em;color:#0A0A0A">' + n[0] +
            '<span style="font-family:\'Material Symbols Rounded\',system-ui,sans-serif;font-size:20px;color:#C7CDD5">arrow_forward</span></button>';
        }).join('') +
      '</div>' +
      '<div style="padding:20px;padding-bottom:32px;border-top:1px solid #F0EFEA;display:flex;flex-direction:column;gap:10px">' +
        '<button data-act="login" style="cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;width:100%;background:#fff;border:1px solid #E4E1DA;border-radius:12px;padding:15px;font-family:\'Geist\',system-ui,sans-serif;font-size:15px;font-weight:600;color:#041713">' +
          '<span style="font-family:\'Material Symbols Rounded\',system-ui,sans-serif;font-size:18px;color:#5C5650">login</span>Log in</button>' +
        '<button data-act="studio" style="cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;width:100%;background:#0F1623;border:none;border-radius:12px;padding:15px;font-family:\'Geist\',system-ui,sans-serif;font-size:15px;font-weight:600;color:#fff">Open Studio' + ARROW_SVG + '</button>' +
      '</div>';
    ov.addEventListener('click', function (e) {
      var go = e.target.closest('[data-go]');
      if (go) { var id = go.getAttribute('data-go'); closeModal(); setTimeout(function () { smoothTo(id); }, 60); return; }
      var b = e.target.closest('[data-act]'); if (!b) return;
      var a = b.getAttribute('data-act');
      if (a === 'close') return closeModal();
      if (a === 'login') { closeModal(); return setTimeout(function () { mobileAuth('signin'); }, 180); }
      if (a === 'studio') { closeModal(); return setTimeout(function () { mobileAuth('signup'); }, 180); }
    });
    document.body.appendChild(ov);
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(function () { ov.style.opacity = '1'; });
    openOverlay = ov;
  }

  /* mobile sticky nav — slides in after the hero, mirrors the desktop one */
  function buildMobileHeader() {
    var bar = el('div'); bar.className = 'fc-mnav';
    var logo = el('button', "border:none;background:transparent;cursor:pointer;padding:0;height:34px;width:90px;flex-shrink:0;" +
      "background-image:url(" + HERO_LOGO + ");background-position:left center;background-repeat:no-repeat;background-size:contain;filter:drop-shadow(#04171359 0px 1px 4px)");
    logo.setAttribute('aria-label', 'Folding Co. — back to top');
    logo.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    var right = el('div', "display:flex;align-items:center;gap:10px;flex-shrink:0");
    var studio = el('button', "border:none;cursor:pointer;display:flex;align-items:center;gap:6px;background:#FFFFFF;border-radius:9px;padding:9px 14px;font-family:'Geist',system-ui,sans-serif;font-size:13px;font-weight:600;color:#0F1623", 'Open Studio');
    studio.className = 'hov-btn';
    studio.addEventListener('click', function () { mobileAuth('signup'); });
    var burger = el('button', "border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;width:38px;height:38px;background:#FFFFFF1F;border:1px solid #FFFFFF33;border-radius:9px;color:#fff;font-family:'Material Symbols Rounded',system-ui,sans-serif;font-size:20px", 'menu');
    burger.setAttribute('aria-label', 'Menu');
    burger.addEventListener('click', openMobileMenu);
    right.appendChild(studio); right.appendChild(burger);
    bar.appendChild(logo); bar.appendChild(right);
    document.body.appendChild(bar);
    var hero = document.getElementById('m-top');
    var onScroll = function () { var h = hero ? hero.offsetHeight : 600; bar.classList.toggle('in', window.scrollY > h - 80); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- global click delegation -------------------------------- */
  function nearestCardTitle(node) {
    var card = node.closest('div');
    // walk a few ancestors looking for a bold title sibling
    for (var i = 0; i < 6 && card; i++) {
      var t = card.querySelector('div[style*="font-weight: 600"], div[style*="font-weight:600"]');
      if (t && norm(t) && norm(t).length < 40) return norm(t);
      card = card.parentNode && card.parentNode.closest ? card.parentNode.closest('div') : null;
    }
    return null;
  }

  function onClick(e) {
    // dead in-page anchors -> friendly behavior instead of a jump-to-top
    var a = e.target.closest && e.target.closest('a');
    if (a) {
      var href = a.getAttribute('href') || '';
      if (href === '#') {
        e.preventDefault();
        var label = norm(a) || 'That page';
        if (label === 'Log in') { signInGate(); return; }
        toast(label + ' · coming soon', { icon: 'schedule', life: 2200 });
        return;
      }
      return; // real #section anchors keep working (smooth scroll via CSS)
    }

    // clicks inside our mobile overlays/nav are handled by their own listeners
    if (e.target.closest && e.target.closest('.fc-mnav, .fc-mmenu, .fc-mauth')) return;

    var btn = e.target.closest && e.target.closest('[role="button"]');
    if (!btn) return;

    // mobile hero hamburger opens the menu
    if (btn.classList && btn.classList.contains('m-burger')) { openMobileMenu(); return; }

    // toggles & form buttons are wired with their own listeners — skip here
    var t = norm(btn);
    if (t === 'Short Term' || t === 'Long Term' || t === 'Physical' || t === 'Digital') return;
    if (has(btn, 'Extra options') || has(btn, 'Subscribe')) return;

    // prompt example chips
    var label = Object.keys(CHIP_PROMPT).filter(function (k) { return t === k; })[0];
    if (label) { setPrompt(CHIP_PROMPT[label]); toast('Loaded a starter brief — hit “Fold it”', { icon: 'edit_note', life: 2400 }); return; }

    if (has(btn, 'Surprise me')) {
      var pick = PROMPTS[Math.floor((Date.now() / 137) % PROMPTS.length)];
      setPrompt(pick); toast('Surprise brief loaded 🎲', { icon: 'shuffle', life: 2200 }); return;
    }
    if (has(btn, 'Watch demo') || t === '0:23 / 1:38' || has(btn, '0:23 / 1:38')) { demoModal(); return; }
    if (has(btn, 'Fold it') || has(btn, 'Fold your brief')) {
      smoothTo('top'); runFold(); return;
    }
    if (has(btn, 'Clone')) {
      var title = nearestCardTitle(btn);
      toast((title ? '“' + title + '” ' : 'Dieline ') + 'cloned to your workspace', { icon: 'content_copy', life: 2600 });
      return;
    }
    if (has(btn, 'Start free')) { authModal('Start folding free', 'Create your studio — no card, 3 AI renders on the house.', 'Start free'); return; }
    if (has(btn, 'Choose Pro')) {
      var plan = has(btn, 'month') ? 'Pro · monthly' : 'Pro · day pass';
      authModal('Upgrade to ' + plan, 'Unlock unlimited print exports, advanced edits and priority rendering.', 'Continue to checkout');
      return;
    }
    if (has(btn, 'Open Studio')) { authModal('Open the Studio', 'Create your workspace and fold your first box free.', 'Open Studio'); return; }
    if (has(btn, 'Book a 15')) { toast('Opening the scheduler…', { spin: true, life: 1700 }); return; }

    // carousel / nav arrows
    if (t === '→' || t === '←') {
      var sec = btn.closest('section');
      var rail = sec && sec.querySelector('.fc-shape-rail');
      if (rail && rail._fcArrow) { rail._fcArrow(t === '→' ? 1 : -1); return; }
      toast(t === '→' ? 'Showing more dielines →' : '← Previous dielines', { icon: 'auto_stories', life: 1800 });
      return;
    }

    // sensible default so nothing feels dead
    toast('On it…', { spin: true, life: 1500 });
  }

  /* ---------- boot ---------------------------------------------------- */
  function init() {
    wirePrompt();
    wireNewsletter();
    wireBillingToggle();
    wireMaterialToggle();
    wireExtraOptions();
    wireShapeRail();
    buildHeader();
    if (isMobile()) buildMobileHeader();
    document.addEventListener('click', onClick);
  }

  // React commits asynchronously; wait for a section to exist, then init.
  (function wait(n) {
    if (document.getElementById('footer') && document.getElementById('top')) {
      // one more frame so deep children are painted
      requestAnimationFrame(init);
      return;
    }
    if (n < 200) setTimeout(function () { wait(n + 1); }, 50);
  })(0);
})();
