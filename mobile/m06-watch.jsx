// Mobile watch-the-fold — mirrors Paper frame 2TM-0 › "Watch the fold" (59J-0).
window.__M = window.__M || [];
window.__M.push(['watch', () => {
  const sans = '"Geist", system-ui, sans-serif';
  const mono = '"Geist Mono", system-ui, sans-serif';
  const ms = '"Material Symbols Rounded", system-ui, sans-serif';
  const steps = [
    { n: '01 · Brief', ic: 'auto_awesome', t: 'Tell Genie what to fold.', d: "A sentence. No design system, no asset packs — just the box you're picturing, written down." },
    { n: '02 · Shape', ic: 'view_in_ar', t: 'Pick a structure.', d: 'Eleven base structures, 240 dielines — or let Genie infer one from the brief and tune dimensions.' },
    { n: '03 · Finish', ic: 'palette', t: 'Paper, foil, print.', d: 'Real GSM, real foils, real coatings. Swap any of them and the render updates in under two seconds.' },
    { n: '04 · Ship', ic: 'file_download', t: 'PDF, dieline, mockup.', d: 'Press-ready files in PDF/X-1A, SVG, DXF and .GLB — hand to your printer or post a render to socials.', dark: true }
  ];

  return (
    <section id="m-studio" style={{ width: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '20px', paddingBlock: '52px', paddingInline: '16px', backgroundColor: '#FFFFFF' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#E0F8F2', borderColor: '#1CD1AD80', borderStyle: 'solid', borderWidth: '1px', borderRadius: '999px', paddingBlock: '5px', paddingInline: '12px' }}>
          <span style={{ backgroundColor: '#1CD1AD', borderRadius: '50%', height: '6px', width: '6px' }} />
          <span style={{ color: '#0E8A72', fontFamily: mono, fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Watch the fold · 90s</span>
        </div>
        <div style={{ color: '#0A0A0A', fontFamily: sans, fontSize: '34px', fontWeight: 500, letterSpacing: '-0.05em', lineHeight: '104%', textAlign: 'center' }}>Type a sentence. Watch it fold.</div>
        <div style={{ color: '#5B6664', fontFamily: sans, fontSize: '14.5px', lineHeight: '150%', textAlign: 'center' }}>Ninety seconds, no edits. The brief becomes a dieline, a render, and a press-ready PDF.</div>
      </div>

      {/* studio mock */}
      <div style={{ backgroundColor: '#F4F0E7', borderColor: '#E4DCC4', borderStyle: 'solid', borderWidth: '1px', borderRadius: '20px', boxShadow: '#04171340 0px 24px 50px -24px', overflow: 'clip', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#FAFAFA', borderBottomColor: '#E4DCC4', borderBottomStyle: 'solid', borderBottomWidth: '1px', paddingBlock: '10px', paddingInline: '12px' }}>
          <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
            <span style={{ backgroundColor: '#E8B4A6', borderRadius: '50%', height: '9px', width: '9px' }} />
            <span style={{ backgroundColor: '#E8D4A6', borderRadius: '50%', height: '9px', width: '9px' }} />
            <span style={{ backgroundColor: '#B4D4C0', borderRadius: '50%', height: '9px', width: '9px' }} />
          </div>
          <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: '7px', backgroundColor: '#FFFFFF', borderColor: '#E4DCC4', borderStyle: 'solid', borderWidth: '1px', borderRadius: '8px', paddingBlock: '5px', paddingInline: '10px' }}>
            <span style={{ color: '#5B6664', fontFamily: ms, fontSize: '12px' }}>lock</span>
            <span style={{ color: '#041713', fontFamily: mono, fontSize: '11px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>studio.foldingco.com</span>
          </div>
          <span style={{ backgroundColor: '#1CD1AD', borderRadius: '50%', height: '7px', width: '7px', flexShrink: 0 }} />
        </div>
        <div style={{ position: 'relative', backgroundImage: 'linear-gradient(in oklab 155deg, oklab(96.8% .0004 0.010) 0%, oklab(93.5% 0.001 0.018) 100%)', padding: '18px', display: 'flex', flexDirection: 'column', gap: '8px', minHeight: '320px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#FFFFFF', borderColor: '#E4DCC4', borderStyle: 'solid', borderWidth: '1px', borderRadius: '12px', boxShadow: '#04171326 0px 4px 12px -6px', paddingBlock: '10px', paddingInline: '12px', width: 'fit-content', maxWidth: '100%' }}>
            <span style={{ flexShrink: 0, height: '24px', width: '24px', borderRadius: '999px', backgroundImage: 'linear-gradient(135deg, #1CD1AD, #0A6051)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span className="genie-logo" aria-hidden="true" style={{ width: '13px', height: '13px', color: '#fff' }} /></span>
            <span style={{ color: '#041713', fontFamily: mono, fontSize: '12.5px' }}>A 240gsm rigid mailer, soft matte navy.</span>
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="200" height="200" viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg">
              <polygon points="240,40 440,140 240,240 40,140" fill="#1CD1AD" />
              <polygon points="40,140 240,240 240,440 40,340" fill="#0F8C73" />
              <polygon points="440,140 240,240 240,440 440,340" fill="#0A6051" />
              <polyline points="40,140 240,40" fill="none" stroke="#FFFFFF59" strokeWidth="1.5" />
              <polyline points="440,140 240,40" fill="none" stroke="#FFFFFF59" strokeWidth="1.5" />
            </svg>
          </div>
          <div className="hov-btn" role="button" style={{ position: 'absolute', right: '16px', bottom: '16px', display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#041713F0', borderRadius: '999px', paddingBlock: '7px', paddingLeft: '8px', paddingRight: '14px', cursor: 'pointer' }}>
            <span style={{ height: '26px', width: '26px', borderRadius: '999px', backgroundColor: '#1CD1AD', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#041713', fontFamily: ms, fontSize: '15px' }}>play_arrow</span>
            <span style={{ color: '#fff', fontFamily: mono, fontSize: '11px', letterSpacing: '0.04em' }}>0:23 / 1:38</span>
          </div>
        </div>
      </div>

      {/* step cards — horizontal scroll-snap row (full-bleed, next card peeks) */}
      <div style={{ display: 'flex', gap: '14px', overflowX: 'auto', scrollSnapType: 'x mandatory', scrollbarWidth: 'none', margin: '0 -16px', paddingInline: '16px' }}>
        {steps.map(s => (
          <div key={s.n} className="hov-raise" style={{ flex: '0 0 82%', scrollSnapAlign: 'start', boxSizing: 'border-box', borderRadius: '18px', padding: '22px', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: '#0A0A0A0F 0px 1px 2px', backgroundColor: s.dark ? undefined : '#FAFAFA', backgroundImage: s.dark ? 'linear-gradient(in oklab 106deg, oklab(60.2% -0.089 0.003) 0%, oklab(78.4% -0.144 0.004) 50%, oklab(60.2% -0.089 0.003) 109%)' : undefined, borderColor: s.dark ? 'transparent' : '#E7E7E5', borderStyle: 'solid', borderWidth: '1px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: s.dark ? '#FFFFFF29' : '#F4F6F9', borderColor: s.dark ? '#FFFFFF52' : '#E2E7EE', borderStyle: 'solid', borderWidth: '1px', borderRadius: '999px', paddingBlock: '4px', paddingInline: '10px', width: 'fit-content' }}>
              <span style={{ color: s.dark ? '#FFFFFF' : '#5B6664', fontFamily: mono, fontSize: '10px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{s.n}</span>
            </div>
            <div style={{ height: '36px', width: '36px', borderRadius: '10px', backgroundColor: s.dark ? '#FFFFFF' : '#E0F8F2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ color: s.dark ? '#041713' : '#0A6051', fontFamily: ms, fontSize: '18px' }}>{s.ic}</span>
            </div>
            <span style={{ color: s.dark ? '#FFFFFF' : '#041713', fontFamily: sans, fontSize: '19px', fontWeight: 600, letterSpacing: '-0.01em', lineHeight: '120%' }}>{s.t}</span>
            <span style={{ color: s.dark ? '#FFFFFFE6' : '#5B6664', fontFamily: sans, fontSize: '14px', lineHeight: '155%' }}>{s.d}</span>
          </div>
        ))}
      </div>
    </section>
  );
}]);
