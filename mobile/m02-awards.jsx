// Mobile awards — mirrors Paper frame 2TM-0 › Awards (2WF-0).
window.__M = window.__M || [];
window.__M.push(['awards', () => {
  const sans = '"Geist", system-ui, sans-serif';
  const mono = '"Geist Mono", system-ui, sans-serif';
  const asset = id => `https://app.paper.design/file-assets/01KTNNTSJJ3G5MHVGA4S55GZJX/${id}`;
  const items = [
    { img: '01N1HKNQCMQX36JW6BG9JSSSRE.png', w: '66px', h: '26px', title: "Launchpad '25 winner", sub: 'NSRCEL · IIM Bangalore' },
    { img: '7VP9THRKZPF7G36TNDAH3YXMFR.png', w: '30px', h: '30px', title: 'Incubated at IIT Madras', sub: 'IITM Incubation Cell' },
    { img: '44HQSDPR79KSKGRX8T4FMF2HHF.png', w: '84px', h: '22px', title: 'Startup India recognised', sub: 'DPIIT · Govt. of India' },
    { shatam: true, title: 'Shatam Seed Fund', sub: '26 of 104 · IITM' }
  ];
  const Logo = it => it.shatam
    ? (<div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
        <span style={{ color: '#1A1108', fontFamily: sans, fontSize: '17px', fontWeight: 700, letterSpacing: '-0.04em' }}>SHATAM</span>
        <span style={{ color: '#1CD1AD', fontFamily: mono, fontSize: '11px', fontWeight: 500 }}>100+</span>
      </div>)
    : (<div style={{ backgroundImage: `url(${asset(it.img)})`, backgroundPosition: '50%', backgroundRepeat: 'no-repeat', backgroundSize: 'contain', height: it.h, width: it.w }} />);

  return (
    <section id="m-awards" style={{ width: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', paddingBlock: '44px', borderTop: '1px solid #E7E7E5', borderBottom: '1px solid #E7E7E5', backgroundColor: '#FFFFFF' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#E0F8F2', borderColor: '#1CD1AD80', borderStyle: 'solid', borderWidth: '1px', borderRadius: '999px', paddingBlock: '5px', paddingInline: '12px' }}>
        <span style={{ backgroundColor: '#1CD1AD', borderRadius: '50%', height: '6px', width: '6px' }} />
        <span style={{ color: '#0E8A72', fontFamily: mono, fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Backed &amp; recognised by</span>
      </div>
      <div className="marquee" style={{ width: '100%', maskImage: 'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)' }}>
        <div className="marquee-track" style={{ gap: '40px', paddingRight: '40px', animationDuration: '26s', alignItems: 'flex-start' }}>
          {[0, 1, 2, 3].map(dup => (
            <React.Fragment key={dup}>
              {items.map((it, i) => (
                <div key={i} aria-hidden={dup !== 0 || undefined} style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', minWidth: '130px' }}>
                  <div style={{ height: '32px', display: 'flex', alignItems: 'center' }}>{Logo(it)}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
                    <span style={{ color: '#1A1108', fontFamily: sans, fontSize: '13px', fontWeight: 600, letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>{it.title}</span>
                    <span style={{ color: '#8A8378', fontFamily: mono, fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{it.sub}</span>
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}]);
