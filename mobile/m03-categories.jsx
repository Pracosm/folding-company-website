// Mobile categories — mirrors Paper frame 2TM-0 › "Clone a box" (2XA-0).
window.__M = window.__M || [];
window.__M.push(['categories', () => {
  const sans = '"Geist", system-ui, sans-serif';
  const mono = '"Geist Mono", system-ui, sans-serif';
  const ms = '"Material Symbols Rounded", system-ui, sans-serif';
  const img = n => `url(assets/thumbs/${n}.jpg)`;
  const grad = s => `radial-gradient(ellipse 72% 82% at 50% 35% in oklab, ${s})`;
  const glow = (tint, mid, edge) => `radial-gradient(ellipse 54% 66% at 71% 44%, ${tint} 0%, ${mid} 40%, ${edge} 100%)`;
  const railStyle = { display: 'flex', gap: '14px', overflowX: 'auto', paddingInline: '16px', paddingBottom: '6px', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' };
  const Dieline = () => (
    <svg viewBox="0 28.5 132.68 93" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g>
        <path d="M13.194 59.375L6.994 61.875 6.994 88.125 13.194 90.625" fill="#2B344008" stroke="#2B3440" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M16.914 58.125L20.634 43.125 37.374 43.125 39.854 58.125" fill="none" stroke="#2B3440" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M42.334 58.125L44.814 49.375 66.514 49.375 68.994 58.125" fill="none" stroke="#2B3440" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M70.234 58.125L70.234 44.375 95.654 44.375 96.894 58.125" fill="none" stroke="#2B3440" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M98.134 58.125L100.614 49.375 122.314 49.375 124.794 58.125" fill="none" stroke="#2B3440" strokeWidth="1.4" strokeLinejoin="round" />
        <rect x="13.194" y="58.125" width="111.6" height="33.75" fill="#2B344005" stroke="#2B3440" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M16.914 91.875L20.634 108.125 37.374 108.125 39.854 91.875" fill="none" stroke="#2B3440" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M42.334 91.875L44.814 101.875 66.514 101.875 68.994 91.875" fill="none" stroke="#2B3440" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M70.234 91.875L70.234 106.875 95.654 106.875 96.894 91.875" fill="none" stroke="#2B3440" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M98.134 91.875L100.614 101.875 122.314 101.875 124.794 91.875" fill="none" stroke="#2B3440" strokeWidth="1.4" strokeLinejoin="round" />
      </g>
      <g style={{ opacity: '0.55' }}>
        <line x1="13.194" y1="59.375" x2="13.194" y2="90.625" stroke="#2B3440" strokeDasharray="3 3" />
        <line x1="41.094" y1="58.125" x2="41.094" y2="91.875" stroke="#2B3440" strokeDasharray="3 3" />
        <line x1="68.994" y1="58.125" x2="68.994" y2="91.875" stroke="#2B3440" strokeDasharray="3 3" />
        <line x1="96.894" y1="58.125" x2="96.894" y2="91.875" stroke="#2B3440" strokeDasharray="3 3" />
        <line x1="13.194" y1="58.125" x2="124.794" y2="58.125" stroke="#2B3440" strokeDasharray="3 3" />
        <line x1="13.194" y1="91.875" x2="124.794" y2="91.875" stroke="#2B3440" strokeDasharray="3 3" />
      </g>
    </svg>
  );

  const cats = [
    { num: '01', name: 'F&B', count: '42', tags: 'Cartons · sleeves · tins', g: grad('oklab(93.6% -0.004 0.091) 0%, oklab(80.4% 0.010 0.135) 100%'), i: 1 },
    { num: '02', name: 'Beauty', count: '38', tags: 'Cartons · jars · pouches', g: grad('oklab(98% 0.005 0.005) 0%, oklab(88% 0.020 0.020) 100%'), i: 2 },
    { num: '03', name: 'Electronics', count: '21', tags: 'Mailers · trays · sleeves', g: grad('oklab(94% -0.030 -0.080) 0%, oklab(70% -0.060 -0.160) 100%'), i: 3 },
    { num: '04', name: 'Limited drops', count: '18', tags: 'Foil · emboss · short-run', g: grad('oklab(60% 0.100 0.060) 0%, oklab(40% 0.150 0.080) 100%'), i: 4 }
  ];
  const cards = [
    { tag: 'Spirits · Rigid', title: 'Matcha mailer · 240gsm', meta: 'Render · edited 2h ago', edge: '#F1EEE8', glow: glow('#FFE3B0', '#FAEEDA', '#F1EEE8'), i: 5 },
    { tag: 'Spirits · Rigid', title: 'Whisky sleeve · 50yr', meta: 'Dieline · edited 1d ago', edge: '#F1ECE8', glow: glow('#F8D8C6', '#F3E6DD', '#F1ECE8'), i: 6 },
    { tag: 'Beauty · 30ml', title: 'Atelier serum · 30ml', meta: 'Render · edited 4d ago', edge: '#F0EAEE', glow: glow('#E7D5F0', '#EFE6F2', '#F0EAEE'), i: 7 },
    { tag: 'Electronics · Box', title: 'PlayStation box · rigid', meta: 'Export · edited 1w ago', edge: '#E9ECF0', glow: glow('#D7E4F4', '#E3E9F1', '#E9ECF0'), i: 8 }
  ];

  return (
    <section id="m-categories" style={{ width: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '28px', paddingBlock: '52px', backgroundColor: '#FFFFFF' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', paddingInline: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#E0F8F2', borderColor: '#1CD1AD80', borderStyle: 'solid', borderWidth: '1px', borderRadius: '999px', paddingBlock: '5px', paddingInline: '12px' }}>
          <span style={{ backgroundColor: '#1CD1AD', borderRadius: '50%', height: '6px', width: '6px' }} />
          <span style={{ color: '#0E8A72', fontFamily: mono, fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' }}>The library · 240 dielines</span>
        </div>
        <div style={{ color: '#0A0A0A', fontFamily: sans, fontSize: '34px', fontWeight: 500, letterSpacing: '-0.05em', lineHeight: '104%', textAlign: 'center' }}>Clone a box.<br />Ship in a day.</div>
      </div>

      {/* category cards rail */}
      <div style={railStyle}>
        {cats.map(c => (
          <div key={c.num} className="hov-chip" role="button" style={{ flexShrink: 0, width: '230px', backgroundColor: '#FAFAFA', borderColor: '#E7E7E5', borderStyle: 'solid', borderWidth: '1px', borderRadius: '14px', overflow: 'clip', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
            <div style={{ position: 'relative', height: '120px', backgroundImage: c.g }}>
              <div style={{ position: 'absolute', inset: '5px', backgroundImage: img(c.i), backgroundPosition: '50%', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', mixBlendMode: 'multiply' }} />
              <div style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: '#0A0A0AE6', borderRadius: '999px', paddingBlock: '5px', paddingInline: '10px' }}>
                <span style={{ color: '#fff', fontFamily: mono, fontSize: '10px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{c.num} · {c.name}</span>
              </div>
            </div>
            <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
                <span style={{ color: '#1A1108', fontFamily: sans, fontSize: '22px', fontWeight: 600, letterSpacing: '-0.025em' }}>{c.count}</span>
                <span style={{ color: '#8A8378', fontFamily: mono, fontSize: '10px', fontWeight: 500, letterSpacing: '0.11em', textTransform: 'uppercase' }}>dielines</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTopColor: '#E7E7E5', borderTopStyle: 'solid', borderTopWidth: '1px', paddingTop: '10px' }}>
                <span style={{ color: '#5C5C5C', fontFamily: mono, fontSize: '10px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{c.tags}</span>
                <span style={{ flexShrink: 0, height: '24px', width: '24px', borderRadius: '999px', backgroundColor: '#0A0A0A', color: '#fff', fontFamily: sans, fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>→</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* scroll hint + arrows */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingInline: '18px' }}>
        <span style={{ color: '#8A8378', fontFamily: mono, fontSize: '11px', fontWeight: 500, letterSpacing: '0.09em', textTransform: 'uppercase' }}>8 of 240 · scroll →</span>
        <div style={{ display: 'flex', gap: '10px' }}>
          <span style={{ height: '38px', width: '38px', borderRadius: '10px', borderColor: '#E7E7E5', borderStyle: 'solid', borderWidth: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C7CDD5' }}>←</span>
          <span style={{ height: '38px', width: '38px', borderRadius: '10px', backgroundColor: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>→</span>
        </div>
      </div>

      {/* product cards rail */}
      <div style={railStyle}>
        {cards.map(card => (
          <div key={card.title} className="hov-raise" style={{ flexShrink: 0, width: '259px', backgroundColor: '#FFFFFF', borderColor: '#E4E1DA', borderStyle: 'solid', borderWidth: '1px', borderRadius: '14px', overflow: 'clip', display: 'flex', flexDirection: 'column' }}>
            {/* image area — 1:1 with Paper (257×152): render bleeds top/right, clipped */}
            <div style={{ position: 'relative', height: '152px', backgroundColor: card.edge, backgroundImage: card.glow, overflow: 'clip' }}>
              <div style={{ position: 'absolute', left: '106px', top: '120px', width: '150px', height: '26px', background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(30,38,52,0.30) 0%, rgba(30,38,52,0.12) 45%, rgba(30,38,52,0) 75%)', filter: 'blur(3px)' }} />
              <div style={{ position: 'absolute', left: '99px', top: '-59px', width: '164px', height: '212px', backgroundImage: img(card.i), backgroundPosition: 'center bottom', backgroundRepeat: 'no-repeat', backgroundSize: '170%', mixBlendMode: 'multiply' }} />
              <div style={{ position: 'absolute', left: '10px', top: '36px', width: '93px', height: '65px' }}><Dieline /></div>
              <div style={{ position: 'absolute', top: '14px', left: '14px', backdropFilter: 'blur(8px)', backgroundColor: '#FFFFFFEB', borderRadius: '999px', paddingBlock: '4px', paddingInline: '10px' }}>
                <span style={{ color: '#041713', fontFamily: mono, fontSize: '9px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{card.tag}</span>
              </div>
            </div>
            <div style={{ padding: '12px 14px 13px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <span style={{ color: '#041713', fontFamily: sans, fontSize: '14px', fontWeight: 600, lineHeight: '15px' }}>{card.title}</span>
                <span style={{ color: '#8A8378', fontFamily: sans, fontSize: '12px', lineHeight: '13px' }}>{card.meta}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTopColor: '#F2F1ED', borderTopStyle: 'solid', borderTopWidth: '1px', paddingTop: '9px' }}>
                <div className="hov-btn" role="button" style={{ display: 'flex', alignItems: 'center', height: '28px', borderRadius: '8px', paddingInline: '11px', backgroundColor: '#0E2A22', cursor: 'pointer' }}>
                  <span style={{ color: '#EAFBF6', fontFamily: sans, fontSize: '12px', fontWeight: 600 }}>Open</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                  <span className="hov-btn" role="button" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '8px', borderColor: '#E4E1DA', borderStyle: 'solid', borderWidth: '1px', cursor: 'pointer' }}>
                    <span className="genie-logo" aria-hidden="true" style={{ width: '16px', height: '16px', color: '#10B493' }} />
                  </span>
                  <span className="hov-btn" role="button" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '8px', borderColor: '#E4E1DA', borderStyle: 'solid', borderWidth: '1px', color: '#5A5448', fontFamily: ms, fontSize: '16px', cursor: 'pointer' }}>more_horiz</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}]);
