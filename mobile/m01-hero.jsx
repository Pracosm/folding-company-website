// Mobile hero — mirrors Paper frame 2TM-0 › Hero (2TN-0).
window.__M = window.__M || [];
window.__M.push(['hero', () => {
  const sans = '"Geist", system-ui, sans-serif';
  const mono = '"Geist Mono", system-ui, sans-serif';
  const ms = '"Material Symbols Rounded", system-ui, sans-serif';
  const greenGrad = 'linear-gradient(in oklab 133deg, oklab(77% -0.142 0.015) 0%, oklab(86.2% -0.119 0.012) 72%, oklab(56.7% -0.104 0.010) 145%)';
  const foldGrad = 'linear-gradient(in oklab 115deg, oklab(60.2% -0.089 0.003) -50%, oklab(78.4% -0.144 0.004) 60%, oklab(60.2% -0.089 0.003) 185%)';
  const chips = ['Skincare carton', 'Single-origin coffee', 'Wine sleeve', 'Matcha tin', 'Rigid mailer'];
  const [extras, setExtras] = React.useState(false);
  const [folded, setFolded] = React.useState(false);
  // Fold it → play the hero video, then slide up the editor drawer when it ends.
  const startFold = () => {
    const v = document.getElementById('m-hero-bg-video');
    if (!v) { setFolded(true); return; }
    try { v.currentTime = 0; } catch (e) {}
    const p = v.play(); if (p && p.catch) p.catch(() => {});
    let done = false;
    const reveal = () => { if (done) return; done = true; setFolded(true); };
    v.addEventListener('ended', reveal, { once: true });
    setTimeout(reveal, 5400); // fallback if 'ended' never fires
  };
  const endFold = () => {
    const v = document.getElementById('m-hero-bg-video');
    if (v) { try { v.pause(); v.currentTime = 0; } catch (e) {} }
    setFolded(false);
  };

  return (
    <section id="m-top" style={{ position: 'relative', width: '100%', minHeight: '100svh', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', WebkitFontSmoothing: 'antialiased' }}>
      {/* background — video (mirrors desktop hero) */}
      <div style={{ position: 'absolute', inset: 0, backgroundColor: '#A8BBC9', overflow: 'clip' }}>
        <video id="m-hero-bg-video" poster="assets/hero-poster.jpg" muted playsInline preload="auto" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 24%' }}>
          <source src="assets/hero-video.mp4" type="video/mp4" />
        </video>
        {/* legibility overlays on top of the video */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'radial-gradient(ellipse 65% 42% at 50% 38% in oklab, oklab(18.7% -0.028 .0009 / 16%) 40%, oklab(18.7% -0.028 .0009 / 0%) 82%), linear-gradient(#04171326)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', width: '100%', boxSizing: 'border-box', paddingInline: '24px', paddingTop: '16px', paddingBottom: 'clamp(24px, 4vh, 40px)' }}>

        {/* nav: logo · Studio · hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', flexShrink: 0 }}>
          <div style={{ backgroundImage: 'url(https://app.paper.design/file-assets/01KTNNTSJJ3G5MHVGA4S55GZJX/3DP33PM6ACEEK3BY0FE80V9ESE.png)', backgroundPosition: 'left center', backgroundRepeat: 'no-repeat', backgroundSize: 'contain', filter: 'drop-shadow(#04171359 0px 1px 4px)', height: '52px', width: '132px', flexShrink: 0 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <a href="#m-studio" className="hov-btn" role="button" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#0F1623', borderRadius: '10px', paddingBlock: '10px', paddingInline: '16px' }}>
              <span style={{ color: '#fff', fontFamily: sans, fontSize: '13px', fontWeight: 500 }}>Studio</span>
              <span style={{ color: '#fff', fontFamily: ms, fontSize: '14px' }}>arrow_forward</span>
            </a>
            <div className="m-burger" role="button" aria-label="Menu" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', backgroundColor: '#0F1623', borderRadius: '10px', cursor: 'pointer' }}>
              <span style={{ color: '#fff', fontFamily: ms, fontSize: '20px' }}>menu</span>
            </div>
          </div>
        </div>

        {/* centered hero stack — grows to fill the viewport and shrinks gaps to fit any phone.
            className lumio-hero so the heroFlow parallax targets THIS block, not the drawer below it. */}
        <div className="lumio-hero" data-folded={folded ? '1' : undefined} style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'clamp(32px, 6vh, 56px)', width: '100%', paddingTop: 'clamp(8px, 2vh, 24px)' }}>

        {/* eyebrow + headline — one grouped section */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#FFFFFFE6', borderColor: '#E4E1DA', borderStyle: 'solid', borderWidth: '1px', borderRadius: '999px', boxShadow: '#0417131A 0px 2px 8px -4px', paddingBlock: '7px', paddingInline: '14px' }}>
            <span className="genie-logo" aria-hidden="true" style={{ width: '13px', height: '13px', color: '#0E8A72' }} />
            <span style={{ color: '#0E8A72', fontFamily: mono, fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>New · Genie 2</span>
          </div>
          <div style={{ color: '#FFFFFF', fontFamily: sans, fontSize: 'clamp(25px, 7vw, 30px)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: '116%', textAlign: 'center', textShadow: '#04171340 0px 2px 12px' }}>
            Packaging that folds at the speed of a sentence.
          </div>
        </div>

        {/* bottom group — prompt card + chips, anchored low so the hero fills the screen */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 'clamp(20px, 3vh, 28px)' }}>
        {/* prompt card */}
        <div style={{ width: '100%', backdropFilter: 'blur(28px)', backgroundColor: '#FFFFFFEB', borderColor: '#FFFFFF66', borderStyle: 'solid', borderWidth: '1px', borderRadius: '20px', boxShadow: '#0417133D 0px 18px 44px -16px, #04171314 0px 2px 6px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px' }}>
          {/* LIVE status caption */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
            <span style={{ backgroundColor: '#1CD1AD', borderRadius: '50%', height: '7px', width: '7px', boxShadow: '#1CD1AD2E 0px 0px 0px 3px', flexShrink: 0 }} />
            <span style={{ color: '#5A5448', fontFamily: mono, fontSize: '10px', fontWeight: 600, letterSpacing: '0.13em', textTransform: 'uppercase' }}>Live · Genie is folding</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ flexShrink: 0, height: '38px', width: '38px', borderRadius: '11px', backgroundImage: greenGrad, boxShadow: '#1CD1AD80 0px 3px 8px -3px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="genie-logo" aria-hidden="true" style={{ width: '21px', height: '21px', color: '#fff' }} />
            </div>
            <div style={{ color: '#041713', fontFamily: mono, fontSize: '13.5px', lineHeight: '150%', paddingTop: '3px' }}>
              A 240gsm rigid mailer for premium skincare, soft matte, navy &amp; gold foil
            </div>
          </div>


          <div style={{ borderTopColor: '#F2F1ED', borderTopStyle: 'solid', borderTopWidth: '1px' }} />

          {/* meta row — Material · Reference · Extra options all on one line */}
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
              <span style={{ color: '#5A5448', fontFamily: ms, fontSize: '15px' }}>palette</span>
              <span style={{ color: '#5A5448', fontFamily: mono, fontSize: '10px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Material</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
              <span style={{ color: '#5A5448', fontFamily: ms, fontSize: '15px' }}>image</span>
              <span style={{ color: '#5A5448', fontFamily: mono, fontSize: '10px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Reference</span>
            </div>
            <div role="button" onClick={() => setExtras(v => !v)} style={{ marginLeft: 'auto', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: extras ? '#E0F8F2' : '#FFFFFFEB', borderColor: extras ? '#1CD1AD' : '#E4DCC4', borderStyle: 'solid', borderWidth: '1px', borderRadius: '999px', paddingBlock: '8px', paddingInline: '12px', cursor: 'pointer' }}>
              <span style={{ color: extras ? '#0B7460' : '#5C5650', fontFamily: mono, fontSize: '10px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Extra options</span>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: extras ? 'flex-end' : 'flex-start', backgroundColor: extras ? '#1CD1AD' : '#E2E7EE', borderRadius: '999px', boxShadow: (extras ? '#0B74602E' : '#0417131A') + ' 0px 0px 0px 1px inset', height: '18px', width: '32px', padding: '2px', transition: 'background-color .2s ease' }}>
                <span style={{ backgroundColor: '#FFFFFF', borderRadius: '999px', boxShadow: '#04171338 0px 1px 2px', height: '14px', width: '14px' }} />
              </span>
            </div>
          </div>

          {/* Extra options — expanded state */}
          {extras && (
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', borderTopColor: '#F2F1ED', borderTopStyle: 'solid', borderTopWidth: '1px', paddingTop: '12px' }}>
            <span style={{ marginRight: 'auto', color: '#0B7460', fontFamily: mono, fontSize: '11px', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase' }}>4 Extras</span>
            {[['restaurant', '+ Category'], ['package_2', '+ Manufacturing'], ['verified_user', '+ Compliance']].map(([ic, label]) => (
              <div key={label} className="hov-chip" role="button" style={{ display: 'flex', alignItems: 'center', gap: '7px', backgroundColor: '#FFFFFFEB', borderColor: '#C6A87AC7', borderStyle: 'dashed', borderWidth: '1px', borderRadius: '999px', paddingBlock: '6px', paddingInline: '12px', cursor: 'pointer' }}>
                <span style={{ color: '#8E5C2E', fontFamily: ms, fontSize: '14px' }}>{ic}</span>
                <span style={{ color: '#8E5C2E', fontFamily: sans, fontSize: '13px', fontWeight: 500, whiteSpace: 'nowrap' }}>{label}</span>
              </div>
            ))}
            <div className="hov-chip" role="button" style={{ display: 'flex', alignItems: 'center', gap: '7px', backgroundColor: '#E0F8F2', borderColor: '#1CD1AD', borderStyle: 'solid', borderWidth: '1px', borderRadius: '999px', paddingBlock: '6px', paddingInline: '12px', cursor: 'pointer' }}>
              <span style={{ color: '#0B7460', fontFamily: ms, fontSize: '14px', fontVariationSettings: '"FILL" 1' }}>workspaces</span>
              <span style={{ color: '#0B7460', fontFamily: sans, fontSize: '13px', fontWeight: 600, whiteSpace: 'nowrap' }}>Brand kit · Sweet Karma</span>
              <span style={{ color: '#0B7460', fontFamily: ms, fontSize: '14px' }}>check</span>
            </div>
          </div>
          )}

          {/* Fold it — full width */}
          <div className="hov-btn" role="button" onClick={startFold} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', boxSizing: 'border-box', backgroundImage: foldGrad, borderRadius: '14px', paddingBlock: '16px', cursor: 'pointer', boxShadow: '#0A604133 0px 6px 16px -6px' }}>
            <span className="genie-logo" aria-hidden="true" style={{ width: '16px', height: '16px', color: '#fff' }} />
            <span style={{ color: '#fff', fontFamily: sans, fontSize: '15px', fontWeight: 600 }}>Fold it</span>
            <span style={{ color: '#fff', fontFamily: ms, fontSize: '15px' }}>arrow_forward</span>
          </div>
        </div>

        {/* TRY chips */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ color: '#FFFFFFD9', fontFamily: mono, fontSize: '11px', fontWeight: 500, letterSpacing: '0.13em', textTransform: 'uppercase', flexShrink: 0, textShadow: '#04171359 0px 1px 4px' }}>Try</span>
          <div style={{ flex: 1, minWidth: 0, height: '1px', backgroundColor: '#FFFFFF59' }} />
        </div>
        <div style={{ width: '100%', display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '2px', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
          {chips.map(c => (
            <div key={c} className="hov-chip" role="button" style={{ flexShrink: 0, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', backgroundColor: '#FFFFFFE6', borderColor: '#ECECE8', borderStyle: 'solid', borderWidth: '1px', borderRadius: '999px', height: '38px', paddingInline: '16px', color: '#041713', fontFamily: sans, fontSize: '13px', cursor: 'pointer' }}>
              {c}
            </div>
          ))}
          <div className="hov-chip" role="button" style={{ flexShrink: 0, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '6px', height: '38px', backgroundColor: '#FFFFFFF2', borderColor: '#00BD9C4D', borderStyle: 'solid', borderWidth: '1px', borderRadius: '999px', paddingInline: '14px', cursor: 'pointer' }}>
            <span style={{ color: '#0E8A72', fontFamily: ms, fontSize: '13px' }}>shuffle</span>
            <span style={{ color: '#0E8A72', fontFamily: sans, fontSize: '13px', fontWeight: 500 }}>Surprise me</span>
          </div>
        </div>
        </div>
        </div>
        </div>
      </div>

      {/* dim scrim behind the drawer — keeps the hero visible-but-dimmed; tap it to dismiss */}
      <div data-folded="1" onClick={endFold} aria-hidden={!folded} style={{ position: 'fixed', inset: 0, zIndex: 5, backgroundColor: '#041713', opacity: folded ? 0.45 : 0, transition: 'opacity .5s ease', pointerEvents: folded ? 'auto' : 'none' }} />

      {/* ── Post-fold editor drawer (Paper 1YJR-0) — a bottom SHEET that rises over the hero:
          leaves a peek at the top, rounded top corners + grab handle, scrolls internally.
          data-folded keeps the heroFlow parallax from ever zeroing this drawer's transform (React owns it). ── */}
      <div data-folded="1" aria-hidden={!folded} style={{ position: 'fixed', left: 0, right: 0, bottom: 0, top: '72px', zIndex: 6, backgroundColor: '#fff', borderTopLeftRadius: '22px', borderTopRightRadius: '22px', boxShadow: '#04171347 0px -14px 44px -10px', overflowY: 'auto', WebkitOverflowScrolling: 'touch', transform: folded ? 'translateY(0)' : 'translateY(100%)', transition: 'transform .55s cubic-bezier(.16,1,.3,1)', pointerEvents: folded ? 'auto' : 'none' }}>

        {/* grab handle */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '9px', paddingBottom: '5px', backgroundColor: '#fff', borderTopLeftRadius: '22px', borderTopRightRadius: '22px' }}>
          <div style={{ width: '38px', height: '5px', borderRadius: '3px', backgroundColor: '#D8D7D2' }} />
        </div>

        {/* top bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '56px', paddingRight: '8px', paddingLeft: '6px', backgroundColor: '#fff', borderBottom: '1px solid #ECECE8', position: 'sticky', top: 0, zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', minWidth: 0, gap: '4px' }}>
            <div role="button" onClick={endFold} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '8px', cursor: 'pointer', flexShrink: 0 }}>
              <span style={{ color: '#0A0A0A', fontFamily: ms, fontSize: '24px' }}>chevron_left</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, gap: '1px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#0A0A0A', fontFamily: sans, fontSize: '15px', fontWeight: 600, letterSpacing: '-0.01em' }}>Sweet Karma</span>
                <span style={{ display: 'flex', alignItems: 'center', padding: '1px 5px', borderRadius: '5px', backgroundImage: 'linear-gradient(in oklab 142deg, oklab(70.1% -0.126 0.011) 17%, oklab(61.4% -0.113 0.007) 82%)' }}>
                  <span style={{ color: '#fff', fontFamily: mono, fontSize: '8px', fontWeight: 700, letterSpacing: '0.08em' }}>PRO</span>
                </span>
              </div>
              <span style={{ color: '#8A8378', fontFamily: mono, fontSize: '9px', letterSpacing: '0.06em' }}>GENIE 2 · 1 CONCEPT</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '13px' }}>
            <div style={{ display: 'flex', alignItems: 'center', height: '34px', borderRadius: '9px', overflow: 'hidden', border: '1px solid #D8D7D2' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '34px' }}><span style={{ color: '#5A5448', fontFamily: ms, fontSize: '19px' }}>undo</span></div>
              <div style={{ width: '1px', height: '20px', backgroundColor: '#E7E5DF' }} />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '34px' }}><span style={{ color: '#C2BEB4', fontFamily: ms, fontSize: '19px' }}>redo</span></div>
            </div>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#E0F8F2', boxShadow: '#FFFFFF 0px 0px 0px 1.5px, #1FB89A 0px 0px 0px 3px', flexShrink: 0 }}>
              <span style={{ color: '#0B9A82', fontFamily: sans, fontSize: '11px', fontWeight: 600 }}>AL</span>
              <span style={{ position: 'absolute', bottom: '-3px', right: '-3px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '14px', height: '14px', borderRadius: '50%', border: '1.5px solid #fff', backgroundImage: 'linear-gradient(in oklab 135deg, oklab(70.1% -0.126 0.011) 0%, oklab(61.4% -0.113 0.007) 100%)' }}><span style={{ color: '#fff', fontFamily: ms, fontSize: '9px' }}>star</span></span>
            </div>
          </div>
        </div>

        {/* tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', backgroundColor: '#fff', borderBottom: '1px solid #F0EFEA', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {[['deployed_code', 'Full Design', true], ['interests', 'Design Elements', false], ['sell', 'Product Elements', false], ['title', 'Texts', false]].map(([ic, label, on]) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0, borderRadius: '999px', padding: '7px 13px', backgroundColor: on ? '#fff' : '#ECECE8', border: on ? '1.5px solid #1CD1AD' : '1px solid #D8D7D2' }}>
              <span style={{ color: on ? '#1CD1AD' : '#8A8378', fontFamily: ms, fontSize: '15px' }}>{ic}</span>
              <span style={{ color: on ? '#041713' : '#5A5448', fontFamily: sans, fontSize: '13px', fontWeight: on ? 600 : 500, whiteSpace: 'nowrap' }}>{label}</span>
            </div>
          ))}
        </div>

        {/* preview */}
        <div style={{ position: 'relative', backgroundColor: '#F1F1EE', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '999px', backgroundColor: '#1CD1AD' }} />
              <span style={{ color: '#5A5448', fontFamily: mono, fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em' }}>CONCEPT · SWEET KARMA</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '26px', borderRadius: '7px', padding: '0 9px', backgroundColor: '#041713' }}><span style={{ color: '#fff', fontFamily: mono, fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em' }}>HD</span></div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '8px', backgroundColor: '#fff', border: '1px solid #E4E1DA' }}><span style={{ color: '#5A5448', fontFamily: ms, fontSize: '16px' }}>grid_on</span></div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '8px', backgroundColor: '#fff', border: '1px solid #E4E1DA' }}><span style={{ color: '#5A5448', fontFamily: ms, fontSize: '16px' }}>open_in_full</span></div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '360px', overflow: 'hidden' }}>
            <div style={{ position: 'relative', width: '300px', boxSizing: 'border-box', borderRadius: '10px', padding: '22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '18px', backgroundImage: 'linear-gradient(in oklab 150deg, oklab(37.4% -0.012 -0.077) 0%, oklab(29.1% -0.009 -0.059) 52%, oklab(21.8% -0.007 -0.042) 100%)', boxShadow: '#FFFFFF1A 0px 0px 0px 1px inset, #0A152699 0px 30px 50px -22px', transform: 'rotate(-6deg)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <div style={{ color: '#D9B978', fontFamily: sans, fontSize: '20px', fontWeight: 700, letterSpacing: '0.04em' }}>SWEET KARMA</div>
                  <div style={{ color: '#9FB0CE', fontFamily: mono, fontSize: '8px', fontWeight: 500, letterSpacing: '0.14em' }}>PURE RITUAL SKINCARE</div>
                </div>
                <div style={{ width: '26px', height: '26px', borderRadius: '999px', border: '1.5px solid #D9B978', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><div style={{ width: '9px', height: '9px', borderRadius: '999px', backgroundColor: '#D9B978' }} /></div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ width: '54px', height: '2px', backgroundColor: '#D9B978' }} />
                <div style={{ color: '#E8EDF6', fontFamily: sans, fontSize: '13px', fontWeight: 500, lineHeight: '18px' }}>Restorative night serum with cold-pressed botanicals.</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <div style={{ color: '#8FA0BE', fontFamily: mono, fontSize: '8px', fontWeight: 500, letterSpacing: '0.1em' }}>SOFT-TOUCH MATTE · GOLD FOIL</div>
                <div style={{ color: '#D9B978', fontFamily: mono, fontSize: '10px', fontWeight: 600, letterSpacing: '0.06em' }}>NET 50ML</div>
              </div>
              <div style={{ position: 'absolute', inset: '6px', borderRadius: '7px', border: '1px dashed #FFFFFF55', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: '14px', right: '16px', width: '36px', height: '36px', borderRadius: '6px', border: '1.5px dashed #FFFFFFC0' }}>
                <div style={{ position: 'absolute', top: '-16px', left: 0, height: '14px', display: 'flex', alignItems: 'center', padding: '0 5px', borderRadius: '3px', backgroundColor: '#0E2A22D9' }}><span style={{ color: '#EAFBF6', fontFamily: mono, fontSize: '7px', fontWeight: 600, letterSpacing: '0.08em' }}>LOGO</span></div>
              </div>
              <div style={{ position: 'absolute', top: '18px', left: '18px', width: '180px', height: '46px', borderRadius: '5px', border: '1.5px solid #1CD1AD', boxShadow: '#1CD1AD33 0px 0px 0px 3px' }}>
                {[{ t: '-5px', l: '-5px' }, { t: '-5px', r: '-5px' }, { b: '-5px', l: '-5px' }, { b: '-5px', r: '-5px' }].map((p, i) => (
                  <div key={i} style={{ position: 'absolute', top: p.t, bottom: p.b, left: p.l, right: p.r, width: '8px', height: '8px', borderRadius: '2px', backgroundColor: '#1CD1AD', border: '1px solid #fff' }} />
                ))}
                <div style={{ position: 'absolute', top: '-20px', left: '-1px', height: '16px', display: 'flex', alignItems: 'center', gap: '4px', padding: '0 7px', borderRadius: '4px', backgroundColor: '#10B493' }}><span style={{ color: '#fff', fontFamily: ms, fontSize: '10px' }}>title</span><span style={{ color: '#fff', fontFamily: mono, fontSize: '8px', fontWeight: 600, letterSpacing: '0.06em' }}>HEADLINE</span></div>
              </div>
            </div>
          </div>
          <div style={{ position: 'absolute', left: '16px', bottom: '16px', display: 'flex', alignItems: 'center', gap: '5px', borderRadius: '999px', padding: '5px 10px', backgroundColor: '#FFFFFFE6', border: '1px solid #E4E1DA' }}>
            <span style={{ color: '#5A5448', fontFamily: ms, fontSize: '13px' }}>3d_rotation</span>
            <span style={{ color: '#5A5448', fontFamily: mono, fontSize: '10px', fontWeight: 500, letterSpacing: '0.04em' }}>FRONT · -12°</span>
          </div>
        </div>

        {/* refine card */}
        <div style={{ padding: '14px 16px', backgroundColor: '#fff' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '11px', borderRadius: '14px', padding: '12px', backgroundColor: '#F7FBFA', border: '1px solid #C7EDE2' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '26px', height: '26px', borderRadius: '7px', backgroundColor: '#E0F8F2', flexShrink: 0 }}>
                <span className="genie-logo" aria-hidden="true" style={{ width: '15px', height: '15px', color: '#10B493' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', borderRadius: '999px', padding: '4px 6px 4px 9px', backgroundColor: '#fff', border: '1px solid #C7EDE2' }}>
                <span style={{ color: '#0B7A66', fontFamily: sans, fontSize: '12px', fontWeight: 600 }}>T Headline</span>
                <span style={{ color: '#8A8378', fontFamily: ms, fontSize: '14px' }}>close</span>
              </div>
            </div>
            <div style={{ color: '#8A8378', fontFamily: sans, fontSize: '13px', lineHeight: '16px' }}>make the tagline seem more vibrant and change the copy to reflect the brand better</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div role="button" style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', gap: '6px', height: '42px', borderRadius: '10px', backgroundColor: '#fff', border: '1px solid #E4E1DA', cursor: 'pointer' }}>
                <span style={{ color: '#5A5448', fontFamily: ms, fontSize: '17px' }}>add_shopping_cart</span>
                <span style={{ color: '#041713', fontFamily: sans, fontSize: '14px', fontWeight: 600 }}>Add to cart</span>
              </div>
              <div role="button" style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', gap: '6px', height: '42px', borderRadius: '10px', backgroundColor: '#1FB89A', cursor: 'pointer' }}>
                <span style={{ color: '#fff', fontFamily: ms, fontSize: '17px' }}>bolt</span>
                <span style={{ color: '#fff', fontFamily: sans, fontSize: '14px', fontWeight: 600 }}>Regenerate · 1</span>
              </div>
            </div>
          </div>
        </div>

        {/* studio gate */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: '24px 20px 30px', backgroundColor: '#FBFAF7', borderTop: '1px solid #ECEBE7' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', alignSelf: 'flex-start', width: '108px', height: '34px', borderRadius: '10px', backgroundColor: '#fff' }}>
            <span style={{ color: '#1CD1AD', fontFamily: ms, fontSize: '19px' }}>bolt</span>
            <span style={{ color: '#041713', fontFamily: sans, fontSize: '16px', fontWeight: 600 }}>Studio</span>
          </div>
          <div style={{ color: '#0E1A14', fontFamily: sans, fontSize: '28px', fontWeight: 600, lineHeight: '32px', letterSpacing: '-0.02em' }}>The full editor opens in Studio.</div>
          <a href="#m-studio" className="hov-btn" role="button" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', boxSizing: 'border-box', height: '52px', borderRadius: '13px', backgroundImage: 'linear-gradient(in oklab 115deg, oklab(50% -0.091 0.008) 0%, oklab(77% -0.142 0.015) 60%, oklab(50% -0.091 0.008) 185%)' }}>
            <span style={{ color: '#fff', fontFamily: sans, fontSize: '16px', fontWeight: 600 }}>Open in Studio</span>
            <span style={{ color: '#fff', fontFamily: ms, fontSize: '18px' }}>arrow_forward</span>
          </a>
          <div role="button" onClick={endFold} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <span style={{ color: '#6B6459', fontFamily: sans, fontSize: '13.5px', fontWeight: 500 }}>Not now — keep previewing here</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <span style={{ color: '#A39C90', fontFamily: ms, fontSize: '13px' }}>lock</span>
            <span style={{ color: '#A39C90', fontFamily: mono, fontSize: '10px', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Full brief · 3D render · History · Export</span>
          </div>
        </div>
      </div>
    </section>
  );
}]);
