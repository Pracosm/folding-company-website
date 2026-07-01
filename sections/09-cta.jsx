window.__S = window.__S || [];
window.__S.push(['cta', () => {
  const SHAPES = ['Trapezoid', 'Square box', 'Rectangle box', 'Cube', 'Pyramid', 'Prism', 'Cylinder', 'Hexagon box', 'Pillow box', 'Sleeve', 'Mailer', 'Tube'];
  const COLORS = [
    ['Kraft brown', '#8E5C2E'],
    ['Forest green', '#0E5A3C'],
    ['Emerald', '#1C7A5A'],
    ['Midnight navy', '#0F1623'],
    ['Charcoal', '#20100E'],
    ['Crimson', '#B11E2F'],
    ['Royal purple', '#5B2A86'],
    ['Saffron', '#E58A2E'],
    ['Blush pink', '#E8A0B4'],
    ['Sky blue', '#5AA9E6'],
    ['Ivory', '#F3EEE3'],
  ];
  const [shape, setShape] = React.useState('Trapezoid');
  const [color, setColor] = React.useState(['Kraft brown', '#8E5C2E']);
  const [open, setOpen] = React.useState(null); // 'shape' | 'color' | null
  const rootRef = React.useRef(null);
  React.useEffect(() => {
    const onDoc = (e) => { if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(null); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const editable = { boxSizing: 'border-box', color: '#041713', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '32px', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: '36px', whiteSpace: 'pre', outline: 'none', borderBottom: '2px dashed #1CD1AD99', paddingBottom: '1px', cursor: 'text', minWidth: '40px' };
  const lead = { boxSizing: 'border-box', color: '#1A1108', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '32px', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: '38px' };
  const caret = { boxSizing: 'border-box', color: '#0B7460', fontFamily: '"Material Symbols Rounded", system-ui, sans-serif', fontSize: '20px', fontVariationSettings: '"wght" 500', fontWeight: 500, lineHeight: '100%', transition: 'transform .2s ease' };
  const panel = { position: 'absolute', top: 'calc(100% + 10px)', left: '0', zIndex: 20, backgroundColor: '#FFFFFF', borderColor: '#ECEAE3', borderRadius: '16px', borderStyle: 'solid', borderWidth: '1px', boxShadow: '#04171326 0px 18px 44px -14px, #0417130F 0px 2px 8px', boxSizing: 'border-box', padding: '8px', display: 'flex', flexDirection: 'column', gap: '2px', maxHeight: '300px', overflowY: 'auto', minWidth: '220px' };
  const optBase = { alignItems: 'center', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', gap: '10px', borderRadius: '10px', paddingBlock: '9px', paddingInline: '12px', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '16px', fontWeight: 500, color: '#1A1108', textAlign: 'left', whiteSpace: 'nowrap' };

  return (
    <section id="try" ref={rootRef} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', overflow: 'visible', paddingBlock: '100px' }}>
      <div style={{ backgroundImage: 'radial-gradient(circle farthest-corner at 50% 50% in oklab, oklab(77% -0.142 0.015 / 26%) 0%, oklab(77% -0.142 0.015 / 8%) 35%, oklab(97% .0002 0.007 / 0%) 65%)', boxSizing: 'border-box', height: '700px', left: '50%', position: 'absolute', top: '50%', translate: '-50% -50%', width: '1100px', maxWidth: '100%', pointerEvents: 'none' }} />
      <div style={{ maxWidth: '1280px', width: '100%', paddingInline: '32px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
        <div className="reveal" style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '14px', justifyContent: 'center', marginBottom: '48px', maxWidth: '760px' }}>
          <div style={{ alignItems: 'center', backgroundColor: '#E0F8F2', borderColor: '#1CD1AD80', borderRadius: '999px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', gap: '8px', paddingBlock: '5px', paddingInline: '12px' }}>
            <div style={{ backgroundColor: '#1CD1AD', borderRadius: '50%', boxSizing: 'border-box', flexShrink: '0', height: '6px', width: '6px' }} />
            <div style={{ boxSizing: 'border-box', color: '#0E8A72', display: 'inline-block', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '1.32px', lineHeight: '155%', textAlign: 'center', textTransform: 'uppercase', whiteSpace: 'pre' }}>
              SKeleton prompt
            </div>
          </div>
          <div style={{ boxSizing: 'border-box', color: '#0A0A0A', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '44px', fontWeight: 500, letterSpacing: '-0.07em', lineHeight: '102%', textAlign: 'center', whiteSpace: 'pre-wrap' }}>
            Kinda Stuck? Try out ! <br />
            <span style={{ color: '#0A0A0A99' }}>Skeleton Prompt</span>
          </div>
        </div>
        <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
          <div className="reveal" style={{ '--d': '90ms', alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            <div style={lead}>
              I want to design a
            </div>
            <div
              contentEditable
              suppressContentEditableWarning
              spellCheck={false}
              style={editable}
            >Diwali sweets box</div>
          </div>
          <div className="reveal" style={{ '--d': '180ms', position: 'relative', zIndex: open === 'shape' ? 50 : 1, alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            <div style={lead}>
              shaped like a
            </div>
            <div style={{ position: 'relative' }}>
              <div className="hov-chip" role="button" onClick={() => setOpen(open === 'shape' ? null : 'shape')} style={{ alignItems: 'center', backgroundColor: '#FFFFFFF5', borderColor: '#FFFFFFC7', borderRadius: '999px', borderStyle: 'solid', borderWidth: '1px', boxShadow: '#1CD1AD38 0px 0px 0px 1px inset, #0417132E 0px 6px 14px -6px', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', gap: '8px', paddingBlock: '4px', paddingLeft: '14px', paddingRight: '12px', userSelect: 'none' }}>
                <div style={{ boxSizing: 'border-box', color: '#041713', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '30px', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: '36px' }}>
                  {shape}
                </div>
                <div style={{ ...caret, transform: open === 'shape' ? 'rotate(180deg)' : 'none' }}>
                  expand_more
                </div>
              </div>
              {open === 'shape' && (
                <div style={panel}>
                  {SHAPES.map(s => (
                    <div key={s} className="sk-opt" role="button" onClick={() => { setShape(s); setOpen(null); }} style={{ ...optBase, backgroundColor: s === shape ? '#E0F8F2' : 'transparent' }}>
                      {s}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="reveal" style={{ '--d': '270ms', position: 'relative', zIndex: open === 'color' ? 50 : 1, alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            <div style={lead}>
              in
            </div>
            <div style={{ position: 'relative' }}>
              <div className="hov-chip" role="button" onClick={() => setOpen(open === 'color' ? null : 'color')} style={{ alignItems: 'center', backgroundColor: '#FFFFFFF5', borderColor: '#FFFFFFC7', borderRadius: '999px', borderStyle: 'solid', borderWidth: '1px', boxShadow: '#1CD1AD38 0px 0px 0px 1px inset, #0417132E 0px 6px 14px -6px', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', gap: '8px', paddingBlock: '4px', paddingLeft: '10px', paddingRight: '12px', userSelect: 'none' }}>
                <div style={{ backgroundColor: color[1], borderColor: '#0000001F', borderRadius: '999px', borderStyle: 'solid', borderWidth: '2px', boxSizing: 'border-box', flexShrink: '0', height: '20px', width: '20px' }} />
                <div style={{ boxSizing: 'border-box', color: '#041713', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '30px', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: '36px' }}>
                  {color[0]}
                </div>
                <div style={{ ...caret, transform: open === 'color' ? 'rotate(180deg)' : 'none' }}>
                  expand_more
                </div>
              </div>
              {open === 'color' && (
                <div style={panel}>
                  {COLORS.map(([name, hex]) => (
                    <div key={name} className="sk-opt" role="button" onClick={() => { setColor([name, hex]); setOpen(null); }} style={{ ...optBase, backgroundColor: name === color[0] ? '#E0F8F2' : 'transparent' }}>
                      <span style={{ backgroundColor: hex, borderColor: '#0000001F', borderRadius: '999px', borderStyle: 'solid', borderWidth: '2px', flexShrink: 0, height: '18px', width: '18px' }} />
                      {name}
                    </div>
                  ))}
                  <label className="sk-opt" style={{ ...optBase, borderTop: '1px solid #F0EFEA', borderRadius: '10px', marginTop: '4px', paddingTop: '12px' }}>
                    <span style={{ background: 'conic-gradient(from 0deg, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)', borderColor: '#0000001F', borderRadius: '999px', borderStyle: 'solid', borderWidth: '2px', flexShrink: 0, height: '18px', width: '18px' }} />
                    Custom colour…
                    <input type="color" value={/^#[0-9a-fA-F]{6}$/.test(color[1]) ? color[1] : '#8E5C2E'} onChange={(e) => setColor(['Custom', e.target.value])} style={{ marginLeft: 'auto', width: '26px', height: '26px', border: 'none', background: 'none', padding: 0, cursor: 'pointer' }} />
                  </label>
                </div>
              )}
            </div>
            <div style={lead}>
              with
            </div>
            <div className="hov-chip" style={{ alignItems: 'center', backgroundColor: '#FFF7E6F5', borderColor: '#C6A87AC7', borderRadius: '999px', borderStyle: 'solid', borderWidth: '1px', boxShadow: '#C6A87A52 0px 0px 0px 1px inset, #0417132E 0px 6px 14px -6px', boxSizing: 'border-box', display: 'flex', gap: '8px', paddingBlock: '4px', paddingLeft: '14px', paddingRight: '12px' }}>
              <div style={{ boxSizing: 'border-box', color: '#8E5C2E', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '30px', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: '36px' }}>
                Gold foil
              </div>
              <div style={{ boxSizing: 'border-box', color: '#8E5C2E', fontFamily: '"Material Symbols Rounded", system-ui, sans-serif', fontSize: '20px', fontVariationSettings: '"wght" 500', fontWeight: 500, lineHeight: '100%' }}>
                expand_more
              </div>
            </div>
          </div>
          <div className="reveal" style={{ '--d': '360ms', alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            <div style={lead}>
              for
            </div>
            <div
              contentEditable
              suppressContentEditableWarning
              spellCheck={false}
              style={editable}
            >Indian families · Diwali 2026</div>
          </div>
          <div className="reveal" style={{ '--d': '450ms', alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', paddingTop: '24px' }}>
            <div className="hov-btn" role="button" style={{ alignItems: 'center', backgroundImage: 'linear-gradient(in oklab 105.69999999999999deg, oklab(60.2% -0.089 0.003) 0%, oklab(78.4% -0.144 0.004) 50.82%, oklab(60.2% -0.089 0.003) 109.06%)', borderRadius: '14px', boxShadow: '#04171340 0px 12px 28px -8px', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', gap: '10px', paddingBlock: '14px', paddingInline: '24px' }}>
              <span className="genie-logo" aria-hidden="true" style={{ width: '17px', height: '17px', color: '#FFFFFF', alignSelf: 'center' }} />
              <div style={{ boxSizing: 'border-box', color: '#FFFFFF', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '15px', fontWeight: 600, letterSpacing: '-0.01em', lineHeight: '16px' }}>
                Fold your brief
              </div>
              <div style={{ boxSizing: 'border-box', color: '#FFFFFF', fontFamily: '"Material Symbols Rounded", system-ui, sans-serif', fontSize: '14px', lineHeight: '100%' }}>
                arrow_forward
              </div>
            </div>
            <div className="hov-btn" role="button" style={{ alignItems: 'center', backdropFilter: 'blur(12px)', backgroundColor: '#FFFFFFD6', borderColor: '#E7E7E5C7', borderRadius: '14px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', gap: '8px', paddingBlock: '14px', paddingInline: '20px' }}>
              <div style={{ boxSizing: 'border-box', color: '#5C5650', fontFamily: '"Material Symbols Rounded", system-ui, sans-serif', fontSize: '13px', lineHeight: '100%' }}>
                calendar_today
              </div>
              <div style={{ boxSizing: 'border-box', color: '#1A1108', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '14px', fontWeight: 500, lineHeight: '16px' }}>
                Book a 15-min demo
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}]);
