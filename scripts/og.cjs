// Renders public/og.png (1200x630) in the brand: FRANCE/DOMAINE wordmark (Passion One) + Franck's headline (Public Sans).
// Run: node scripts/og.cjs (needs Playwright; see docs/linkedin/render.cjs for the LinkedIn images).
const { chromium } = require(process.env.PW || 'playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
  await p.setContent(`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;800&family=Passion+One:wght@700&display=block">
  <style>*{margin:0}body{width:1200px;height:630px;background:#f9f6f2;font-family:'Public Sans',Arial,sans-serif;color:#161616;display:grid;align-content:space-between;padding:80px 90px;box-sizing:border-box}
  .wm{font-family:'Passion One';font-weight:700;color:#000091;font-size:64px;line-height:.88}
  h1{font-size:64px;font-weight:800;line-height:1.12;letter-spacing:-.01em}
  u{text-decoration-color:#E1000F;text-decoration-thickness:7px;text-underline-offset:10px}
  p{font-size:26px;color:#4a4a4a}</style>
  <div class="wm">FRANCE<br>DOMAINE</div><h1>Votre marque mérite<br>le nom de domaine <u>parfait</u>.</h1><p>FranceDomaine.fr</p>`, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready); await p.screenshot({ path: 'public/og.png' }); await b.close(); console.log('public/og.png');
})();
