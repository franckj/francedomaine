const { chromium } = require('/home/franckj/projects/domain-analyzer/node_modules/playwright');
const S=process.argv[2];
const head=`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;600;800&family=Passion+One:wght@700&display=block"><style>*{margin:0;box-sizing:border-box}body{font-family:"Public Sans",Arial,sans-serif;color:#161616;-webkit-font-smoothing:antialiased}
.wm{font-family:"Passion One",sans-serif;font-weight:700;color:#000091;line-height:.88;letter-spacing:.01em;display:inline-block}
.mark{display:inline-flex;align-items:center;justify-content:center;background:#000091;color:#fff;font-weight:800;border-radius:4px;letter-spacing:-.02em}
.card{background:#fff;border:1px solid #e3dfd8;border-radius:4px;display:grid;align-content:start;position:relative}
.pill{justify-self:start;font-weight:600;border-radius:999px;background:#e3f4e8;color:#18753c}
.stamp{position:absolute;transform:rotate(-8deg);border:3px solid #E1000F;color:#E1000F;font-weight:800;letter-spacing:.1em}</style>`;
const jobs=[
 ['logo-400.png',400,400,`<div style="width:400px;height:400px;background:#fff;display:flex;align-items:center;justify-content:center"><span class="wm" style="font-size:88px">FRANCE<br>DOMAINE</span></div>`],
 ['cover-1128x191.png',1128,191,`<div style="width:1128px;height:191px;background:#f9f6f2;display:flex;align-items:center;justify-content:flex-end;padding:0 56px 0 260px"><div style="font-size:36px;font-weight:800;letter-spacing:-.01em;line-height:1.2;text-align:right;white-space:nowrap">Votre marque mérite<br>le nom de domaine <span style="text-decoration:underline;text-decoration-color:#E1000F;text-decoration-thickness:5px;text-underline-offset:8px">parfait</span>.</div></div>`],
 ['post-vendu-testlab-1200.png',1200,1200,`<div style="width:1200px;height:1200px;background:#f9f6f2;padding:96px;display:grid;grid-template-rows:auto 1fr auto">
   <div><span class="wm" style="font-size:54px">FRANCE<br>DOMAINE</span></div>
   <div style="align-self:center" class="card"><div style="padding:72px 64px;display:grid;gap:18px;position:relative">
     <span class="pill" style="font-size:24px;padding:4px 16px;background:#ececfe;color:#000091">Octobre 2026</span>
     <b style="font-size:128px;letter-spacing:-.03em;line-height:1">TestLab.fr</b>
     <span style="font-size:36px;color:#4a4a4a">a trouvé son propriétaire.</span>
     <span class="stamp" style="right:56px;top:56px;font-size:48px;padding:2px 22px;border-width:6px">VENDU</span></div></div>
   <div style="font-size:28px;color:#4a4a4a">FranceDomaine.fr</div></div>`],
];
(async()=>{const b=await chromium.launch();for(const [f,w,h,html] of jobs){const p=await b.newPage({viewport:{width:w,height:h}});await p.setContent(head+html,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);await p.evaluate(()=>{document.querySelectorAll('.fit').forEach(f=>{const r=f.parentElement.querySelector('.ref');const n=f.textContent.length;const ls=parseFloat(getComputedStyle(f).letterSpacing)||0;const diff=r.getBoundingClientRect().width-f.getBoundingClientRect().width;f.style.letterSpacing=(ls+diff/n)+'px';f.style.marginRight=(-(ls+diff/n))+'px';})});
const ok=await p.evaluate(()=>document.fonts.check('800 20px "Bricolage Grotesque"'));console.log(f,'font',ok);await p.screenshot({path:`${S}/${f}`});await p.close();}await b.close()})();
