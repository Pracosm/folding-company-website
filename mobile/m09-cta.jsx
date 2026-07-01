// Mobile CTA / skeleton brief — mirrors Paper frame 2TM-0 › Skeleton (3CM-0).
// Interactive like desktop (sections/09-cta.jsx): tappable Shape + Colour
// dropdowns, editable text, and a Shuffle that randomises the brief.
window.__M = window.__M || [];
window.__M.push(['cta', () => {
  const sans = '"Geist", system-ui, sans-serif';
  const mono = '"Geist Mono", system-ui, sans-serif';
  const ms = '"Material Symbols Rounded", system-ui, sans-serif';
  const SHAPES = ['Trapezoid', 'Square box', 'Rectangle box', 'Cube', 'Pyramid', 'Prism', 'Cylinder', 'Hexagon box', 'Pillow box', 'Sleeve', 'Mailer', 'Tube'];
  const COLORS = [
    ['Kraft brown', '#8E5C2E'], ['Forest green', '#0E5A3C'], ['Emerald', '#1C7A5A'],
    ['Midnight navy', '#0F1623'], ['Charcoal', '#20100E'], ['Crimson', '#B11E2F'],
    ['Royal purple', '#5B2A86'], ['Saffron', '#E58A2E'], ['Blush pink', '#E8A0B4'],
    ['Sky blue', '#5AA9E6'], ['Ivory', '#F3EEE3'],
  ];
  const [shape, setShape] = React.useState('Trapezoid');
  const [color, setColor] = React.useState(['Kraft brown', '#8E5C2E']);
  const [open, setOpen] = React.useState(null); // 'shape' | 'color' | null
  const rootRef = React.useRef(null);
  React.useEffect(() => {
    const onDoc = (e) => { if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(null); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('touchstart', onDoc);
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('touchstart', onDoc); };
  }, []);
  const shuffle = () => {
    setShape(SHAPES[Math.floor(Math.random() * SHAPES.length)]);
    setColor(COLORS[Math.floor(Math.random() * COLORS.length)]);
    setOpen(null);
  };

  const big = { color: '#1A1108', fontFamily: sans, fontSize: '26px', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: '128%' };
  const chip = (extra) => ({ display: 'inline-flex', alignItems: 'center', gap: '6px', borderRadius: '999px', borderStyle: 'solid', borderWidth: '1px', paddingBlock: '3px', paddingInline: '12px', boxShadow: '#0417132E 0px 6px 14px -6px', userSelect: 'none', cursor: 'pointer', ...extra });
  const caret = { color: '#0B7460', fontFamily: ms, fontSize: '18px', transition: 'transform .2s ease' };
  const panel = { position: 'absolute', top: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)', zIndex: 40, backgroundColor: '#FFFFFF', borderColor: '#ECEAE3', borderStyle: 'solid', borderWidth: '1px', borderRadius: '14px', boxShadow: '#04171326 0px 18px 44px -14px, #0417130F 0px 2px 8px', padding: '8px', display: 'flex', flexDirection: 'column', gap: '2px', maxHeight: '252px', overflowY: 'auto', width: '224px', textAlign: 'left' };
  const optBase = { alignItems: 'center', cursor: 'pointer', display: 'flex', gap: '10px', borderRadius: '10px', paddingBlock: '9px', paddingInline: '12px', fontFamily: sans, fontSize: '15px', fontWeight: 500, color: '#1A1108', textAlign: 'left', whiteSpace: 'nowrap' };
  const editable = { color: '#041713', fontFamily: sans, fontSize: '26px', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: '128%', outline: 'none', borderBottom: '2px dashed #1CD1AD99', cursor: 'text', display: 'inline-block', minWidth: '40px' };

  return (
    <section id="m-try" ref={rootRef} style={{ width: '100%', boxSizing: 'border-box', position: 'relative', overflow: 'visible', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px', paddingBlock: '64px', paddingInline: '20px', backgroundColor: '#FFFFFF' }}>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '480px', height: '480px', backgroundImage: 'radial-gradient(circle at 50% 50% in oklab, oklab(77% -0.142 0.015 / 24%) 0%, oklab(77% -0.142 0.015 / 0%) 65%)' }} />
      </div>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#E0F8F2', borderColor: '#1CD1AD80', borderStyle: 'solid', borderWidth: '1px', borderRadius: '999px', paddingBlock: '5px', paddingInline: '12px' }}>
        <span style={{ backgroundColor: '#1CD1AD', borderRadius: '50%', height: '6px', width: '6px' }} />
        <span style={{ color: '#0E8A72', fontFamily: mono, fontSize: '11px', fontWeight: 500, letterSpacing: '0.13em', textTransform: 'uppercase' }}>Skeleton brief · stuck?</span>
      </div>

      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', textAlign: 'center', marginTop: '8px' }}>
        <span style={big}>I want to design a</span>
        <span style={big}>
          <span contentEditable suppressContentEditableWarning spellCheck={false} style={editable}>Diwali sweets box</span>
        </span>
        <span style={{ ...big, position: 'relative', zIndex: open === 'shape' ? 50 : 1 }}>shaped like a&nbsp;
          <span style={{ position: 'relative' }}>
            <span className="hov-chip" role="button" onClick={() => setOpen(open === 'shape' ? null : 'shape')} style={chip({ backgroundColor: '#FFFFFFF5', borderColor: '#FFFFFFC7', boxShadow: '#1CD1AD38 0px 0px 0px 1px inset, #0417132E 0px 6px 14px -6px' })}>
              <span style={{ color: '#041713' }}>{shape}</span><span style={{ ...caret, transform: open === 'shape' ? 'rotate(180deg)' : 'none' }}>expand_more</span>
            </span>
            {open === 'shape' && (
              <span style={panel}>
                {SHAPES.map(s => (
                  <span key={s} className="sk-opt" role="button" onClick={() => { setShape(s); setOpen(null); }} style={{ ...optBase, backgroundColor: s === shape ? '#E0F8F2' : 'transparent' }}>{s}</span>
                ))}
              </span>
            )}
          </span>
        </span>
        <span style={{ ...big, position: 'relative', zIndex: open === 'color' ? 50 : 1 }}>in&nbsp;
          <span style={{ position: 'relative' }}>
            <span className="hov-chip" role="button" onClick={() => setOpen(open === 'color' ? null : 'color')} style={chip({ backgroundColor: '#FFFFFFF5', borderColor: '#FFFFFFC7', boxShadow: '#1CD1AD38 0px 0px 0px 1px inset, #0417132E 0px 6px 14px -6px' })}>
              <span style={{ backgroundColor: color[1], borderColor: '#0000001F', borderStyle: 'solid', borderWidth: '2px', borderRadius: '999px', height: '18px', width: '18px', flexShrink: 0 }} />
              <span style={{ color: '#041713' }}>{color[0]}</span><span style={{ ...caret, transform: open === 'color' ? 'rotate(180deg)' : 'none' }}>expand_more</span>
            </span>
            {open === 'color' && (
              <span style={panel}>
                {COLORS.map(([name, hex]) => (
                  <span key={name} className="sk-opt" role="button" onClick={() => { setColor([name, hex]); setOpen(null); }} style={{ ...optBase, backgroundColor: name === color[0] ? '#E0F8F2' : 'transparent' }}>
                    <span style={{ backgroundColor: hex, borderColor: '#0000001F', borderStyle: 'solid', borderWidth: '2px', borderRadius: '999px', height: '18px', width: '18px', flexShrink: 0 }} />{name}
                  </span>
                ))}
                <label className="sk-opt" style={{ ...optBase, borderTop: '1px solid #F0EFEA', marginTop: '4px', paddingTop: '12px' }}>
                  <span style={{ background: 'conic-gradient(from 0deg, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)', borderColor: '#0000001F', borderStyle: 'solid', borderWidth: '2px', borderRadius: '999px', height: '18px', width: '18px', flexShrink: 0 }} />Custom colour…
                  <input type="color" value={/^#[0-9a-fA-F]{6}$/.test(color[1]) ? color[1] : '#8E5C2E'} onChange={(e) => setColor(['Custom', e.target.value])} style={{ marginLeft: 'auto', width: '26px', height: '26px', border: 'none', background: 'none', padding: 0, cursor: 'pointer' }} />
                </label>
              </span>
            )}
          </span>
        </span>
        <span style={big}>with&nbsp;
          <span className="hov-chip" style={chip({ backgroundColor: '#FFF7E6F5', borderColor: '#C6A87AC7', boxShadow: '#C6A87A52 0px 0px 0px 1px inset, #0417132E 0px 6px 14px -6px', cursor: 'default' })}>
            <span style={{ color: '#8E5C2E' }}>Gold foil</span><span style={{ ...caret, color: '#8E5C2E' }}>expand_more</span>
          </span>
        </span>
        <span style={big}>for&nbsp;
          <span contentEditable suppressContentEditableWarning spellCheck={false} style={{ ...editable, color: '#1A110899' }}>Indian families</span>
        </span>
      </div>

      <div style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', marginTop: '14px' }}>
        <div className="hov-btn" role="button" style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundImage: 'linear-gradient(in oklab 106deg, oklab(60.2% -0.089 0.003) 0%, oklab(78.4% -0.144 0.004) 51%, oklab(60.2% -0.089 0.003) 109%)', borderRadius: '14px', boxShadow: '#04171340 0px 12px 28px -8px', paddingBlock: '14px', paddingInline: '22px', cursor: 'pointer' }}>
          <span className="genie-logo" aria-hidden="true" style={{ width: '16px', height: '16px', color: '#fff' }} />
          <span style={{ color: '#fff', fontFamily: sans, fontSize: '15px', fontWeight: 600 }}>Fold this brief</span>
        </div>
        <div className="hov-btn" role="button" onClick={shuffle} style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#FFFFFFD6', borderColor: '#E7E7E5C7', borderStyle: 'solid', borderWidth: '1px', borderRadius: '14px', paddingBlock: '14px', paddingInline: '20px', cursor: 'pointer' }}>
          <span style={{ color: '#5C5650', fontFamily: ms, fontSize: '15px' }}>shuffle</span>
          <span style={{ color: '#1A1108', fontFamily: sans, fontSize: '14px', fontWeight: 500 }}>Shuffle</span>
        </div>
      </div>
    </section>
  );
}]);
