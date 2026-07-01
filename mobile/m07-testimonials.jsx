// Mobile testimonials — mirrors Paper frame 2TM-0 › Testimonials (37L-0).
window.__M = window.__M || [];
window.__M.push(['testimonials', () => {
  const sans = '"Geist", system-ui, sans-serif';
  const mono = '"Geist Mono", system-ui, sans-serif';
  const cards = [
    { g: 'radial-gradient(circle at 50% 42%, #A86552, #5E3326)', quote: 'It folds at the speed of a sentence.', name: 'Linnea Holm', handle: '@maison.kraft' },
    { g: 'radial-gradient(circle at 50% 42%, #2F8475, #0C3833)', quote: 'Felt more fully balanced than anything I tried this year.', name: 'Charlotte Reyes', handle: '@charlotte.studio' },
    { g: 'radial-gradient(circle at 50% 42%, #7B6FB8, #34295E)', quote: 'This app looks crazy — let me contribute designs back.', name: 'Tino Ricci', handle: '@studio.tino' }
  ];
  return (
    <section id="m-testimonials" style={{ width: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '24px', paddingBlock: '52px', backgroundColor: '#FFFFFF' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', paddingInline: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#E0F8F2', borderColor: '#1CD1AD80', borderStyle: 'solid', borderWidth: '1px', borderRadius: '999px', paddingBlock: '5px', paddingInline: '12px' }}>
          <span style={{ backgroundColor: '#1CD1AD', borderRadius: '50%', height: '6px', width: '6px' }} />
          <span style={{ color: '#0E8A72', fontFamily: mono, fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' }}>On the wall</span>
        </div>
        <div style={{ color: '#000000', fontFamily: sans, fontSize: '32px', fontWeight: 500, letterSpacing: '-0.04em', lineHeight: '104%', textAlign: 'center' }}>What folders say.</div>
      </div>
      <div style={{ display: 'flex', gap: '14px', overflowX: 'auto', paddingInline: '18px', paddingBottom: '6px', scrollbarWidth: 'none' }}>
        {cards.map(c => (
          <div key={c.name} className="hov-raise" style={{ flexShrink: 0, width: '270px', backgroundColor: '#FFFFFF', borderColor: '#E7E7E5', borderStyle: 'solid', borderWidth: '1px', borderRadius: '18px', overflow: 'clip', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '180px', backgroundImage: c.g, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ height: '96px', width: '96px', borderRadius: '50%', borderColor: '#FFFFFF', borderStyle: 'solid', borderWidth: '2px', backgroundColor: '#FFFFFF1A' }} />
            </div>
            <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <span style={{ color: '#1A1108', fontFamily: sans, fontSize: '16px', fontWeight: 500, letterSpacing: '-0.01em', lineHeight: '135%' }}>"{c.quote}"</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <span style={{ color: '#0A0A0A', fontFamily: sans, fontSize: '14px', fontWeight: 600 }}>{c.name}</span>
                <span style={{ color: '#8A8378', fontFamily: mono, fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{c.handle}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}]);
