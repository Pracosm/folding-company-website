// Mobile templates — mirrors Paper frame 2TM-0 › "Eleven shapes" (309-0).
// Shapes are the SAME real CSS-3D models as desktop (window.FCShapes, exposed by
// sections/04-templates.jsx). Desktop unfolds them on hover; mobile has no hover,
// so a tap SELECTS a shape: it unfolds (one at a time) and the "Most rendered"
// gallery below updates to reflect the selected shape.
window.__M = window.__M || [];
window.__M.push(['templates', () => {
  const sans = '"Geist", system-ui, sans-serif';
  const mono = '"Geist Mono", system-ui, sans-serif';
  const ms = '"Material Symbols Rounded", system-ui, sans-serif';
  const F = window.FCShapes || {};
  const filters = [['All', '11', true], ['Polyhedra', '7'], ['Soft forms', '2'], ['Accessory', '1'], ['Custom', '1', false, true]];

  // Same generator calls (and exact args) as the desktop cards in 04-templates.jsx.
  const shapes = [
    { n: 'Square', c: 'Polyhedra', d: '#1CD1AD', make: () => F.TBox(82, 82, 82, ['#BFEEE0', '#7FE6CC', '#37D6B4', '#1CD1AD'], '#0E8A72') },
    { n: 'Rectangle', c: 'Polyhedra', d: '#5BA3E0', make: () => F.TBox(106, 70, 70, ['#D5E8F8', '#A6CCEE', '#7DB1E6', '#5BA3E0'], '#2E6DA8') },
    { n: 'Trapezoid', c: 'Polyhedra', d: '#F08570', make: () => F.TPrism([[-26, -30], [26, -30], [42, 30], [-42, 30]], 56, ['#F4A48F', '#E8795E'], '#F6B8A6', '#B5482F') },
    { n: 'Pyramid', c: 'Polyhedra', d: '#F0C84D', make: () => F.TPyr(86, 56, ['#FBE6A6', '#F3CE5E', '#E9B43C'], '#B98A1E') },
    { n: 'Star', c: 'Polyhedra', d: '#9A82E8', make: () => F.TStand(F.starPts(5, 50, 21), 30, ['#A98FED', '#9A82E8'], '#CDBDF5', '#6A53C4', undefined, undefined, { lidLift: true }) },
    { n: 'Star w/ lids', c: 'Polyhedra', d: '#4FB8A0', make: () => F.TStand(F.starPts(5, 48, 20), 36, ['#7FD9C4', '#4FB8A0'], '#C2F0E5', '#2C8C77', undefined, undefined, { lidLift: true, bothLids: true }) },
    { n: 'Mixed Polygon', c: 'Polyhedra', d: '#E87A5E', make: () => F.TPrism(F.ngon(7, 46), 58, ['#F0A98F', '#E87A5E'], '#F6C3B2', '#B5482F') },
    { n: 'Gusset bag', c: 'Soft', d: '#C9A875', make: () => F.TBox(60, 92, 40, ['#E7D3AE', '#D3B57E', '#C9A875', '#B9945E'], '#8A6A3A') },
    { n: 'Wraps & Rolls', c: 'Soft', d: '#9B7DC4', make: () => F.TPrism(F.ngon(16, 38), 92, ['#C3A9E4', '#9B7DC4'], '#D6C4ED', '#6B4F94', { isoOpen: 'rotateX(0deg) rotateY(0deg) scale(.3)' }) },
    { n: 'Cups & labels', c: 'Accessory', d: '#E89E64', make: () => F.TPrism(F.ngon(14, 38), 74, ['#F2BE92', '#E89E64'], '#F7D3B4', '#B06A30', { foldDeg: 76, isoOpen: 'rotateX(0deg) rotateY(0deg) scale(.32)' }) },
    { n: 'Describe it →', c: 'Custom', d: '#1CD1AD', custom: true, make: () => F.TBox(72, 72, 72, ['#CFF5EC', '#9DE9D7', '#6FE0C8', '#27D3B0'], '#0E8A72') }
  ];
  const pages = [];
  for (let i = 0; i < shapes.length; i += 4) pages.push(shapes.slice(i, i + 4));

  const railRef = React.useRef(null);
  const [page, setPage] = React.useState(0);
  const [sel, setSel] = React.useState(0);   // selected shape (drives the gallery); default Square
  const [open, setOpen] = React.useState(-1); // which shape is unfolded; -1 = none, one at a time
  const onScroll = () => { const r = railRef.current; if (r) setPage(Math.round(r.scrollLeft / r.clientWidth)); };
  const go = i => { const r = railRef.current; if (!r) return; const t = Math.max(0, Math.min(pages.length - 1, i)); r.scrollTo({ left: t * r.clientWidth, behavior: 'smooth' }); };
  const tap = gi => { setSel(gi); setOpen(o => (o === gi ? -1 : gi)); };

  const selName = shapes[sel].custom ? 'Custom' : shapes[sel].n;
  const selUpper = selName.toUpperCase();

  const Card = (s, gi) => {
    const active = sel === gi, isOpen = open === gi;
    return (
      <div key={s.n} className={'m-shape-card hov-raise' + (isOpen ? ' is-open' : '')} role="button" onClick={() => tap(gi)}
        style={{ backgroundColor: s.custom ? '#FAFFFD' : '#FFFFFF', borderColor: active || s.custom ? '#1CD1AD' : '#E7E7E5', borderStyle: s.custom ? 'dashed' : 'solid', borderWidth: active ? '2px' : '1px', borderRadius: '16px', overflow: 'clip', display: 'flex', flexDirection: 'column', boxShadow: active ? '#1CD1AD2E 0px 4px 12px' : 'none', cursor: 'pointer' }}>
        <div style={{ height: '136px', backgroundColor: s.custom ? '#E0F8F2' : '#F4F6F9', position: 'relative', overflow: 'clip' }}>
          <div className="sfold-scene" aria-hidden="true">{s.make()}</div>
        </div>
        <div style={{ padding: '11px 13px 13px', display: 'flex', flexDirection: 'column', gap: '4px', backgroundColor: s.custom ? '#FAFFFD' : '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ backgroundColor: s.d, borderRadius: '50%', height: '6px', width: '6px', flexShrink: 0 }} />
            <span style={{ color: s.custom ? '#0E8A72' : '#4F5854', fontFamily: mono, fontSize: '9px', fontWeight: 500, letterSpacing: '0.13em', textTransform: 'uppercase' }}>{s.c} · {('0' + (gi + 1)).slice(-2)}</span>
          </div>
          <span style={{ color: '#041713', fontFamily: sans, fontSize: '13.5px', fontWeight: 600 }}>{s.n}</span>
        </div>
      </div>
    );
  };
  const arrow = (dir, on) => (
    <div role="button" onClick={() => go(page + dir)} style={{ height: '36px', width: '36px', borderRadius: '10px', borderColor: '#E7E7E5', borderStyle: 'solid', borderWidth: '1px', backgroundColor: on ? '#0A0A0A' : '#FFFFFF', color: on ? '#FFFFFF' : '#C7CDD5', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontFamily: sans, fontSize: '16px' }}>{dir < 0 ? '←' : '→'}</div>
  );

  // ---- Most rendered gallery (ported from desktop 04-templates, single column) ----
  const galleryChips = [['MOST RENDERED', true], ['NEWEST'], ['BY INDUSTRY'], ['SAVED BY YOU']];
  const smallCards = [
    { img: 'assets/renders/render-1.jpg', tag: 'F&B · POP CUBE', title: 'Citrus pop cube', meta: '@pop.lab · 612 RENDERED' },
    { img: 'assets/renders/render-2.jpg', tag: 'GIFTING · CUBE', title: 'Mountain gift cube', meta: '@northpeak · 894 RENDERED', forkable: true },
    { img: 'assets/renders/render-3.jpg', tag: 'GIFTING · MINI', title: 'Heart pop cube', meta: '@studio.pop · 412 RENDERED' },
    { img: 'assets/renders/render-4.jpg', tag: 'PERSONAL CARE · TALL', title: 'Sumedha tall carton', meta: '@sumedha.care · 308 RENDERED' }
  ];
  const overlay = 'linear-gradient(in oklab 0deg, oklab(18.7% -0.028 .0009 / 92%) 0%, oklab(18.7% -0.028 .0009 / 45%) 65%, oklab(18.7% -0.028 .0009 / 0%) 100%)';
  const SmallCard = c => (
    <div key={c.title} className="hov-raise" style={{ backgroundImage: `url(${c.img})`, backgroundPosition: '50%', backgroundSize: 'cover', borderRadius: '14px', minHeight: '170px', overflow: 'clip', position: 'relative', display: 'flex' }}>
      <div style={{ backgroundColor: '#041713C7', borderRadius: '999px', left: '10px', top: '10px', paddingBlock: '4px', paddingInline: '9px', position: 'absolute' }}>
        <span style={{ color: '#FAFAFA', fontFamily: mono, fontSize: '8.5px', fontWeight: 500, letterSpacing: '0.12em' }}>{c.tag}</span>
      </div>
      {c.forkable && (
        <div style={{ backgroundColor: '#1CD1ADEB', borderRadius: '999px', right: '10px', top: '10px', paddingBlock: '4px', paddingInline: '8px', position: 'absolute' }}>
          <span style={{ color: '#041713', fontFamily: mono, fontSize: '8.5px', fontWeight: 600, letterSpacing: '0.08em' }}>↗ FORKABLE</span>
        </div>
      )}
      <div style={{ alignItems: 'flex-end', backgroundImage: overlay, bottom: 0, left: 0, right: 0, position: 'absolute', display: 'flex', justifyContent: 'space-between', gap: '8px', paddingBottom: '12px', paddingInline: '13px', paddingTop: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: 0 }}>
          <span style={{ color: '#FAFAFA', fontFamily: sans, fontSize: '14px', fontWeight: 600, lineHeight: '115%' }}>{c.title}</span>
          <span style={{ color: '#FAFAFAA6', fontFamily: mono, fontSize: '8.5px' }}>{c.meta}</span>
        </div>
        <div className="hov-btn" role="button" style={{ alignItems: 'center', backgroundColor: '#1CD1AD', borderRadius: '7px', display: 'flex', flexShrink: 0, gap: '4px', paddingBlock: '7px', paddingInline: '10px' }}>
          <span style={{ color: '#041713', fontFamily: mono, fontSize: '9px', fontWeight: 600, letterSpacing: '0.05em' }}>RENDER →</span>
        </div>
      </div>
    </div>
  );

  return (
    <section id="m-templates" style={{ width: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '22px', paddingBlock: '52px', paddingInline: '16px', backgroundColor: '#FFFFFF' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#E0F8F2', borderColor: '#1CD1AD80', borderStyle: 'solid', borderWidth: '1px', borderRadius: '999px', paddingBlock: '5px', paddingInline: '12px' }}>
          <span style={{ backgroundColor: '#1CD1AD', borderRadius: '50%', height: '6px', width: '6px' }} />
          <span style={{ color: '#0E8A72', fontFamily: mono, fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Shape library</span>
        </div>
        <div style={{ color: '#0A0A0A', fontFamily: sans, fontSize: '32px', fontWeight: 500, letterSpacing: '-0.05em', lineHeight: '104%', textAlign: 'center' }}>Eleven shapes. Everything else, on-demand.</div>
        <div style={{ color: '#8A8378', fontFamily: mono, fontSize: '10px', fontWeight: 500, letterSpacing: '0.06em', textAlign: 'center' }}>TAP A SHAPE TO UNFOLD IT</div>
      </div>

      {/* filter chips */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '2px', scrollbarWidth: 'none' }}>
        {filters.map(([label, n, active, custom]) => (
          <div key={label} className="hov-chip" role="button" style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: active ? '#0A0A0A' : '#FFFFFF', borderColor: custom ? '#1CD1AD' : '#E7E7E5', borderStyle: 'solid', borderWidth: '1px', borderRadius: '999px', paddingBlock: '9px', paddingInline: '16px', cursor: 'pointer' }}>
            <span style={{ color: active ? '#FFFFFF' : custom ? '#0E8A72' : '#1A1108', fontFamily: sans, fontSize: '14px', fontWeight: 500 }}>{label}</span>
            <span style={{ color: active ? '#FFFFFFE6' : custom ? '#0E8A72' : '#8A8378', fontFamily: mono, fontSize: '12px' }}>{n}</span>
          </div>
        ))}
      </div>

      {/* 2x2 paged carousel of real 3D shapes */}
      <div ref={railRef} onScroll={onScroll} style={{ display: 'flex', overflowX: 'auto', scrollSnapType: 'x mandatory', scrollbarWidth: 'none', margin: '0 -2px' }}>
        {pages.map((pg, pi) => (
          <div key={pi} style={{ flex: '0 0 100%', scrollSnapAlign: 'start', boxSizing: 'border-box', paddingInline: '2px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {pg.map((s, li) => Card(s, pi * 4 + li))}
            </div>
          </div>
        ))}
      </div>

      {/* controls: dots + arrows */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
          {pages.map((_, i) => (
            <span key={i} onClick={() => go(i)} role="button" style={{ height: '7px', borderRadius: '999px', cursor: 'pointer', transition: 'width .25s ease, background-color .25s ease', width: i === page ? '20px' : '7px', backgroundColor: i === page ? '#0A0A0A' : '#D8D8D4' }} />
          ))}
          <span style={{ marginLeft: '6px', color: '#8A8378', fontFamily: mono, fontSize: '11px', letterSpacing: '0.06em' }}>{('0' + (page + 1)).slice(-2)} / {('0' + pages.length).slice(-2)}</span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          {arrow(-1, page > 0)}
          {arrow(1, page < pages.length - 1)}
        </div>
      </div>

      {/* ---- Most rendered gallery (reflects the selected shape) ---- */}
      <div style={{ borderTopColor: '#E7E7E5', borderTopStyle: 'dashed', borderTopWidth: '1px', marginTop: '6px', paddingTop: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {galleryChips.map(([label, active]) => (
            <div key={label} className="hov-chip" role="button" style={{ flexShrink: 0, backgroundColor: active ? '#041713' : '#FFFFFF', borderColor: active ? '#041713' : '#E7E7E5', borderStyle: 'solid', borderWidth: '1px', borderRadius: '999px', paddingBlock: '8px', paddingInline: '14px', cursor: 'pointer' }}>
              <span style={{ color: active ? '#FAFAFA' : '#4F5854', fontFamily: mono, fontSize: '10px', fontWeight: 500, letterSpacing: '0.13em' }}>{label}</span>
            </div>
          ))}
        </div>

        {/* featured card */}
        <div className="hov-raise" style={{ backgroundImage: 'url(assets/renders/render-featured.jpg)', backgroundPosition: '50%', backgroundSize: 'cover', borderRadius: '18px', minHeight: '340px', overflow: 'clip', position: 'relative', display: 'flex' }}>
          <div style={{ alignItems: 'center', backgroundColor: '#041713', borderRadius: '999px', display: 'flex', gap: '7px', left: '14px', top: '14px', paddingBlock: '6px', paddingInline: '12px', position: 'absolute' }}>
            <span style={{ backgroundColor: '#1CD1AD', borderRadius: '50%', height: '6px', width: '6px' }} />
            <span style={{ color: '#FAFAFA', fontFamily: mono, fontSize: '9px', fontWeight: 600, letterSpacing: '0.12em' }}>FEATURED · MADE WITH {selUpper}</span>
          </div>
          <div style={{ alignItems: 'center', backgroundColor: '#041713C7', borderColor: '#FFFFFF2E', borderRadius: '7px', borderStyle: 'solid', borderWidth: '1px', display: 'flex', gap: '7px', right: '14px', top: '14px', paddingBlock: '6px', paddingInline: '10px', position: 'absolute' }}>
            <span style={{ backgroundColor: '#1CD1AD', borderRadius: '50%', height: '14px', width: '14px' }} />
            <span style={{ color: '#FAFAFA', fontFamily: mono, fontSize: '10px', fontWeight: 500 }}>@sumedha.care</span>
          </div>
          <div style={{ backgroundImage: overlay, bottom: 0, left: 0, right: 0, position: 'absolute', display: 'flex', flexDirection: 'column', gap: '14px', paddingBottom: '20px', paddingInline: '20px', paddingTop: '34px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ color: '#1CD1AD', fontFamily: mono, fontSize: '9.5px', fontWeight: 500, letterSpacing: '0.13em' }}>PERSONAL CARE · FOLDING CARTON</span>
              <span style={{ color: '#FAFAFA', fontFamily: sans, fontSize: '26px', fontWeight: 600, letterSpacing: '-0.018em', lineHeight: '106%' }}>Sumedha women-care carton</span>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {['1,284 RENDERED', '★ 4.8', 'FORKED 42×'].map(t => (
                  <span key={t} style={{ color: '#FAFAFAB3', fontFamily: mono, fontSize: '10px' }}>{t}</span>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
              <div className="hov-btn" role="button" style={{ alignItems: 'center', backgroundColor: '#1CD1AD', borderRadius: '11px', display: 'flex', gap: '7px', paddingBlock: '12px', paddingInline: '18px' }}>
                <span style={{ color: '#041713', fontFamily: sans, fontSize: '14px', fontWeight: 600 }}>Render in Studio →</span>
              </div>
              <span style={{ color: '#FAFAFA99', fontFamily: mono, fontSize: '9px', fontWeight: 500, letterSpacing: '0.1em' }}>PREVIEW FREE · NO SIGNUP</span>
            </div>
          </div>
        </div>

        {/* 2x2 grid of community renders */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {smallCards.map(SmallCard)}
        </div>

        {/* footer: stats + CTAs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingTop: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <div className="hov-chip" style={{ backgroundColor: '#FFFFFF', borderColor: '#E7E7E5', borderStyle: 'solid', borderWidth: '1px', borderRadius: '999px', paddingBlock: '10px', paddingInline: '16px' }}>
              <span style={{ color: '#041713', fontFamily: mono, fontSize: '10.5px', fontWeight: 600, letterSpacing: '0.1em' }}>247 {selUpper} DESIGNS</span>
            </div>
            <span style={{ color: '#4F5854', fontFamily: sans, fontSize: '13px' }}>· 18 industries · 62 forkable</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className="hov-btn" role="button" style={{ alignItems: 'center', justifyContent: 'center', borderColor: '#E7E7E5', borderStyle: 'solid', borderWidth: '1px', borderRadius: '12px', display: 'flex', gap: '8px', paddingBlock: '14px', paddingInline: '22px' }}>
              <span style={{ color: '#041713', fontFamily: sans, fontSize: '14px', fontWeight: 500 }}>Browse all 247 →</span>
            </div>
            <div className="hov-btn" role="button" style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#041713', borderRadius: '12px', display: 'flex', gap: '8px', paddingBlock: '14px', paddingInline: '22px' }}>
              <span style={{ color: '#FAFAFA', fontFamily: sans, fontSize: '14px', fontWeight: 500 }}>Start blank {selName} in Studio →</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}]);
