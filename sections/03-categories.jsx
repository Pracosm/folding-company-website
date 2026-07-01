window.__S = window.__S || [];
window.__S.push(['categories', () => {
  const grad = (stops) => `radial-gradient(ellipse 60% 80% at 50% 40% in oklab, ${stops})`;
  const asset = (n) => `url(assets/thumbs/${n}.jpg)`;
  const glow = (tint, mid, edge) => `radial-gradient(ellipse 56% 66% at 72% 46%, ${tint} 0%, ${mid} 42%, ${edge} 100%)`;
  const cats = [
    { num: '01', name: 'F&B', count: '42', tags: 'Cartons · sleeves · tins', grad: grad('oklab(93.6% -0.004 0.091) 0%, oklab(87.8% -0.001 0.117) 50%, oklab(80.4% 0.010 0.135) 100%'), img: 1 },
    { num: '02', name: 'Beauty', count: '38', tags: 'Cartons · jars · pouches', grad: grad('oklab(98% 0.005 0.005) 0%, oklab(94% 0.012 0.015) 60%, oklab(88% 0.020 0.020) 100%'), img: 2 },
    { num: '03', name: 'Electronics', count: '21', tags: 'Mailers · trays · sleeves', grad: grad('oklab(94% -0.030 -0.080) 0%, oklab(82% -0.050 -0.130) 60%, oklab(70% -0.060 -0.160) 100%'), img: 3 },
    { num: '04', name: 'Limited drops', count: '18', tags: 'Foil · emboss · short-run', grad: grad('oklab(60% 0.100 0.060) 0%, oklab(50% 0.130 0.070) 60%, oklab(40% 0.150 0.080) 100%'), img: 4 }
  ];
  const cards = [
    { tag: 'F&B · Carton', no: 'No. 01', edge: '#F1EEE8', glow: glow('#FFE3B0', '#FAEEDA', '#F1EEE8'), img: 5, title: 'Craft Coffee Carton', meta: '1,284 cloned · 240gsm · valve cut' },
    { tag: 'Beauty · Carton', no: 'No. 02', edge: '#F2EEEC', glow: glow('#FBE5DC', '#F6EBE6', '#F2EEEC'), img: 6, title: 'Skincare 30ml Carton', meta: '612 cloned · hot foil · soft-touch matte' },
    { tag: 'Electronics · Mailer', no: 'No. 03', edge: '#E9ECF0', glow: glow('#D7E4F4', '#E3E9F1', '#E9ECF0'), img: 7, title: 'Hair Dryer Box', meta: '489 cloned · magnetic flap · rigid setup' },
    { tag: 'Food · Tin', no: 'No. 04', edge: '#EAEFE9', glow: glow('#D9EFD2', '#E6EFE4', '#EAEFE9'), img: 8, title: 'Matcha Lid Tin', meta: '318 cloned · friction-fit · embossed' },
    { tag: 'Apparel · Mailer', no: 'No. 05', edge: '#F1ECE8', glow: glow('#F8D8C6', '#F3E6DD', '#F1ECE8'), img: 9, title: 'Soft-flex Apparel Mailer', meta: '287 cloned · tear-strip · recyclable' },
    { tag: 'Limited · Drop', no: 'No. 06', edge: '#EAE5E3', glow: glow('#F1C3AC', '#EADBD3', '#EAE5E3'), img: 10, title: 'Wine Sleeve — Vol. 04', meta: '118 cloned · 750ml · tri-fold' },
    { tag: 'Sports · Tube', no: 'No. 07', edge: '#F0EAEE', glow: glow('#F6D1E1', '#F0E2EA', '#F0EAEE'), img: 11, title: 'Badminton Shuttle Tube', meta: '84 cloned · 12-pack · foil-stamped' },
    { tag: 'F&B · Pouch', no: 'No. 08', edge: '#F1EEE8', glow: glow('#FFE3B0', '#FAEEDA', '#F1EEE8'), img: 12, title: 'Single-origin Pouch', meta: '62 cloned · stand-up · re-seal zip' }
  ];
  const mono = '"Geist Mono", system-ui, sans-serif';
  const sans = '"Geist", system-ui, sans-serif';
  const Dieline = () => (
    <svg viewBox="0 0 214 150" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke="#2B3440" strokeWidth="1.4" strokeLinejoin="round">
        <path d="M22,50 L12,54 L12,96 L22,100" fill="#2B344008" />
        <path d="M28,48 L34,24 L61,24 L65,48" fill="none" />
        <path d="M69,48 L73,34 L108,34 L112,48" fill="none" />
        <path d="M114,48 L114,26 L155,26 L157,48" fill="none" />
        <path d="M159,48 L163,34 L198,34 L202,48" fill="none" />
        <rect x="22" y="48" width="180" height="54" fill="#2B344005" />
        <path d="M28,102 L34,128 L61,128 L65,102" fill="none" />
        <path d="M69,102 L73,118 L108,118 L112,102" fill="none" />
        <path d="M114,102 L114,126 L155,126 L157,102" fill="none" />
        <path d="M159,102 L163,118 L198,118 L202,102" fill="none" />
      </g>
      <g stroke="#2B3440" strokeWidth="1" strokeDasharray="3 3" opacity="0.55">
        <line x1="22" y1="50" x2="22" y2="100" />
        <line x1="67" y1="48" x2="67" y2="102" />
        <line x1="112" y1="48" x2="112" y2="102" />
        <line x1="157" y1="48" x2="157" y2="102" />
        <line x1="22" y1="48" x2="202" y2="48" />
        <line x1="22" y1="102" x2="202" y2="102" />
      </g>
    </svg>
  );
  return (
    <section id="categories" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBlock: '96px', boxSizing: 'border-box', fontSynthesis: 'none', MozOsxFontSmoothing: 'grayscale', WebkitFontSmoothing: 'antialiased' }}>
      <div style={{ maxWidth: '1280px', width: '100%', paddingInline: '32px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '40px' }}>

        <div className="reveal" style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ alignItems: 'center', backgroundColor: '#E0F8F2', borderColor: '#1CD1AD80', borderRadius: '999px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', gap: '8px', paddingBlock: '5px', paddingInline: '12px' }}>
            <div style={{ backgroundColor: '#1CD1AD', borderRadius: '50%', flexShrink: 0, height: '6px', width: '6px' }} />
            <div style={{ color: '#0E8A72', fontFamily: mono, fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', lineHeight: '155%', textAlign: 'center', textTransform: 'uppercase' }}>
              The library · 240 hand-crafted dielines
            </div>
          </div>
          <div style={{ color: '#0A0A0A', fontFamily: sans, fontSize: '44px', fontWeight: 500, letterSpacing: '-0.07em', lineHeight: '102%', textAlign: 'center' }}>
            Clone a box. Ship in a day.
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', width: '100%' }}>
          {cats.map((c, i) => (
            <div key={c.num} className="hov-chip reveal" style={{ '--d': `${i * 90}ms`, backgroundColor: '#FAFAFA', borderColor: '#E7E7E5', borderRadius: '14px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', flex: '1 1 260px', minWidth: '260px', height: '150px', overflow: 'clip' }}>
              <div style={{ boxSizing: 'border-box', display: 'flex', flexBasis: '0px', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between', minWidth: '0px', paddingBlock: '16px', paddingLeft: '18px', paddingRight: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ alignItems: 'baseline', display: 'flex', gap: '7px' }}>
                    <div style={{ color: '#0E8A72', fontFamily: mono, fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', lineHeight: '12px', textTransform: 'uppercase' }}>
                      {c.num}
                    </div>
                    <div style={{ color: '#1A1108', fontFamily: sans, fontSize: '17px', fontWeight: 600, letterSpacing: '-0.027em', lineHeight: '20px' }}>
                      {c.name}
                    </div>
                  </div>
                  <div style={{ alignItems: 'baseline', display: 'flex', gap: '5px' }}>
                    <div style={{ color: '#1A1108', fontFamily: sans, fontSize: '20px', fontWeight: 600, letterSpacing: '-0.025em', lineHeight: '20px' }}>
                      {c.count}
                    </div>
                    <div style={{ color: '#8A8378', fontFamily: mono, fontSize: '10px', fontWeight: 500, letterSpacing: '0.11em', lineHeight: '12px', textTransform: 'uppercase' }}>
                      dielines
                    </div>
                  </div>
                </div>
                <div style={{ alignItems: 'center', borderTopColor: '#E7E7E5', borderTopStyle: 'solid', borderTopWidth: '1px', display: 'flex', justifyContent: 'space-between', paddingTop: '8px' }}>
                  <div style={{ color: '#5C5C5C', fontFamily: mono, fontSize: '10px', fontWeight: 500, letterSpacing: '0.1em', lineHeight: '12px', textTransform: 'uppercase' }}>
                    {c.tags}
                  </div>
                  <div style={{ alignItems: 'center', backgroundColor: '#0A0A0A', borderRadius: '999px', display: 'flex', flexShrink: 0, height: '24px', justifyContent: 'center', width: '24px' }}>
                    <div style={{ color: '#FFFFFF', fontFamily: sans, fontSize: '12px', fontWeight: 500, lineHeight: '12px' }}>
                      →
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ backgroundImage: c.grad, flexShrink: 0, position: 'relative', width: '120px' }}>
                <div style={{ backgroundImage: asset(c.img), backgroundPosition: '50%', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', mixBlendMode: 'multiply', position: 'absolute', inset: '5px' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="reveal marquee" style={{ marginTop: '40px', maskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)' }}>
        <div className="marquee-track" style={{ gap: '20px', paddingRight: '20px', animationDuration: '70s' }}>
          {[0, 1].map(dup => (
            <React.Fragment key={dup}>
              {cards.map((card, i) => (
            <div key={card.no} aria-hidden={dup === 1 || undefined} className="hov-raise" style={{ width: '400px', flexShrink: 0, backgroundColor: '#FAFAFA', borderColor: '#E7E7E5', borderRadius: '18px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', overflow: 'clip' }}>
              <div style={{ backgroundColor: card.edge, backgroundImage: card.glow, flexShrink: 0, height: '220px', overflow: 'clip', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '14px', top: '26px', width: '150px', height: '102px' }}>
                  <Dieline />
                </div>
                <div style={{ position: 'absolute', left: '166px', top: '192px', width: '196px', height: '28px', background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(30,38,52,0.28) 0%, rgba(30,38,52,0.11) 45%, rgba(30,38,52,0) 75%)', filter: 'blur(3px)' }} />
                <div style={{ backgroundImage: asset(card.img), backgroundPosition: 'center bottom', backgroundRepeat: 'no-repeat', backgroundSize: 'contain', mixBlendMode: 'multiply', bottom: '4px', left: '116px', position: 'absolute', right: '4px', top: '6px' }} />
                <div style={{ backgroundColor: '#FFFFFFD9', borderRadius: '999px', left: '14px', paddingBlock: '5px', paddingInline: '10px', position: 'absolute', top: '14px' }}>
                  <div style={{ color: '#1A1108', fontFamily: mono, fontSize: '10px', fontWeight: 500, letterSpacing: '0.1em', lineHeight: '13px', textTransform: 'uppercase' }}>
                    {card.tag}
                  </div>
                </div>
                <div style={{ backgroundColor: '#041713', borderRadius: '999px', paddingBlock: '5px', paddingInline: '9px', position: 'absolute', right: '14px', top: '14px' }}>
                  <div style={{ color: '#1CD1AD', fontFamily: mono, fontSize: '10px', fontWeight: 600, letterSpacing: '0.07em', lineHeight: '13px', textTransform: 'uppercase' }}>
                    {card.no}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingBottom: '20px', paddingInline: '20px', paddingTop: '18px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <div style={{ color: '#1A1108', fontFamily: sans, fontSize: '17px', fontWeight: 600, letterSpacing: '-0.025em', lineHeight: '21px' }}>
                    {card.title}
                  </div>
                  <div style={{ color: '#8A8378', fontFamily: mono, fontSize: '10px', fontWeight: 500, letterSpacing: '0.08em', lineHeight: '13px', textTransform: 'uppercase' }}>
                    {card.meta}
                  </div>
                </div>
                <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ alignItems: 'center', display: 'flex', gap: '7px' }}>
                    <div style={{ backgroundColor: '#1CD1AD', borderRadius: '50%', flexShrink: 0, height: '6px', width: '6px' }} />
                    <div style={{ color: '#5C5C5C', fontFamily: sans, fontSize: '13px', fontWeight: 500, lineHeight: '16px' }}>
                      Folded clean
                    </div>
                  </div>
                  <div className="hov-btn" role="button" style={{ alignItems: 'center', backgroundColor: '#0A0A0A', borderRadius: '7px', cursor: 'pointer', display: 'flex', gap: '6px', paddingBlock: '8px', paddingInline: '14px' }}>
                    <div style={{ color: '#FFFFFF', fontFamily: sans, fontSize: '13px', fontWeight: 500, lineHeight: '16px' }}>
                      Clone →
                    </div>
                  </div>
                </div>
              </div>
            </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '1280px', width: '100%', paddingInline: '32px', boxSizing: 'border-box' }}>
        <div className="reveal" style={{ alignItems: 'center', display: 'flex', gap: '12px', justifyContent: 'flex-end', paddingTop: '4px' }}>
          <div style={{ color: '#8A8378', fontFamily: mono, fontSize: '11px', fontWeight: 500, letterSpacing: '0.09em', lineHeight: '14px', textTransform: 'uppercase' }}>
            01 / 18
          </div>
          <div className="hov-btn" role="button" style={{ alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: '#E7E7E5', borderRadius: '10px', borderStyle: 'solid', borderWidth: '1px', cursor: 'pointer', display: 'flex', flexShrink: 0, height: '40px', justifyContent: 'center', width: '40px' }}>
            <div style={{ color: '#C7CDD5', fontFamily: sans, fontSize: '16px', fontWeight: 500, lineHeight: '16px' }}>
              ←
            </div>
          </div>
          <div className="hov-btn" role="button" style={{ alignItems: 'center', backgroundColor: '#0A0A0A', borderRadius: '10px', cursor: 'pointer', display: 'flex', flexShrink: 0, height: '40px', justifyContent: 'center', width: '40px' }}>
            <div style={{ color: '#FFFFFF', fontFamily: sans, fontSize: '16px', fontWeight: 500, lineHeight: '16px' }}>
              →
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}]);
