window.__S = window.__S || [];

/* ── Genie folding studio (interactive recreation of Paper frame VNF-0 + states) ── */
function GStudio({ onBack }) {
  const sans = '"Geist", system-ui, sans-serif';
  const mono = '"Geist Mono", system-ui, sans-serif';
  const ms = '"Material Symbols Rounded", system-ui, sans-serif';
  const [view, setView] = React.useState('full');   // full | design | product | texts
  const [xOpen, setXOpen] = React.useState(false);   // Extra-details drawer
  const [pop, setPop] = React.useState(null);        // edit popover key
  const popRef = React.useRef(null);
  React.useEffect(() => {
    if (!pop) return;
    const onDoc = (e) => { if (popRef.current && !popRef.current.contains(e.target)) setPop(null); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [pop]);
  const panel = { backgroundColor: '#FCFCFAF7', border: '1px solid #FFFFFF', borderRadius: '20px', overflow: 'clip', boxShadow: '#04120CB3 0px 30px 70px -24px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', minHeight: '648px' };
  const lab = { color: '#9A9384', fontFamily: mono, fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' };
  const icoBtn = (icon, size) => <span style={{ fontFamily: ms, fontSize: (size || 18) + 'px', color: '#5C5650', lineHeight: 1 }}>{icon}</span>;
  // editable brief row — opens its popover
  const erow = (icon, l, v, key, trail) => (
    <div className="hov-chip" role="button" onClick={() => setPop(key)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid #ECEAE3', borderRadius: '12px', padding: '11px 14px', backgroundColor: '#FFFFFF' }}>
      <span style={{ flexShrink: 0, width: '32px', height: '32px', borderRadius: '9px', backgroundColor: '#F4F2EC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: ms, fontSize: '17px', color: '#6B6456' }}>{icon}</span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1, minWidth: 0 }}>
        <span style={{ ...lab, fontSize: '9px', color: '#A39A8B' }}>{l}</span>
        <span style={{ color: '#1A1108', fontFamily: sans, fontSize: '14px', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{v}</span>
      </div>
      <span style={{ fontFamily: ms, fontSize: '15px', color: '#B8B0A1', flexShrink: 0 }}>{trail || 'edit'}</span>
    </div>
  );
  const tabBtn = (icon, label, key) => {
    const on = view === key;
    return (
      <div className={on ? '' : 'hov-chip'} role="button" onClick={() => { setView(key); setPop(null); }} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 14px', borderRadius: '10px', border: '1px solid ' + (on ? '#1CD1AD' : '#ECEAE3'), backgroundColor: on ? '#FFFFFF' : '#F6F5F0', boxShadow: on ? '#1A11080F 0 1px 2px' : 'none' }}>
        <span style={{ fontFamily: ms, fontSize: '16px', color: on ? '#0E8A72' : '#9A9384' }}>{icon}</span>
        <span style={{ color: on ? '#1A1108' : '#7C7464', fontFamily: sans, fontSize: '14px', fontWeight: on ? 600 : 500, whiteSpace: 'nowrap' }}>{label}</span>
      </div>
    );
  };
  // ── edit popovers (designed after Paper app edit states) ──
  const popCard = (w, children) => <div ref={popRef} style={{ width: w + 'px', maxWidth: '92%', backgroundColor: '#FFFFFF', border: '1px solid #ECEAE3', borderRadius: '18px', boxShadow: '#04171352 0px 26px 60px -20px', overflow: 'hidden', textAlign: 'left' }}>{children}</div>;
  const popHead = (t, s) => (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '16px 18px 12px' }}>
      <div><div style={{ color: '#041713', fontFamily: sans, fontSize: '16px', fontWeight: 600, lineHeight: '20px' }}>{t}</div><div style={{ color: '#A39A8B', fontFamily: mono, fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', lineHeight: '13px', marginTop: '5px', textTransform: 'uppercase' }}>{s}</div></div>
      <span role="button" onClick={() => setPop(null)} style={{ color: '#9A9488', cursor: 'pointer', fontFamily: ms, fontSize: '18px', lineHeight: '100%' }}>close</span>
    </div>
  );
  const footRow = (left, right) => <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F0EFEA', padding: '12px 14px' }}>{left}{right}</div>;
  const ghostBtn = (t) => <div role="button" onClick={() => setPop(null)} style={{ color: '#5C5650', cursor: 'pointer', fontFamily: sans, fontSize: '13px', fontWeight: 500, padding: '9px 6px' }}>{t}</div>;
  const primBtn = (t) => <div className="hov-btn" role="button" onClick={() => setPop(null)} style={{ backgroundImage: 'linear-gradient(135deg, #2FC9A8, #0E8A72)', borderRadius: '10px', color: '#FFFFFF', cursor: 'pointer', fontFamily: sans, fontSize: '13px', fontWeight: 600, padding: '9px 18px' }}>{t}</div>;
  const optGrid = (items) => (
    <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: 'repeat(3, 1fr)', padding: '0 18px 18px' }}>
      {items.map(([ic, name, cap, sel]) => (
        <div key={name} className="hov-raise" role="button" onClick={() => setPop(null)} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', textAlign: 'center', cursor: 'pointer', border: '1px solid ' + (sel ? '#1CD1AD' : '#ECEAE3'), backgroundColor: sel ? '#F2FCFA' : '#FFFFFF', borderRadius: '14px', padding: '16px 10px' }}>
          {sel && <span style={{ position: 'absolute', top: '8px', right: '8px', color: '#1CD1AD', fontFamily: ms, fontSize: '16px', fontVariationSettings: '"FILL" 1' }}>check_circle</span>}
          <span style={{ color: '#0B7460', fontFamily: ms, fontSize: '24px' }}>{ic}</span>
          <span style={{ color: '#041713', fontFamily: sans, fontSize: '14px', fontWeight: 600, lineHeight: '17px' }}>{name}</span>
          <span style={{ color: '#A39A8B', fontFamily: mono, fontSize: '10px', lineHeight: '12px' }}>{cap}</span>
        </div>
      ))}
    </div>
  );
  const inputBox = (v) => <div style={{ border: '1.5px solid #1CD1AD', borderRadius: '10px', padding: '12px 14px', color: '#041713', fontFamily: sans, fontSize: '15px', fontWeight: 500 }}>{v}</div>;
  const editPop = () => {
    if (pop === 'shape') return popCard(372, <React.Fragment>{popHead('Choose a shape', 'Structure · 6 options')}{optGrid([['archive', 'Rigid mailer', '86×86×240', true], ['inventory_2', 'Folding carton', 'straight tuck', false], ['deployed_code', 'Tuck-end box', 'auto-lock', false], ['mail', 'Mailer box', 'e-commerce', false], ['view_day', 'Sleeve', 'wrap band', false], ['shopping_bag', 'Pouch', 'flexible', false]])}</React.Fragment>);
    if (pop === 'ptype') return popCard(372, <React.Fragment>{popHead('Product type', 'Skincare · 6 formats')}{optGrid([['water_drop', 'Night serum', '30ml', true], ['spa', 'Moisturizer', '50ml jar', false], ['medication', 'Face oil', 'dropper', false], ['wash', 'Cleanser', '120ml', false], ['air', 'Toner mist', '100ml', false], ['visibility', 'Eye cream', '15ml', false]])}</React.Fragment>);
    if (pop === 'category') return popCard(372, <React.Fragment>{popHead('Category', 'Industry · 6 options')}{optGrid([['spa', 'Beauty', 'skincare', true], ['restaurant', 'Food & bev', 'carton', false], ['wine_bar', 'Spirits', 'rigid', false], ['memory', 'Electronics', 'box', false], ['air', 'Fragrance', 'folding', false], ['self_improvement', 'Wellness', 'mailer', false]])}</React.Fragment>);
    if (pop === 'pname') return popCard(360, <React.Fragment>{popHead('Product name', 'Shown on the carton face')}<div style={{ padding: '0 18px 8px' }}>{inputBox('Restorative Night Serum')}<div style={{ ...lab, marginTop: '14px', marginBottom: '8px' }}>Genie suggests</div><div style={{ display: 'flex', gap: '8px' }}>{['Midnight Renewal', 'Ritual Night Oil'].map(s => <span key={s} className="hov-chip" role="button" onClick={() => setPop(null)} style={{ cursor: 'pointer', border: '1px solid #ECEAE3', borderRadius: '8px', padding: '8px 12px', color: '#0B7460', fontFamily: sans, fontSize: '13px', fontWeight: 500 }}>{s}</span>)}</div></div>{footRow(ghostBtn('Cancel'), primBtn('Save'))}</React.Fragment>);
    if (pop === 'company') return popCard(360, <React.Fragment>{popHead('Company name', 'Brand displayed on pack')}<div style={{ padding: '0 18px 8px' }}>{inputBox('Sweet Karma')}<div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '12px', backgroundColor: '#F4F8F4', borderRadius: '10px', padding: '12px' }}><span style={{ color: '#0E8A72', fontFamily: ms, fontSize: '18px', fontVariationSettings: '"FILL" 1', flexShrink: 0 }}>verified</span><span style={{ color: '#5C5650', fontFamily: sans, fontSize: '13px', lineHeight: '140%' }}>Matches your Sweet Karma brand kit · logo &amp; type synced</span></div></div>{footRow(ghostBtn('Cancel'), primBtn('Save'))}</React.Fragment>);
    if (pop === 'colour') return popCard(360, <React.Fragment>{popHead('Colour palette', '5 colours · tap to edit')}<div style={{ padding: '0 18px 8px' }}><div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>{['#1C2C46', '#C9A24B', '#E8E2D2', '#8A92A6', '#1A1A1A'].map(c => <span key={c} style={{ width: '40px', height: '40px', borderRadius: '9px', backgroundColor: c, border: '1px solid #00000014' }} />)}<span style={{ width: '40px', height: '40px', borderRadius: '9px', border: '1px dashed #CFC9BC', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A39A8B', fontFamily: ms, fontSize: '18px' }}>add</span></div><div style={{ ...lab, marginTop: '16px', marginBottom: '8px' }}>Brand kit palettes</div>{[['Sweet Karma', ['#1C2C46', '#C9A24B', '#E8E2D2', '#8A92A6', '#1A1A1A'], true], ['Warm botanical', ['#3B4A2F', '#C9A24B', '#E8E2D2', '#7A5A3A', '#1A1A1A'], false]].map(([n, sw, sel]) => <div key={n} className="hov-chip" role="button" onClick={() => setPop(null)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid ' + (sel ? '#1CD1AD' : '#ECEAE3'), backgroundColor: sel ? '#F2FCFA' : '#FFFFFF', borderRadius: '12px', padding: '10px 12px', marginBottom: '8px' }}><div style={{ display: 'flex', gap: '3px' }}>{sw.map((c, i) => <span key={i} style={{ width: '14px', height: '14px', borderRadius: '4px', backgroundColor: c }} />)}</div><span style={{ flex: 1, color: '#041713', fontFamily: sans, fontSize: '13px', fontWeight: 600 }}>{n}</span>{sel && <span style={{ color: '#1CD1AD', fontFamily: ms, fontSize: '16px', fontVariationSettings: '"FILL" 1' }}>check_circle</span>}</div>)}</div>{footRow(<span />, primBtn('Done'))}</React.Fragment>);
    if (pop === 'reference') return popCard(372, <React.Fragment>{popHead('Reference', 'Moodboard · 2 files')}<div style={{ padding: '0 18px 8px' }}><div style={{ display: 'flex', gap: '12px' }}>{[['skincare-moodboard.jpg', 'assets/thumbs/3.jpg'], ['competitor-pack.png', 'assets/thumbs/8.jpg']].map(([n, s]) => <div key={n} style={{ flex: 1 }}><div style={{ height: '90px', borderRadius: '12px', backgroundImage: 'url(' + s + ')', backgroundSize: 'cover', backgroundPosition: 'center', border: '1px solid #ECEAE3' }} /><div style={{ color: '#5C5650', fontFamily: sans, fontSize: '12px', marginTop: '6px' }}>{n}</div></div>)}</div><div style={{ marginTop: '12px', border: '1px dashed #D8D2C6', borderRadius: '12px', padding: '18px', textAlign: 'center', color: '#A39A8B', fontFamily: mono, fontSize: '10px', letterSpacing: '0.06em', textTransform: 'uppercase' }}><span style={{ display: 'block', fontFamily: ms, fontSize: '22px', marginBottom: '4px', color: '#B8B0A1' }}>cloud_upload</span>Drag &amp; drop or browse</div></div>{footRow(ghostBtn('Cancel'), primBtn('Done'))}</React.Fragment>);
    if (pop === 'manufacturing') return popCard(340, <React.Fragment>{popHead('Manufacturing', 'Structure · 4 options')}<div style={{ display: 'flex', flexDirection: 'column', padding: '0 10px 6px' }}>{[['inventory_2', 'Folding carton', '320gsm · soft-touch', true], ['deployed_code', 'Rigid box', '1200gsm · wrapped', false], ['package_2', 'Corrugated mailer', 'E-flute · kraft', false], ['width_wide', 'Printed sleeve', '250gsm · uncoated', false]].map(([ic, n, sub, sel]) => <div key={n} className="hov-chip" role="button" onClick={() => setPop(null)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', borderRadius: '12px', padding: '10px', backgroundColor: sel ? '#F2FCFA' : 'transparent' }}><span style={{ width: '34px', height: '34px', borderRadius: '9px', backgroundColor: '#F4F2EC', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B6456', fontFamily: ms, fontSize: '18px', flexShrink: 0 }}>{ic}</span><div style={{ flex: 1 }}><div style={{ color: '#041713', fontFamily: sans, fontSize: '14px', fontWeight: 600 }}>{n}</div><div style={{ color: '#A39A8B', fontFamily: mono, fontSize: '10px', marginTop: '2px' }}>{sub}</div></div><span style={{ width: '18px', height: '18px', borderRadius: '999px', border: '1.5px solid ' + (sel ? '#1CD1AD' : '#CFC9BC'), display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{sel && <span style={{ width: '8px', height: '8px', borderRadius: '999px', backgroundColor: '#1CD1AD' }} />}</span></div>)}</div>{footRow(ghostBtn('Cancel'), primBtn('Apply'))}</React.Fragment>);
    if (pop === 'compliance') return popCard(340, <React.Fragment>{popHead('Compliance', '3 of 6 applied')}<div style={{ display: 'flex', flexDirection: 'column', padding: '0 18px 4px' }}>{[['forest', 'FSC certified', 'Responsibly sourced board', true], ['water_drop', 'Food-safe inks', 'Low-migration, direct contact', true], ['public', 'EU REACH', 'Sold into the EU', true], ['recycling', 'Curbside recyclable', 'Mono-material only', false], ['eco', 'Carbon-neutral print', 'Offset via partner mill', false]].map(([ic, n, desc, on]) => <div key={n} style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBlock: '11px' }}><span style={{ color: '#0B7460', fontFamily: ms, fontSize: '20px', flexShrink: 0 }}>{ic}</span><div style={{ flex: 1 }}><div style={{ color: '#041713', fontFamily: sans, fontSize: '14px', fontWeight: 600 }}>{n}</div><div style={{ color: '#A39A8B', fontFamily: sans, fontSize: '12px', marginTop: '1px' }}>{desc}</div></div><span style={{ width: '36px', height: '20px', borderRadius: '999px', backgroundColor: on ? '#1CD1AD' : '#E2E7EE', display: 'flex', justifyContent: on ? 'flex-end' : 'flex-start', padding: '2px', flexShrink: 0 }}><span style={{ width: '16px', height: '16px', borderRadius: '999px', backgroundColor: '#FFFFFF' }} /></span></div>)}</div>{footRow(ghostBtn('Cancel'), primBtn('Apply'))}</React.Fragment>);
    if (pop === 'brand') return popCard(340, <React.Fragment>{popHead('Brand kit', '2 kits · 1 active')}<div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '0 18px 4px' }}>{[['SK', 'Sweet Karma', 'Playfair · Geist', ['#22304A', '#C6A165', '#EDE6D6', '#9AA6C4'], '#22304A', true], ['AH', 'Aakar House', 'Geist · Geist Mono', ['#1C5A3C', '#C6A165', '#EDE6D6', '#1A1A1A'], '#163E2B', false]].map(([av, n, font, sw, avbg, active]) => <div key={n} className="hov-raise" role="button" onClick={() => setPop(null)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid ' + (active ? '#1CD1AD' : '#ECEAE3'), backgroundColor: active ? '#F2FCFA' : '#FFFFFF', borderRadius: '14px', padding: '12px' }}><span style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: avbg, color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sans, fontSize: '13px', fontWeight: 600, flexShrink: 0 }}>{av}</span><div style={{ flex: 1 }}><div style={{ color: '#041713', fontFamily: sans, fontSize: '14px', fontWeight: 600 }}>{n}</div><div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}><div style={{ display: 'flex', gap: '3px' }}>{sw.map((c, i) => <span key={i} style={{ width: '12px', height: '12px', borderRadius: '999px', backgroundColor: c }} />)}</div><span style={{ color: '#A39A8B', fontFamily: mono, fontSize: '10px' }}>{font}</span></div></div><span style={{ width: '18px', height: '18px', borderRadius: '999px', border: '1.5px solid ' + (active ? '#1CD1AD' : '#CFC9BC'), display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{active && <span style={{ width: '8px', height: '8px', borderRadius: '999px', backgroundColor: '#1CD1AD' }} />}</span></div>)}</div>{footRow(<div role="button" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0B7460', cursor: 'pointer', fontFamily: sans, fontSize: '13px', fontWeight: 500, padding: '9px 6px' }}><span style={{ fontFamily: ms, fontSize: '16px' }}>add</span>New brand kit</div>, primBtn('Done'))}</React.Fragment>);
    return null;
  };
  // ── element grids (Design / Product / Texts tab states) ──
  const gcell = (card, caption) => <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>{card}<span style={{ color: '#5C5650', fontFamily: sans, fontSize: '13px' }}>{caption}</span></div>;
  const baseCard = (sel, inner) => <div style={{ position: 'relative', border: '1px solid ' + (sel ? '#1CD1AD' : '#ECEAE3'), backgroundColor: sel ? '#F7FCFB' : '#FFFFFF', borderRadius: '14px', height: '128px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '14px', overflow: 'hidden', boxSizing: 'border-box' }}>{sel && <span style={{ position: 'absolute', top: '10px', right: '10px', color: '#1CD1AD', fontFamily: ms, fontSize: '18px', fontVariationSettings: '"FILL" 1', zIndex: 1 }}>check_circle</span>}{inner}</div>;
  const addCard = () => <div style={{ border: '1px dashed #D8D2C6', borderRadius: '14px', height: '128px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C2BAAB', fontFamily: ms, fontSize: '24px' }}>add</div>;
  const barcode = <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '34px', justifyContent: 'center' }}>{[22, 30, 14, 30, 18, 28, 12, 30, 24, 16, 30, 20, 28, 14, 30, 18, 26, 12, 30, 22].map((h, i) => <span key={i} style={{ width: '2px', height: h + 'px', backgroundColor: '#1A1108' }} />)}</div>;
  const gridWrap = (head, cells) => (
    <div style={{ position: 'absolute', top: '70px', left: '64px', right: '18px', bottom: '16px', overflow: 'auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <span style={lab}>{head}</span>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px 16px' }}>{cells}</div>
    </div>
  );
  const designCells = [
    gcell(baseCard(true, <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', borderRadius: '10px', backgroundColor: '#0E1A2E' }}><span style={{ color: '#C9A24B', fontFamily: ms, fontSize: '30px' }}>spa</span></span>), 'Botanical line art'),
    gcell(baseCard(false, <span style={{ width: '100%', height: '100%', borderRadius: '10px', backgroundImage: 'linear-gradient(135deg, #E7C77A, #B9893F)' }} />), 'Gold foil border'),
    gcell(baseCard(false, <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', borderRadius: '10px', backgroundColor: '#0E1A2E', color: '#C9A24B', fontFamily: sans, fontSize: '30px', fontWeight: 700 }}>SK</span>), 'Logo monogram'),
    gcell(addCard(), 'Add element'), gcell(addCard(), 'Add element'), gcell(addCard(), 'Add element')
  ];
  const productCells = [
    gcell(baseCard(true, <div style={{ width: '100%' }}><div style={{ ...lab, fontSize: '9px', color: '#0B7460' }}>Ingredients</div><div style={{ color: '#3A3326', fontFamily: sans, fontSize: '12px', lineHeight: '150%', marginTop: '6px' }}>Aqua, Glycerin, Squalane, Tocopherol, Rosa Damascena…</div></div>), 'Ingredient list'),
    gcell(baseCard(false, <div style={{ textAlign: 'center' }}><div style={{ color: '#041713', fontFamily: sans, fontSize: '28px', fontWeight: 700 }}>30 ml</div><div style={{ ...lab, fontSize: '9px', marginTop: '4px' }}>net content</div></div>), 'Net weight'),
    gcell(baseCard(false, <div style={{ textAlign: 'center' }}>{barcode}<div style={{ color: '#5C5650', fontFamily: mono, fontSize: '11px', letterSpacing: '0.1em', marginTop: '8px' }}>8 901234 567890</div></div>), 'Barcode · EAN-13'),
    gcell(baseCard(false, <div style={{ color: '#5C5650', fontFamily: mono, fontSize: '12px', lineHeight: '170%', textAlign: 'center' }}>MFG 06/2026<br />EXP 06/2028</div>), 'MFG / EXP date'),
    gcell(baseCard(false, <div style={{ textAlign: 'center' }}><div style={{ color: '#041713', fontFamily: sans, fontSize: '24px', fontWeight: 700 }}>₹1,499</div><div style={{ ...lab, fontSize: '9px', marginTop: '4px' }}>MRP incl. taxes</div></div>), 'MRP'),
    gcell(baseCard(false, <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ width: '42px', height: '42px', borderRadius: '8px', backgroundColor: '#ECEAE1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9A9384', fontFamily: ms, fontSize: '24px', flexShrink: 0 }}>qr_code_2</span><div><div style={{ color: '#041713', fontFamily: mono, fontSize: '12px', fontWeight: 600 }}>LOT A24</div><div style={{ ...lab, fontSize: '9px', marginTop: '2px' }}>scan to verify</div></div></div>), 'Batch · QR')
  ];
  const textCell = (sel, val, big, fs, cap) => gcell(baseCard(sel, <span style={{ color: big ? '#C9A24B' : '#5C5650', fontFamily: sans, fontSize: fs, fontWeight: big ? 700 : 500, letterSpacing: big ? '0.02em' : '0.08em', textAlign: 'center', lineHeight: '135%' }}>{val}</span>), cap);
  const textCells = [
    textCell(true, 'SWEET KARMA', true, '22px', 'Headline'),
    textCell(false, 'PURE RITUAL SKINCARE', false, '11px', 'Tagline'),
    textCell(false, 'Restorative night serum with cold-pressed botanicals.', false, '13px', 'Body copy')
  ];
  const chip = (txt) => <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#E0F8F2', borderRadius: '7px', padding: '4px 8px', flexShrink: 0 }}><span style={{ color: '#0E8A72', fontFamily: mono, fontSize: '11px', fontWeight: 600 }}>{txt}</span><span style={{ fontFamily: ms, fontSize: '13px', color: '#0E8A72' }}>close</span></div>;
  const promptChip = view === 'product' ? 'Ingredient list' : view === 'design' ? 'Botanical line art' : 'T Headline';
  const promptText = view === 'full' ? 'Tell Genie what to change — “make the foil warmer”…' : 'Refine this element — “make the botanicals finer”…';
  return (
    <div className="gstudio" style={{ position: 'relative', display: 'flex', gap: '20px', width: 'min(1280px, 95vw)', boxSizing: 'border-box', alignItems: 'stretch' }}>
      {/* LEFT — Your brief */}
      <div style={{ ...panel, width: '468px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 20px', borderBottom: '1px solid #F0EFEA' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
            <span className="hov-btn" role="button" onClick={onBack} style={{ flexShrink: 0, width: '30px', height: '30px', borderRadius: '8px', backgroundColor: '#fff', border: '1px solid #E4E1DA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: ms, fontSize: '18px', color: '#5A5448', cursor: 'pointer' }}>arrow_back</span>
            <span style={{ flexShrink: 0, width: '30px', height: '30px', borderRadius: '9px', backgroundColor: '#E0F8F2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span className="genie-logo" aria-hidden="true" style={{ width: '16px', height: '16px', color: '#0E8A72' }} /></span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ color: '#1A1108', fontFamily: sans, fontSize: '13.5px', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Your brief</span>
              <span style={{ color: '#0E8A72', fontFamily: mono, fontSize: '9px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Editable · live sync</span>
            </div>
          </div>
          <span style={{ width: '34px', height: '34px', borderRadius: '9px', border: '1px solid #ECEAE3', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>{icoBtn('history', 17)}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '13px', padding: '16px 20px', flex: 1, minHeight: 0 }}>
          <span style={lab}>Your sentence</span>
          <div style={{ border: '1px solid #ECEAE3', borderRadius: '12px', padding: '13px 14px', backgroundColor: '#FFFFFF', color: '#2A2418', fontFamily: mono, fontSize: '13px', lineHeight: '160%' }}>A 240gsm rigid mailer for premium skincare, soft matte, navy &amp; gold foil</div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {[['refer.png', 'assets/thumbs/3.jpg'], ['refer.jpg', 'assets/thumbs/8.jpg']].map(([nm, src]) => (
              <div key={nm} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid #ECEAE3', borderRadius: '11px', padding: '8px 12px 8px 8px', backgroundColor: '#fff' }}>
                <span style={{ flexShrink: 0, width: '26px', height: '26px', borderRadius: '7px', backgroundImage: 'url(' + src + ')', backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <span style={{ color: '#1A1108', fontFamily: sans, fontSize: '14px', fontWeight: 600 }}>{nm}</span>
              </div>
            ))}
          </div>
          {erow('deployed_code', 'Shape', 'Square · rigid mailer', 'shape', 'edit')}
          {erow('factory', 'Manufacturing', 'Carton · 320gsm · soft-touch', 'manufacturing', 'lock')}
          <div className="hov-chip" role="button" onClick={() => setXOpen(v => !v)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid #ECEAE3', borderRadius: '12px', padding: '12px 14px', backgroundColor: '#FBFAF7' }}>
            <span style={{ flexShrink: 0, width: '32px', height: '32px', borderRadius: '9px', backgroundColor: '#F4F2EC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: ms, fontSize: '17px', color: '#6B6456' }}>tune</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', flex: 1, minWidth: 0 }}>
              <span style={{ color: '#1A1108', fontFamily: sans, fontSize: '14px', fontWeight: 600 }}>Extra details</span>
              <span style={{ ...lab, fontSize: '9px', color: '#A39A8B' }}>{xOpen ? '8 more · tap to collapse' : '8 more · tap to expand'}</span>
            </div>
            <span style={{ fontFamily: ms, fontSize: '20px', color: '#B8B0A1', flexShrink: 0 }}>{xOpen ? 'expand_less' : 'expand_more'}</span>
          </div>
          {xOpen && (
            <React.Fragment>
              {erow('medication', 'Product type', 'Skincare · night serum', 'ptype', 'edit')}
              {erow('label', 'Product name', 'Restorative Night Serum', 'pname', 'edit')}
              {erow('apartment', 'Company name', 'Sweet Karma', 'company', 'edit')}
              <div className="hov-chip" role="button" onClick={() => setPop('colour')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid #ECEAE3', borderRadius: '12px', padding: '11px 14px', backgroundColor: '#fff' }}>
                <span style={{ flexShrink: 0, width: '32px', height: '32px', borderRadius: '9px', backgroundColor: '#F4F2EC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: ms, fontSize: '17px', color: '#6B6456' }}>palette</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                  <span style={{ ...lab, fontSize: '9px', color: '#A39A8B' }}>Colour palette</span>
                  <div style={{ display: 'flex', gap: '6px' }}>{['#1B2C4D', '#C6A152', '#EDE7DA', '#7C8AA6', '#0E1622'].map(c => <span key={c} style={{ width: '20px', height: '20px', borderRadius: '6px', backgroundColor: c, border: '1px solid #00000014' }} />)}</div>
                </div>
                <span style={{ fontFamily: ms, fontSize: '15px', color: '#B8B0A1' }}>edit</span>
              </div>
              {erow('category', 'Category', 'Beauty · Skincare', 'category', 'edit')}
              {erow('verified_user', 'Compliance', 'FSC · food-safe · EU', 'compliance', 'edit')}
              {erow('image', 'Reference', 'skincare-moodboard.jpg', 'reference', 'edit')}
              {erow('workspaces', 'Brand kit', 'Sweet Karma · active', 'brand', 'edit')}
            </React.Fragment>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', borderTop: '1px solid #F0EFEA', backgroundColor: '#FBFAF7' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ color: '#1A1108', fontFamily: mono, fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>1 concept · 1 credit</span>
            <span style={{ color: '#A39A8B', fontFamily: mono, fontSize: '9px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Folded in 38s</span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div className="hov-chip" role="button" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid #ECEAE3', borderRadius: '10px', padding: '9px 14px', backgroundColor: '#fff' }}><span style={{ fontFamily: ms, fontSize: '15px', color: '#C76B5A' }}>sentiment_dissatisfied</span><span style={{ color: '#1A1108', fontFamily: sans, fontSize: '13px', fontWeight: 500 }}>Not it</span></div>
            <div className="hov-btn" role="button" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '7px', borderRadius: '10px', padding: '9px 16px', backgroundImage: 'linear-gradient(135deg, #2FC9A8, #0E8A72)' }}><span className="genie-logo" aria-hidden="true" style={{ width: '14px', height: '14px', color: '#fff' }} /><span style={{ color: '#fff', fontFamily: sans, fontSize: '13px', fontWeight: 600 }}>Re-fold</span></div>
          </div>
        </div>
      </div>

      {/* RIGHT — render */}
      <div style={{ ...panel, flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', borderBottom: '1px solid #F0EFEA' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '999px', backgroundColor: '#1CD1AD', boxShadow: '#1CD1AD 0 0 8px' }} />
            <span style={{ color: '#1A1108', fontFamily: mono, fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Concept · Sweet Karma</span>
            <span style={{ color: '#A39A8B', fontFamily: mono, fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Navy · gold foil · 2 finishes</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ width: '30px', height: '30px', borderRadius: '8px', backgroundColor: '#043B30', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span className="genie-logo" aria-hidden="true" style={{ width: '15px', height: '15px', color: '#3FE0BE' }} /></span>
            {icoBtn('grid_view', 17)}{icoBtn('open_in_full', 17)}
            <div style={{ display: 'flex', backgroundColor: '#F4F2EC', borderRadius: '8px', padding: '3px' }}>
              <span style={{ padding: '4px 10px', borderRadius: '6px', backgroundColor: '#fff', boxShadow: '#1A11080F 0 1px 2px', color: '#1A1108', fontFamily: mono, fontSize: '11px', fontWeight: 600 }}>HD</span>
              <span style={{ padding: '4px 10px', color: '#A39A8B', fontFamily: mono, fontSize: '11px', fontWeight: 600 }}>4K</span>
            </div>
          </div>
        </div>
        {/* render stage */}
        <div style={{ position: 'relative', flex: 1, minHeight: 0, display: 'flex', backgroundColor: view === 'full' ? '#ECEAE1' : '#FFFFFF', backgroundImage: view === 'full' ? 'radial-gradient(120% 90% at 50% 30%, #F3F1EA 0%, #E6E3D9 100%)' : 'none', overflow: 'clip' }}>
          {/* canvas nav toolbar (anchored left rail) */}
          <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, zIndex: 4, display: 'flex', flexDirection: 'column', gap: '4px', padding: '9px 6px', backgroundColor: '#FFFFFF', borderRight: '1px solid #ECEBE7' }}>
            {[['arrow_selector_tool', true], ['pan_tool', false], ['zoom_in', false]].map(([ic, on], i) => (
              <span key={i} style={{ width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: on ? '#E0F8F2' : 'transparent', fontFamily: ms, fontSize: '18px', color: on ? '#0E8A72' : '#7C7464' }}>{ic}</span>
            ))}
          </div>
          {/* tab row + gizmo */}
          <div style={{ position: 'absolute', top: '16px', left: '64px', right: '18px', zIndex: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {tabBtn('deployed_code', 'Full Design', 'full')}{tabBtn('grid_view', 'Design Elements', 'design')}{tabBtn('sell', 'Product Elements', 'product')}{tabBtn('title', 'Texts', 'texts')}
            </div>
            {view === 'full' && <div style={{ display: 'flex', alignItems: 'center', gap: '7px', border: '1px solid #ECEAE3', borderRadius: '999px', padding: '7px 12px', backgroundColor: '#FFFFFFEB', flexShrink: 0 }}><span style={{ fontFamily: ms, fontSize: '14px', color: '#7C7464' }}>cached</span><span style={{ color: '#5C5650', fontFamily: mono, fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em' }}>FRONT · -12°</span></div>}
          </div>
          {/* canvas content per tab */}
          {view === 'full' && (
            <div style={{ position: 'absolute', left: '50%', top: '58%', width: '320px', height: '288px', transform: 'translate(-54%, -50%) rotate(-7deg)', borderRadius: '12px', padding: '24px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '#FFFFFF1A 0 0 0 1px inset, #0A152699 0px 46px 70px -26px', backgroundImage: 'linear-gradient(in oklab 150deg, oklab(37.4% -0.012 -0.077) 0%, oklab(29.1% -0.009 -0.059) 52%, oklab(21.8% -0.007 -0.042) 100%)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ color: '#D9B25E', fontFamily: sans, fontSize: '26px', fontWeight: 700, letterSpacing: '0.02em' }}>SWEET KARMA</span>
                <span style={{ color: '#9FB3C9', fontFamily: mono, fontSize: '9px', fontWeight: 500, letterSpacing: '0.16em' }}>PURE RITUAL SKINCARE</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ width: '40px', height: '2px', backgroundColor: '#C6A152' }} />
                <span style={{ color: '#DDE6EF', fontFamily: sans, fontSize: '14px', fontWeight: 500, lineHeight: '140%' }}>Restorative night serum with cold-pressed botanicals.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <span style={{ color: '#7E8CA0', fontFamily: mono, fontSize: '8px', fontWeight: 500, letterSpacing: '0.12em' }}>SOFT-TOUCH MATTE · GOLD FOIL</span>
                <span style={{ color: '#D9B25E', fontFamily: mono, fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em' }}>NET 50ML</span>
              </div>
            </div>
          )}
          {view === 'design' && gridWrap('Design elements · 3 applied', designCells)}
          {view === 'product' && gridWrap('Product elements · 6 on pack', productCells)}
          {view === 'texts' && gridWrap('Text components · 3 on pack', textCells)}
        </div>
        {/* render slider + Render (Full Design only) */}
        {view === 'full' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 18px', borderTop: '1px solid #F0EFEA' }}>
            <div style={{ flex: 1, height: '8px', borderRadius: '999px', backgroundColor: '#E4E1DA', position: 'relative' }}><span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '64%', borderRadius: '999px', backgroundColor: '#1CD1AD' }} /><span style={{ position: 'absolute', left: '64%', top: '50%', width: '20px', height: '20px', borderRadius: '6px', backgroundColor: '#fff', border: '1px solid #E4E1DA', boxShadow: '#0417131A 0 1px 3px', transform: 'translate(-50%,-50%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C2BAAB', fontFamily: ms, fontSize: '13px' }}>drag_indicator</span></div>
            <div className="hov-btn" role="button" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '7px', borderRadius: '10px', padding: '9px 16px', backgroundColor: '#0E8A72', flexShrink: 0 }}><span style={{ fontFamily: ms, fontSize: '16px', color: '#fff' }}>photo_camera</span><span style={{ color: '#fff', fontFamily: sans, fontSize: '13px', fontWeight: 600 }}>Render</span></div>
          </div>
        )}
        {/* docked prompt bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 18px', borderTop: '1px solid #F0EFEA' }}>
          <span className="genie-logo" aria-hidden="true" style={{ width: '18px', height: '18px', color: '#0E8A72', flexShrink: 0 }} />
          {chip(promptChip)}
          <span style={{ flex: 1, minWidth: 0, color: '#9A9384', fontFamily: sans, fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{promptText}</span>
          {view !== 'full' && (
            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
              <div className="hov-chip" role="button" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', borderRadius: '10px', padding: '9px 14px', border: '1px solid #ECEAE3', backgroundColor: '#fff', color: '#1A1108', fontFamily: sans, fontSize: '13px', fontWeight: 500 }}>Add to cart</div>
              <div className="hov-btn" role="button" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '7px', borderRadius: '10px', padding: '9px 16px', backgroundImage: 'linear-gradient(135deg, #2FC9A8, #0E8A72)' }}><span style={{ fontFamily: ms, fontSize: '15px', color: '#fff' }}>bolt</span><span style={{ color: '#fff', fontFamily: sans, fontSize: '13px', fontWeight: 600 }}>Regenerate</span></div>
            </div>
          )}
        </div>
        {/* footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px', padding: '13px 18px', borderTop: '1px solid #F0EFEA', backgroundColor: '#FBFAF7' }}>
          <div className="hov-chip" role="button" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid #ECEAE3', borderRadius: '10px', padding: '9px 14px', backgroundColor: '#fff' }}><span style={{ fontFamily: ms, fontSize: '15px', color: '#5C5650' }}>package_2</span><span style={{ color: '#1A1108', fontFamily: sans, fontSize: '13px', fontWeight: 500 }}>Get samples</span></div>
          <div className="hov-chip" role="button" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid #ECEAE3', borderRadius: '10px', padding: '9px 14px', backgroundColor: '#fff' }}><span style={{ fontFamily: ms, fontSize: '15px', color: '#5C5650' }}>download</span><span style={{ color: '#1A1108', fontFamily: sans, fontSize: '13px', fontWeight: 500 }}>Export dieline</span></div>
          <div className="hov-btn" role="button" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '7px', borderRadius: '10px', padding: '9px 16px', backgroundColor: '#0A0A0A' }}><span className="genie-logo" aria-hidden="true" style={{ width: '14px', height: '14px', color: '#3FE0BE' }} /><span style={{ color: '#fff', fontFamily: sans, fontSize: '13px', fontWeight: 600 }}>Open in Editor</span><span style={{ fontFamily: ms, fontSize: '14px', color: '#fff' }}>arrow_forward</span></div>
        </div>
      </div>

      {/* edit popover overlay */}
      {pop && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: '300px', boxSizing: 'border-box', backgroundColor: '#0417130D' }}>
          {editPop()}
        </div>
      )}
    </div>
  );
}

window.__S.push(['hero', () => {
  const [folding, setFolding] = React.useState(false);
  const [extras, setExtras] = React.useState(false);
  const [pop, setPop] = React.useState(null); // 'category' | 'manufacturing' | 'compliance' | 'brand' | null
  const extrasRef = React.useRef(null);
  React.useEffect(() => {
    if (!pop) return;
    const onDoc = (e) => { if (extrasRef.current && !extrasRef.current.contains(e.target)) setPop(null); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [pop]);
  const startFold = () => {
    const v = document.getElementById('hero-bg-video');
    if (!v) { setFolding(true); return; }
    v.currentTime = 0;
    const p = v.play(); if (p && p.catch) p.catch(() => {});
    // let the fold video play through, THEN animate into the design screen
    let done = false;
    const reveal = () => { if (done) return; done = true; setFolding(true); };
    v.addEventListener('ended', reveal, { once: true });
    setTimeout(reveal, 5600); // fallback in case 'ended' never fires
  };
  const endFold = () => {
    const v = document.getElementById('hero-bg-video');
    if (v) { try { v.pause(); v.currentTime = 0; } catch (e) {} }
    setFolding(false);
  };
  // scale the studio down so the full split always fits the viewport (no clipping)
  const studioRef = React.useRef(null);
  const [sScale, setSScale] = React.useState(1);
  React.useEffect(() => {
    if (!folding) return;
    const fit = () => { const el = studioRef.current; if (!el) return; const h = el.scrollHeight || 1; const avail = (window.innerHeight || 900) - 116; setSScale(Math.min(1, avail / h)); };
    fit(); const t = setTimeout(fit, 60); window.addEventListener('resize', fit);
    // refit when the studio content changes height (e.g. expanding "Extra details" or switching tabs)
    let ro; if (window.ResizeObserver && studioRef.current) { ro = new ResizeObserver(fit); ro.observe(studioRef.current); }
    return () => { clearTimeout(t); window.removeEventListener('resize', fit); if (ro) ro.disconnect(); };
  }, [folding]);
  // ── Extras pop-overs (designed after Paper edit states 4S5/58N/5P4) ──
  const popShell = { position: 'absolute', bottom: 'calc(100% + 14px)', right: 0, zIndex: 60, backgroundColor: '#FFFFFF', borderColor: '#ECEAE3', borderRadius: '18px', borderStyle: 'solid', borderWidth: '1px', boxShadow: '#04171352 0px 26px 60px -20px, #04171314 0px 2px 8px', boxSizing: 'border-box', textAlign: 'left' };
  const popHead = (t, s) => (
    <div style={{ alignItems: 'flex-start', display: 'flex', justifyContent: 'space-between', padding: '16px 18px 12px' }}>
      <div>
        <div style={{ color: '#041713', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '16px', fontWeight: 600, lineHeight: '20px' }}>{t}</div>
        <div style={{ color: '#A39A8B', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', lineHeight: '13px', marginTop: '5px', textTransform: 'uppercase' }}>{s}</div>
      </div>
      <span role="button" onClick={() => setPop(null)} style={{ color: '#9A9488', cursor: 'pointer', fontFamily: '"Material Symbols Rounded", system-ui, sans-serif', fontSize: '18px', lineHeight: '100%' }}>close</span>
    </div>
  );
  const popSwitch = (on) => (
    <div style={{ alignItems: 'center', backgroundColor: on ? '#1CD1AD' : '#E2E7EE', borderRadius: '999px', display: 'flex', flexShrink: 0, height: '20px', justifyContent: on ? 'flex-end' : 'flex-start', padding: '2px', width: '36px' }}>
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '999px', boxShadow: '#04171338 0px 1px 2px', height: '16px', width: '16px' }} />
    </div>
  );
  const popPrimary = (label) => (
    <div className="hov-btn" role="button" onClick={() => setPop(null)} style={{ backgroundImage: 'linear-gradient(in oklab 105deg, oklab(60.2% -0.089 0.003) 0%, oklab(78.4% -0.144 0.004) 60%, oklab(60.2% -0.089 0.003) 120%)', borderRadius: '10px', color: '#FFFFFF', cursor: 'pointer', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '13px', fontWeight: 600, lineHeight: '16px', padding: '9px 18px' }}>{label}</div>
  );
  const popGhost = (label) => (
    <div role="button" onClick={() => setPop(null)} style={{ color: '#5C5650', cursor: 'pointer', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '13px', fontWeight: 500, padding: '9px 6px' }}>{label}</div>
  );
  const renderPop = () => {
    if (pop === 'category') {
      const CATS = [['spa', 'Beauty', 'skincare', true], ['restaurant', 'Food & bev', 'carton', false], ['wine_bar', 'Spirits', 'rigid', false], ['memory', 'Electronics', 'box', false], ['air', 'Fragrance', 'folding', false], ['self_improvement', 'Wellness', 'mailer', false]];
      return (
        <div style={{ ...popShell, width: '372px' }}>
          {popHead('Category', 'Industry · 6 options')}
          <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: 'repeat(3, 1fr)', padding: '0 18px 18px' }}>
            {CATS.map(([ic, name, cap, sel]) => (
              <div key={name} className="hov-raise" role="button" style={{ alignItems: 'center', backgroundColor: sel ? '#F2FCFA' : '#FFFFFF', borderColor: sel ? '#1CD1AD' : '#ECEAE3', borderRadius: '14px', borderStyle: 'solid', borderWidth: '1px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px 10px', position: 'relative', textAlign: 'center' }}>
                {sel && <span style={{ color: '#1CD1AD', fontFamily: '"Material Symbols Rounded", system-ui, sans-serif', fontSize: '16px', fontVariationSettings: '"FILL" 1', position: 'absolute', right: '8px', top: '8px' }}>check_circle</span>}
                <span style={{ color: '#0B7460', fontFamily: '"Material Symbols Rounded", system-ui, sans-serif', fontSize: '24px' }}>{ic}</span>
                <span style={{ color: '#041713', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '14px', fontWeight: 600, lineHeight: '17px' }}>{name}</span>
                <span style={{ color: '#A39A8B', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '10px', letterSpacing: '0.04em', lineHeight: '12px' }}>{cap}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (pop === 'manufacturing') {
      const MFG = [['inventory_2', 'Folding carton', '320gsm · soft-touch', true], ['deployed_code', 'Rigid box', '1200gsm · wrapped', false], ['package_2', 'Corrugated mailer', 'E-flute · kraft', false], ['width_wide', 'Printed sleeve', '250gsm · uncoated', false]];
      return (
        <div style={{ ...popShell, width: '320px' }}>
          {popHead('Manufacturing', 'Structure · 4 options')}
          <div style={{ display: 'flex', flexDirection: 'column', padding: '0 10px 6px' }}>
            {MFG.map(([ic, name, sub, sel]) => (
              <div key={name} className="hov-chip" role="button" style={{ alignItems: 'center', backgroundColor: sel ? '#F2FCFA' : 'transparent', borderRadius: '12px', cursor: 'pointer', display: 'flex', gap: '12px', padding: '10px 10px' }}>
                <span style={{ alignItems: 'center', backgroundColor: '#F4F2EC', borderRadius: '9px', color: '#6B6456', display: 'flex', flexShrink: 0, fontFamily: '"Material Symbols Rounded", system-ui, sans-serif', fontSize: '18px', height: '34px', justifyContent: 'center', width: '34px' }}>{ic}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#041713', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '14px', fontWeight: 600, lineHeight: '17px' }}>{name}</div>
                  <div style={{ color: '#A39A8B', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '10px', letterSpacing: '0.04em', lineHeight: '13px', marginTop: '2px' }}>{sub}</div>
                </div>
                <span style={{ alignItems: 'center', borderColor: sel ? '#1CD1AD' : '#CFC9BC', borderRadius: '999px', borderStyle: 'solid', borderWidth: '1.5px', display: 'flex', flexShrink: 0, height: '18px', justifyContent: 'center', width: '18px' }}>{sel && <span style={{ backgroundColor: '#1CD1AD', borderRadius: '999px', height: '8px', width: '8px' }} />}</span>
              </div>
            ))}
          </div>
          <div style={{ alignItems: 'center', borderTopColor: '#F0EFEA', borderTopStyle: 'solid', borderTopWidth: '1px', display: 'flex', justifyContent: 'space-between', padding: '12px 14px' }}>{popGhost('Cancel')}{popPrimary('Apply')}</div>
        </div>
      );
    }
    if (pop === 'compliance') {
      const COMPS = [['forest', 'FSC certified', 'Responsibly sourced board', true], ['water_drop', 'Food-safe inks', 'Low-migration, direct contact', true], ['public', 'EU REACH', 'Sold into the EU', true], ['recycling', 'Curbside recyclable', 'Mono-material only', false], ['eco', 'Carbon-neutral print', 'Offset via partner mill', false]];
      return (
        <div style={{ ...popShell, width: '340px' }}>
          {popHead('Compliance', '3 of 6 applied')}
          <div style={{ display: 'flex', flexDirection: 'column', padding: '0 18px 4px' }}>
            {COMPS.map(([ic, name, desc, on]) => (
              <div key={name} style={{ alignItems: 'center', display: 'flex', gap: '12px', paddingBlock: '11px' }}>
                <span style={{ color: '#0B7460', flexShrink: 0, fontFamily: '"Material Symbols Rounded", system-ui, sans-serif', fontSize: '20px' }}>{ic}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#041713', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '14px', fontWeight: 600, lineHeight: '17px' }}>{name}</div>
                  <div style={{ color: '#A39A8B', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '12px', lineHeight: '15px', marginTop: '1px' }}>{desc}</div>
                </div>
                {popSwitch(on)}
              </div>
            ))}
          </div>
          <div style={{ alignItems: 'center', borderTopColor: '#F0EFEA', borderTopStyle: 'solid', borderTopWidth: '1px', display: 'flex', justifyContent: 'space-between', padding: '12px 14px' }}>{popGhost('Cancel')}{popPrimary('Apply')}</div>
        </div>
      );
    }
    if (pop === 'brand') {
      const KITS = [['SK', 'Sweet Karma', 'Playfair · Geist', ['#22304A', '#C6A165', '#EDE6D6', '#9AA6C4'], '#22304A', true], ['AH', 'Aakar House', 'Geist · Geist Mono', ['#1C5A3C', '#C6A165', '#EDE6D6', '#1A1A1A'], '#163E2B', false]];
      return (
        <div style={{ ...popShell, width: '340px' }}>
          {popHead('Brand kit', '2 kits · 1 active')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '0 18px 4px' }}>
            {KITS.map(([av, name, font, sw, avBg, active]) => (
              <div key={name} className="hov-raise" role="button" style={{ alignItems: 'center', backgroundColor: active ? '#F2FCFA' : '#FFFFFF', borderColor: active ? '#1CD1AD' : '#ECEAE3', borderRadius: '14px', borderStyle: 'solid', borderWidth: '1px', cursor: 'pointer', display: 'flex', gap: '12px', padding: '12px' }}>
                <span style={{ alignItems: 'center', backgroundColor: avBg, borderRadius: '10px', color: '#FFFFFF', display: 'flex', flexShrink: 0, fontFamily: '"Geist", system-ui, sans-serif', fontSize: '13px', fontWeight: 600, height: '40px', justifyContent: 'center', width: '40px' }}>{av}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#041713', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '14px', fontWeight: 600, lineHeight: '17px' }}>{name}</div>
                  <div style={{ alignItems: 'center', display: 'flex', gap: '8px', marginTop: '6px' }}>
                    <div style={{ display: 'flex', gap: '3px' }}>{sw.map((c, i) => <span key={i} style={{ backgroundColor: c, borderRadius: '999px', height: '12px', width: '12px' }} />)}</div>
                    <span style={{ color: '#A39A8B', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '10px', lineHeight: '12px' }}>{font}</span>
                  </div>
                </div>
                <span style={{ alignItems: 'center', borderColor: active ? '#1CD1AD' : '#CFC9BC', borderRadius: '999px', borderStyle: 'solid', borderWidth: '1.5px', display: 'flex', flexShrink: 0, height: '18px', justifyContent: 'center', width: '18px' }}>{active && <span style={{ backgroundColor: '#1CD1AD', borderRadius: '999px', height: '8px', width: '8px' }} />}</span>
              </div>
            ))}
          </div>
          <div style={{ alignItems: 'center', borderTopColor: '#F0EFEA', borderTopStyle: 'solid', borderTopWidth: '1px', display: 'flex', justifyContent: 'space-between', marginTop: '8px', padding: '12px 14px' }}>
            <div role="button" style={{ alignItems: 'center', color: '#0B7460', cursor: 'pointer', display: 'flex', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '13px', fontWeight: 500, gap: '6px', padding: '9px 6px' }}><span style={{ fontFamily: '"Material Symbols Rounded", system-ui, sans-serif', fontSize: '16px' }}>add</span>New brand kit</div>
            {popPrimary('Done')}
          </div>
        </div>
      );
    }
    return null;
  };
  return (
    <section id="top" style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', minHeight: '100svh', position: 'relative', overflow: 'hidden', paddingBottom: '40px', fontSynthesis: 'none', MozOsxFontSmoothing: 'grayscale', WebkitFontSmoothing: 'antialiased' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundColor: '#A8BBC9', boxSizing: 'border-box', overflow: 'clip' }}>
        {/* background video — paused on the first frame until "Fold it" is clicked */}
        <video id="hero-bg-video" poster="assets/hero-poster.jpg" muted playsInline preload="auto" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 22%' }}>
          <source src="assets/hero-video.mp4" type="video/mp4" />
        </video>
        {/* gradient overlays sit on top of the video for depth + text legibility */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'radial-gradient(ellipse 55% 38% at 50% 42% in oklab, oklab(18.7% -0.028 .0009 / 13%) 50%, oklab(18.7% -0.028 .0009 / 0%) 78%), radial-gradient(circle farthest-corner at 50% 50% in oklab, oklab(18.7% -0.028 .0009 / 0%) 48%, oklab(100% 0 0 / 22%) 100%), linear-gradient(#0417131A)', backgroundPosition: '50%', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'radial-gradient(circle farthest-corner at 50% 50% in oklab, oklab(18.7% 0.009 0.021 / 8%) 0%, oklab(0% 0 0 / 0%) 100%)', maskImage: 'radial-gradient(80% 80% at 50% 40%, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0) 70%)', opacity: '0.15', boxSizing: 'border-box' }} />
      </div>
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1280px', width: '100%', paddingInline: '32px', paddingTop: '26px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', boxSizing: 'border-box' }}>
        <div style={{ flex: '1 1 0', display: 'flex', justifyContent: 'flex-start', minWidth: 0 }}>
          <div style={{ backgroundImage: 'url(https://app.paper.design/file-assets/01KTNNTSJJ3G5MHVGA4S55GZJX/3DP33PM6ACEEK3BY0FE80V9ESE.png)', backgroundPosition: '50%', backgroundRepeat: 'no-repeat', backgroundSize: 'contain', filter: 'drop-shadow(#04171359 0px 1px 4px)', flexShrink: '0', height: '49px', width: '120px', boxSizing: 'border-box' }} />
        </div>
        <div style={{ alignItems: 'center', backgroundImage: 'linear-gradient(in oklab 180deg, oklab(100% 0 0 / 85%) 0%, oklab(100% 0 0 / 85%) 100%)', backgroundOrigin: 'border-box', borderColor: '#E4E1DAAB', borderRadius: '999px', borderStyle: 'solid', borderWidth: '1px', boxShadow: '#0417131A 0px 2px 8px -4px', boxSizing: 'border-box', display: 'flex', gap: '4px', padding: '5px', width: 'fit-content' }}>
          <a href="#pricing" className="hov-chip flink" style={{ textDecoration: 'none', borderRadius: '999px', boxSizing: 'border-box', display: 'flex', paddingBlock: '7px', paddingInline: '14px', color: '#20100E', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '13px', fontWeight: 500, lineHeight: '16px' }}>
            Pricing
          </a>
          <a href="#materials" className="hov-chip flink" style={{ textDecoration: 'none', borderRadius: '999px', boxSizing: 'border-box', display: 'flex', paddingBlock: '7px', paddingInline: '14px', color: '#20100E', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '13px', fontWeight: 500, lineHeight: '16px' }}>
            Materials
          </a>
          <a href="#templates" className="hov-chip flink" style={{ textDecoration: 'none', borderRadius: '999px', boxSizing: 'border-box', display: 'flex', paddingBlock: '7px', paddingInline: '14px', color: '#20100E', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '13px', fontWeight: 500, lineHeight: '16px' }}>
            Library
          </a>
          <a href="#studio" className="hov-chip" style={{ textDecoration: 'none', backgroundColor: '#000000E6', borderRadius: '999px', boxSizing: 'border-box', display: 'flex', paddingBlock: '7px', paddingInline: '14px', color: '#FFFFFF', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '13px', fontWeight: 500, lineHeight: '16px' }}>
            Studio
          </a>
        </div>
        <div style={{ flex: '1 1 0', minWidth: 0, alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
          <a href="#" className="flink" style={{ textDecoration: 'none', boxSizing: 'border-box', color: '#FFFFFF', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '14px', fontWeight: 500, lineHeight: '18px', textShadow: '#0417138C 0px 1px 2px', whiteSpace: 'nowrap' }}>
            Log in
          </a>
          <a href="#studio" className="hov-btn" role="button" style={{ textDecoration: 'none', alignItems: 'center', backgroundColor: '#0F1623', borderRadius: '8px', boxSizing: 'border-box', display: 'flex', paddingBlock: '9px', paddingInline: '16px', color: '#FFFFFF', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '13px', fontWeight: 500, lineHeight: '16px', whiteSpace: 'nowrap' }}>
            Open Studio
          </a>
        </div>
      </div>
      <div className="lumio-hero" data-folded={folding ? '1' : undefined} style={{ position: 'relative', zIndex: 1, alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center', flexGrow: 1, gap: '36px', maxWidth: '1280px', width: '100%', paddingInline: '32px', paddingBlock: '24px', transition: 'opacity .4s ease, transform .55s cubic-bezier(.16,1,.3,1), visibility 0s linear .45s', opacity: folding ? 0 : 1, transform: folding ? 'translateY(-52px) scale(.97)' : 'none', visibility: folding ? 'hidden' : 'visible', pointerEvents: folding ? 'none' : 'auto' }}>
        <div className="reveal" style={{ '--d': '0ms', alignItems: 'center', backgroundColor: '#FFFFFFD9', borderColor: '#E4E1DA', borderRadius: '999px', borderStyle: 'solid', borderWidth: '1px', boxShadow: '#0417131A 0px 2px 8px -4px', boxSizing: 'border-box', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', paddingBlock: '6px', paddingLeft: '16px', paddingRight: '6px' }}>
          <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexWrap: 'wrap', gap: '8px', paddingRight: '14px' }}>
            <div style={{ alignItems: 'center', backgroundImage: 'linear-gradient(in oklab 135deg, oklab(77% -0.142 0.015 / 18%) 0%, oklab(77% -0.142 0.015 / 6%) 100%)', borderRadius: '999px', boxSizing: 'border-box', display: 'flex', gap: '6px', paddingBlock: '4px', paddingInline: '10px' }}>
              <span className="genie-logo" aria-hidden="true" style={{ width: '13px', height: '13px', color: '#0E8A72' }} />
              <div style={{ boxSizing: 'border-box', color: '#0E8A72', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', lineHeight: '14px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                New · Genie 2
              </div>
            </div>
            <div style={{ boxSizing: 'border-box', color: '#041713', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '13px', lineHeight: '17px' }}>
              Text-to-packaging is here. See what it ships in 90 seconds.
            </div>
          </div>
          <div className="hov-btn" role="button" style={{ alignItems: 'center', backgroundColor: '#041713', borderRadius: '999px', boxSizing: 'border-box', display: 'flex', gap: '6px', paddingBlock: '8px', paddingInline: '16px', cursor: 'pointer' }}>
            <div style={{ boxSizing: 'border-box', color: '#FFFFFF', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '13px', fontWeight: 500, lineHeight: '16px', whiteSpace: 'nowrap' }}>
              Watch demo
            </div>
            <div style={{ boxSizing: 'border-box', color: '#FFFFFF', fontFamily: '"Material Symbols Rounded", system-ui, sans-serif', fontSize: '14px', lineHeight: '18px' }}>
              arrow_forward
            </div>
          </div>
        </div>
        <div className="reveal" style={{ '--d': '90ms', boxSizing: 'border-box', color: '#FFFFFF', display: 'flex', flexWrap: 'wrap', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '72px', fontWeight: 500, justifyContent: 'center', letterSpacing: '-0.045em', lineHeight: '92%', maxWidth: '960px', textAlign: 'center', whiteSpace: 'pre-wrap' }}>
          Packaging that folds<br />at the speed of a sentence.
        </div>
        <div className="reveal" style={{ '--d': '180ms', alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '16px', width: '680px', maxWidth: '100%' }}>
          <div style={{ alignItems: 'center', backgroundColor: '#FFFFFFF2', borderColor: '#E4E1DA', borderRadius: '999px', borderStyle: 'solid', borderWidth: '1px', boxShadow: '#04171329 0px 3px 9px -5px', boxSizing: 'border-box', display: 'flex', gap: '8px', paddingBlock: '6px', paddingInline: '14px' }}>
            <div style={{ backgroundColor: '#1CD1AD', borderRadius: '50%', boxShadow: '#1CD1AD2E 0px 0px 0px 3px', boxSizing: 'border-box', flexShrink: '0', height: '8px', width: '8px' }} />
            <div style={{ boxSizing: 'border-box', color: '#5A5448', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '0.13em', lineHeight: '14px', textTransform: 'uppercase' }}>
              Live · Genie is folding
            </div>
          </div>
          <div style={{ backdropFilter: 'blur(26px)', backgroundColor: '#FFFFFFDB', borderColor: '#FFFFFF4D', borderRadius: '18px', borderStyle: 'solid', borderWidth: '1px', boxShadow: '#04171352 0px 15px 40px -11px, #04171314 0px 1px 4px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '14px', paddingBottom: '14px', paddingLeft: '20px', paddingRight: '16px', paddingTop: '16px', width: '100%' }}>
            <div style={{ alignItems: 'flex-start', boxSizing: 'border-box', display: 'flex', gap: '14px' }}>
              <div style={{ alignItems: 'center', backgroundImage: 'linear-gradient(in oklab 133.01999999999998deg, oklab(77% -0.142 0.015) 0%, oklab(86.2% -0.119 0.012) 72.4%, oklab(56.7% -0.104 0.010) 144.8%)', borderRadius: '11px', boxShadow: '#1CD1AD80 0px 3px 8px -3px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '38px', justifyContent: 'center', width: '38px' }}>
                <span className="genie-logo" aria-hidden="true" style={{ width: '21px', height: '21px', color: '#FFFFFF', alignSelf: 'center' }} />
              </div>
              <div style={{ boxSizing: 'border-box', display: 'flex', flexBasis: '0%', flexDirection: 'column', flexGrow: '1', gap: '6px', paddingTop: '6px' }}>
                <div style={{ boxSizing: 'border-box', color: '#041713', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '14px', lineHeight: '140%' }}>
                  A 240gsm rigid mailer for premium skincare, soft matte, navy &amp; gold foil
                </div>
              </div>
              <div className="hov-btn" role="button" onClick={startFold} style={{ alignItems: 'center', alignSelf: 'flex-start', backgroundImage: 'linear-gradient(in oklab 115.31deg, oklab(60.2% -0.089 0.003) -50.87%, oklab(78.4% -0.144 0.004) 60.7%, oklab(60.2% -0.089 0.003) 185.15%)', borderRadius: '10px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: '8px', marginTop: '2px', paddingBlock: '10px', paddingInline: '16px', cursor: 'pointer' }}>
                <span className="genie-logo" aria-hidden="true" style={{ width: '15px', height: '15px', color: '#FFFFFF', alignSelf: 'center' }} />
                <div style={{ boxSizing: 'border-box', color: '#FFFFFF', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '14px', fontWeight: 600, lineHeight: '17px', whiteSpace: 'nowrap' }}>
                  Fold it
                </div>
                <div style={{ boxSizing: 'border-box', color: '#FFFFFF', fontFamily: '"Material Symbols Rounded", system-ui, sans-serif', fontSize: '15px', fontWeight: 600, lineHeight: '100%' }}>
                  arrow_forward
                </div>
              </div>
            </div>
            <div style={{ alignItems: 'center', borderTopColor: '#F2F1ED', borderTopStyle: 'solid', borderTopWidth: '1px', boxSizing: 'border-box', display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'flex-end', paddingTop: '12px' }}>
              <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'flex-end' }}>
                <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: '6px' }}>
                  <div style={{ boxSizing: 'border-box', color: '#5A5448', fontFamily: '"Material Symbols Rounded", system-ui, sans-serif', fontSize: '14px', lineHeight: '18px' }}>
                    palette
                  </div>
                  <div style={{ boxSizing: 'border-box', color: '#5A5448', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '11px', letterSpacing: '0.06em', lineHeight: '14px', textTransform: 'uppercase' }}>
                    Material
                  </div>
                </div>
                <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: '6px' }}>
                  <div style={{ boxSizing: 'border-box', color: '#5A5448', fontFamily: '"Material Symbols Rounded", system-ui, sans-serif', fontSize: '14px', lineHeight: '18px' }}>
                    image
                  </div>
                  <div style={{ boxSizing: 'border-box', color: '#5A5448', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '11px', letterSpacing: '0.06em', lineHeight: '14px', textTransform: 'uppercase' }}>
                    Reference
                  </div>
                </div>
                <div className="hov-chip" role="button" onClick={() => setExtras(v => !v)} style={{ alignItems: 'center', backgroundColor: extras ? '#E0F8F2' : '#FFFFFFEB', borderColor: extras ? '#1CD1AD' : '#E4DCC4', borderRadius: '999px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', gap: '8px', paddingBlock: '6px', paddingInline: '14px', cursor: 'pointer' }}>
                  <div style={{ boxSizing: 'border-box', color: extras ? '#0B7460' : '#5C5650', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.16em', lineHeight: '14px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                    Extra options
                  </div>
                  <div style={{ alignItems: 'center', backgroundColor: extras ? '#1CD1AD' : '#E2E7EE', borderRadius: '999px', boxShadow: (extras ? '#0B74602E' : '#0417131A') + ' 0px 0px 0px 1px inset', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '18px', justifyContent: extras ? 'flex-end' : 'flex-start', padding: '2px', width: '32px', transition: 'background-color .2s ease' }}>
                    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '999px', boxShadow: '#04171338 0px 1px 2px', boxSizing: 'border-box', flexShrink: '0', height: '14px', width: '14px' }} />
                  </div>
                </div>
              </div>
            </div>
            {extras && (
            <div ref={extrasRef} style={{ alignItems: 'center', borderTopColor: '#F2F1ED', borderTopStyle: 'solid', borderTopWidth: '1px', boxSizing: 'border-box', display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'flex-end', paddingTop: '12px', position: 'relative' }}>
              <div style={{ boxSizing: 'border-box', color: '#0B7460', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em', lineHeight: '14px', textTransform: 'uppercase', marginRight: 'auto', paddingRight: '4px' }}>
                4 Extras
              </div>
              {[['restaurant', '+ Category', 'category'], ['package_2', '+ Manufacturing', 'manufacturing'], ['verified_user', '+ Compliance', 'compliance']].map(([ic, label, key]) => (
                <div key={label} className="hov-chip" role="button" onClick={() => setPop(p => p === key ? null : key)} style={{ alignItems: 'center', backgroundColor: pop === key ? '#FBF3E6' : '#FFFFFFEB', borderColor: pop === key ? '#8E5C2E' : '#C6A87AC7', borderRadius: '999px', borderStyle: 'dashed', borderWidth: '1px', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', gap: '8px', paddingBlock: '6px', paddingInline: '14px' }}>
                  <span style={{ boxSizing: 'border-box', color: '#8E5C2E', fontFamily: '"Material Symbols Rounded", system-ui, sans-serif', fontSize: '14px', lineHeight: '100%' }}>{ic}</span>
                  <span style={{ boxSizing: 'border-box', color: '#8E5C2E', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '13px', fontWeight: 500, lineHeight: '16px', whiteSpace: 'nowrap' }}>{label}</span>
                </div>
              ))}
              <div className="hov-chip" role="button" onClick={() => setPop(p => p === 'brand' ? null : 'brand')} style={{ alignItems: 'center', backgroundColor: '#E0F8F2', borderColor: '#1CD1AD', borderRadius: '999px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', gap: '8px', paddingBlock: '6px', paddingInline: '14px' }}>
                <span style={{ boxSizing: 'border-box', color: '#0B7460', fontFamily: '"Material Symbols Rounded", system-ui, sans-serif', fontSize: '14px', fontVariationSettings: '"FILL" 1', fontWeight: 500, lineHeight: '100%' }}>workspaces</span>
                <span style={{ boxSizing: 'border-box', color: '#0B7460', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '13px', fontWeight: 600, lineHeight: '16px', whiteSpace: 'nowrap' }}>Brand kit · Sweet Karma</span>
                <span style={{ boxSizing: 'border-box', color: '#0B7460', fontFamily: '"Material Symbols Rounded", system-ui, sans-serif', fontSize: '14px', lineHeight: '100%' }}>check</span>
              </div>
              {renderPop()}
            </div>
            )}
          </div>
        </div>
        <div className="reveal" style={{ '--d': '270ms', alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
          <div style={{ boxSizing: 'border-box', color: '#8A8378', fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '11px', letterSpacing: '0.13em', lineHeight: '14px', marginRight: '4px', textTransform: 'uppercase' }}>
            Try
          </div>
          <div className="hov-chip" role="button" style={{ backgroundColor: '#FFFFFFE6', borderColor: '#ECECE8', borderRadius: '999px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', paddingBlock: '7px', paddingInline: '14px', color: '#041713', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '13px', lineHeight: '16px', cursor: 'pointer' }}>
            Skincare carton
          </div>
          <div className="hov-chip" role="button" style={{ backgroundColor: '#FFFFFFE6', borderColor: '#ECECE8', borderRadius: '999px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', paddingBlock: '7px', paddingInline: '14px', color: '#041713', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '13px', lineHeight: '16px', cursor: 'pointer' }}>
            Single-origin coffee
          </div>
          <div className="hov-chip" role="button" style={{ backgroundColor: '#FFFFFFE6', borderColor: '#ECECE8', borderRadius: '999px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', paddingBlock: '7px', paddingInline: '14px', color: '#041713', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '13px', lineHeight: '16px', cursor: 'pointer' }}>
            Wine sleeve
          </div>
          <div className="hov-chip" role="button" style={{ backgroundColor: '#FFFFFFE6', borderColor: '#ECECE8', borderRadius: '999px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', paddingBlock: '7px', paddingInline: '14px', color: '#041713', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '13px', lineHeight: '16px', cursor: 'pointer' }}>
            Matcha tin
          </div>
          <div className="hov-chip" role="button" style={{ backgroundColor: '#FFFFFFE6', borderColor: '#ECECE8', borderRadius: '999px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', paddingBlock: '7px', paddingInline: '14px', color: '#041713', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '13px', lineHeight: '16px', cursor: 'pointer' }}>
            Rigid mailer
          </div>
          <div className="hov-chip" role="button" style={{ alignItems: 'center', backgroundColor: '#FFFFFFF2', borderColor: '#00BD9C4D', borderRadius: '999px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', gap: '6px', paddingBlock: '7px', paddingInline: '12px', cursor: 'pointer' }}>
            <div style={{ boxSizing: 'border-box', color: '#0E8A72', fontFamily: '"Material Symbols Rounded", system-ui, sans-serif', fontSize: '13px', fontVariationSettings: '"wght" 600', fontWeight: 600, lineHeight: '16px' }}>
              shuffle
            </div>
            <div style={{ boxSizing: 'border-box', color: '#0E8A72', fontFamily: '"Geist", system-ui, sans-serif', fontSize: '13px', fontWeight: 500, lineHeight: '16px', whiteSpace: 'nowrap' }}>
              Surprise me
            </div>
          </div>
        </div>
      </div>
      {/* ── Genie studio: the hero folds into this designed split on "Fold it" ── */}
      <div aria-hidden={!folding} style={{ position: 'absolute', inset: 0, zIndex: 2, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: '84px', paddingInline: '24px', opacity: folding ? 1 : 0, transform: folding ? 'none' : 'translateY(18px) scale(1.02)', transition: 'opacity .6s ease .15s, transform .75s cubic-bezier(.16,1,.3,1) .15s', pointerEvents: folding ? 'auto' : 'none' }}>
        <div ref={studioRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', width: '100%', transform: 'scale(' + sScale + ')', transformOrigin: 'top center', willChange: 'transform' }}>
        <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', gap: '14px', flexShrink: 0 }}>
          <div style={{ alignItems: 'center', backgroundColor: '#FFFFFFD9', borderColor: '#E4E1DA', borderRadius: '999px', borderStyle: 'solid', borderWidth: '1px', boxShadow: '#0417131A 0px 2px 8px -4px', display: 'flex', gap: '10px', marginTop: '2px', paddingBlock: '8px', paddingInline: '16px' }}>
            {[['check_circle', 'Prompt', '#3FE0BE', '#10906F', 1], ['check_circle', 'Brief', '#3FE0BE', '#10906F', 1], ['deployed_code', 'Design', '#20100E', '#20100E', 0], ['print', 'Press', '#A39A8B', '#A39A8B', 0]].map(([ic, label, icC, txC, fill], i, arr) => (
              <React.Fragment key={label}>
                <div style={{ alignItems: 'center', display: 'flex', gap: '6px' }}>
                  <span style={{ color: icC, fontFamily: '"Material Symbols Rounded", system-ui, sans-serif', fontSize: '15px', fontVariationSettings: fill ? '"FILL" 1' : '"FILL" 0' }}>{ic}</span>
                  <span style={{ color: txC, fontFamily: '"Geist Mono", system-ui, sans-serif', fontSize: '11px', fontWeight: i === 2 ? 600 : 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</span>
                </div>
                {i < arr.length - 1 && <div style={{ backgroundColor: '#D9D5CC', height: '1px', width: '22px', flexShrink: 0 }} />}
              </React.Fragment>
            ))}
          </div>
        </div>
        <GStudio onBack={endFold} />
        </div>
      </div>
    </section>
  );
}]);
