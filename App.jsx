// The Folding Company — Refine R2, interactive build.
// Sections register themselves in window.__S as [name, Component] pairs.
const S = Object.fromEntries(window.__S);

const ORDER = ['hero', 'awards', 'categories', 'templates', 'testimonials', 'feature', 'pricing', 'watchTheFold', 'cta', 'footer'];

function App() {
  return (
    <div style={{ width: '100%', backgroundColor: '#FFFFFF', overflow: 'clip' }}>
      {ORDER.map(k => { const C = S[k]; return <C key={k} />; })}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

// Scroll-reveal: flip .reveal -> .in when a block enters the viewport.
// React 18 commits asynchronously, so retry until the nodes exist.
(function hookReveals(attempt) {
  const els = document.querySelectorAll('.reveal:not([data-rv])');
  if (!els.length) {
    if (attempt < 100) setTimeout(() => hookReveals(attempt + 1), 50);
    return;
  }
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
  els.forEach(el => { el.dataset.rv = '1'; io.observe(el); });
})(0);
