// Mobile pricing — mirrors Paper frame 2TM-0 › Pricing (38O-0).
window.__M = window.__M || [];
window.__M.push(['pricing', () => {
  const sans = '"Geist", system-ui, sans-serif';
  const mono = '"Geist Mono", system-ui, sans-serif';
  const ms = '"Material Symbols Rounded", system-ui, sans-serif';
  const plans = [
    { tier: 'Pro for a month', badge: 'Pro', price: '₹830', tax: '+ 18% tax', cta: 'Choose Pro for a month', featured: true,
      rows: [['No. Of Designs', '∞', true], ['Print File Export', '10'], ['AI Image Generation', '100'], ['Image & Artwork Uploads', '100'], ['Advanced Edits (Holes, Extensions etc)', '100'], ['Premium Support', '100']] },
    { tier: 'Free', price: '₹0', cta: 'Start free', outline: true,
      rows: [['No. Of Designs', '∞', true], ['Print File Export', '0'], ['AI Image Generation', '3'], ['Image & Artwork Uploads', '50'], ['Advanced Edits (Holes, Extensions etc)', '10'], ['Premium Support', '0', false, true]] },
    { tier: 'Pro for a day', badge: 'Pro', badgeOutline: true, price: '₹125', tax: '+ 18% tax', cta: 'Choose Pro for a day', outline: true,
      rows: [['No. Of Designs', '∞', true], ['Print File Export', '2', true], ['AI Image Generation', '10', true], ['Image & Artwork Uploads', '50', true], ['Advanced Edits (Holes, Extensions etc)', '50', true], ['Premium Support', '0']] }
  ];
  return (
    <section id="m-pricing" style={{ width: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '22px', paddingBlock: '52px', backgroundColor: '#FFFFFF' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', paddingInline: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#E0F8F2', borderColor: '#1CD1AD80', borderStyle: 'solid', borderWidth: '1px', borderRadius: '999px', paddingBlock: '5px', paddingInline: '12px' }}>
          <span style={{ backgroundColor: '#1CD1AD', borderRadius: '50%', height: '6px', width: '6px' }} />
          <span style={{ color: '#0E8A72', fontFamily: mono, fontSize: '11px', fontWeight: 500, letterSpacing: '0.13em', textTransform: 'uppercase' }}>Pricing</span>
        </div>
        <div style={{ color: '#0A0A0A', fontFamily: sans, fontSize: '32px', fontWeight: 500, letterSpacing: '-0.05em', lineHeight: '104%', textAlign: 'center' }}>Start free. Scale when you ship.</div>
        <div style={{ display: 'flex', gap: '8px', backgroundColor: '#F4F6F9', borderColor: '#E2E7EE', borderStyle: 'solid', borderWidth: '1px', borderRadius: '999px', padding: '4px' }}>
          <div className="hov-chip" role="button" style={{ backgroundColor: '#00FFBD', borderRadius: '999px', paddingBlock: '8px', paddingInline: '18px', cursor: 'pointer' }}>
            <span style={{ color: '#0A0A0A', fontFamily: sans, fontSize: '13.5px', fontWeight: 500 }}>Short Term</span>
          </div>
          <div className="hov-chip" role="button" style={{ borderRadius: '999px', paddingBlock: '8px', paddingInline: '18px', cursor: 'pointer' }}>
            <span style={{ color: '#5C5C5C', fontFamily: sans, fontSize: '13.5px', fontWeight: 500 }}>Long Term</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingInline: '18px', paddingTop: '8px', paddingBottom: '6px', scrollbarWidth: 'none' }}>
        {plans.map(p => (
          <div key={p.tier} className="hov-raise" style={{ position: 'relative', flexShrink: 0, width: '300px', boxSizing: 'border-box', padding: '28px', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '18px',
            backgroundColor: p.featured ? undefined : '#FAFAFA',
            backgroundImage: p.featured ? 'linear-gradient(in oklab 170deg, oklab(96% -0.026 .0004) 0%, oklab(98.5% 0 0) 60%)' : undefined,
            borderColor: p.featured ? '#1CD1AD' : (p.outline ? '#1CD1AD66' : '#E7E7E5'), borderStyle: 'solid', borderWidth: p.outline && !p.featured ? '1.5px' : '1px',
            boxShadow: p.featured ? '#1CD1AD66 0px 12px 28px -8px' : '#0A0A0A0F 0px 1px 2px' }}>
            {p.badge && (
              <div style={{ position: 'absolute', top: '-12px', left: '28px', backgroundColor: p.badgeOutline ? '#FFFFFF' : '#041713', borderColor: '#1CD1AD66', borderStyle: 'solid', borderWidth: p.badgeOutline ? '1.5px' : '0', borderRadius: '999px', paddingBlock: '5px', paddingInline: '12px' }}>
                <span style={{ color: p.badgeOutline ? '#1A1108' : '#FFFFFF', fontFamily: mono, fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Pro</span>
              </div>
            )}
            <span style={{ color: '#5C5C5C', fontFamily: mono, fontSize: '12px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{p.tier}</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span style={{ color: '#0A0A0A', fontFamily: sans, fontSize: '46px', fontWeight: 500, letterSpacing: '-0.06em' }}>{p.price}</span>
              {p.tax && <span style={{ color: '#1A1108', fontFamily: sans, fontSize: '13px' }}>{p.tax}</span>}
            </div>
            <div className="hov-btn" role="button" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', borderRadius: '12px', paddingBlock: '12px', cursor: 'pointer',
              backgroundColor: p.featured ? '#041713' : '#FFFFFF', borderColor: p.featured ? 'transparent' : '#0A0A0A1F', borderStyle: 'solid', borderWidth: '1px' }}>
              <span style={{ color: p.featured ? '#FFFFFF' : '#0A0A0A', fontFamily: sans, fontSize: '14px', fontWeight: 600 }}>{p.cta}</span>
              {p.featured && <span style={{ color: '#FFFFFF', fontFamily: ms, fontSize: '15px' }}>arrow_forward</span>}
            </div>
            <div style={{ borderTopColor: '#E7E7E5', borderTopStyle: 'solid', borderTopWidth: '1px', paddingTop: '18px', display: 'flex', flexDirection: 'column', gap: '13px' }}>
              {p.rows.map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <span style={{ backgroundColor: '#1CD1AD', borderRadius: '50%', height: '6px', width: '6px', marginTop: '6px', flexShrink: 0 }} />
                    <span style={{ color: '#1A1108', fontFamily: sans, fontSize: '14px', fontWeight: 500, lineHeight: '140%' }}>{r[0]}</span>
                  </div>
                  <span style={{ color: r[1] === '∞' || r[2] ? '#0B7460' : (r[3] ? '#8A93A0' : '#1A1108'), fontFamily: sans, fontSize: '15px', fontWeight: 600, flexShrink: 0 }}>{r[1]}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}]);
