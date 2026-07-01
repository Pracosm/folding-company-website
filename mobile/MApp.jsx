// Mobile app — renders the mobile section components registered in
// window.__M into #mroot. Mirrors the Paper frame 2TM-0. Loaded only by
// index-lumio.html; the desktop app keeps rendering into #root.
window.__M = window.__M || [];
const M = Object.fromEntries(window.__M);

// extend this as each mobile section is added
const MORDER = ['hero', 'awards', 'categories', 'templates', 'feature', 'watch', 'testimonials', 'pricing', 'cta', 'footer'];

function MApp() {
  return (
    <div style={{ width: '100%', backgroundColor: '#FFFFFF', overflowX: 'clip' }}>
      {MORDER.map(k => { const C = M[k]; return C ? <C key={k} /> : null; })}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('mroot')).render(<MApp />);
