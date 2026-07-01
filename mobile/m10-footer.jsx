// Mobile footer — mirrors Paper frame 2TM-0 › Footer (3DK-0).
window.__M = window.__M || [];
window.__M.push(['footer', () => {
  const sans = '"Geist", system-ui, sans-serif';
  const mono = '"Geist Mono", system-ui, sans-serif';
  const ms = '"Material Symbols Rounded", system-ui, sans-serif';
  const groups = [
    [['Studio', ['Genie', 'Library', 'Materials', 'Pricing']], ['Company', ['About', 'Print partners', 'Careers', 'Contact']]],
    [['Discover', ['Eleven shapes', 'Categories', 'Skeleton Prompt', 'Showcase']], ['Legal', ['Terms', 'Privacy', 'Cookies', 'DMCA']]]
  ];
  const Col = col => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {col.map(([head, links]) => (
        <div key={head} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <span style={{ color: '#898783', fontFamily: mono, fontSize: '11px', fontWeight: 500, letterSpacing: '0.13em', textTransform: 'uppercase' }}>{head}</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
            {links.map(l => <a key={l} className="flink" href="#" style={{ color: '#20100E', fontFamily: sans, fontSize: '14px', textDecoration: 'none' }}>{l}</a>)}
          </div>
        </div>
      ))}
    </div>
  );
  return (
    <section id="m-footer" style={{ width: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', paddingTop: '56px', paddingBottom: '40px', backgroundColor: '#FAFAFA', borderTopColor: '#E7E7E5', borderTopStyle: 'solid', borderTopWidth: '1px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#E0F8F2', borderColor: '#1CD1AD80', borderStyle: 'solid', borderWidth: '1px', borderRadius: '999px', paddingBlock: '5px', paddingInline: '12px' }}>
        <span style={{ backgroundColor: '#1CD1AD', borderRadius: '50%', height: '6px', width: '6px' }} />
        <span style={{ color: '#0E8A72', fontFamily: mono, fontSize: '11px', fontWeight: 500, letterSpacing: '0.13em', textTransform: 'uppercase' }}>Folded with care · Chennai</span>
      </div>
      <div style={{ color: '#0A0A0A', fontFamily: sans, fontSize: '30px', fontWeight: 500, letterSpacing: '-0.05em', lineHeight: '104%', textAlign: 'center', paddingInline: '18px' }}>Type a sentence. We'll ship the box.</div>

      {/* subscribe */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: 'calc(100% - 36px)', maxWidth: '440px', backgroundColor: '#FFFFFF', borderColor: '#E4E1DAAB', borderStyle: 'solid', borderWidth: '1px', borderRadius: '999px', boxShadow: '#0417131A 0px 2px 8px -4px', paddingBlock: '6px', paddingLeft: '20px', paddingRight: '6px' }}>
        <input type="email" placeholder="Drop your email…" style={{ flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent', fontFamily: sans, fontSize: '14px', color: '#1A1108' }} />
        <div className="hov-btn" role="button" style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#1CD1AD', borderRadius: '999px', paddingBlock: '10px', paddingInline: '16px', cursor: 'pointer', flexShrink: 0 }}>
          <span style={{ color: '#053D31', fontFamily: sans, fontSize: '13px', fontWeight: 600 }}>Subscribe</span>
          <span style={{ color: '#053D31', fontFamily: ms, fontSize: '14px' }}>arrow_forward</span>
        </div>
      </div>

      <div style={{ width: 'calc(100% - 36px)', height: '1px', backgroundColor: '#E7E7E5', marginTop: '12px' }} />

      <div style={{ width: '100%', boxSizing: 'border-box', paddingInline: '18px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ backgroundImage: 'url(https://app.paper.design/file-assets/01KTNNTSJJ3G5MHVGA4S55GZJX/01KTKTH2EYPS36JN3495PXRJ00.png)', backgroundPosition: 'left center', backgroundRepeat: 'no-repeat', backgroundSize: 'contain', height: '78px', width: '190px' }} />
        <span style={{ color: '#5A5A57', fontFamily: sans, fontSize: '14px', lineHeight: '155%' }}>The world's first text-to-3D packaging studio. Built at IIT Madras, shipping from Chennai.</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={{ color: '#898783', fontFamily: mono, fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Backed &amp; recognised by</span>
          <span style={{ color: '#20100E', fontFamily: sans, fontSize: '13px', fontWeight: 500 }}>NSRCEL · IIT Madras · Startup India · Shatam</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginTop: '8px' }}>
          {Col(groups[0])}{Col(groups[1])}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTopColor: '#E7E7E5', borderTopStyle: 'solid', borderTopWidth: '1px', paddingTop: '20px', marginTop: '8px' }}>
          <span style={{ color: '#898783', fontFamily: mono, fontSize: '11px', letterSpacing: '0.08em' }}>© 2026</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['X', 'IG', 'in'].map(s => (
              <span key={s} className="hov-chip" style={{ height: '34px', minWidth: '34px', paddingInline: '8px', borderRadius: '9px', borderColor: '#E7E7E5', borderStyle: 'solid', borderWidth: '1px', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#20100E', fontFamily: mono, fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}]);
