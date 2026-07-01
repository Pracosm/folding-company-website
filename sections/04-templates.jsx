window.__S = window.__S || [];

/* ====================================================================
   3D shape generators for the templates carousel. Each shape is a real
   3D model (assembled by default) that unfolds into its flat dieline on
   card hover and refolds on leave. Every face carries --folded / --flat
   transforms; the CSS transitions between them on :hover.
   ==================================================================== */
function TFace(o) {
  const st = {
    position: 'absolute', width: o.w + 'px', height: o.h + 'px',
    left: (o.left || 0) + 'px', top: (o.top || 0) + 'px',
    transformOrigin: o.origin || '50% 50%', background: o.bg,
    ['--folded']: o.folded || 'none', ['--flat']: o.flat || 'none',
    ['--ink']: o.ink, borderRadius: (o.radius == null ? 3 : o.radius) + 'px',
  };
  if (o.clip) st.clipPath = o.clip;
  return <div className="f" key={o.key} style={st}>{o.children}</div>;
}
function TStage(iso, isoOpen, children) {
  return <div className="sfold" style={{ width: '0px', height: '0px', ['--iso']: iso, ['--isoOpen']: isoOpen }}>{children}</div>;
}
function TTile(shape, bg) {
  return (
    <div style={{ backgroundColor: bg || '#F4F6F9', boxSizing: 'border-box', flexBasis: '0%', flexGrow: '1', position: 'relative', overflow: 'clip' }}>
      <div className="sfold-scene" aria-hidden="true">{shape}</div>
    </div>
  );
}
// cuboid: base + 4 hinged walls + a back panel hinged off the top
function TBox(w, h, d, c, ink, iso, isoOpen) {
  // The flat net is a "+" cross whose top arm (top panel + back panel) is longer
  // than the others, so it's both off-centre and top-heavy. Centre it on the net's
  // true bounding box and scale it to fit the tile, matching the radial shapes.
  const netW = w + 2 * d, netH = 2 * (h + d);
  const fit = +Math.min(170 / netW, 140 / netH, 0.5).toFixed(3);
  const oty = +((h / 2) * fit).toFixed(1); // shift down so the net's bbox centre sits on the stage origin
  const open = isoOpen || `translateY(${oty}px) rotateX(0deg) rotateY(0deg) scale(${fit})`;
  // Assembled (iso) state: the box rotates around its 3D centre, but the dominant
  // light front face projects down-left (rotateY swings it off the stage origin), so
  // the box reads as off-centre. Re-centre on the front face: project its centre
  // through the same rotateX(-20)/rotateY(-32)/perspective(700) and translate it back.
  const hz = d / 2, AX = 20 * Math.PI / 180, AY = 32 * Math.PI / 180;
  const z1 = hz * Math.cos(AY), z2 = z1 * Math.cos(AX), pf = 700 / (700 - z2);
  const ctx = +(hz * Math.sin(AY) * pf).toFixed(1);  // shift right
  const cty = +(-z1 * Math.sin(AX) * pf).toFixed(1); // shift up
  const closed = iso || `translate(${ctx}px, ${cty}px) rotateX(-20deg) rotateY(-32deg) scale(1)`;
  return (
    <div className="sfold" style={{ width: w + 'px', height: h + 'px', transformOrigin: `50% 50% ${-d / 2}px`, ['--iso']: closed, ['--isoOpen']: open }}>
      {TFace({ key: 'base', w, h, bg: c[0], ink })}
      {TFace({ key: 'bottom', w, h: d, top: h, origin: '50% 0%', bg: c[1], folded: 'rotateX(-90deg)', flat: 'rotateX(0deg)', ink })}
      {TFace({ key: 'left', w: d, h, left: -d, origin: '100% 50%', bg: c[2], folded: 'rotateY(-90deg)', flat: 'rotateY(0deg)', ink })}
      {TFace({ key: 'right', w: d, h, left: w, origin: '0% 50%', bg: c[2], folded: 'rotateY(90deg)', flat: 'rotateY(0deg)', ink })}
      {TFace({ key: 'top', w, h: d, top: -d, origin: '50% 100%', bg: c[1], folded: 'rotateX(90deg)', flat: 'rotateX(0deg)', ink,
        children: TFace({ key: 'back', w, h, top: -h, origin: '50% 100%', bg: c[3], folded: 'rotateX(90deg)', flat: 'rotateX(0deg)', ink }) })}
    </div>
  );
}
// regular n-gon vertices (centered), starting at the top
function ngon(n, R, rot) { const a = []; rot = (rot == null ? -90 : rot); for (let k = 0; k < n; k++) { const t = (rot + k * 360 / n) * Math.PI / 180; a.push([+(R * Math.cos(t)).toFixed(2), +(R * Math.sin(t)).toFixed(2)]); } return a; }
// star polygon vertices (alternating outer/inner radius)
function starPts(p, Ro, Ri, rot) { const a = []; rot = (rot == null ? -90 : rot); for (let k = 0; k < 2 * p; k++) { const R = k % 2 ? Ri : Ro; const t = (rot + k * 180 / p) * Math.PI / 180; a.push([+(R * Math.cos(t)).toFixed(2), +(R * Math.sin(t)).toFixed(2)]); } return a; }
// prism: polygon floor + a wall hinged on every edge that folds up 90°.
// foldDeg<90 makes a frustum/pyramid-ish taper; clip can make walls triangles.
function TPrism(verts, H, body, cap, ink, opt) {
  opt = opt || {};
  const foldDeg = opt.foldDeg == null ? 90 : opt.foldDeg;
  const xs = verts.map(v => v[0]), ys = verts.map(v => v[1]);
  const minx = Math.min(...xs), maxx = Math.max(...xs), miny = Math.min(...ys), maxy = Math.max(...ys);
  const bw = maxx - minx, bh = maxy - miny;
  const clip = 'polygon(' + verts.map(v => `${((v[0] - minx) / bw * 100).toFixed(1)}% ${((v[1] - miny) / bh * 100).toFixed(1)}%`).join(', ') + ')';
  const walls = verts.map((a, i) => {
    const b = verts[(i + 1) % verts.length];
    const dx = b[0] - a[0], dy = b[1] - a[1];
    const len = Math.hypot(dx, dy);
    const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
    let nx = dy, ny = -dx; if (nx * mx + ny * my < 0) { nx = -nx; ny = -ny; }
    const r = (Math.atan2(ny, nx) * 180 / Math.PI - 90).toFixed(1);
    const tr = `translate(${mx.toFixed(1)}px, ${my.toFixed(1)}px) rotate(${r}deg)`;
    return TFace({ key: 'w' + i, w: len, h: H, left: -len / 2, top: 0, origin: '50% 0%', bg: i % 2 ? body[0] : body[1],
      clip: opt.tri ? 'polygon(0% 0%, 100% 0%, 50% 100%)' : null, radius: opt.tri ? 0 : 2,
      folded: `${tr} rotateX(-${foldDeg}deg)`, flat: `${tr} rotateX(0deg)`, ink });
  });
  return TStage(opt.iso || 'rotateX(-24deg) rotateY(-28deg) scale(1)', opt.isoOpen || 'rotateX(0deg) rotateY(0deg) scale(.42)', [
    TFace({ key: 'cap', w: bw, h: bh, left: -bw / 2, top: -bh / 2, bg: cap, clip, ink, radius: 0 }),
    walls,
  ]);
}
// square pyramid that STANDS UP: square floor on the ground (XZ) + 4 triangular
// faces hinged on the base edges, leaning in to meet at the apex. Unfolds flat.
function TPyr(w, Hp, c, ink) {
  const half = w / 2, slant = Math.hypot(half, Hp);
  const lean = (Math.asin(half / slant) * 180 / Math.PI).toFixed(2); // tilt back from vertical
  const verts = [[-half, -half], [half, -half], [half, half], [-half, half]];
  const faces = verts.map((a, i) => {
    const b = verts[(i + 1) % 4];
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
    let onx = b[1] - a[1], ony = -(b[0] - a[0]); if (onx * mx + ony * my < 0) { onx = -onx; ony = -ony; }
    const odeg = (Math.atan2(ony, onx) * 180 / Math.PI + 90).toFixed(1);
    const t3d = `rotateY(${i * 90}deg) translateZ(${half}px) rotateX(${lean}deg)`; // assembled, leaning to the apex
    const net = `translate(${mx.toFixed(1)}px, ${my.toFixed(1)}px) rotate(${odeg}deg)`; // flat dieline, radiating out
    return TFace({ key: 'p' + i, w: len, h: slant, left: -len / 2, top: -slant, origin: '50% 100%',
      bg: i % 2 ? c[1] : c[2], clip: 'polygon(50% 0%, 100% 100%, 0% 100%)', radius: 0, folded: t3d, flat: net, ink });
  });
  const base = TFace({ key: 'base', w, h: w, left: -half, top: -half, origin: '50% 50%', bg: c[0], radius: 2, ink, folded: 'rotateX(90deg)', flat: 'rotateX(0deg)' });
  return TStage('rotateX(-14deg) rotateY(-24deg)', 'rotateX(0deg) rotateY(0deg) scale(.46)', [base, faces]);
}
// upright prism for shapes with a clear "up" axis (the star): a polygon floor on
// the ground (XZ) + a vertical wall hinged on every edge + a matching top cap.
// Walls fold down flat into the dieline on hover.
// opt.lidLift: instead of unfolding into a flat net (which a star can't do cleanly),
// keep the box assembled and just LIFT the star lid up + tilt it ajar on hover — an
// "open the box" motion that matches the fold cards' transform language and timing.
// opt.bothLids also drops the bottom floor lid away (for the "Star w/ lids" card).
function TStand(verts, H, body, cap, ink, iso, isoOpen, opt) {
  opt = opt || {};
  const lift = opt.lidLift;
  const xs = verts.map(v => v[0]), zs = verts.map(v => v[1]);
  const minx = Math.min(...xs), maxx = Math.max(...xs), minz = Math.min(...zs), maxz = Math.max(...zs);
  const bw = maxx - minx, bh = maxz - minz;
  const clip = 'polygon(' + verts.map(v => `${((v[0] - minx) / bw * 100).toFixed(1)}% ${((v[1] - minz) / bh * 100).toFixed(1)}%`).join(', ') + ')';
  const walls = verts.map((a, i) => {
    const b = verts[(i + 1) % verts.length];
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const mx = (a[0] + b[0]) / 2, mz = (a[1] + b[1]) / 2;
    const ang = (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI).toFixed(1);
    const at = `translate3d(${mx.toFixed(1)}px, 0px, ${mz.toFixed(1)}px) rotateY(${-ang}deg)`; // assembled vertical wall
    // unfolds face-on, radiating outward from its cap edge (real fold motion)
    let onx = b[1] - a[1], ony = -(b[0] - a[0]); if (onx * mx + ony * mz < 0) { onx = -onx; ony = -ony; }
    const odeg = (Math.atan2(ony, onx) * 180 / Math.PI + 90).toFixed(1);
    const net = `translate(${mx.toFixed(1)}px, ${mz.toFixed(1)}px) rotate(${odeg}deg)`;
    return TFace({ key: 'w' + i, w: len, h: H, left: -len / 2, top: -H, origin: '50% 100%', bg: i % 2 ? body[0] : body[1], radius: 2,
      folded: at, flat: lift ? at : net, ink }); // lid-lift: walls stay standing
  });
  // floor: stays put on lift; drops away when both lids open
  const floorClosed = 'rotateX(90deg)';
  const floorFlat = lift ? (opt.bothLids ? `translateY(${(H * 0.9).toFixed(0)}px) rotateX(90deg)` : floorClosed) : 'rotateX(0deg)';
  // lid: closed flat on top -> lifts up and tilts ajar
  const lidClosed = `translateY(${-H}px) rotateX(90deg)`;
  const lidFlat = lift ? `translateY(${-(H + 26)}px) rotateX(62deg) rotateZ(-7deg)` : `translateX(${(bw * 1.25).toFixed(0)}px) rotateX(0deg)`;
  return TStage(iso || 'rotateX(-20deg) rotateY(-24deg)', isoOpen || (lift ? (iso || 'rotateX(-20deg) rotateY(-24deg)') : 'rotateX(0deg) rotateY(0deg) scale(.4)'), [
    TFace({ key: 'floor', w: bw, h: bh, left: -bw / 2, top: -bh / 2, origin: '50% 50%', bg: cap, clip, ink, radius: 0, folded: floorClosed, flat: floorFlat }),
    TFace({ key: 'lid', w: bw, h: bh, left: -bw / 2, top: -bh / 2, origin: '50% 50%', bg: cap, clip, ink, radius: 0, folded: lidClosed, flat: lidFlat }),
    walls,
  ]);
}

// Expose the 3D shape generators so the mobile templates section (a separate
// bundle IIFE) can reuse the exact same models instead of duplicating them.
window.FCShapes = { TFace, TStage, TTile, TBox, TPrism, TPyr, TStand, ngon, starPts };

window.__S.push(['templates', () => (
    <section id="templates" style={{ alignItems: 'center', backgroundColor: '#FFFFFF', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', fontSize: '12px', fontSynthesis: 'none', gap: '36px', lineHeight: '16px', MozOsxFontSmoothing: 'grayscale', overflow: 'clip', paddingBlock: '96px', WebkitFontSmoothing: 'antialiased', width: '100%' }}>
      <div className="reveal" style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '860px', paddingInline: '32px' }}>
        <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: '8px' }}>
          <div style={{ alignItems: 'center', backgroundColor: '#E0F8F2', borderColor: '#1CD1AD80', borderRadius: '999px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', gap: '8px', paddingBlock: '5px', paddingInline: '12px' }}>
            <div style={{ backgroundColor: '#1CD1AD', borderRadius: '50%', boxSizing: 'border-box', flexShrink: '0', height: '6px', width: '6px' }} />
            <div style={{ boxSizing: 'border-box', color: '#0E8A72', display: 'inline-block', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '1.32px', lineHeight: '155%', textAlign: 'center', textTransform: 'uppercase', whiteSpaceCollapse: 'preserve' }}>
              11 structures · all printable · all editable
            </div>
          </div>
        </div>
        <div style={{ boxSizing: 'border-box', color: '#0A0A0A', display: 'flex', flexWrap: 'wrap', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '48px', fontWeight: 500, justifyContent: 'center', letterSpacing: '-0.07em', lineHeight: '102%', maxWidth: '760px', textAlign: 'center', whiteSpace: 'pre-wrap' }}>
          Eleven shapes. <br />Everything else, on-demand.
        </div>
      </div>
      <div className="reveal" style={{ '--d': '90ms', alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', paddingBlock: '4px', paddingInline: '32px' }}>
        <div className="hov-chip" role="button" style={{ alignItems: 'center', backgroundColor: '#0A0A0A', borderRadius: '999px', boxSizing: 'border-box', display: 'flex', gap: '8px', paddingBlock: '10px', paddingInline: '18px' }}>
          <div style={{ boxSizing: 'border-box', color: '#FFFFFF', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '14px', fontWeight: 500, lineHeight: '16px' }}>
            All
          </div>
          <div style={{ boxSizing: 'border-box', color: '#FFFFFFE6', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '12px', lineHeight: '16px' }}>
            11
          </div>
        </div>
        <div className="hov-chip" role="button" style={{ alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: '#E7E7E5', borderRadius: '999px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', gap: '8px', paddingBlock: '10px', paddingInline: '18px' }}>
          <div style={{ boxSizing: 'border-box', color: '#1A1108', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '14px', fontWeight: 500, lineHeight: '16px' }}>
            Polyhedra
          </div>
          <div style={{ boxSizing: 'border-box', color: '#8A8378', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '12px', lineHeight: '16px' }}>
            7
          </div>
        </div>
        <div className="hov-chip" role="button" style={{ alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: '#E7E7E5', borderRadius: '999px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', gap: '8px', paddingBlock: '10px', paddingInline: '18px' }}>
          <div style={{ boxSizing: 'border-box', color: '#1A1108', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '14px', fontWeight: 500, lineHeight: '16px' }}>
            Soft forms
          </div>
          <div style={{ boxSizing: 'border-box', color: '#8A8378', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '12px', lineHeight: '16px' }}>
            2
          </div>
        </div>
        <div className="hov-chip" role="button" style={{ alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: '#E7E7E5', borderRadius: '999px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', gap: '8px', paddingBlock: '10px', paddingInline: '18px' }}>
          <div style={{ boxSizing: 'border-box', color: '#1A1108', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '14px', fontWeight: 500, lineHeight: '16px' }}>
            Accessory
          </div>
          <div style={{ boxSizing: 'border-box', color: '#8A8378', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '12px', lineHeight: '16px' }}>
            1
          </div>
        </div>
        <div className="hov-chip" role="button" style={{ alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: '#1CD1AD', borderRadius: '999px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', gap: '8px', paddingBlock: '10px', paddingInline: '18px' }}>
          <div style={{ boxSizing: 'border-box', color: '#0E8A72', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '14px', fontWeight: 500, lineHeight: '16px' }}>
            Custom
          </div>
          <div style={{ boxSizing: 'border-box', color: '#0E8A72', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '12px', lineHeight: '16px' }}>
            1
          </div>
        </div>
      </div>
      <div style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', maxWidth: '1280px', paddingInline: '32px', width: '100%' }}>
        <div className="fc-shape-rail" style={{ boxSizing: 'border-box', display: 'flex', gap: '16px' }}>
          <div className="hov-raise reveal" style={{ '--d': '0ms', backgroundColor: '#FFFFFF', borderColor: '#1CD1AD', borderRadius: '16px', borderStyle: 'solid', borderWidth: '2px', boxShadow: '#1CD1AD2E 0px 4px 12px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', height: '220px', overflow: 'clip' }}>
            {TTile(TBox(82, 82, 82, ['#BFEEE0', '#7FE6CC', '#37D6B4', '#1CD1AD'], '#0E8A72'))}
            <div style={{ backgroundColor: '#FFFFFF', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '4px', paddingBottom: '16px', paddingInline: '16px', paddingTop: '14px' }}>
              <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: '6px' }}>
                <div style={{ backgroundColor: '#1CD1AD', borderRadius: '50%', boxSizing: 'border-box', flexShrink: '0', height: '6px', width: '6px' }} />
                <div style={{ boxSizing: 'border-box', color: '#4F5854', display: 'inline-block', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '10px', fontWeight: 500, letterSpacing: '0.14em', lineHeight: '12px' }}>
                  POLYHEDRA · 01
                </div>
              </div>
              <div style={{ boxSizing: 'border-box', color: '#041713', display: 'inline-block', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '15px', fontWeight: 600, lineHeight: '18px' }}>
                Square
              </div>
            </div>
          </div>
          <div className="hov-raise reveal" style={{ '--d': '90ms', backgroundColor: '#FFFFFF', borderColor: '#E7E7E5', borderRadius: '16px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', height: '220px', overflow: 'clip' }}>
            {TTile(TBox(106, 70, 70, ['#D5E8F8', '#A6CCEE', '#7DB1E6', '#5BA3E0'], '#2E6DA8'))}
            <div style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '4px', paddingBottom: '16px', paddingInline: '16px', paddingTop: '14px' }}>
              <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: '6px' }}>
                <div style={{ backgroundColor: '#5BA3E0', borderRadius: '50%', boxSizing: 'border-box', flexShrink: '0', height: '6px', width: '6px' }} />
                <div style={{ boxSizing: 'border-box', color: '#4F5854', display: 'inline-block', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '10px', fontWeight: 500, letterSpacing: '0.14em', lineHeight: '12px' }}>
                  POLYHEDRA · 02
                </div>
              </div>
              <div style={{ boxSizing: 'border-box', color: '#041713', display: 'inline-block', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '15px', fontWeight: 600, lineHeight: '18px' }}>
                Rectangle
              </div>
            </div>
          </div>
          <div className="hov-raise reveal" style={{ '--d': '180ms', backgroundColor: '#FFFFFF', borderColor: '#E7E7E5', borderRadius: '16px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', height: '220px', overflow: 'clip' }}>
            {TTile(TPrism([[-26, -30], [26, -30], [42, 30], [-42, 30]], 56, ['#F4A48F', '#E8795E'], '#F6B8A6', '#B5482F'))}
            <div style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '4px', paddingBottom: '16px', paddingInline: '16px', paddingTop: '14px' }}>
              <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: '6px' }}>
                <div style={{ backgroundColor: '#F08570', borderRadius: '50%', boxSizing: 'border-box', flexShrink: '0', height: '6px', width: '6px' }} />
                <div style={{ boxSizing: 'border-box', color: '#4F5854', display: 'inline-block', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '10px', fontWeight: 500, letterSpacing: '0.14em', lineHeight: '12px' }}>
                  POLYHEDRA · 03
                </div>
              </div>
              <div style={{ boxSizing: 'border-box', color: '#041713', display: 'inline-block', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '15px', fontWeight: 600, lineHeight: '18px' }}>
                Trapezoid
              </div>
            </div>
          </div>
          <div className="hov-raise reveal" style={{ '--d': '270ms', backgroundColor: '#FFFFFF', borderColor: '#E7E7E5', borderRadius: '16px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', height: '220px', overflow: 'clip' }}>
            {TTile(TPyr(86, 56, ['#FBE6A6', '#F3CE5E', '#E9B43C'], '#B98A1E'))}
            <div style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '4px', paddingBottom: '16px', paddingInline: '16px', paddingTop: '14px' }}>
              <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: '6px' }}>
                <div style={{ backgroundColor: '#F0C84D', borderRadius: '50%', boxSizing: 'border-box', flexShrink: '0', height: '6px', width: '6px' }} />
                <div style={{ boxSizing: 'border-box', color: '#4F5854', display: 'inline-block', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '10px', fontWeight: 500, letterSpacing: '0.14em', lineHeight: '12px' }}>
                  POLYHEDRA · 04
                </div>
              </div>
              <div style={{ boxSizing: 'border-box', color: '#041713', display: 'inline-block', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '15px', fontWeight: 600, lineHeight: '18px' }}>
                Pyramid
              </div>
            </div>
          </div>
          <div className="hov-raise reveal" style={{ '--d': '360ms', backgroundColor: '#FFFFFF', borderColor: '#E7E7E5', borderRadius: '16px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', height: '220px', overflow: 'clip' }}>
            {TTile(TStand(starPts(5, 50, 21), 30, ['#A98FED', '#9A82E8'], '#CDBDF5', '#6A53C4', undefined, undefined, { lidLift: true }))}
            <div style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '4px', paddingBottom: '16px', paddingInline: '16px', paddingTop: '14px' }}>
              <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: '6px' }}>
                <div style={{ backgroundColor: '#9A82E8', borderRadius: '50%', boxSizing: 'border-box', flexShrink: '0', height: '6px', width: '6px' }} />
                <div style={{ boxSizing: 'border-box', color: '#4F5854', display: 'inline-block', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '10px', fontWeight: 500, letterSpacing: '0.14em', lineHeight: '12px' }}>
                  POLYHEDRA · 05
                </div>
              </div>
              <div style={{ boxSizing: 'border-box', color: '#041713', display: 'inline-block', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '15px', fontWeight: 600, lineHeight: '18px' }}>
                Star
              </div>
            </div>
          </div>
          <div className="hov-raise reveal" style={{ '--d': '450ms', backgroundColor: '#FFFFFF', borderColor: '#E7E7E5', borderRadius: '16px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', height: '220px', overflow: 'clip' }}>
            {TTile(TStand(starPts(5, 48, 20), 36, ['#7FD9C4', '#4FB8A0'], '#C2F0E5', '#2C8C77', undefined, undefined, { lidLift: true, bothLids: true }))}
            <div style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '4px', paddingBottom: '16px', paddingInline: '16px', paddingTop: '14px' }}>
              <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: '6px' }}>
                <div style={{ backgroundColor: '#4FB8A0', borderRadius: '50%', boxSizing: 'border-box', flexShrink: '0', height: '6px', width: '6px' }} />
                <div style={{ boxSizing: 'border-box', color: '#4F5854', display: 'inline-block', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '10px', fontWeight: 500, letterSpacing: '0.14em', lineHeight: '12px' }}>
                  POLYHEDRA · 06
                </div>
              </div>
              <div style={{ boxSizing: 'border-box', color: '#041713', display: 'inline-block', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '15px', fontWeight: 600, lineHeight: '18px' }}>
                Star w/ lids
              </div>
            </div>
          </div>
          <div className="hov-raise reveal" style={{ '--d': '540ms', backgroundColor: '#FFFFFF', borderColor: '#E7E7E5', borderRadius: '16px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', height: '220px', overflow: 'clip' }}>
            {TTile(TPrism(ngon(7, 46), 58, ['#F0A98F', '#E87A5E'], '#F6C3B2', '#B5482F'))}
            <div style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '4px', paddingBottom: '16px', paddingInline: '16px', paddingTop: '14px' }}>
              <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: '6px' }}>
                <div style={{ backgroundColor: '#E87A5E', borderRadius: '50%', boxSizing: 'border-box', flexShrink: '0', height: '6px', width: '6px' }} />
                <div style={{ boxSizing: 'border-box', color: '#4F5854', display: 'inline-block', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '10px', fontWeight: 500, letterSpacing: '0.14em', lineHeight: '12px' }}>
                  POLYHEDRA · 07
                </div>
              </div>
              <div style={{ boxSizing: 'border-box', color: '#041713', display: 'inline-block', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '15px', fontWeight: 600, lineHeight: '18px' }}>
                Mixed Polygon
              </div>
            </div>
          </div>
          <div className="hov-raise reveal" style={{ '--d': '630ms', backgroundColor: '#FFFFFF', borderColor: '#E7E7E5', borderRadius: '16px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', height: '220px', overflow: 'clip' }}>
            {TTile(TBox(60, 92, 40, ['#E7D3AE', '#D3B57E', '#C9A875', '#B9945E'], '#8A6A3A'))}
            <div style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '4px', paddingBottom: '16px', paddingInline: '16px', paddingTop: '14px' }}>
              <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: '6px' }}>
                <div style={{ backgroundColor: '#C9A875', borderRadius: '50%', boxSizing: 'border-box', flexShrink: '0', height: '6px', width: '6px' }} />
                <div style={{ boxSizing: 'border-box', color: '#4F5854', display: 'inline-block', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '10px', fontWeight: 500, letterSpacing: '0.14em', lineHeight: '12px' }}>
                  SOFT · 08
                </div>
              </div>
              <div style={{ boxSizing: 'border-box', color: '#041713', display: 'inline-block', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '15px', fontWeight: 600, lineHeight: '18px' }}>
                Gusset bag
              </div>
            </div>
          </div>
          <div className="hov-raise reveal" style={{ '--d': '720ms', backgroundColor: '#FFFFFF', borderColor: '#E7E7E5', borderRadius: '16px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', height: '220px', overflow: 'clip' }}>
            {TTile(TPrism(ngon(16, 38), 92, ['#C3A9E4', '#9B7DC4'], '#D6C4ED', '#6B4F94', { isoOpen: 'rotateX(0deg) rotateY(0deg) scale(.3)' }))}
            <div style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '4px', paddingBottom: '16px', paddingInline: '16px', paddingTop: '14px' }}>
              <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: '6px' }}>
                <div style={{ backgroundColor: '#9B7DC4', borderRadius: '50%', boxSizing: 'border-box', flexShrink: '0', height: '6px', width: '6px' }} />
                <div style={{ boxSizing: 'border-box', color: '#4F5854', display: 'inline-block', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '10px', fontWeight: 500, letterSpacing: '0.14em', lineHeight: '12px' }}>
                  SOFT · 09
                </div>
              </div>
              <div style={{ boxSizing: 'border-box', color: '#041713', display: 'inline-block', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '15px', fontWeight: 600, lineHeight: '18px' }}>
                Wraps & Rolls
              </div>
            </div>
          </div>
          <div className="hov-raise reveal" style={{ '--d': '810ms', backgroundColor: '#FFFFFF', borderColor: '#E7E7E5', borderRadius: '16px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', height: '220px', overflow: 'clip' }}>
            {TTile(TPrism(ngon(14, 38), 74, ['#F2BE92', '#E89E64'], '#F7D3B4', '#B06A30', { foldDeg: 76, isoOpen: 'rotateX(0deg) rotateY(0deg) scale(.32)' }))}
            <div style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '4px', paddingBottom: '16px', paddingInline: '16px', paddingTop: '14px' }}>
              <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: '6px' }}>
                <div style={{ backgroundColor: '#E89E64', borderRadius: '50%', boxSizing: 'border-box', flexShrink: '0', height: '6px', width: '6px' }} />
                <div style={{ boxSizing: 'border-box', color: '#4F5854', display: 'inline-block', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '10px', fontWeight: 500, letterSpacing: '0.14em', lineHeight: '12px' }}>
                  ACCESSORY · 10
                </div>
              </div>
              <div style={{ boxSizing: 'border-box', color: '#041713', display: 'inline-block', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '15px', fontWeight: 600, lineHeight: '18px' }}>
                Cups & labels
              </div>
            </div>
          </div>
          <div className="hov-raise reveal" style={{ '--d': '900ms', backgroundColor: '#FFFFFF', borderColor: '#1CD1AD', borderRadius: '16px', borderStyle: 'dashed', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', height: '220px', overflow: 'clip' }}>
            {TTile(TBox(72, 72, 72, ['#CFF5EC', '#9DE9D7', '#6FE0C8', '#27D3B0'], '#0E8A72'), '#E0F8F2')}
            <div style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '4px', paddingBottom: '16px', paddingInline: '16px', paddingTop: '14px' }}>
              <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: '6px' }}>
                <div style={{ backgroundColor: '#1CD1AD', borderRadius: '50%', boxSizing: 'border-box', flexShrink: '0', height: '6px', width: '6px' }} />
                <div style={{ boxSizing: 'border-box', color: '#0E8A72', display: 'inline-block', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '10px', fontWeight: 500, letterSpacing: '0.14em', lineHeight: '12px' }}>
                  CUSTOM · 11
                </div>
              </div>
              <div style={{ boxSizing: 'border-box', color: '#041713', display: 'inline-block', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '15px', fontWeight: 600, lineHeight: '18px' }}>
                Describe it →
              </div>
            </div>
          </div>
        </div>
        <div className="reveal" style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', justifyContent: 'flex-end', paddingTop: '16px' }}>
          <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: '12px' }}>
            <div style={{ boxSizing: 'border-box', color: '#8A8378', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '1px', lineHeight: '14px', textTransform: 'uppercase' }}>
              01 / 11
            </div>
            <div className="hov-btn" role="button" style={{ alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: '#E7E7E5', borderRadius: '10px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '44px', justifyContent: 'center', width: '44px' }}>
              <div style={{ boxSizing: 'border-box', color: '#C7CDD5', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '18px', fontWeight: 500, lineHeight: '18px' }}>
                ←
              </div>
            </div>
            <div className="hov-btn" role="button" style={{ alignItems: 'center', backgroundColor: '#0A0A0A', borderRadius: '10px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '44px', justifyContent: 'center', width: '44px' }}>
              <div style={{ boxSizing: 'border-box', color: '#FFFFFF', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '18px', fontWeight: 500, lineHeight: '18px' }}>
                →
              </div>
            </div>
          </div>
        </div>
        <div className="reveal" style={{ alignItems: 'center', borderTopColor: '#E7E7E5', borderTopStyle: 'dashed', borderTopWidth: '1px', boxSizing: 'border-box', display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'space-between', marginTop: '24px', paddingBottom: '12px', paddingTop: '24px' }}>
          <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <div className="hov-chip" role="button" style={{ alignItems: 'center', backgroundColor: '#041713', borderRadius: '999px', boxSizing: 'border-box', display: 'flex', gap: '6px', paddingBlock: '8px', paddingInline: '14px' }}>
              <div style={{ boxSizing: 'border-box', color: '#FAFAFA', display: 'inline-block', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '10px', fontWeight: 500, letterSpacing: '0.14em', lineHeight: '12px' }}>
                MOST RENDERED
              </div>
            </div>
            <div className="hov-chip" role="button" style={{ alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: '#E7E7E5', borderRadius: '999px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', gap: '6px', paddingBlock: '8px', paddingInline: '14px' }}>
              <div style={{ boxSizing: 'border-box', color: '#4F5854', display: 'inline-block', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '10px', fontWeight: 500, letterSpacing: '0.14em', lineHeight: '12px' }}>
                NEWEST
              </div>
            </div>
            <div className="hov-chip" role="button" style={{ alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: '#E7E7E5', borderRadius: '999px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', gap: '6px', paddingBlock: '8px', paddingInline: '14px' }}>
              <div style={{ boxSizing: 'border-box', color: '#4F5854', display: 'inline-block', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '10px', fontWeight: 500, letterSpacing: '0.14em', lineHeight: '12px' }}>
                BY INDUSTRY
              </div>
            </div>
            <div className="hov-chip" role="button" style={{ alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: '#E7E7E5', borderRadius: '999px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', gap: '6px', paddingBlock: '8px', paddingInline: '14px' }}>
              <div style={{ boxSizing: 'border-box', color: '#4F5854', display: 'inline-block', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '10px', fontWeight: 500, letterSpacing: '0.14em', lineHeight: '12px' }}>
                SAVED BY YOU
              </div>
            </div>
          </div>
        </div>
        <div style={{ boxSizing: 'border-box', display: 'flex', flexWrap: 'wrap', gap: '24px', paddingTop: '16px' }}>
          <div className="hov-raise reveal" style={{ '--d': '0ms', backgroundImage: 'url(assets/renders/render-featured.jpg)', backgroundPosition: '50%', backgroundPositionX: '50%', backgroundPositionY: 'center', backgroundSize: 'cover', borderRadius: '20px', boxSizing: 'border-box', display: 'flex', flexBasis: '0%', flexDirection: 'column', flexGrow: '1', minHeight: '480px', minWidth: '420px', overflow: 'clip', position: 'relative' }}>
            <div style={{ alignItems: 'center', backgroundColor: '#041713', borderRadius: '999px', boxSizing: 'border-box', display: 'flex', gap: '8px', left: '20px', paddingBlock: '8px', paddingInline: '14px', position: 'absolute', top: '20px' }}>
              <div style={{ backgroundColor: '#1CD1AD', borderRadius: '50%', boxSizing: 'border-box', flexShrink: '0', height: '6px', width: '6px' }} />
              <div style={{ boxSizing: 'border-box', color: '#FAFAFA', display: 'inline-block', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '10px', fontWeight: 600, letterSpacing: '0.14em', lineHeight: '12px' }}>
                FEATURED · MADE WITH SQUARE
              </div>
            </div>
            <div style={{ alignItems: 'center', backgroundColor: '#041713C7', borderColor: '#FFFFFF2E', borderRadius: '7px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', gap: '8px', paddingBlock: '8px', paddingInline: '12px', position: 'absolute', right: '20px', top: '20px' }}>
              <div style={{ backgroundColor: '#1CD1AD', borderRadius: '50%', boxSizing: 'border-box', flexShrink: '0', height: '18px', width: '18px' }} />
              <div style={{ boxSizing: 'border-box', color: '#FAFAFA', display: 'inline-block', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '11px', fontWeight: 500, lineHeight: '14px' }}>
                @sumedha.care
              </div>
            </div>
            <div style={{ alignItems: 'flex-end', backgroundImage: 'linear-gradient(in oklab 0deg, oklab(18.7% -0.028 .0009 / 92%) 0%, oklab(18.7% -0.028 .0009 / 55%) 60%, oklab(18.7% -0.028 .0009 / 0%) 100%)', bottom: '0px', boxSizing: 'border-box', display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'space-between', left: '0px', paddingBottom: '24px', paddingInline: '28px', paddingTop: '32px', position: 'absolute', right: '0px' }}>
              <div style={{ boxSizing: 'border-box', display: 'flex', flexBasis: '0%', flexDirection: 'column', flexGrow: '1', gap: '10px' }}>
                <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: '8px' }}>
                  <div style={{ boxSizing: 'border-box', color: '#1CD1AD', display: 'inline-block', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '10px', fontWeight: 500, letterSpacing: '0.14em', lineHeight: '12px' }}>
                    PERSONAL CARE · FOLDING CARTON
                  </div>
                </div>
                <div style={{ boxSizing: 'border-box', color: '#FAFAFA', display: 'inline-block', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '32px', fontWeight: 600, letterSpacing: '-0.018em', lineHeight: '105%' }}>
                  Sumedha women-care carton
                </div>
                <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: '14px' }}>
                  <div style={{ boxSizing: 'border-box', color: '#FAFAFAB3', display: 'inline-block', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '11px', lineHeight: '14px' }}>
                    1,284 RENDERED
                  </div>
                  <div style={{ boxSizing: 'border-box', color: '#FAFAFAB3', display: 'inline-block', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '11px', lineHeight: '14px' }}>
                    ·
                  </div>
                  <div style={{ boxSizing: 'border-box', color: '#FAFAFAB3', display: 'inline-block', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '11px', lineHeight: '14px' }}>
                    ★ 4.8
                  </div>
                  <div style={{ boxSizing: 'border-box', color: '#FAFAFAB3', display: 'inline-block', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '11px', lineHeight: '14px' }}>
                    ·
                  </div>
                  <div style={{ boxSizing: 'border-box', color: '#FAFAFAB3', display: 'inline-block', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '11px', lineHeight: '14px' }}>
                    FORKED 42×
                  </div>
                </div>
              </div>
              <div style={{ alignItems: 'flex-end', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div className="hov-btn" role="button" style={{ alignItems: 'center', backgroundColor: '#1CD1AD', borderRadius: '12px', boxSizing: 'border-box', display: 'flex', gap: '8px', paddingBlock: '14px', paddingInline: '22px' }}>
                  <div style={{ boxSizing: 'border-box', color: '#041713', display: 'inline-block', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '15px', fontWeight: 600, lineHeight: '18px' }}>
                    Render in Studio
                  </div>
                  <div style={{ boxSizing: 'border-box', color: '#041713', display: 'inline-block', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '15px', fontWeight: 600, lineHeight: '18px' }}>
                    →
                  </div>
                </div>
                <div style={{ boxSizing: 'border-box', color: '#FAFAFA99', display: 'inline-block', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '10px', fontWeight: 500, letterSpacing: '0.1em', lineHeight: '12px' }}>
                  PREVIEW FREE · NO SIGNUP
                </div>
              </div>
            </div>
          </div>
          <div style={{ boxSizing: 'border-box', display: 'flex', flexBasis: '0%', flexDirection: 'column', flexGrow: '1', gap: '20px', minWidth: '420px' }}>
            <div style={{ boxSizing: 'border-box', display: 'flex', flexBasis: '0%', flexGrow: '1', flexWrap: 'wrap', gap: '20px' }}>
              <div className="hov-raise reveal" style={{ '--d': '90ms', backgroundImage: 'url(assets/renders/render-1.jpg)', backgroundPosition: '50%', backgroundPositionX: '50%', backgroundPositionY: 'center', backgroundSize: 'cover', borderRadius: '14px', boxSizing: 'border-box', display: 'flex', flexBasis: '0%', flexGrow: '1', minHeight: '230px', minWidth: '200px', overflow: 'clip', position: 'relative' }}>
                <div style={{ backgroundColor: '#041713C7', borderRadius: '999px', boxSizing: 'border-box', left: '12px', paddingBlock: '5px', paddingInline: '10px', position: 'absolute', top: '12px' }}>
                  <div style={{ boxSizing: 'border-box', color: '#FAFAFA', display: 'inline-block', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '10px', fontWeight: 500, letterSpacing: '0.14em', lineHeight: '12px' }}>
                    F&B · POP CUBE
                  </div>
                </div>
                <div style={{ alignItems: 'flex-end', backgroundImage: 'linear-gradient(in oklab 0deg, oklab(18.7% -0.028 .0009 / 92%) 0%, oklab(18.7% -0.028 .0009 / 40%) 70%, oklab(18.7% -0.028 .0009 / 0%) 100%)', bottom: '0px', boxSizing: 'border-box', display: 'flex', gap: '10px', justifyContent: 'space-between', left: '0px', paddingBottom: '14px', paddingInline: '16px', paddingTop: '18px', position: 'absolute', right: '0px' }}>
                  <div style={{ boxSizing: 'border-box', display: 'flex', flexBasis: '0%', flexDirection: 'column', flexGrow: '1', gap: '4px' }}>
                    <div style={{ boxSizing: 'border-box', color: '#FAFAFA', display: 'inline-block', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '17px', fontWeight: 600, letterSpacing: '-0.005em', lineHeight: '115%' }}>
                      Citrus pop cube
                    </div>
                    <div style={{ boxSizing: 'border-box', color: '#FAFAFAA6', display: 'inline-block', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '10px', lineHeight: '12px' }}>
                      @pop.lab · 612 RENDERED
                    </div>
                  </div>
                  <div className="hov-btn" role="button" style={{ alignItems: 'center', backgroundColor: '#1CD1AD', borderRadius: '7px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: '5px', paddingBlock: '8px', paddingInline: '12px' }}>
                    <div style={{ boxSizing: 'border-box', color: '#041713', display: 'inline-block', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '10px', fontWeight: 600, letterSpacing: '0.06em', lineHeight: '12px' }}>
                      RENDER →
                    </div>
                  </div>
                </div>
              </div>
              <div className="hov-raise reveal" style={{ '--d': '180ms', backgroundImage: 'url(assets/renders/render-2.jpg)', backgroundPosition: '50%', backgroundPositionX: '50%', backgroundPositionY: 'center', backgroundSize: 'cover', borderRadius: '14px', boxSizing: 'border-box', display: 'flex', flexBasis: '0%', flexGrow: '1', minHeight: '230px', minWidth: '200px', overflow: 'clip', position: 'relative' }}>
                <div style={{ backgroundColor: '#041713C7', borderRadius: '999px', boxSizing: 'border-box', left: '12px', paddingBlock: '5px', paddingInline: '10px', position: 'absolute', top: '12px' }}>
                  <div style={{ boxSizing: 'border-box', color: '#FAFAFA', display: 'inline-block', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '10px', fontWeight: 500, letterSpacing: '0.14em', lineHeight: '12px' }}>
                    GIFTING · CUBE
                  </div>
                </div>
                <div style={{ alignItems: 'center', backgroundColor: '#1CD1ADEB', borderRadius: '999px', boxSizing: 'border-box', display: 'flex', gap: '4px', paddingBlock: '5px', paddingInline: '9px', position: 'absolute', right: '12px', top: '12px' }}>
                  <div style={{ boxSizing: 'border-box', color: '#041713', display: 'inline-block', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', lineHeight: '12px' }}>
                    ↗ FORKABLE
                  </div>
                </div>
                <div style={{ alignItems: 'flex-end', backgroundImage: 'linear-gradient(in oklab 0deg, oklab(18.7% -0.028 .0009 / 92%) 0%, oklab(18.7% -0.028 .0009 / 40%) 70%, oklab(18.7% -0.028 .0009 / 0%) 100%)', bottom: '0px', boxSizing: 'border-box', display: 'flex', gap: '10px', justifyContent: 'space-between', left: '0px', paddingBottom: '14px', paddingInline: '16px', paddingTop: '18px', position: 'absolute', right: '0px' }}>
                  <div style={{ boxSizing: 'border-box', display: 'flex', flexBasis: '0%', flexDirection: 'column', flexGrow: '1', gap: '4px' }}>
                    <div style={{ boxSizing: 'border-box', color: '#FAFAFA', display: 'inline-block', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '17px', fontWeight: 600, letterSpacing: '-0.005em', lineHeight: '115%' }}>
                      Mountain gift cube
                    </div>
                    <div style={{ boxSizing: 'border-box', color: '#FAFAFAA6', display: 'inline-block', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '10px', lineHeight: '12px' }}>
                      @northpeak · 894 RENDERED
                    </div>
                  </div>
                  <div className="hov-btn" role="button" style={{ alignItems: 'center', backgroundColor: '#1CD1AD', borderRadius: '7px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: '5px', paddingBlock: '8px', paddingInline: '12px' }}>
                    <div style={{ boxSizing: 'border-box', color: '#041713', display: 'inline-block', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '10px', fontWeight: 600, letterSpacing: '0.06em', lineHeight: '12px' }}>
                      RENDER →
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ boxSizing: 'border-box', display: 'flex', flexBasis: '0%', flexGrow: '1', flexWrap: 'wrap', gap: '20px' }}>
              <div className="hov-raise reveal" style={{ '--d': '270ms', backgroundImage: 'url(assets/renders/render-3.jpg)', backgroundPosition: '50%', backgroundPositionX: '50%', backgroundPositionY: 'center', backgroundSize: 'cover', borderRadius: '14px', boxSizing: 'border-box', display: 'flex', flexBasis: '0%', flexGrow: '1', minHeight: '230px', minWidth: '200px', overflow: 'clip', position: 'relative' }}>
                <div style={{ backgroundColor: '#041713C7', borderRadius: '999px', boxSizing: 'border-box', left: '12px', paddingBlock: '5px', paddingInline: '10px', position: 'absolute', top: '12px' }}>
                  <div style={{ boxSizing: 'border-box', color: '#FAFAFA', display: 'inline-block', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '10px', fontWeight: 500, letterSpacing: '0.14em', lineHeight: '12px' }}>
                    GIFTING · MINI
                  </div>
                </div>
                <div style={{ alignItems: 'flex-end', backgroundImage: 'linear-gradient(in oklab 0deg, oklab(18.7% -0.028 .0009 / 92%) 0%, oklab(18.7% -0.028 .0009 / 40%) 70%, oklab(18.7% -0.028 .0009 / 0%) 100%)', bottom: '0px', boxSizing: 'border-box', display: 'flex', gap: '10px', justifyContent: 'space-between', left: '0px', paddingBottom: '14px', paddingInline: '16px', paddingTop: '18px', position: 'absolute', right: '0px' }}>
                  <div style={{ boxSizing: 'border-box', display: 'flex', flexBasis: '0%', flexDirection: 'column', flexGrow: '1', gap: '4px' }}>
                    <div style={{ boxSizing: 'border-box', color: '#FAFAFA', display: 'inline-block', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '17px', fontWeight: 600, letterSpacing: '-0.005em', lineHeight: '115%' }}>
                      Heart pop cube
                    </div>
                    <div style={{ boxSizing: 'border-box', color: '#FAFAFAA6', display: 'inline-block', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '10px', lineHeight: '12px' }}>
                      @studio.pop · 412 RENDERED
                    </div>
                  </div>
                  <div className="hov-btn" role="button" style={{ alignItems: 'center', backgroundColor: '#1CD1AD', borderRadius: '7px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: '5px', paddingBlock: '8px', paddingInline: '12px' }}>
                    <div style={{ boxSizing: 'border-box', color: '#041713', display: 'inline-block', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '10px', fontWeight: 600, letterSpacing: '0.06em', lineHeight: '12px' }}>
                      RENDER →
                    </div>
                  </div>
                </div>
              </div>
              <div className="hov-raise reveal" style={{ '--d': '360ms', backgroundImage: 'url(assets/renders/render-4.jpg)', backgroundPosition: '50%', backgroundPositionX: '50%', backgroundPositionY: 'center', backgroundSize: 'cover', borderRadius: '14px', boxSizing: 'border-box', display: 'flex', flexBasis: '0%', flexGrow: '1', minHeight: '230px', minWidth: '200px', overflow: 'clip', position: 'relative' }}>
                <div style={{ backgroundColor: '#041713C7', borderRadius: '999px', boxSizing: 'border-box', left: '12px', paddingBlock: '5px', paddingInline: '10px', position: 'absolute', top: '12px' }}>
                  <div style={{ boxSizing: 'border-box', color: '#FAFAFA', display: 'inline-block', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '10px', fontWeight: 500, letterSpacing: '0.14em', lineHeight: '12px' }}>
                    PERSONAL CARE · TALL
                  </div>
                </div>
                <div style={{ alignItems: 'flex-end', backgroundImage: 'linear-gradient(in oklab 0deg, oklab(18.7% -0.028 .0009 / 92%) 0%, oklab(18.7% -0.028 .0009 / 40%) 70%, oklab(18.7% -0.028 .0009 / 0%) 100%)', bottom: '0px', boxSizing: 'border-box', display: 'flex', gap: '10px', justifyContent: 'space-between', left: '0px', paddingBottom: '14px', paddingInline: '16px', paddingTop: '18px', position: 'absolute', right: '0px' }}>
                  <div style={{ boxSizing: 'border-box', display: 'flex', flexBasis: '0%', flexDirection: 'column', flexGrow: '1', gap: '4px' }}>
                    <div style={{ boxSizing: 'border-box', color: '#FAFAFA', display: 'inline-block', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '17px', fontWeight: 600, letterSpacing: '-0.005em', lineHeight: '115%' }}>
                      Sumedha tall carton
                    </div>
                    <div style={{ boxSizing: 'border-box', color: '#FAFAFAA6', display: 'inline-block', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '10px', lineHeight: '12px' }}>
                      @sumedha.care · 308 RENDERED
                    </div>
                  </div>
                  <div className="hov-btn" role="button" style={{ alignItems: 'center', backgroundColor: '#1CD1AD', borderRadius: '7px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: '5px', paddingBlock: '8px', paddingInline: '12px' }}>
                    <div style={{ boxSizing: 'border-box', color: '#041713', display: 'inline-block', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '10px', fontWeight: 600, letterSpacing: '0.06em', lineHeight: '12px' }}>
                      RENDER →
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="reveal" style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexWrap: 'wrap', gap: '32px', justifyContent: 'space-between', paddingTop: '32px' }}>
          <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
            <div className="hov-chip" style={{ alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: '#E7E7E5', borderRadius: '999px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', gap: '8px', paddingBlock: '12px', paddingInline: '18px' }}>
              <div style={{ boxSizing: 'border-box', color: '#041713', display: 'inline-block', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', lineHeight: '14px' }}>
                247 SQUARE DESIGNS
              </div>
            </div>
            <div style={{ boxSizing: 'border-box', color: '#4F5854', display: 'inline-block', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '14px', lineHeight: '18px' }}>
              · 18 industries · 62 forkable as a starting point
            </div>
          </div>
          <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <div className="hov-btn" role="button" style={{ alignItems: 'center', borderColor: '#E7E7E5', borderRadius: '12px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', gap: '8px', paddingBlock: '14px', paddingInline: '22px' }}>
              <div style={{ boxSizing: 'border-box', color: '#041713', display: 'inline-block', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '15px', fontWeight: 500, lineHeight: '18px' }}>
                Browse all 247 →
              </div>
            </div>
            <div className="hov-btn" role="button" style={{ alignItems: 'center', backgroundColor: '#041713', borderRadius: '12px', boxSizing: 'border-box', display: 'flex', gap: '8px', paddingBlock: '14px', paddingInline: '22px' }}>
              <div style={{ boxSizing: 'border-box', color: '#FAFAFA', display: 'inline-block', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '15px', fontWeight: 500, lineHeight: '18px' }}>
                Start blank Square in Studio
              </div>
              <div style={{ boxSizing: 'border-box', color: '#FAFAFA', display: 'inline-block', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '15px', lineHeight: '18px' }}>
                →
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )]);
