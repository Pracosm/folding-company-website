// Mobile feature — mirrors Paper frame 2TM-0 › "Two ways" (352-0).
// Phone version: only the two main cards (Genie + Library).
window.__M = window.__M || [];
window.__M.push(['feature', () => {
  const sans = '"Geist", system-ui, sans-serif';
  const mono = '"Geist Mono", system-ui, sans-serif';
  const ms = '"Material Symbols Rounded", system-ui, sans-serif';
  const Tetra = (a, b, c, st, w) => (
    <svg viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg" style={{ width: w || '64px', height: 'auto' }}>
      <path d="M45 8 L82 28 L45 48 L8 28 Z" fill={a} stroke={st} strokeWidth="1.2" />
      <path d="M8 28 L45 48 L45 82 L8 62 Z" fill={b} stroke={st} strokeWidth="1.2" />
      <path d="M45 48 L82 28 L82 62 L45 82 Z" fill={c} stroke={st} strokeWidth="1.2" />
    </svg>
  );
  const card = { backgroundColor: '#FAFAFA', borderColor: '#E7E7E5', borderStyle: 'solid', borderWidth: '1px', borderRadius: '24px', overflow: 'clip', display: 'flex', flexDirection: 'column' };

  return (
    <section id="m-materials" style={{ width: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '18px', paddingBlock: '52px', paddingInline: '16px', backgroundColor: '#FFFFFF' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#E0F8F2', borderColor: '#1CD1AD80', borderStyle: 'solid', borderWidth: '1px', borderRadius: '999px', paddingBlock: '5px', paddingInline: '12px' }}>
          <span style={{ backgroundColor: '#1CD1AD', borderRadius: '50%', height: '6px', width: '6px' }} />
          <span style={{ color: '#0E8A72', fontFamily: mono, fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Two ways to fold</span>
        </div>
        <div style={{ color: '#0A0A0A', fontFamily: sans, fontSize: '32px', fontWeight: 500, letterSpacing: '-0.05em', lineHeight: '104%', textAlign: 'center' }}>Prompt-led or drawn by hand.</div>
      </div>

      {/* Card A — Genie */}
      <div style={card}>
        <div style={{ height: '180px', backgroundImage: 'radial-gradient(ellipse 70% 90% at 30% 30% in oklab, oklab(77% -0.142 0.015 / 40%) 0%, oklab(77% -0.142 0.015 / 0%) 65%), linear-gradient(in oklab 160deg, oklab(96% -0.026 .0004) 0%, oklab(91.2% -0.052 0.005) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', position: 'relative', overflow: 'hidden' }}>
          <div className="fc-blobs" aria-hidden="true">
            <div className="fc-blob b1" />
            <div className="fc-blob b2" />
            <div className="fc-blob b3" />
          </div>
          <span className="fc-twinkle genie-logo" aria-hidden="true" style={{ position: 'absolute', top: '20px', right: '24px', width: '20px', height: '20px', color: '#1CD1AD', zIndex: 3 }} />
          <div className="fc-genie-bubble" style={{ position: 'relative', zIndex: 2, backdropFilter: 'blur(10px)', backgroundColor: '#1A1108C7', borderColor: '#FFFFFF1F', borderStyle: 'solid', borderWidth: '1px', borderRadius: '14px', boxShadow: '#1A11082E 0px 4px 12px', padding: '14px 16px' }}>
            <span style={{ color: '#FFFFFFD9', fontFamily: mono, fontSize: '12px', lineHeight: '155%' }}>Holiday gift box, navy &amp; gold, magnetic lid…<span className="fc-cursor" /></span>
          </div>
        </div>
        <div style={{ borderTopColor: '#E7E7E5', borderTopStyle: 'solid', borderTopWidth: '1px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0E8A72', fontFamily: mono, fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase' }}><span className="genie-logo" aria-hidden="true" style={{ width: '13px', height: '13px', color: '#1CD1AD' }} />Genie</span>
          <span style={{ color: '#0A0A0A', fontFamily: sans, fontSize: '24px', fontWeight: 500, letterSpacing: '-0.05em', lineHeight: '108%' }}>A package from a sentence.</span>
          <span style={{ color: '#5C5C5C', fontFamily: sans, fontSize: '14.5px', lineHeight: '155%' }}>Describe the package the way you'd brief a designer. Genie returns a working draft in seconds — dieline, render, materials.</span>
          <div className="hov-btn" role="button" style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#0A0A0A', borderRadius: '10px', paddingBlock: '10px', paddingInline: '18px', width: 'fit-content', cursor: 'pointer' }}>
            <span style={{ color: '#fff', fontFamily: sans, fontSize: '13.5px', fontWeight: 500 }}>Try Genie</span>
            <span style={{ color: '#fff', fontFamily: ms, fontSize: '15px' }}>arrow_forward</span>
          </div>
        </div>
      </div>

      {/* Card B — Library */}
      <div style={card}>
        <div style={{ height: '180px', backgroundImage: 'radial-gradient(ellipse 70% 90% at 70% 30% in oklab, oklab(52.3% -0.049 -0.145 / 10%) 0%, oklab(52.3% -0.049 -0.145 / 0%) 65%), linear-gradient(in oklab 160deg, oklab(96.1% -.0008 0.003) 0%, oklab(92.4% -0.002 0.005) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="fc-cubegrid" style={{ display: 'grid', gap: '10px', gridTemplateColumns: 'repeat(3, 1fr)', width: '74%', maxWidth: '290px' }}>
            {[['#F0D9B0', '#C9A36A', '#8B6332', '#1A1108', false], ['#BFEEE0', '#5BDFB8', '#1CD1AD', '#1CD1AD', true], ['#FFFFFF', '#EFE6D6', '#D8CDB6', '#1A1108', false], ['#1B2C2A', '#0F1F1D', '#091413', '#0A0F0E', false], ['#5B1B0D', '#3A1108', '#260907', '#1A1108', false], ['#A66D2C', '#7A4C1E', '#553318', '#1A1108', false]].map((t, i) => (
              <div key={i} style={{ aspectRatio: '1 / 1', backgroundColor: '#FFFFFF', borderColor: t[4] ? '#1CD1AD' : '#E2E7EE', borderStyle: 'solid', borderWidth: '1px', borderRadius: '10px', boxShadow: t[4] ? '#1CD1AD2E 0px 0px 0px 2px' : '#1A11080A 0px 1px 2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {Tetra(t[0], t[1], t[2], t[3], '58%')}
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTopColor: '#E7E7E5', borderTopStyle: 'solid', borderTopWidth: '1px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <span style={{ color: '#0E8A72', fontFamily: mono, fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase' }}>▦ Library</span>
          <span style={{ color: '#0A0A0A', fontFamily: sans, fontSize: '24px', fontWeight: 500, letterSpacing: '-0.05em', lineHeight: '108%' }}>A dieline you draw by hand.</span>
          <span style={{ color: '#5C5C5C', fontFamily: sans, fontSize: '14.5px', lineHeight: '155%' }}>240 production-ready dielines — sorted the way a print shop sorts them. Pick one and edit by hand, type and gusset.</span>
          <div className="hov-btn" role="button" style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#0A0A0A', borderRadius: '10px', paddingBlock: '10px', paddingInline: '18px', width: 'fit-content', cursor: 'pointer' }}>
            <span style={{ color: '#fff', fontFamily: sans, fontSize: '13.5px', fontWeight: 500 }}>Browse the Library</span>
            <span style={{ color: '#fff', fontFamily: ms, fontSize: '15px' }}>arrow_forward</span>
          </div>
        </div>
      </div>
    </section>
  );
}]);
